export const configAudio = {
    allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,  // This allows audio to play even when silent mode is on
        shouldDuckAndroid: false,
      //   interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
}