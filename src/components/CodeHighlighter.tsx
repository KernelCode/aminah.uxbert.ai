import React from "react";

interface Token {
  type:
    | "comment"
    | "tag"
    | "attr-name"
    | "attr-value"
    | "keyword"
    | "function"
    | "string"
    | "number"
    | "boolean"
    | "punctuation"
    | "plain";
  value: string;
}

const tokenColors: Record<Token["type"], string> = {
  comment: "text-gray-500",
  tag: "text-purple-400",
  "attr-name": "text-blue-400",
  "attr-value": "text-green-400",
  keyword: "text-purple-400",
  function: "text-yellow-300",
  string: "text-green-400",
  number: "text-orange-400",
  boolean: "text-orange-400",
  punctuation: "text-gray-400",
  plain: "text-gray-300",
};

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    // HTML Comments
    if (code.substring(i, i + 4) === "<!--") {
      const end = code.indexOf("-->", i);
      if (end !== -1) {
        tokens.push({ type: "comment", value: code.substring(i, end + 3) });
        i = end + 3;
        continue;
      }
    }

    // HTML Tags
    if (code[i] === "<") {
      const tagEnd = code.indexOf(">", i);
      if (tagEnd !== -1) {
        const tagContent = code.substring(i + 1, tagEnd);
        tokens.push({ type: "tag", value: "<" });

        // Parse tag content (tag name and attributes)
        const parts = tagContent.split(/(\s+)/);
        let isFirstPart = true;

        for (const part of parts) {
          if (part.trim() === "") {
            tokens.push({ type: "plain", value: part });
            continue;
          }

          if (isFirstPart) {
            tokens.push({ type: "tag", value: part });
            isFirstPart = false;
          } else if (part.includes("=")) {
            const [attrName, ...rest] = part.split("=");
            tokens.push({ type: "attr-name", value: attrName });
            tokens.push({ type: "punctuation", value: "=" });
            const attrValue = rest.join("=");
            tokens.push({ type: "attr-value", value: attrValue });
          } else {
            tokens.push({ type: "attr-name", value: part });
          }
        }

        tokens.push({ type: "tag", value: ">" });
        i = tagEnd + 1;
        continue;
      }
    }

    // JavaScript Comments
    if (code.substring(i, i + 2) === "//") {
      const end = code.indexOf("\n", i);
      if (end !== -1) {
        tokens.push({ type: "comment", value: code.substring(i, end) });
        i = end;
        continue;
      } else {
        tokens.push({ type: "comment", value: code.substring(i) });
        break;
      }
    }

    // Strings
    if (code[i] === '"' || code[i] === "'" || code[i] === "`") {
      const quote = code[i];
      let j = i + 1;
      let str = quote;
      while (j < code.length && code[j] !== quote) {
        if (code[j] === "\\") {
          str += code[j] + (code[j + 1] || "");
          j += 2;
        } else {
          str += code[j];
          j++;
        }
      }
      if (j < code.length) str += code[j];
      tokens.push({ type: "string", value: str });
      i = j + 1;
      continue;
    }

    // Numbers
    if (/\d/.test(code[i])) {
      let num = "";
      while (i < code.length && /[\d.]/.test(code[i])) {
        num += code[i];
        i++;
      }
      tokens.push({ type: "number", value: num });
      continue;
    }

    // Keywords
    const keywords = ["async", "await", "const", "let", "var", "function", "new", "return"];
    const booleans = ["true", "false"];
    let word = "";
    let j = i;
    while (j < code.length && /[a-zA-Z_]/.test(code[j])) {
      word += code[j];
      j++;
    }

    if (word && keywords.includes(word)) {
      tokens.push({ type: "keyword", value: word });
      i = j;
      continue;
    }

    if (word && booleans.includes(word)) {
      tokens.push({ type: "boolean", value: word });
      i = j;
      continue;
    }

    // Identifiers (functions and variables)
    if (word) {
      // Check if next non-whitespace char is '(' to determine if it's a function
      let k = j;
      while (k < code.length && /\s/.test(code[k])) k++;
      const isFunction = code[k] === "(";

      tokens.push({
        type: isFunction ? "function" : "plain",
        value: word,
      });
      i = j;
      continue;
    }

    // Punctuation
    if (/[{}()[\].,;:?]/.test(code[i])) {
      tokens.push({ type: "punctuation", value: code[i] });
      i++;
      continue;
    }

    // Operators
    if (/[=<>!+\-*/%&|^~]/.test(code[i])) {
      let op = code[i];
      if (i + 1 < code.length && /[=<>!+\-*/%&|^]/.test(code[i + 1])) {
        op += code[i + 1];
        i++;
      }
      tokens.push({ type: "punctuation", value: op });
      i++;
      continue;
    }

    // Default: plain text (including whitespace and newlines)
    tokens.push({ type: "plain", value: code[i] });
    i++;
  }

  return tokens;
}

interface CodeHighlighterProps {
  code: string;
}

export const CodeHighlighter: React.FC<CodeHighlighterProps> = ({ code }) => {
  const tokens = tokenize(code);

  return (
    <>
      {tokens.map((token, index) => (
        <span key={index} className={tokenColors[token.type]}>
          {token.value}
        </span>
      ))}
    </>
  );
};
