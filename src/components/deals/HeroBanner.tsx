'use client'

export function HeroBanner() {
  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-cityscape.jpg"
          alt="Modern cityscape with commercial buildings"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/15"></div>
      </div>
      
      {/* CBRE Logo - using exact same structure as main content */}
      <div className="absolute top-8 right-0 z-10 w-full">
        <div className="w-full px-12 md:px-16 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div></div>
              <div className="lg:pl-8">
                <div className="text-right">
                  <img
                    src="/CBRE_white.svg"
                    alt="CBRE"
                    className="h-6 w-auto inline-block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
            {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-12 md:px-16 lg:px-20 -mt-8">
          {/* Max width container to prevent text from being too far apart */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Capital Markets */}
              <div>
                <h1 className="text-white font-financier text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none">
                  Capital<br />Markets
                </h1>
              </div>
              
              {/* Right Side - Subtitle with line */}
              <div className="lg:pl-8">
                <div className="border-t-[3px] border-white pt-6">
                  <div className="text-white text-right">
                    <div className="text-sm md:text-base font-light mb-2 opacity-80">
                      2018 - 2024
                    </div>
                    <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-financier">
                      Landmark<br />Deals
                    </div>
                    <div className="text-base md:text-lg font-light mt-2 opacity-80">
                      Asia Pacific
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
   )
} 