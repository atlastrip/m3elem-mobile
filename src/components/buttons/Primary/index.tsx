import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { COLORS } from '../../../constants/theme';

interface Props {
    setLoading?: (value: React.SetStateAction<boolean>) => void
    onPress? : any
    Loading? : boolean
    text? : string
    isOutlined? : boolean
    className? : string
}

export const ButtonPrimary:FC<Props> = ({setLoading ,onPress , Loading , text , isOutlined = false , className = ''}) => {
  return (
    <TouchableOpacity
          style={{
            backgroundColor: isOutlined ? 'transparent' :  COLORS.primary,
            borderColor : !isOutlined ? 'transparent' :  COLORS.primary,
            height : 60
          }}
          onPress={() => {
            setLoading((v: any)  => !v);
            onPress()
          }}
          
          className={`rounded-full items-center justify-center z-50 border ${className}`}
        >
          {Loading ? (
            <ActivityIndicator size={24} />
          ) : (
            <Text
            style={{
              fontSize: 18,
            }}
            className="text-white font-medium text-center ">
              {text}
            </Text>
          )}
        </TouchableOpacity>
  )
}



const styles = StyleSheet.create({})