import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      {/* We can add more sections here later, like Features, Testimonials, etc. */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why choose VoyageAI?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Experience the future of travel planning with our intelligent features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-8">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30">
                <span className="text-blue-400 text-xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Smart Itineraries</h3>
              <p className="text-slate-400">
                AI-generated travel plans tailored to your preferences, budget, and schedule.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-card p-8">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                <span className="text-emerald-400 text-xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Budget Tracking</h3>
              <p className="text-slate-400">
                Keep your expenses in check with visual charts and AI-driven cost estimations.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="glass-card p-8">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
                <span className="text-purple-400 text-xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Interactive Exploration</h3>
              <p className="text-slate-400">
                Discover new destinations with curated guides and immersive local insights.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
