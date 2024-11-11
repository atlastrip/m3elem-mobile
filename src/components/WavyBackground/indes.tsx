import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { createNoise3D } from 'simplex-noise';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const WavyBackground = ({
  children = <></>,
  colors = ['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee'],
  waveWidth = 50,
  backgroundFill = 'black',
  blur = 10,
  speed = 'fast',
  waveOpacity = 0.5,
}) => {
  const noise = createNoise3D();
  const nt = useRef<any>(new Animated.Value(0)).current;
  const wavePaths = useRef<any>([]);
  
  const getSpeed = () => {
    switch (speed) {
      case 'slow':
        return 0.001;
      case 'fast':
        return 0.002;
      default:
        return 0.001;
    }
  };

  const drawWavePath = (index : any) => {
    const w = screenWidth;
    let path = `M0,${screenHeight / 2}`;
    for (let x = 0; x < w; x += 5) {
      const y = noise(x / 800, 0.3 * index, nt._value) * 100;
      path += ` L${x},${y + screenHeight * 0.5}`;
    }
    path += ` L${w},${screenHeight} L0,${screenHeight} Z`;
    return path;
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(nt, {
        toValue: 1,
        duration: getSpeed() * 100000, // Adjust duration to control speed
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  useEffect(() => {
    wavePaths.current = colors.map((_, index) => drawWavePath(index));
  }, [nt]);

  return (
    <View style={{ flex: 1, backgroundColor: backgroundFill }}>
      <Svg height={screenHeight} width={screenWidth} style={{ position: 'absolute' }}>
        {colors.map((color, index) => (
          <Path
            key={index}
            d={wavePaths.current[index]}
            fill={color}
            opacity={waveOpacity}
            strokeWidth={waveWidth}
            stroke={color}
          />
        ))}
      </Svg>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </View>
    </View>
  );
};
