import React from "react";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

export default function TitleInput({ value, onChange, error }) {
  console.log("TitleInput rendered with value:", value);
  return (
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-[#1F2937] mb-2">
        Issue Title <span className="text-red-500">*</span>
      </label>
      <Input
        id="title"
        name="title"
        placeholder="Brief title describing the issue (e.g., 'Power outage in downtown area')"
        value={value}
        onChange={onChange}
        className={clsx(
          "border-2 outline-none focus:border-[#4F46E5] focus:ring-0",
          error ? "border-red-500 bg-red-50" : "border-gray-300"
        )}
        maxLength={100}
      />
      <div className="flex justify-between items-center mt-1">
        {error && (
          <p className="text-red-500 text-sm flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        <span className="text-xs text-gray-500 ml-auto">
          {value.length}/100
        </span>
      </div>
    </div>
  );
}
