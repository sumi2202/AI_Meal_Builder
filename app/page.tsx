export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-green-600 mb-4">
            Healthy AI Meal Planner
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-2">
            Personalized PCOS & Diabetes-Friendly Meals
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chat with your AI nutrition expert to discover anti-inflammatory meal plans tailored to your health goals
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
          {/* Build a Meal Plan Card */}
          <a
            href="/chat"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-8 border-2 border-transparent hover:border-purple-300"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-linear-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl">
                💬
              </div>
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                Build a Meal Plan
              </h2>
              <p className="text-gray-600 text-center">
                Chat with our AI expert to create personalized meal suggestions with detailed nutrition info
              </p>
              <div className="pt-4 text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                Start Planning →
              </div>
            </div>
          </a>

          {/* View Saved Plans Card */}
          <a
            href="/saved"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-8 border-2 border-transparent hover:border-green-300"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl">
                📋
              </div>
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                View Saved Plans
              </h2>
              <p className="text-gray-600 text-center">
                Browse through your previously created meal plans and manage your favorites
              </p>
              <div className="pt-4 text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                View Plans →
              </div>
            </div>
          </a>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="text-center">
            <div className="text-4xl mb-3">🥗</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">PCOS Friendly</h3>
            <p className="text-gray-600">
              Meals designed specifically for PCOS management and hormone balance
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Macro Tracking</h3>
            <p className="text-gray-600">
              Complete macronutrient breakdowns for every meal recommendation
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Expert</h3>
            <p className="text-gray-600">
              Powered by advanced AI nutrition expertise for personalized guidance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
