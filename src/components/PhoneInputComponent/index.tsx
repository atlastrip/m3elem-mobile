import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PhoneInput from 'react-native-international-phone-number';

const PhoneInputComponent = () => {
    const [selectedCountry, setSelectedCountry]: any = useState(null);
    const [inputValue, setInputValue]: any = useState('');

    function handleInputValue(phoneNumber: any) {
        setInputValue(phoneNumber);
    }

    function handleSelectedCountry(country: any) {
        // setSelectedCountry(country);
    }

    return (
        <View style={{ width: '100%', flex: 1 }}>
            <PhoneInput
                value={inputValue}
                onChangePhoneNumber={handleInputValue}
                selectedCountry={selectedCountry}
                // defaultCountry=''

                dataDetectorTypes={['phoneNumber']}
                onChangeSelectedCountry={handleSelectedCountry}
                // let just us the default flag
                // excludedCountries={['US']}
                // all countries are excluded except US
/>

        </View>
    );
}

export default PhoneInputComponent;