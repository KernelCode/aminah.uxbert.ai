import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
  Drone,
  Image,
  Zap,
  Code2,
  CheckCircle2,
  Users,
  Shield,
  Globe,
  Sparkles,
  FileText,
  Clock,
  Menu,
  X,
  Copy,
  Check,
  Download,
  Settings,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const slidingTextRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Configuration options
  const [config, setConfig] = useState({
    webhookUrl: "https://uxbertlabs.app.n8n.cloud/webhook-test/create-ticket",
    position: "bottom-right" as "bottom-right" | "bottom-left" | "top-right" | "top-left",
    theme: "light" as "light" | "dark",
    annotation: true,
    deviceInfo: true,
    captureDelay: 500,
    quality: 0.95,
    format: "png" as "png" | "jpeg",
  });

  const userTypes = [
    { text: "QA Teams", color: "from-blue-600 to-cyan-600" },
    { text: "Developers", color: "from-purple-600 to-pink-600" },
    { text: "Product Managers", color: "from-orange-600 to-red-600" },
    { text: "Clients", color: "from-green-600 to-teal-600" },
    { text: "Support Teams", color: "from-indigo-600 to-purple-600" },
    { text: "Beta Testers", color: "from-pink-600 to-rose-600" },
  ];

  const generateConfigCode = () => {
    return `<!-- Aminah Bug Reporter -->
<script src="https://cdn.jsdelivr.net/npm/@uxbertlabs/aminah/dist/aminah.standalone.min.js"></script>
<script>
  Aminah.init({
    ui: {
      position: "${config.position}",
      theme: "${config.theme}",
    },
    features: {
      annotation: ${config.annotation},
      deviceInfo: ${config.deviceInfo},
    },
    integrations: {
      n8n: {
        webhookUrl: "${config.webhookUrl}",
        enabled: true,
      },
    },
    screenshot: {
      captureDelay: ${config.captureDelay},
      quality: ${config.quality},
      format: "${config.format}",
      hooks: {
        beforeCapture: async (context) => {
          console.log("[Hook] Before capture:", context.mode);
        },
        afterCapture: async (context) => {
          console.log("[Hook] After capture, screenshot size:", context.screenshot?.length);
        },
        onCaptureStart: async (context) => {
          console.log("[Hook] Capture started at:", new Date(context.timestamp));
        },
        onCaptureComplete: async (context) => {
          console.log("[Hook] Capture completed successfully");
        },
        onCaptureError: async (error, context) => {
          console.error("[Hook] Capture failed:", error.message);
        },
      },
    },
  });
</script>`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateConfigCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadN8nWorkflow = () => {
    const link = document.createElement("a");
    link.href = "/n8n.workflow.json";
    link.download = "n8n.workflow.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // Sliding text animation
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % userTypes.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [userTypes.length]);

  useEffect(() => {
    // Animate the sliding text when it changes
    if (slidingTextRef.current) {
      gsap.fromTo(
        slidingTextRef.current,
        {
          y: 60,
          opacity: 0,
          rotateX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [currentIndex]);

  useEffect(() => {
    // Hero animations
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-cta", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
      });

      // Floating animation for hero badge
      gsap.to(".hero-badge", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Features animation with enhanced effects
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Flow animation with better staging
      gsap.from(".flow-step", {
        scrollTrigger: {
          trigger: flowRef.current,
          start: "top 80%",
        },
        opacity: 0,
        x: -50,
        duration: 0.7,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Stats counter animation
      gsap.from(".stat-number", {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%",
        },
        textContent: 0,
        duration: 2,
        ease: "power3.out",
        snap: { textContent: 1 },
        onUpdate: function () {
          this.targets().forEach((target: { getAttribute: (arg0: string) => string; textContent: string }) => {
            const num = Math.floor(this.progress() * parseInt(target.getAttribute("data-value")));
            target.textContent = num.toLocaleString();
          });
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Drone className="h-4 w-4 text-white" />
              </div>
              <div className="text-xl sm:text-2xl font-bold">Aminah</div>
            </div>

            {/* Desktop Navigation */}
            <a href="#documentation">
              <div className="hidden md:flex gap-4">
                <Button variant="ghost">Documentation</Button>
              </div>
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-200 pt-4">
              <a href="#documentation">
                <Button variant="ghost" className="w-full justify-start">
                  Documentation
                </Button>
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          {/* New Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Powered by{" "}
              <a href="https://uxbert.com" target="_blank" rel="noopener noreferrer">
                Uxbert Labs
              </a>
            </span>
          </div>

          <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-8 px-4">
            Bug reporting that
            <br />
            <span className="inline-block">works for </span>
            <div className="inline-block relative h-[1em] w-fit overflow-hidden align-bottom">
              <div
                ref={slidingTextRef}
                className={`mx-2 bg-gradient-to-r ${userTypes[currentIndex].color} bg-clip-text text-transparent font-bold`}
              >
                {userTypes[currentIndex].text}
              </div>
            </div>
          </h1>

          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto px-4">
            Transform how your team handles bug reports.{" "}
            <span className="font-semibold text-gray-900">Just one line of code.</span> Let users capture, annotate, and
            submit issues in seconds while you focus on fixing them.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500 px-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 flex-shrink-0" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 flex-shrink-0" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 flex-shrink-0" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section 
      <section className="stats-section py-16 px-4 sm:px-6 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          <div>
            <div className="stat-number text-2xl sm:text-4xl font-bold mb-2" data-value="50000">
              0
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Bugs Reported</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-bold mb-2">
              <span className="stat-number" data-value="85">
                0
              </span>
              %
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Faster Resolution</div>
          </div>
          <div>
            <div className="stat-number text-2xl sm:text-4xl font-bold mb-2" data-value="1200">
              0
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Active Teams</div>
          </div>
          <div>
            <div className="text-2xl sm:text-4xl font-bold mb-2">
              <span className="stat-number" data-value="4">
                0
              </span>
              .9/5
            </div>
            <div className="text-xs sm:text-sm text-gray-400">User Rating</div>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 px-4">
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Built for modern teams who value efficiency and clarity in their bug tracking workflow
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="feature-card group bg-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast Setup</h3>
              <p className="text-gray-600 mb-4">
                Add one line of code. That's it. No complex configurations, no lengthy onboarding.
              </p>
              <div className="text-sm text-purple-600 font-medium">2 minute setup →</div>
            </div>

            <div className="feature-card group bg-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Image className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visual Context</h3>
              <p className="text-gray-600 mb-4">
                Users draw, highlight, and annotate directly on screenshots. No more vague descriptions.
              </p>
              <div className="text-sm text-purple-600 font-medium">See it in action →</div>
            </div>

            <div className="feature-card group bg-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Drone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Integration</h3>
              <p className="text-gray-600 mb-4">
                Automatically creates tickets in Jira, Linear, GitHub, or your favorite tool via webhooks.
              </p>
              <div className="text-sm text-purple-600 font-medium">View integrations →</div>
            </div>

            <div className="feature-card group bg-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Rich Metadata</h3>
              <p className="text-gray-600 mb-4">
                Captures browser info, console logs, network requests, and user actions automatically.
              </p>
              <div className="text-sm text-purple-600 font-medium">Learn more →</div>
            </div>

            <div className="feature-card group bg-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
              <p className="text-gray-600 mb-4">
                Assign, prioritize, and track issues. Keep everyone in sync with real-time updates.
              </p>
              <div className="text-sm text-purple-600 font-medium">Explore features →</div>
            </div>

            <div className="feature-card group bg-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Session Replay</h3>
              <p className="text-gray-600 mb-4">
                Watch exactly what happened before the bug. Reproduce issues instantly.
              </p>
              <div className="text-sm text-purple-600 font-medium">See demo →</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={flowRef} className="py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 px-4">
            From bug to fix in minutes
          </h2>
          <div className="space-y-6 sm:space-y-8 px-4">
            <div className="flow-step flex gap-4 sm:gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-sm sm:text-base">
                1
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Add the Magic Script</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Copy our lightweight JavaScript snippet and paste it into your website. Works with any framework or
                  vanilla HTML.
                </p>
                <div className="mt-3 inline-flex items-center text-xs sm:text-sm text-purple-600 font-medium">
                  <Code2 className="h-4 w-4 mr-1" />
                  ~3KB gzipped
                </div>
              </div>
            </div>

            <div className="flow-step flex gap-4 sm:gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-sm sm:text-base">
                2
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Users Report with Context</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  A subtle floating widget appears. Users capture their screen, draw annotations, and describe the
                  issue—all without leaving your site.
                </p>
                <div className="mt-3 inline-flex items-center text-xs sm:text-sm text-purple-600 font-medium">
                  <Clock className="h-4 w-4 mr-1" />
                  Average report time: 30 seconds
                </div>
              </div>
            </div>

            <div className="flow-step flex gap-4 sm:gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-sm sm:text-base">
                3
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Smart Processing & Routing</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Reports flow through your configured webhook (n8n, Zapier, or custom) and create detailed tickets in
                  your project management tool.
                </p>
                <div className="mt-3 inline-flex items-center text-xs sm:text-sm text-purple-600 font-medium">
                  <Zap className="h-4 w-4 mr-1" />
                  Instant delivery
                </div>
              </div>
            </div>

            <div className="flow-step flex gap-4 sm:gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Fix with Full Context</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Your team gets everything: annotated screenshots, browser details, console logs, and user steps. No
                  more back-and-forth for clarification.
                </p>
                <div className="mt-3 inline-flex items-center text-xs sm:text-sm text-green-600 font-medium">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  85% faster bug resolution
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Generator */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50" id="documentation">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-4">
              <Settings className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Configuration Generator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Customize Your Integration</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Configure Aminah to match your needs. Adjust settings below and generate your custom integration code.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Configuration Options */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  UI Settings
                </h3>

                {/* Position */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Widget Position</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["bottom-right", "bottom-left", "top-right", "top-left"] as const).map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setConfig({ ...config, position: pos })}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          config.position === pos
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {pos
                          .split("-")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["light", "dark"] as const).map((theme) => (
                      <button
                        key={theme}
                        onClick={() => setConfig({ ...config, theme })}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          config.theme === theme
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  Features
                </h3>

                {/* Feature Toggles */}
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-700">Enable Annotations</span>
                    <input
                      type="checkbox"
                      checked={config.annotation}
                      onChange={(e) => setConfig({ ...config, annotation: e.target.checked })}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-700">Collect Device Info</span>
                    <input
                      type="checkbox"
                      checked={config.deviceInfo}
                      onChange={(e) => setConfig({ ...config, deviceInfo: e.target.checked })}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Image className="h-5 w-5 text-purple-600" />
                  Screenshot Settings
                </h3>

                {/* Screenshot Format */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["png", "jpeg"] as const).map((format) => (
                      <button
                        key={format}
                        onClick={() => setConfig({ ...config, format })}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          config.format === format
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {format.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality Slider */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quality: {(config.quality * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="1"
                    step="0.05"
                    value={config.quality}
                    onChange={(e) => setConfig({ ...config, quality: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>

                {/* Capture Delay */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capture Delay: {config.captureDelay}ms
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="100"
                    value={config.captureDelay}
                    onChange={(e) => setConfig({ ...config, captureDelay: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  Integration
                </h3>

                {/* Webhook URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">n8n Webhook URL</label>
                  <input
                    type="text"
                    value={config.webhookUrl}
                    onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                    placeholder="https://your-n8n-instance.com/webhook/..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Don't have a workflow yet?{" "}
                    <button
                      onClick={downloadN8nWorkflow}
                      className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      Download n8n workflow template
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Generated Code */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-purple-600" />
                  Your Custom Code
                </h3>
                <Button
                  onClick={copyToClipboard}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  size="sm"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-xs overflow-x-auto max-h-[600px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap break-words">{generateConfigCode()}</pre>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 font-medium mb-1">Installation Instructions</p>
                <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Copy the code above</li>
                  <li>Paste it before your closing &lt;/body&gt; tag</li>
                  <li>Replace the webhook URL with your own n8n endpoint</li>
                  <li>Save and deploy your changes</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 px-4">Seriously, it's this simple</h2>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-8 px-4">
            Add this before your closing &lt;/body&gt; tag and you're done
          </p>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-gray-900 text-gray-100 p-4 sm:p-8 rounded-lg font-mono text-xs sm:text-sm overflow-x-auto">
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white text-xs sm:text-sm">
                  <Code2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Copy
                </Button>
              </div>
              <pre>{`<!-- Aminah Bug Reporter -->
<script src="https://cdn.aminah.ai/v2/aminah.min.js"></script>
<script>
  Aminah.init({
 
    webhook: 'https://your-webhook-url.com', // n8n, Zapier, or custom endpoint
    position: 'bottom-right',
    features: {
      screenshots: true,
      annotations: true,
      sessionReplay: true,
      metadata: true
    }
  });
</script>`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/*
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 px-4">Stop losing bugs in emails and chat</h2>
          <p className="text-lg sm:text-xl text-white/90 mb-10 px-4">
            Join 1,000+ teams who've revolutionized their bug reporting process
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button
              size="lg"
              className="text-sm sm:text-base bg-white text-purple-600 hover:bg-gray-100 w-full sm:w-auto"
            >
              Start 14-Day Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-sm sm:text-base border-white text-white hover:bg-white/10 w-full sm:w-auto"
            >
              <Code2 className="mr-2 h-4 w-4" /> View on GitHub
            </Button>
          </div>
          <p className="mt-6 text-xs sm:text-sm text-white/70 px-4">
            No credit card required • Setup in 2 minutes • Cancel anytime
          </p>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div className="col-span-2 sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Drone className="h-4 w-4 text-white" />
                </div>
                <div className="text-lg sm:text-xl font-bold">Aminah</div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Making bug reporting a breeze for teams worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Product</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Resources</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li>
                  <a href="#documentation" className="hover:text-gray-900">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Company</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    About
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-gray-900">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-600">
            <div>© 2025 Aminah. All rights reserved.</div>
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="hover:text-gray-900">
                Twitter
              </a>
              <a href="#" className="hover:text-gray-900">
                GitHub
              </a>
              <a href="#" className="hover:text-gray-900">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
