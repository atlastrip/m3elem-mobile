import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { HelperText, ActivityIndicator } from 'react-native-paper';

export default function ZipCodeForm() {
  const [zipCode, setZipCode] = useState("");
  const [location, setLocation] = useState<null | { city: string, state: string }>(null);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch city and state based on zip code
  const fetchLocation = async (zip: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
      if (!response.ok) {
        throw new Error("Invalid zip code");
      }
      const data = await response.json();
      const city = data.places[0]["place name"];
      const state = data.places[0]["state abbreviation"];
      setLocation({ city, state });
      setError(null);
    } catch (err: any) {
      setLocation(null);
      setError(err?.message as string);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change and validate zip code
  const handleZipCodeChange = (zip: string) => {
    setZipCode(zip);

    // Call API when the zip code is 5 digits long
    if (zip.length === 5) {
      fetchLocation(zip);
    } else {
      setLocation(null);
      setError(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Zip code</Text>
      <TextInput
        keyboardType="numeric"
        value={zipCode}
        onChangeText={handleZipCodeChange}
        placeholder="00000"
        maxLength={5}
        style={styles.input}
      />

      {loading && <ActivityIndicator size="small" style={styles.loader} />}

      {location && (
        <Text style={styles.locationText}>
          {location.city}, <Text style={styles.stateText}>{location.state}</Text>
        </Text>
      )}

      {error && (
        <HelperText type="error" visible={true} style={styles.errorText}>
          {error}
        </HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  loader: {
    marginTop: 8,
  },
  locationText: {
    marginTop: 8,
    color: 'green',
    fontSize: 14,
  },
  stateText: {
    fontWeight: 'bold',
  },
  errorText: {
    marginTop: 8,
    color: 'red',
    fontSize: 12,
  },
});
