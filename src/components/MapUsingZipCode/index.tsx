import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { WebView } from 'react-native-webview';

// If you're using TypeScript, you can define the prop types as follows:
// interface MapComponentProps {
//   zipCode: string;
// }

// const MapComponent: React.FC<MapComponentProps> = ({ zipCode }) => {

const MapComponent = ({ zipCode }:any) => {
  // Ensure zipCode is provided
  console.log(zipCode);
  
  if (!zipCode) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>No ZIP Code provided.</Text>
      </View>
    );
  }

  // Properly construct the Google Maps URL
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    zipCode
  )}&output=embed`;

  // Complete HTML structure for the WebView
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
        <style>
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
          }
          iframe {
            border: 0;
            height: 100%;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <iframe
          src="${mapUrl}"
          allowfullscreen
          loading="lazy">
        </iframe>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        // Optional: Add additional props as needed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200, // Adjust height as needed
    width: Dimensions.get('window').width, // Full width
  },
  webview: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapComponent;
