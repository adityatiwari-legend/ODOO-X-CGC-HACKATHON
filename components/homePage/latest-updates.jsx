"use client"

import { Zap, Droplet } from "lucide-react"
import { useEffect, useState } from "react"

const outageData = [
  {
    id: 1,
    location: "Himayath Nagar",
    city: "Hyderabad",
    type: "electricity",
    description: "Electricity outage due to regular maintenance between 13:00 and 14:00 hrs.",
    source: "official",
  },
  {
    id: 2,
    location: "Lajpat Nagar",
    city: "Delhi",
    type: "water",
    description: "Water line damaged due to road construction.",
    source: "crowdsourced",
  },
  {
    id: 3,
    location: "Tansen Nagar",
    city: "Gwalior",
    type: "water",
    description: "Water outage due to damage of pipelines during maintenance.",
    source: "official",
  },
  {
    id: 4,
    location: "Whitefield",
    city: "Bengaluru",
    type: "electricity",
    description: "Electricity lines damaged due to heavy rains. ETA ~ 4 hours.",
    source: "crowdsourced",
  },
]

export default function LatestUpdates() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .float-animation {
          animation: float 5s ease-in-out infinite;
        }

        .float-animation:nth-child(2) {
          animation-delay: -1s;
        }

        .float-animation:nth-child(3) {
          animation-delay: -2s;
        }

        .float-animation:nth-child(4) {
          animation-delay: -3s;
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .outage-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: ${mounted ? "1" : "0"};
        }

        .outage-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .electricity-card:hover {
          box-shadow: 0 20px 40px rgba(245, 158, 11, 0.3), 0 0 0 2px rgba(245, 158, 11, 0.5);
        }

        .water-card:hover {
          box-shadow: 0 20px 40px rgba(79, 70, 229, 0.3), 0 0 0 2px rgba(79, 70, 229, 0.5);
        }

        .icon-hover {
          transition: all 0.3s ease;
        }

        .outage-card:hover .icon-hover {
          transform: scale(1.1) rotate(360deg);
          background-color: rgba(255, 255, 255, 0.3);
        }

        .text-hover {
          transition: all 0.2s ease;
        }

        .outage-card:hover .text-hover {
          transform: scale(1.02);
        }

        .description-hover {
          transition: color 0.2s ease;
        }

        .outage-card:hover .description-hover {
          color: rgba(255, 255, 255, 1);
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 float-animation">
          {/* Heading */}
          <div className="lg:col-span-3 text-center lg:text-left flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1F2937]">
              Latest
              <br />
              Updates
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {outageData.map((outage, index) => (
                <div
                  key={outage.id}
                  className={`
                    h-44 sm:h-52 lg:h-56 rounded-2xl sm:rounded-3xl p-4 sm:p-6 relative overflow-hidden cursor-pointer
                    ${outage.type === "electricity" ? "bg-[#F59E0B] electricity-card" : "bg-[#4F46E5] water-card"}
                    text-white outage-card float-animation fade-in-up
                  `}
                  style={{
                    animationDelay: `${index * 0.15}s`,
                  }}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold mb-1 text-hover">
                          {outage.location}, <br />
                          {outage.city}
                        </h3>
                        <div className="mb-2">
                          <span
                            className={`text-xs px-2 py-1 rounded font-medium ${
                              outage.source === "official"
                                ? "bg-white/30 text-white border border-white/40"
                                : "bg-white/20 text-white border border-white/30"
                            }`}
                          >
                            {outage.source === "official" ? "Official" : "Crowdsourced"}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center icon-hover ${
                          outage.type === "electricity" ? "bg-white/20" : "bg-white/20"
                        }`}
                      >
                        {outage.type === "electricity" ? (
                          <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        ) : (
                          <Droplet className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        )}
                      </div>
                    </div>
                    <p className="mt-3 sm:mt-4 text-white/90 description-hover text-sm sm:text-base">
                      {outage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
