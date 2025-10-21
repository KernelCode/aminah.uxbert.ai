import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
  Bug,
  Image,
  Zap,
  ArrowRight,
  Code2,
  CheckCircle2,
  Users,
  Shield,
  Globe,
  Sparkles,
  FileText,
  Clock,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const slidingTextRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const userTypes = [
    { text: "QA Teams", color: "from-blue-600 to-cyan-600" },
    { text: "Developers", color: "from-purple-600 to-pink-600" },
    { text: "Product Managers", color: "from-orange-600 to-red-600" },
    { text: "Clients", color: "from-green-600 to-teal-600" },
    { text: "Support Teams", color: "from-indigo-600 to-purple-600" },
    { text: "Beta Testers", color: "from-pink-600 to-rose-600" },
  ];

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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Bug className="h-4 w-4 text-white" />
              </div>
              <div className="text-2xl font-bold">Aminah</div>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost">Documentation</Button>
              <Button variant="ghost">Pricing</Button>
              <Button>Start Free Trial</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          {/* New Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Trusted by 1,000+ teams worldwide
            </span>
          </div>

          <h1 className="hero-title text-5xl md:text-7xl font-bold tracking-tight mb-8">
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

          <p className="hero-subtitle text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Transform how your team handles bug reports.{" "}
            <span className="font-semibold text-gray-900">Just one line of code.</span> Let users capture, annotate, and
            submit issues in seconds while you focus on fixing them.
          </p>

          <div className="hero-cta flex gap-4 justify-center mb-12">
            <Button size="lg" className="text-base bg-black hover:bg-gray-800">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="text-base">
              Watch 2-min Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-16 px-6 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="stat-number text-4xl font-bold mb-2" data-value="50000">
              0
            </div>
            <div className="text-gray-400">Bugs Reported</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">
              <span className="stat-number" data-value="85">
                0
              </span>
              %
            </div>
            <div className="text-gray-400">Faster Resolution</div>
          </div>
          <div>
            <div className="stat-number text-4xl font-bold mb-2" data-value="1200">
              0
            </div>
            <div className="text-gray-400">Active Teams</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">
              <span className="stat-number" data-value="4">
                0
              </span>
              .9/5
            </div>
            <div className="text-gray-400">User Rating</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need,
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                nothing you don't
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for modern teams who value efficiency and clarity in their bug tracking workflow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                <Bug className="h-6 w-6 text-white" />
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
      <section ref={flowRef} className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">From bug to fix in minutes</h2>
          <div className="space-y-8">
            <div className="flow-step flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Add the Magic Script</h3>
                <p className="text-gray-600">
                  Copy our lightweight JavaScript snippet and paste it into your website. Works with any framework or
                  vanilla HTML.
                </p>
                <div className="mt-3 inline-flex items-center text-sm text-purple-600 font-medium">
                  <Code2 className="h-4 w-4 mr-1" />
                  ~3KB gzipped
                </div>
              </div>
            </div>

            <div className="flow-step flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Users Report with Context</h3>
                <p className="text-gray-600">
                  A subtle floating widget appears. Users capture their screen, draw annotations, and describe the
                  issue—all without leaving your site.
                </p>
                <div className="mt-3 inline-flex items-center text-sm text-purple-600 font-medium">
                  <Clock className="h-4 w-4 mr-1" />
                  Average report time: 30 seconds
                </div>
              </div>
            </div>

            <div className="flow-step flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Smart Processing & Routing</h3>
                <p className="text-gray-600">
                  Reports flow through your configured webhook (n8n, Zapier, or custom) and create detailed tickets in
                  your project management tool.
                </p>
                <div className="mt-3 inline-flex items-center text-sm text-purple-600 font-medium">
                  <Zap className="h-4 w-4 mr-1" />
                  Instant delivery
                </div>
              </div>
            </div>

            <div className="flow-step flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Fix with Full Context</h3>
                <p className="text-gray-600">
                  Your team gets everything: annotated screenshots, browser details, console logs, and user steps. No
                  more back-and-forth for clarification.
                </p>
                <div className="mt-3 inline-flex items-center text-sm text-green-600 font-medium">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  85% faster bug resolution
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Seriously, it's this simple</h2>
          <p className="text-center text-gray-600 mb-8">
            Add this before your closing &lt;/body&gt; tag and you're done
          </p>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-gray-900 text-gray-100 p-8 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Code2 className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <pre>{`<!-- Aminah Bug Reporter -->
<script src="https://cdn.aminah.io/v2/aminah.min.js"></script>
<script>
  Aminah.init({
    apiKey: 'YOUR_API_KEY',
    webhook: 'https://your-webhook-url.com',
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
      <section className="py-20 px-6 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Stop losing bugs in emails and chat</h2>
          <p className="text-xl text-white/90 mb-10">
            Join 1,000+ teams who've revolutionized their bug reporting process
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="text-base bg-white text-purple-600 hover:bg-gray-100">
              Start 14-Day Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="text-base border-white text-white hover:bg-white/10">
              <Code2 className="mr-2 h-4 w-4" /> View on GitHub
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/70">No credit card required • Setup in 2 minutes • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Bug className="h-4 w-4 text-white" />
                </div>
                <div className="text-xl font-bold">Aminah</div>
              </div>
              <p className="text-sm text-gray-600">Making bug reporting a breeze for teams worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
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
                    Pricing
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
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
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
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Privacy
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
          <div className="pt-8 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600">
            <div>© 2025 Aminah. All rights reserved.</div>
            <div className="flex gap-6">
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
