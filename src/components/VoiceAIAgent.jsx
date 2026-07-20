import React from 'react';
import IllustrationImg from '@/components/IllustrationImg';

const VoiceAIAgent = ({ data }) => {
  // Handle both about data structure (for Bengali) and full data structure
  const heroData = data;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0">
          {/* Large geometric shapes */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-indigo-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-200/25 to-pink-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-blue-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>

          {/* Floating geometric elements */}
          <div className="absolute top-32 right-20 w-4 h-4 bg-indigo-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-64 left-32 w-6 h-6 bg-purple-400 rounded-full opacity-40 animate-bounce" style={{ animationDelay: '3s' }}></div>
          <div className="absolute bottom-32 right-32 w-3 h-3 bg-pink-400 rounded-full opacity-50 animate-bounce" style={{ animationDelay: '5s' }}></div>

          {/* Triangle shapes */}
          <div className="absolute top-40 left-1/4 w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[100px] border-b-indigo-200/20 rotate-45 animate-pulse" style={{ animationDelay: '6s' }}></div>
          <div className="absolute bottom-40 right-1/4 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[60px] border-b-purple-200/15 -rotate-12 animate-pulse" style={{ animationDelay: '8s' }}></div>
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image Section with enhanced design */}
            <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Multiple shadow layers for depth */}
                <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/30 to-purple-600/20 rounded-2xl blur-xl"></div>

                {/* Main image container */}
                <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl"></div>
                  <IllustrationImg
                    preferredSrc={heroData.imageSrc}
                    alt={heroData.imageAlt || 'Voice AI illustration'}
                    width={400}
                    height={400}
                    className="w-full h-auto relative z-10 rounded-2xl"
                  />
                </div>

                {/* Floating accent elements */}
                <div className="absolute top-8 right-8 w-3 h-3 bg-indigo-400 rounded-full opacity-40 animate-ping" style={{ animationDelay: '3s' }}></div>
                <div className="absolute bottom-8 left-8 w-2 h-2 bg-purple-400 rounded-full opacity-50 animate-ping" style={{ animationDelay: '4s' }}></div>
              </div>

              {/* Stats with glassmorphism design */}
              {heroData.stats && (
                <div className="grid grid-cols-3 gap-4 pt-8">
                  {heroData.stats.map((stat, index) => (
                    <div key={index} className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                        <div className="text-3xl  bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                          {stat.value}
                        </div>
                        <div className="text-sm  text-gray-800 mb-1">{stat.label}</div>
                        <div className="text-xs text-gray-600">{stat.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="space-y-8">
              {/* Main Title with gradient text */}
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-indigo-100/80 backdrop-blur-sm rounded-full text-sm  text-indigo-700 border border-indigo-200/50">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
                  AI-Powered Voice Technology
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
                    {heroData.title}
                  </span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  {heroData.description}
                </p>
              </div>

              {/* Features List with modern design */}
              {heroData.features && (
                <div className="space-y-4">
                  <h3 className="text-lg  text-gray-800 mb-4">Key Features</h3>
                  <div className="space-y-3">
                    {heroData.features.map((feature, index) => (
                      <div key={index} className="group flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-300">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed flex-1">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="w-full h-24 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>
    </div>
  );
};

export default VoiceAIAgent;
