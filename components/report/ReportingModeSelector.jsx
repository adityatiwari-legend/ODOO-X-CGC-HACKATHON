import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";

export default function ReportingModeSelector({ isAnonymous, onChange, isAuthenticated }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#1F2937] mb-3">
        Reporting Mode
      </label>
      
      <div className="space-y-3">
        {/* Verified Reporting */}
        <Card 
          className={clsx(
            "cursor-pointer transition-all duration-200 border-2",
            !isAnonymous 
              ? "border-green-500 bg-green-50 shadow-sm" 
              : "border-gray-200 hover:border-gray-300"
          )}
          onClick={() => onChange(false)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={clsx(
                    "w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center",
                    !isAnonymous ? "border-green-500" : "border-gray-400"
                  )}
                >
                  {!isAnonymous && <div className="w-3 h-3 rounded-full bg-green-500" />}
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    <h4 className="font-medium text-gray-900">Verified Report</h4>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Report with your account - builds credibility and helps track updates
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Anonymous Reporting */}
        <Card 
          className={clsx(
            "cursor-pointer transition-all duration-200 border-2",
            isAnonymous 
              ? "border-blue-500 bg-blue-50 shadow-sm" 
              : "border-gray-200 hover:border-gray-300"
          )}
          onClick={() => onChange(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={clsx(
                    "w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center",
                    isAnonymous ? "border-blue-500" : "border-gray-400"
                  )}
                >
                  {isAnonymous && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-blue-600 mr-2">🔒</span>
                    <h4 className="font-medium text-gray-900">Anonymous Report</h4>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Report without revealing your identity - completely private
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info about reporting modes */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">About reporting modes:</p>
            <ul className="space-y-1 text-xs">
              <li>• <strong>Verified reports</strong> are linked to your account and help build community trust</li>
              <li>• <strong>Anonymous reports</strong> protect your privacy but may have lower visibility</li>
              <li>• Both types contribute to outage tracking and community awareness</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
