import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BlurView } from 'expo-blur';
import { View, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import Slider from '@react-native-community/slider';
import { configAudio } from './config';
import { COLORS } from 'constants/theme';

type PlayButtonProps = {
    url: string;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
};

const PlayButton: React.FC<PlayButtonProps> = ({ url, isPlaying, setIsPlaying }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [fileUri, setFileUri] = useState<string>('');
    const [status, setStatus] = useState<string>('Stopped');
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [downloadProgress, setDownloadProgress] = useState<number>(0);
    const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0); // Playback speed state
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const configureAudio = async () => {
            await Audio.setAudioModeAsync(configAudio);
        };
        configureAudio();
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [sound]);

    useEffect(() => {
        if (isPlaying && sound) {
            intervalRef.current = setInterval(() => {
                sound.getStatusAsync().then(status => {
                    // @ts-ignore
                    setElapsedTime(status.positionMillis || 0);setDuration(status.durationMillis || 0);
                });
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [isPlaying, sound]);

    useEffect(() => {
        const downloadAndSetSound = async () => {
            try {
                setIsLoading(true);
                const fileName = url.split('/').pop() ?? 'audio.mp3';
                const fileUri = `${FileSystem.documentDirectory}${fileName}`;
                const fileInfo = await FileSystem.getInfoAsync(fileUri);

                if (!fileInfo.exists) {
                    const downloadResumable = FileSystem.createDownloadResumable(
                        url,
                        fileUri,
                        {},
                        ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
                            const progress = totalBytesWritten / totalBytesExpectedToWrite;
                            setDownloadProgress(progress);
                        }
                    );
                    // @ts-ignore
                    const { uri: localUri } = await downloadResumable.downloadAsync();
                    setFileUri(localUri);
                } else {
                    setFileUri(fileUri);
                }

                if (sound) {
                    sound.unloadAsync();
                }
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: fileUri },
                    { shouldPlay: true, rate: playbackSpeed }
                );
                setSound(newSound);
                setIsPlaying(true);
                setStatus('Playing');
                // @ts-ignore
                newSound.setOnPlaybackStatusUpdate(status => {
                    // @ts-ignore
                    if (status.didJustFinish) {
                        setIsPlaying(false);
                        setStatus('Stopped');
                        setElapsedTime(0);
                        // @ts-ignore
                        clearInterval(intervalRef.current);
                    }
                });
            } catch (error) {
                console.error('Failed to load sound:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (url) {
            downloadAndSetSound();
        }

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
            setFileUri('');
            setDownloadProgress(0);
            // @ts-ignore
            clearInterval(intervalRef.current);
        };
    }, [url]);

    const handlePlayPausePress = useCallback(async () => {
        if (sound) {
            try {
                if (isPlaying) {
                    await sound.pauseAsync();
                    setIsPlaying(false);
                    setStatus('Paused');
                } else {
                    await sound.playAsync();
                    setIsPlaying(true);
                    setStatus('Playing');
                }
            } catch (error) {
                console.error('Error with playback:', error);
            }
        }
    }, [isPlaying, sound]);

    const handleSeek = useCallback(async (seconds: number) => {
        if (sound) {
            const newTime = elapsedTime + seconds * 1000;
            await sound.setPositionAsync(newTime);
        }
    }, [elapsedTime, sound]);

    const handleSliderValueChange = async (value: number) => {
        if (sound) {
            await sound.setPositionAsync(value);
        }
    };

    const handleSpeedChange = async (speed: number) => {
        if (sound) {
            setPlaybackSpeed(speed);
            await sound.setRateAsync(speed, true);
        }
    };

    const formatElapsedTime = (milliseconds: number): string => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View style={styles.container}>
            <BlurView intensity={50} style={styles.blurView}>
                <View style={styles.innerContainer}>
                    <View style={styles.timeContainer}>
                        <Text style={styles.elapsedTime}>
                            {formatElapsedTime(elapsedTime)}
                        </Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0}
                            maximumValue={duration}
                            value={elapsedTime}
                            onSlidingComplete={handleSliderValueChange}
                            minimumTrackTintColor={'white'}
                            maximumTrackTintColor={`${COLORS.primary}20`}
                            thumbTintColor={'white'}
                        />
                        <Text style={styles.elapsedTime}>
                            {formatElapsedTime(duration)}
                        </Text>
                    </View>
                    <View className='flex-row px-3  justify-between items-center'>

                        <View className='w-8 h-8 rounded-full '/>
                        <View style={styles.controlsContainer}>
                            <TouchableOpacity
                                onPress={() => handleSeek(-15)}
                                style={styles.seekButton}>
                                <AntDesign name="banckward" size={24} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePlayPausePress} style={styles.button}>
                                {isLoading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <AntDesign name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleSeek(15)}
                                style={styles.seekButton}>
                                <AntDesign name="forward" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => handleSpeedChange(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)} className='bg-black/20 w-8 h-8 rounded-full justify-center items-center'>
                                <Text className='text-yellow-400'>{playbackSpeed}×</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {isLoading && (
                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBar, { width: `${downloadProgress * 100}%` }]} />
                        </View>
                    )}
                </View>
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        borderRadius: 10,
    },
    blurView: {
        height: 110, // Increased height to accommodate speed controls
        borderRadius: 10,
    },
    innerContainer: {
        flex: 1,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    elapsedTime: {
        fontSize: 14,
        color: 'white',
    },
    slider: {
        flex: 1,
        height: 40,
        marginHorizontal: 10,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    button: {
        elevation: 5,
        padding: 10,
        marginHorizontal: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 50,
    },
    seekButton: {
        borderRadius: 50,
        padding: 10,
        marginHorizontal: 10,
    },
    speedContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    speedButton: {
        padding: 5,
        marginHorizontal: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
    },
    speedText: {
        color: 'white',
    },
    selectedSpeedText: {
        color: 'yellow',
        fontWeight: 'bold',
    },
    progressBarContainer: {
        height: 2,
        backgroundColor: `${COLORS.primary}20`,
        borderRadius: 2,
        overflow: 'hidden',
        marginTop: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: COLORS.primary,
    },
});

export default PlayButton;
