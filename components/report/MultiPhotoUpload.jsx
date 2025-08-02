import React, { useState } from "react";
import clsx from "clsx";

export default function MultiPhotoUpload({ photos = [], onChange, onRemove, maxPhotos = 5 }) {
  const [dragActive, setDragActive] = useState(false);
  
  console.log("MultiPhotoUpload rendered with photos:", photos);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleFileSelect = (files) => {
    const remainingSlots = maxPhotos - photos.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);
    
    filesToAdd.forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        // File too large - could add toast notification here
        return;
      }
      onChange(file);
    });
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFileSelect(e.target.files);
      e.target.value = ''; // Reset input
    }
  };

  const PhotoPreview = ({ photo, index }) => (
    <div className="relative group">
      <div className="w-full h-24 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
        <img
          src={URL.createObjectURL(photo)}
          alt={`Preview ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ×
      </button>
      <p className="text-xs text-gray-500 mt-1 truncate">{photo.name}</p>
    </div>
  );

  const EmptySlot = () => (
    <div className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </div>
  );

  return (
    <div>
      <h3 className="text-lg font-semibold text-[#1F2937] mb-3">
        Upload Photos 
        <span className="text-gray-500 text-base ml-2">
          (optional, up to {maxPhotos} photos)
        </span>
      </h3>
      
      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
        {photos.map((photo, index) => (
          <PhotoPreview key={index} photo={photo} index={index} />
        ))}
        {Array.from({ length: maxPhotos - photos.length }).map((_, index) => (
          <EmptySlot key={`empty-${index}`} />
        ))}
      </div>

      {/* Upload Area */}
      {photos.length < maxPhotos && (
        <div
          className={clsx(
            "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
            dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300",
            "hover:border-gray-400"
          )}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
        >
          <input
            type="file"
            id="photos"
            name="photos"
            accept="image/*"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
          <label htmlFor="photos" className="cursor-pointer w-full h-full block">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center h-12 mb-3">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                {dragActive ? "Drop photos here" : "Click to upload or drag photos here"}
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB each • {photos.length}/{maxPhotos} photos
              </p>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}
