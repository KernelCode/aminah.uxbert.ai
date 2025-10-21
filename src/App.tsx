import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { Bug, Image, Zap, ArrowRight, Code2, CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const flowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero animations
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      })

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      })

      gsap.from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
      })

      // Features animation
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
      })

      // Flow animation
      gsap.from('.flow-step', {
        scrollTrigger: {
          trigger: flowRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out'
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">Aminah</div>
            <div className="flex gap-4">
              <Button variant="ghost">Documentation</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="hero-title text-6xl md:text-7xl font-bold tracking-tight mb-6">
            Bug reporting,
            <br />
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              reimagined
            </span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Inject Aminah into any website. Let users report issues with screenshots and drawings.
            Automatically create Jira tickets.
          </p>
          <div className="hero-cta flex gap-4 justify-center">
            <Button size="lg" className="text-base">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="text-base">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Everything you need for bug reporting
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card bg-white p-8 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">One-Line Integration</h3>
              <p className="text-gray-600">
                Add Aminah to your site with a single JavaScript snippet. No complex setup required.
              </p>
            </div>

            <div className="feature-card bg-white p-8 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Image className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visual Annotations</h3>
              <p className="text-gray-600">
                Users can draw, highlight, and annotate directly on screenshots before submitting.
              </p>
            </div>

            <div className="feature-card bg-white p-8 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                <Bug className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Auto Jira Integration</h3>
              <p className="text-gray-600">
                Reports flow through n8n to automatically create detailed Jira tickets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={flowRef} className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How it works</h2>
          <div className="space-y-8">
            <div className="flow-step flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Inject the Script</h3>
                <p className="text-gray-600">
                  Add Aminah's JavaScript snippet to your website. It's that simple.
                </p>
              </div>
            </div>

            <div className="flow-step flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Users Report Issues</h3>
                <p className="text-gray-600">
                  A floating button appears on your site. Users click it, draw on the screenshot, and describe the issue.
                </p>
              </div>
            </div>

            <div className="flow-step flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Automatic Processing</h3>
                <p className="text-gray-600">
                  Reports are sent to n8n, which processes the data and creates a Jira ticket with all details.
                </p>
              </div>
            </div>

            <div className="flow-step flex gap-6 items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Track & Fix</h3>
                <p className="text-gray-600">
                  Your team receives the ticket with screenshot, annotations, and context. Start fixing immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Get started in seconds</h2>
          <p className="text-center text-gray-600 mb-8">
            Just add this snippet before the closing &lt;/body&gt; tag
          </p>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{`<script src="https://cdn.aminah.io/aminah.js"></script>
<script>
  Aminah.init({
    apiKey: 'your-api-key',
    n8nWebhook: 'https://your-n8n-webhook-url'
  });
</script>`}</pre>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to streamline bug reporting?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Start capturing better bug reports today.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="text-base">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="text-base">
              <Code2 className="mr-2 h-4 w-4" /> View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-gray-600">
          <div>© 2025 Aminah. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900">Documentation</a>
            <a href="#" className="hover:text-gray-900">GitHub</a>
            <a href="#" className="hover:text-gray-900">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
