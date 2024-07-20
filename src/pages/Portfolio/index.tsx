import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Avatar, Button, Card } from 'react-native-paper';
import { COLORS } from 'constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';


export default function Portfolio() {
    const insets = useSafeAreaInsets();
    const screenWidth = Dimensions.get('window').width;
    const [SelectedRisk, setSelectedRisk] = useState(0);

    const data = SelectedRisk === 0 ? [84410, 273020] : SelectedRisk === 1 ? [90410, 323020] : [100410, 393020]

    // Data for the chart
    const chartData = {
        labels: ['2024', '2025', '2026', '2027', '2028'],
        datasets: [
            {
                data: [7150, 21790, 57110, ...data],
                color: (opacity = 1) => `${COLORS.primary}`, // optional
                strokeWidth: 2, // optional
            },
        ],
        legend: ['Portfolio Balance'], // optional
    };
    return (
        <ScrollView style={{
            paddingTop: insets.top + 10
        }}>
            <View className='flex-row justify-between items-center mb-3 px-3'>
                <Text style={styles.name}>ServiceDay</Text>
                <Avatar.Image size={60} source={{ uri: 'https://www.dealkhir.com/_next/image?url=%2Fimages%2Fempty.jpg&w=1920&q=75' }} />
            </View>
            <View className='px-3 mt-3 flex-row'>
                <View style={{
                    padding: 30,
                    borderRadius: 30,
                    marginRight: 10,
                    // width: '50%',
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    width: "50%",
                    height: 200,
                    justifyContent: 'center',
                    backgroundColor: 'white'
                }} >
                    <View className='flex-row justify-between'>
                        <Text className=''>
                            Last 30 days
                        </Text>
                        <Text style={{ color: COLORS.primary }} className=''>
                            (+19%)
                        </Text>
                    </View>
                    <Text style={{ color: 'green', }} className='text-3xl font-bold mt-3'>
                        + 7,987.88
                    </Text>
                </View>
                <View
                    style={{
                        width: "48%",
                        flex: 1,
                    }}
                    className=''>
                    <TouchableOpacity style={{
                        justifyContent: 'center',
                        alignItems: "center",
                        borderRadius: 30,
                        // width: '50%',
                        borderTopLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 0,
                        backgroundColor: 'white',
                        height: 100

                        // marginBottom: 10
                    }} >
                        <Text style={{ color: COLORS.primary }} className='text-center text-lg'>
                            <Icon name="chart-timeline-variant" size={20} />
                            Assets
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        padding: 30,
                        borderBottomRightRadius: 30,
                        // width: '50%',
                        backgroundColor: 'white',
                        marginTop: 10,
                        height: 90

                    }} >
                        <Text style={{ color: COLORS.primary }} className='text-center text-lg'>
                            <Icon name="arrow-bottom-left-thin" size={20} />
                            Withdraw
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.forecast}>
                <Text style={styles.forecastTitle}>BALANCE FORECASTE</Text>
                <LineChart
                    data={chartData}
                    width={screenWidth - 40} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix=""
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#ffa726',
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </View>

            <View style={styles.riskLevel}>
                <Text style={styles.riskTitle}>YOUR RISK LEVEL</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => setSelectedRisk(0)}
                        style={{
                            backgroundColor: SelectedRisk === 0 ? COLORS.primary : '#00000010',
                            padding: 10,
                            width: "30%",
                            borderRadius: 30
                        }}
                    >
                        <View

                            className='rounded-full bg-white p-3'>
                            <Text

                                className='text-center '>ENTRY</Text>
                        </View>
                        <Text
                            style={{
                                color: SelectedRisk === 0 ? 'white' : 'black'
                            }}
                            className='text-center mt-2 text-lg'>Low Risk Low Return (1% to 2%)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSelectedRisk(1)}
                        style={{
                            backgroundColor: SelectedRisk === 1 ? COLORS.primary : '#00000010',
                            padding: 10,
                            width: "30%",
                            borderRadius: 30
                        }}
                    >
                        <View

                            className='rounded-full bg-white p-3'>
                            <Text

                                className='text-center '>MEDIUM</Text>
                        </View>
                        <Text
                            style={{
                                color: SelectedRisk === 1 ? 'white' : 'black'
                            }}
                            className='text-center mt-2 text-lg'>Medium Risk Medium Return (4% to 7%)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSelectedRisk(2)}
                        style={{
                            backgroundColor: SelectedRisk === 2 ? COLORS.primary : '#00000010',
                            padding: 10,
                            width: "30%",
                            borderRadius: 30
                        }}
                    >
                        <View

                            className='rounded-full bg-white p-3'>
                            <Text

                                className='text-center '>PRO</Text>
                        </View>
                        <Text
                            style={{
                                color: SelectedRisk === 2 ? 'white' : 'black'
                            }}
                            className='text-center mt-2 text-lg'>High Risk High Return (8% to 12%)</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ height: 200 }} />


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    name: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    time: {
        fontSize: 16,
        color: '#000',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    amount: {
        fontSize: 32,
        color: '#000',
    },
    percentage: {
        fontSize: 18,
        color: '#00aaff',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    button: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: '#000',
    },
    forecast: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    forecastTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    forecastChart: {
        width: '100%',
        height: 200,
        marginTop: 10,
    },
    riskLevel: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    riskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    riskOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    riskButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    selectedRisk: {
        backgroundColor: '#00aaff',
    },
    riskText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    riskDetail: {
        fontSize: 12,
        color: '#777',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    navButton: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: '#000',
    },
})