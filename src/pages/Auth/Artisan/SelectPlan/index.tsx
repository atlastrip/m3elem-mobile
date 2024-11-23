import { SHADOWS } from 'constants/theme';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getToken, getUser } from '@/helpers/getToken';


const SelectPlan = ({ navigation }: any) => {

    const [session, setSession] = useState<any>();
    const [Token, setToken] = useState<any>();

    const handleGetUserAndToken = async () => {
        const token = await getToken()
        const user: any = await getUser();
        console.log('session', user.id);
        setSession(user)
        console.log('====================================');
        console.log('token', token);
        console.log('====================================');
        setToken(token)

    }



    useEffect(() => {
        handleGetUserAndToken()
    }, []);


    const webViewRef = useRef<WebView>(null);
    const [currentUrl, setCurrentUrl] = useState('');

    const handleNavigationStateChange = (navState: any) => {
        setCurrentUrl(navState.url);
    };


    useEffect(() => {
        console.log(currentUrl)
        if (currentUrl.includes('thankyou/ok')) {
            closeBottomSheet()
        }
        if (currentUrl.includes('pricing/cmi')) {
            console.log('sdf')
            bottomSheetModalRef.current?.snapToIndex(1);
        }
    }, [currentUrl])




    const insets = useSafeAreaInsets();
    const bottomSheetModalRef = useRef<any>(null);


    const closeBottomSheet = () => {
        bottomSheetModalRef.current?.close();
    };


    useEffect(() => {
        console.log(currentUrl)
        if (currentUrl.includes('thankyou/ok')) {
            closeBottomSheet()
        }
        if (currentUrl.includes('pricing/cmi')) {
            console.log('sdf')
            bottomSheetModalRef.current?.snapToIndex(1);
        }
    }, [currentUrl])



    if (!Token || !session) return <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
        <Text>loading...</Text>
    </View>



    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            {/* <BottomSheetModal
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    activeOffsetY={100}
                    index={0}

                    ref={bottomSheetModalRef}> */}
            {/* <Text className='text-lg font-bold text-center'>
                Select plan
            </Text> */}
            {/* {currentSnapIndex === 1 && ( */}

            {/* <TouchableOpacity
                className='bg-white border-2 border-gray-50 absolute z-20 right-3 justify-center items-center'
                style={{
                    width: 50, height: 50, borderRadius: 300,
                    left: insets.left + 10
                    , top: insets.top + 25, ...SHADOWS.medium
                }}
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <MaterialCommunityIcons name="arrow-left" color="black" size={30} />
            </TouchableOpacity> */}
            {/* )} */}

            <WebView
                ref={webViewRef}
                onNavigationStateChange={handleNavigationStateChange}
                onError={(e) => console.log('error', e)}
                source={{ uri: `https://m3elem.vercel.app/en/packsMobile?token=${Token}&session=${session}` }}
                containerStyle={{ flex: 1 }}
            />
            {/* </BottomSheetModal> */}
        </GestureHandlerRootView >
    )
}

export default SelectPlan


const styles = StyleSheet.create({
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    dateText: {
        fontSize: 16,
        color: '#555'
    },
    reasonText: {
        fontSize: 16,
        color: '#555'
    },
    debitAmount: {
        fontSize: 16,
        color: 'red'
    },
    creditAmount: {
        fontSize: 16,
        color: 'green'
    },
    monthHeader: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        fontSize: 18,
        fontWeight: 'bold'
    }
});