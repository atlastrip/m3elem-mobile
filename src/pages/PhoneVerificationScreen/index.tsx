import ConfirmPhoneCode from '@/components/ConfirmPhoneCode'
import VerificationScreens from '@/components/VerifyNumber'
import React from 'react'
import { View } from 'react-native'

const PhoneVerificationScreen = ({ navigation }: any) => {
    return (
        <View
            style={{ flex: 1 }}
        >

            <VerificationScreens
            />
        </View>
    )
}

export default PhoneVerificationScreen 