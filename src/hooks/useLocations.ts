import { useState, useEffect } from 'react';

const locationCache: { [zip: string]: string } = {};

export const useLocation = (zipCode: string) => {
  const [location, setLocation] = useState("Loading location...");

  useEffect(() => {
    const fetchLocation = async () => {
      if (locationCache[zipCode]) {
        setLocation(locationCache[zipCode]);
        return;
      }

      try {
        const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
        if (!response.ok) {
          throw new Error("Invalid zip code");
        }
        const data = await response.json();
        const city = data.places[0]["place name"];
        const state = data.places[0]["state abbreviation"];
        const newLocation = `${city}, ${state}`;
        locationCache[zipCode] = newLocation;
        setLocation(newLocation);
      } catch (err) {
        setLocation("Unknown location");
      }
    };

    fetchLocation();
  }, [zipCode]);

  return location;
};

