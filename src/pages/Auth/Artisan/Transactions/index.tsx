import { CURRENCY, formatNumberToFrenchStyle } from '@/helpers/format';
import { BottomSheetModal, BottomSheetModalProvider, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { COLORS, SHADOWS } from 'constants/theme';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { MaterialCommunityIcons } from "@expo/vector-icons";


interface ITransaction {
    "transactionType": string | null,
    "transactionRef": string | null,
    "status": string | null,
    "receiver": string | null,
    "reason": string | null,
    "id": string,
    "createdAt": string | null,
    "amount": string | null
}
const Transactions = () => {
    const [SelectedType, setSelectedType] = useState("");
    const scrollToElement = (scrollViewRef: any, elementIndex: number) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: elementIndex * WINDOW_WIDTH, animated: true });
        }
    };
    const scrollViewRef1 = useRef<any>(null);



    const [Transactions, setTransactions] = useState<ITransaction[]>([]);
    const HandleGetTransactions = async () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        try {
            const res = await fetch(
                "https://m3elem-app-ecj9f.ondigitalocean.app/m3elem",
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `query Transactions {
                    Transactions {
                      transactionType
                      transactionRef
                      status
                      receiver
                      reason
                      id
                      createdAt
                      amount
                    }
                  }`
                    }),
                }
            );
            const json: any = await res.json();
            console.log(json)
            setTransactions(json?.data?.Transactions || [])
        } catch (err) {
            console.log("error", JSON.stringify(err, undefined, 2));
        }
    };

    useEffect(() => {
        HandleGetTransactions();
    }, []);

    const webViewRef = useRef<WebView>(null);
    const [currentUrl, setCurrentUrl] = useState('');

    const handleNavigationStateChange = (navState: any) => {
        setCurrentUrl(navState.url);
    };

    const reloadWebView = () => {
        webViewRef.current?.reload();
    };

    useEffect(() => {
        console.log(currentUrl)
        if(currentUrl.includes('thankyou/ok')){
            closeBottomSheet()
        }
        if(currentUrl.includes('pricing/cmi')){
            console.log('sdf')
            bottomSheetModalRef.current?.snapToIndex(1);
        }
    }, [currentUrl])



    // Helper function to format month-year
    const formatMonthYear = (date: any) => {
        const options: any = { year: 'numeric', month: 'long' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    // Group transactions by month
    const groupTransactionsByMonth = (transactions: any) => {
        return transactions.reduce((groups: any, transaction: any) => {
            const monthYear = formatMonthYear(transaction.createdAt);
            if (!groups[monthYear]) {
                groups[monthYear] = [];
            }
            groups[monthYear].push(transaction);
            return groups;
        }, {});
    };

    const TransactionItem = ({ transaction }: any) => {
        const date = new Date(transaction.createdAt).toLocaleDateString().split('/')
        return (
            <View style={styles.transactionItem}>
                <View style={{ backgroundColor: COLORS.primary }} className='p-2 rounded-md'>
                    <Text className='text-white font-bold text-lg text-center'>{date[0]}/{date[1]}</Text>
                    <Text className='text-white font-bold text-xs text-center'>{date[2]}</Text>
                </View>
                <Text className='text-left flex-grow pl-3 font-bold'>{transaction.reason}</Text>
                <Text className='font-bold' style={transaction.transactionType === 'DEBIT' ? styles.debitAmount : styles.creditAmount}>
                    {transaction.amount} {CURRENCY}
                </Text>
            </View>
        );
    };

    // @ts-ignore
    const sortedTransactions = [...Transactions].sort((a, b) => new Date(a?.createdAt) - new Date(b?.createdAt));

    // Group transactions by month
    const groupedTransactions = groupTransactionsByMonth(sortedTransactions);

    // Create an array of grouped transactions for rendering
    const groupedTransactionsArray = Object.keys(groupedTransactions).map(monthYear => ({
        monthYear,
        transactions: groupedTransactions[monthYear]
    }));

    const insets = useSafeAreaInsets();
    const snapPoints = useMemo(() => ["80%", "100%"], []);
    const bottomSheetModalRef = useRef<any>(null);

    const openBottomSheet = () => {
        bottomSheetModalRef.current?.present();
    };
    const closeBottomSheet = () => {
        bottomSheetModalRef.current?.close();
    };

    const [currentSnapIndex, setCurrentSnapIndex] = useState(0);

    // Callback function when the snap point changes
    const handleSheetChanges = useCallback((index: any) => {
        setCurrentSnapIndex(index);
        index === -1 && HandleGetTransactions()
    }, []);


    return (
        <GestureHandlerRootView >
            <BottomSheetModalProvider>
                <View style={{ flex: 1 }}>
                    <View style={{ width: WINDOW_WIDTH }} className=''>
                        <Image source={require('./images/abstract.jpg')} className='w-full h-64 bg-black' />
                        <View className='absolute z-10 right-3' style={{ top: insets.top + 10 }} >
                            <TouchableOpacity
                                onPress={openBottomSheet}
                                className='bg-white rounded-full p-3'>
                                <Text className='text-black font-bold text-lg'>
                                    Add balance
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className='absolute bottom-3 px-3 w-full'>
                            <Text className='text-lg font-bold text-white ' >
                                Balance
                            </Text>
                            <ScrollView horizontal>
                                <Text className='text-7xl font-bold text-white ' >
                                    {formatNumberToFrenchStyle(3000, false)}
                                </Text>
                                <Text className='text-xl self-end mb-3 font-bold text-white ' >
                                    {CURRENCY}
                                </Text>
                            </ScrollView>
                        </View>
                    </View>
                    <View className='p-3 pb-0 pt-0' style={{ flex: 1 }}>
                        <FlatList
                            data={groupedTransactionsArray}
                            renderItem={({ item }) => (
                                <View>
                                    <View className='border-b-2 border-gray-400 p-1'>
                                        <Text className='text-center text-primary-500 font-bold text-lg'>{item.monthYear}</Text>
                                    </View>
                                    {item?.transactions?.map((transaction: any) => (
                                        <TransactionItem key={transaction.id} transaction={transaction} />
                                    ))}
                                </View>
                            )}
                            keyExtractor={item => item.monthYear}
                        />

                        <View
                            style={{
                                height: 30,
                            }}
                        />
                    </View>
                </View>
                <BottomSheetModal
                    snapPoints={snapPoints}
                    style={{}}
                    onChange={handleSheetChanges}

                    ref={bottomSheetModalRef}>
                    <Text className='text-lg font-bold text-center'>
                        Select plan
                    </Text>
                    {currentSnapIndex === 1 && (

                        <TouchableOpacity
                            className='bg-white border-2 border-gray-50 absolute z-20 right-3 justify-center items-center'
                            style={{ width: 50, height: 50, borderRadius: 300, top: insets.top + 0, ...SHADOWS.medium }}
                            onPress={closeBottomSheet}
                        >
                            <MaterialCommunityIcons name="close" color="black" size={30} />
                        </TouchableOpacity>
                    )}
                    <View style={{ flex: 1 }}
                        className=''>
                        <WebView
                            ref={webViewRef}
                            onNavigationStateChange={handleNavigationStateChange}

                            source={{ uri: "https://m3elem.vercel.app/en/pricing" }} />
                    </View>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView >
    )
}

export default Transactions


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