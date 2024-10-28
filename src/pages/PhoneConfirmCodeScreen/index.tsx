import ConfirmPhoneCode from '@/components/ConfirmPhoneCode'
import VerificationScreens from '@/components/VerifyNumber'
import React from 'react'
import { View } from 'react-native'

const PhoneConfirmCodeScreen = ({ navigation }: any) => {
    return (
        <View
            style={{ flex: 1 }}
        >

           
            <ConfirmPhoneCode />
        </View>
    )
}

export default PhoneConfirmCodeScreen 