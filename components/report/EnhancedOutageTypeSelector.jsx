import React from "react";
import clsx from "clsx";

const categories = [
  { 
    id: "electricity", 
    label: "Electricity", 
    description: "Power outage or electrical issues",
    color: "amber",
    icon: "⚡"
  },
  { 
    id: "water", 
    label: "Water", 
    description: "Water supply issues",
    color: "blue",
    icon: "💧"
  },
  { 
    id: "internet", 
    label: "Internet/Telecom", 
    description: "Internet or phone service issues",
    color: "green",
    icon: "📡"
  },
  { 
    id: "gas", 
    label: "Gas", 
    description: "Gas supply or pipeline issues",
    color: "red",
    icon: "🔥"
  },
  { 
    id: "transport", 
    label: "Transportation", 
    description: "Public transport or traffic issues",
    color: "purple",
    icon: "🚌"
  },
  { 
    id: "other", 
    label: "Other", 
    description: "Other infrastructure issues",
    color: "gray",
    icon: "🏗️"
  }
];

const colorMap = {
  amber: { border: "border-[#F59E0B]", bg: "bg-[#F59E0B]/10", radio: "border-[#F59E0B]", dot: "bg-[#F59E0B]" },
  blue: { border: "border-[#3B82F6]", bg: "bg-[#3B82F6]/10", radio: "border-[#3B82F6]", dot: "bg-[#3B82F6]" },
  green: { border: "border-[#10B981]", bg: "bg-[#10B981]/10", radio: "border-[#10B981]", dot: "bg-[#10B981]" },
  red: { border: "border-[#EF4444]", bg: "bg-[#EF4444]/10", radio: "border-[#EF4444]", dot: "bg-[#EF4444]" },
  purple: { border: "border-[#8B5CF6]", bg: "bg-[#8B5CF6]/10", radio: "border-[#8B5CF6]", dot: "bg-[#8B5CF6]" },
  gray: { border: "border-[#6B7280]", bg: "bg-[#6B7280]/10", radio: "border-[#6B7280]", dot: "bg-[#6B7280]" }
};

export default function EnhancedOutageTypeSelector({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#1F2937] mb-3">
        Category <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((category) => {
          const isSelected = value === category.id;
          const colors = colorMap[category.color];
          
          return (
            <div
              key={category.id}
              className={clsx(
                "border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
                isSelected
                  ? `${colors.border} ${colors.bg} shadow-sm`
                  : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => onChange(category.id)}
            >
              <div className="flex items-start">
                <div
                  className={clsx(
                    "w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center mt-0.5 flex-shrink-0",
                    isSelected ? colors.radio : "border-gray-400"
                  )}
                >
                  {isSelected && <div className={`w-3 h-3 rounded-full ${colors.dot}`} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="text-lg mr-2">{category.icon}</span>
                    <p className="font-medium text-gray-900">{category.label}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{category.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
