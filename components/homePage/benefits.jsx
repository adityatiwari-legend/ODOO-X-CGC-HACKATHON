"use client"

import Image from "next/image"

const benefits = [
  {
    title: "Real-Time Alerts",
    description: "Get instant notifications via WhatsApp, email, or browser when outages occur in your area.",
    image: "/images/real-time-alert.png",
    alt: "Smartphone with WhatsApp notification showing real-time alerts",
  },
  {
    title: "Plan Ahead",
    description: "View scheduled maintenance and prepare for planned power or water cuts in advance.",
    image: "/images/plan-ahead.png",
    alt: "Person with flashlight and emergency supplies for planning ahead",
  },
  {
    title: "Smart Predictions",
    description: "AI-powered estimates help you know restoration times and plan accordingly.",
    image: "/images/smart-prediction.png",
    alt: "Calendar, clock and light bulbs representing smart predictions",
  },
]

export default function Benefits() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2937] text-center mb-12 sm:mb-16">
          Benefits
        </h2>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="h-72 sm:h-80 lg:h-84">
              <div className="bg-gradient-to-b from-[#E5E7EB] to-[#F3F4F6] rounded-t-2xl sm:rounded-t-3xl h-44 sm:h-48 lg:h-52 flex items-center justify-center p-2">
                <div className="relative w-full h-full">
                  <Image
                    src={benefit.image || "/placeholder.svg"}
                    alt={benefit.alt}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="bg-gradient-to-b from-[#6366F1] to-[#4F46E5] rounded-b-2xl sm:rounded-b-3xl p-4 sm:p-6 text-white h-28 sm:h-32 flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{benefit.title}</h3>
                <p className="text-white/90 leading-relaxed text-sm sm:text-base">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
