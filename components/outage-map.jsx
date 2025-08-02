'use client';

import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const containerStyle = {
  width: '100%',
  height: '500px',
};

export default function OutageMap({ city }) {
  const [outages, setOutages] = useState([]);
  const [center, setCenter] = useState({ lat: 28.6139, lng: 77.209 }); // Default to Delhi
  const [selectedOutage, setSelectedOutage] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  
  // Check if API key exists
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  // Log environment check for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Google Maps API Key available:', !!apiKey);
      console.log('Environment:', process.env.NODE_ENV);
    }
  }, [apiKey]);

  useEffect(() => {
    const fetchOutages = async () => {
      try {
        setError(null);
        const outagesRef = collection(db, 'outageReports');
        let querySnapshot;
        
        if (city && city.trim()) {
          // Filter by city if provided
          const cityQuery = query(
            outagesRef,
            where('city', '==', city.trim())
          );
          querySnapshot = await getDocs(cityQuery);
        } else {
          // Fetch all outages if no city specified
          querySnapshot = await getDocs(outagesRef);
        }
        
        const outageData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            lat: parseFloat(data.lat) || parseFloat(data.latitude),
            lng: parseFloat(data.lng) || parseFloat(data.longitude),
          };
        }).filter(outage => !isNaN(outage.lat) && !isNaN(outage.lng));
        
        setOutages(outageData);
        
        if (outageData.length > 0) {
          setCenter({ lat: outageData[0].lat, lng: outageData[0].lng });
        }
      } catch (error) {
        console.error('Error fetching outages:', error);
        setError('Failed to load outage data. Please check your connection.');
      }
    };
    
    fetchOutages();
  }, [city]);

  // Handle API key missing
  if (!apiKey) {
    return (
      <div className="w-full h-full p-4 bg-white rounded-2xl shadow-2xl">
        <div className="flex items-center justify-center h-[500px] bg-gray-100 rounded-2xl">
          <div className="text-center text-red-600">
            <p className="text-lg font-semibold">Map Configuration Error</p>
            <p className="mt-2">Google Maps API key is not configured.</p>
            <p className="mt-1 text-sm">Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to environment variables.</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle load error
  if (loadError) {
    return (
      <div className="w-full h-full p-4 bg-white rounded-2xl shadow-2xl">
        <div className="flex items-center justify-center h-[500px] bg-gray-100 rounded-2xl">
          <div className="text-center text-red-600">
            <p className="text-lg font-semibold">Map Loading Error</p>
            <p className="mt-2">Failed to load Google Maps.</p>
            <p className="mt-1 text-sm">Please check your internet connection and API key.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle loading state
  if (!isLoaded) {
    return (
      <div className="w-full h-full p-4 bg-white rounded-2xl shadow-2xl">
        <div className="flex items-center justify-center h-[500px] bg-gray-100 rounded-2xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading Map...</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle Firebase error
  if (error) {
    return (
      <div className="w-full h-full p-4 bg-white rounded-2xl shadow-2xl">
        <div className="flex items-center justify-center h-[500px] bg-gray-100 rounded-2xl">
          <div className="text-center text-red-600">
            <p className="text-lg font-semibold">Data Error</p>
            <p className="mt-2">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Custom marker colors based on outage type
  const getMarkerIcon = (type) => {
    const color = type === 'electricity' ? '#FFD700' : '#00B4D8'; // golden yellow for electricity, aqua blue for water
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" fill="${color}" stroke="white" stroke-width="3"/>
        </svg>
      `)}`,
      scaledSize: new window.google.maps.Size(32, 32),
    };
  };

  const mapOptions = {
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#D3D3D3' }] }, // lighter mid grey
      { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#424242' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#D3D3D3' }] },
      { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#E0E0E0' }] },
      { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#E0E0E0' }] },
      { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
      { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#F5F5F5' }] },
      { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#BDBDBD' }] },
      { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
      { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#E0E0E0' }] },
      { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#BDBDBD' }] },
      { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
      { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#E0E0E0' }] },
      { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#B0B0B0' }] },
      { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] }
    ],
    disableDefaultUI: false,
    zoomControl: true,
    fullscreenControl: true,
    mapTypeControl: false,
    streetViewControl: false, // Remove Pegman (Street View)
    tilt: 45,
    heading: 45,
    mapTypeId: 'roadmap',
  };

  return (
    <div className="w-full h-full p-4 bg-white rounded-2xl shadow-2xl">
      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={city ? 12 : 10}
          options={{ ...mapOptions, mapTypeId: 'roadmap' }}
          onLoad={map => {
            mapRef.current = map;
            map.setTilt(45);
            map.setHeading(45);
          }}
        >
          {outages.map(outage => (
            <Marker
              key={outage.id}
              position={{ lat: outage.lat, lng: outage.lng }}
              title={`${outage.locality} - ${outage.type} outage`}
              icon={getMarkerIcon(outage.type)}
              animation={window.google?.maps?.Animation.DROP}
              onClick={() => setSelectedOutage(outage)}
            />
          ))}
          {selectedOutage && (
            <InfoWindow
              position={{ lat: selectedOutage.lat, lng: selectedOutage.lng }}
              onCloseClick={() => setSelectedOutage(null)}
            >
              <div className="p-2 min-w-[180px]">
                <h3 className="font-semibold text-sm text-gray-900 mb-1">{selectedOutage.locality}</h3>
                <p className="text-xs text-gray-700">{selectedOutage.city}</p>
                <p className="text-xs mt-1">
                  <strong>Type:</strong> {selectedOutage.type}
                </p>
                <p className="text-xs">
                  <strong>Description:</strong> {selectedOutage.description}
                </p>
                <p className="text-xs">
                  <strong>Source:</strong> {selectedOutage.source}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(selectedOutage.timestamp).toLocaleDateString()}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}