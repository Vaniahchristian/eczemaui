import { AuthForm } from "@/components/auth/auth-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">EczemaAI</div>
          <div className="space-x-4">
            <Link href="#features">
              <Button variant="ghost">Features</Button>
            </Link>
            <Link href="#about">
              <Button variant="ghost">About</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-8">
            <h1 className="text-5xl font-bold leading-tight">
              Take Control of Your{" "}
              <span className="text-blue-600">Eczema Management</span>
            </h1>
            <p className="text-xl text-gray-600">
              EczemaAI is your personalized assistant for tracking, managing, and understanding your eczema condition. Get insights, track triggers, and make informed decisions about your skin health.
            </p>
          </div>
          <div className="flex-1 max-w-md w-full bg-white rounded-lg shadow-xl p-8">
            <AuthForm />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Smart Tracking"
            description="Track symptoms, triggers, and treatment effectiveness with our intelligent tracking system."
          />
          <FeatureCard
            title="Personalized Insights"
            description="Get AI-powered insights and recommendations based on your unique eczema patterns."
          />
          <FeatureCard
            title="Progress Monitoring"
            description="Visualize your progress and identify trends with detailed analytics and reports."
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-20 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About EczemaAI</h2>
          <p className="text-lg text-gray-600 mb-8">
            EczemaAI combines cutting-edge artificial intelligence with dermatological expertise to provide you with a comprehensive eczema management solution. Our platform is designed to help you understand your condition better and make informed decisions about your skin health.
          </p>
          <Button size="lg">Learn More</Button>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
