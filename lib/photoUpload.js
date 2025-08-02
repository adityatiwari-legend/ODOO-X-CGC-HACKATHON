import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase/firebase';

// Add a simple test to ensure storage is properly initialized
console.log("Firebase Storage initialized:", !!storage);
console.log("Storage app:", storage?.app?.name);

/**
 * Upload multiple photos to Firebase Storage
 * @param {File[]} photos - Array of photo files to upload
 * @param {string} reportId - Unique identifier for the report
 * @param {boolean} isAnonymous - Whether the report is anonymous
 * @returns {Promise<string[]>} Array of download URLs
 */
export async function uploadPhotosToStorage(photos, reportId, isAnonymous = false) {
  console.log("=== PHOTO UPLOAD START ===");
  console.log("uploadPhotosToStorage called with:", { photos, reportId, isAnonymous });
  console.log("Storage object:", storage);
  
  if (!photos || photos.length === 0) {
    console.log("No photos to upload");
    return [];
  }

  // Validate Firebase Storage is available
  if (!storage) {
    console.error("Firebase Storage not initialized!");
    throw new Error("Firebase Storage not available");
  }

  console.log(`Starting upload of ${photos.length} photos...`);

  const uploadPromises = Array.from(photos).map(async (photo, index) => {
    try {
      console.log(`Processing photo ${index + 1}:`, {
        name: photo.name,
        size: photo.size,
        type: photo.type
      });
      
      // Validate file
      if (!photo || !photo.name) {
        throw new Error(`Invalid photo at index ${index}`);
      }
      
      // Create a unique filename
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const fileExtension = photo.name.split('.').pop() || 'jpg';
      const fileName = isAnonymous 
        ? `anonymous_${reportId}_${index}_${timestamp}_${randomSuffix}.${fileExtension}`
        : `${reportId}_${index}_${timestamp}_${randomSuffix}.${fileExtension}`;
      
      console.log(`Generated filename: ${fileName}`);
      
      // Create a reference to the storage location
      const storageRef = ref(storage, `outage-reports/${fileName}`);
      console.log("Storage reference created:", storageRef.fullPath);
      
      // Upload the file
      console.log(`Starting upload to Firebase Storage for photo ${index + 1}...`);
      const snapshot = await uploadBytes(storageRef, photo);
      console.log(`Upload completed for photo ${index + 1}, getting download URL...`);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log(`Download URL obtained for photo ${index + 1}:`, downloadURL);
      
      return {
        url: downloadURL,
        fileName: fileName,
        originalName: photo.name,
        size: photo.size,
        type: photo.type
      };
    } catch (error) {
      console.error(`Error uploading photo ${index}:`, error);
      throw new Error(`Failed to upload photo: ${photo.name}`);
    }
  });

  try {
    const uploadResults = await Promise.all(uploadPromises);
    return uploadResults;
  } catch (error) {
    console.error('Error uploading photos:', error);
    throw error;
  }
}

/**
 * Upload a single photo to Firebase Storage
 * @param {File} photo - Photo file to upload
 * @param {string} reportId - Unique identifier for the report
 * @param {boolean} isAnonymous - Whether the report is anonymous
 * @returns {Promise<Object>} Upload result with URL and metadata
 */
export async function uploadSinglePhoto(photo, reportId, isAnonymous = false) {
  const results = await uploadPhotosToStorage([photo], reportId, isAnonymous);
  return results[0];
}

/**
 * Test Firebase Storage connection
 * @returns {Promise<boolean>} True if storage is working
 */
export async function testFirebaseStorage() {
  try {
    console.log("Testing Firebase Storage connection...");
    
    // Create a simple test file
    const testContent = new Blob(['test'], { type: 'text/plain' });
    const testRef = ref(storage, 'test/connection-test.txt');
    
    // Try to upload
    await uploadBytes(testRef, testContent);
    console.log("Test upload successful");
    
    // Try to get download URL
    const url = await getDownloadURL(testRef);
    console.log("Test download URL:", url);
    
    return true;
  } catch (error) {
    console.error("Firebase Storage test failed:", error);
    return false;
  }
}

/**
 * Simple photo upload test function
 */
export async function testPhotoUpload(file) {
  try {
    console.log("Testing photo upload with file:", file);
    const storageRef = ref(storage, `test-uploads/test_${Date.now()}.jpg`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    console.log("Test upload successful:", url);
    return url;
  } catch (error) {
    console.error("Test upload failed:", error);
    throw error;
  }
}

/**
 * Generate a unique report ID
 * @returns {string} Unique report ID
 */
export function generateReportId() {
  return `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
