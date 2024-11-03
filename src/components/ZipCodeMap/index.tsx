import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';

interface ZipCodeMapProps {
    zipCode: string;
    range: number; // in miles
    height?: number | string;
}

const getZoomLevelForRange = (range: number) => {
    // Adjust the zoom level calculation as needed
    return Math.max(0, 14 - Math.log(range) / Math.LN2);
};

const ZipCodeMap: React.FC<ZipCodeMapProps> = ({
    zipCode,
    range,
    height = 300,
}) => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!zipCode) {
            setLocation(null);
            setLoading(false);
            return;
        }

        const fetchLocation = async () => {
            try {
                const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.places && data.places.length > 0) {
                        const place = data.places[0];
                        if (place.latitude && place.longitude) {
                            const latitude = parseFloat(place.latitude);
                            const longitude = parseFloat(place.longitude);
                            if (!isNaN(latitude) && !isNaN(longitude)) {
                                setLocation({ latitude, longitude });
                            } else {
                                console.error('Invalid latitude or longitude values.');
                                setLocation(null);
                            }
                        } else {
                            console.error('Latitude or longitude missing in API response.');
                            setLocation(null);
                        }
                    } else {
                        console.error('Location data not found for the provided zip code.');
                        setLocation(null);
                    }
                } else {
                    console.error('Failed to fetch location data.');
                    setLocation(null);
                }
            } catch (error) {
                console.error('Error fetching location:', error);
                setLocation(null);
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, [zipCode]);

    if (loading) {
        return (
            // @ts-ignore
            <View style={[styles.loaderContainer, { height }]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!location) {
        return (
            // @ts-ignore
            <View style={[styles.errorContainer, { height }]}>
                <Text>Error: Invalid location data</Text>
            </View>
        );
    }

    const radiusInMeters = range * 1609.34; // Convert miles to meters

    return (
        // @ts-ignore
        <View style={{ height, width: '100%' }}>
            <MapView
                style={{ height: '100%', width: '100%' }}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.1, // Adjust as needed
                    longitudeDelta: 0.1,
                }}
            >
                <Marker coordinate={location} />
                <Circle
                    center={location}
                    radius={radiusInMeters}
                    strokeColor="rgba(0, 128, 0, 0.5)"
                    fillColor="rgba(0, 128, 0, 0.3)"
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ZipCodeMap;
