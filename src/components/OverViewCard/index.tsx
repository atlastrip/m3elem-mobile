import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';


export const OverviewCard = ({ data, getUserCategory }: any) => {
    // Function to parse address safely
    const parseAddress = (address: any) => {
        try {
            const parsed = JSON.parse(address);
            return `${parsed.streetLine}, ${parsed.city}, ${parsed.state} ${parsed.zipcode}`;
        } catch (error) {
            return "Invalid address format";
        }
    };

    return (
        // <Card style={styles.card}>
        //     <Card.Content style={styles.cardContent}>
        //         <Text style={styles.title}>Overview</Text>

        //         <View style={styles.infoGrid}>
        //             {/* First Row */}
        //             <View style={styles.infoItem}>
        //                 <Ionicons name="location-outline" size={16} color="gray" style={styles.icon} />
        //                 <Text style={styles.infoText}>
        //                     {data?.userByPK?.adress
        //                         ? parseAddress(data.userByPK.adress)
        //                         : "No address provided"}
        //                 </Text>
        //             </View>

        //             <View style={styles.infoItem}>
        //                 <Ionicons name="time-outline" size={16} color="gray" style={styles.icon} />
        //                 <Text style={styles.infoText}>
        //                     {getUserCategory(data?.userByPK?.createdAt)?.label}
        //                 </Text>
        //             </View>

        //             {/* Second Row */}
        //             <View style={styles.infoItem}>
        //                 <Ionicons name="briefcase-outline" size={16} color="gray" style={styles.icon} />
        //                 <View style={styles.profileStatus}>
        //                     {data?.userByPK?.profileCompleted ? (
        //                         <>
        //                             <Text style={styles.completedText}>Profile Completed</Text>
        //                             <CheckCircleOutline name="check-circle-outline" size={16} color="green" />
        //                         </>
        //                     ) : (
        //                         <Text style={styles.incompleteText}>Profile Incomplete</Text>
        //                     )}
        //                 </View>
        //             </View>

        //             <View style={styles.infoItem}>
        //                 <Ionicons name="cash-outline" size={16} color="gray" style={styles.icon} />
        //                 <Text style={styles.infoText}>Contact for more info</Text>
        //             </View>
        //         </View>
        //     </Card.Content>
        // </Card>
        <View

            className='rounded-lg border border-gray-200'
            style={[styles.cardContainer, { marginBottom: 16 }]}>
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>Overview</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {/* Address */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', marginBottom: 8 }}>
                        <Feather name="map-pin" size={16} color="gray" style={{ marginRight: 8 }} />
                        <Text style={{ flex: 1 }} numberOfLines={1}>
                            {data?.userByPK?.adress
                                ? `${JSON.parse(data?.userByPK?.adress)?.streetLine}, ${JSON.parse(data?.userByPK?.adress)?.city}, ${JSON.parse(data?.userByPK?.adress)?.state} ${JSON.parse(data?.userByPK?.adress)?.zipcode}`
                                : 'No address provided'}
                        </Text>
                    </View>
                    {/* User Category */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', marginBottom: 8 }}>
                        <Feather name="clock" size={16} color="gray" style={{ marginRight: 8 }} />
                        <Text>{getUserCategory(data?.userByPK?.createdAt).label}</Text>
                    </View>
                    {/* Profile Completion */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', marginBottom: 8 }}>
                        <Feather name="briefcase" size={16} color="gray" style={{ marginRight: 8 }} />
                        <Text>
                            {data?.userByPK?.profileCompleted ? (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text>Profile Completed </Text>
                                    <MaterialIcons name="check-circle-outline" size={16} color="green" />
                                </View>
                            ) : (
                                'Profile Incomplete'
                            )}
                        </Text>
                    </View>
                    {/* Contact Info */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', marginBottom: 8 }}>
                        <Feather name="dollar-sign" size={16} color="gray" style={{ marginRight: 8 }} />
                        <Text>Contact for more info</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    card: {
        // margin: 10,
        borderRadius: 8,
        // Add any additional styling you need for the card
        marginBottom: 24,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        // Add any additional styling you need for the title
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%', // Ensures two items per row with some spacing
        marginBottom: 12,
    },
    icon: {
        marginRight: 8,
    },
    infoText: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 14,
        color: '#555',
    },
    profileStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    completedText: {
        marginRight: 4,
        color: 'green',
        fontSize: 14,
    },
    incompleteText: {
        color: 'red',
        fontSize: 14,
    },
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 2,

    },
    cardContent: {
        padding: 16,
    },
});

export default styles;
