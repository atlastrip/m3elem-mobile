import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import type { FC } from 'react';
import tw from 'twrnc'

interface TextApp {
    className:string;
    style?:any;
    children:any
}

export const TextApp:FC<TextApp> = ({className , style , children}) => {
  return (
    <View>
      <Text
      style={{
        ...style,
        ...tw`${className}`
      }}
      >{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

TextApp.defaultProps = {
  style:{}
}