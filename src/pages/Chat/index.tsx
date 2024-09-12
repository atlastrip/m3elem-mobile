import React, { useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { collection, doc, onSnapshot, orderBy, query, addDoc } from 'firebase/firestore';
import { firestore } from 'firebase';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Image } from 'react-native-animatable';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from 'constants/theme';
import { getToken, getUser } from '@/helpers/getToken';
import Constants from 'expo-constants';
const ChatScreen = ({ route, navigation }: any) => {
    const { conversationId, userId, userName, order } = route.params;
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [role, setRole] = useState('');


    const getRole = async () => {
        const newUser: any = await getUser();
        setRole(JSON.parse(newUser)?.role);
    }
    // console.log({ route, userId, userName })



    useEffect(() => {
        getRole();
    }, []);
    useEffect(() => {
        const listenToMessages = async () => {
            try {
                const conversationRef = doc(firestore, 'conversations', conversationId);
                const messagesRef = collection(conversationRef, 'messages');
                const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'));

                const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
                    const messagesFirestore = snapshot.docs.map(doc => {
                        const message = doc.data();
                        return { ...message, createdAt: message.createdAt.toDate() };
                    });
                    // @ts-ignore
                    setMessages(messagesFirestore);
                });

                // Clean up listener on unmount
                return () => unsubscribe();
            } catch (err) {
                console.error("Error listening to Firestore updates: ", err);
                // @ts-ignore
                setError("Failed to load messages. Please try again later.");
            }
        };

        listenToMessages();
    }, [conversationId]);


    const sendPushNotification = async (pushToken: string, messageText: string) => {
        const message = {
            to: pushToken,
            sound: 'default',
            title: 'New Message',
            body: messageText,
            data: { messageText },
        };

        setTimeout(async () => {


            await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
        })
    };


    const onSend = async (newMessages: any = []) => {
        try {
            const conversationRef = doc(firestore, 'conversations', conversationId);
            const messagesRef = collection(conversationRef, 'messages');
            console.log('order?.owner?.pushToken', order?.owner?.pushToken);

            // @ts-ignore
            await Promise.all(newMessages.map(message => {
                if (userId && userName) {
                    const recipientPushToken = role === 'artisant' ? order?.owner?.pushToken : (order?.artisant?.pushToken || order?.artisantId?.pushToken);
                    sendPushNotification(recipientPushToken, message.text);
                    return addDoc(messagesRef, {
                        ...message,
                        createdAt: new Date(),
                        user: {
                            _id: userId,
                            name: userName,
                        }
                    });
                } else {
                    console.error("User data is missing or incomplete.");
                }
            }));

        } catch (err) {
            console.error("Error sending message: ", err);
            // @ts-ignore
            setError("Failed to send message. Please try again later.");
        }
    };

    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Load initial messages
        setMessages([]);
    }, []);

    const handleSend = () => {
        if (newMessage.trim()) {
            const newMsg = {
                _id: (messages.length + 1).toString(),
                text: newMessage,
                createdAt: new Date(),
                user: { _id: userId, name: userName },
            };
            // @ts-ignore
            setMessages([newMsg, ...messages]);
            setNewMessage('');
        }
    };

    const renderMessageBubble = ({ item }: any) => {
        const messageTime = new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return (
            <View style={[styles.messageContainer, item.user._id === userId ? styles.myMessageContainer : styles.otherMessageContainer]}>
                <View className='flex-row items-end' style={[styles.messageBubble, item.user._id === userId ? styles.myMessage : styles.otherMessage]}>
                    <Text style={[styles.messageText, item.user._id === userId ? styles.myMessageText : {}]}>
                        {item.text}
                    </Text>
                    {item?.text?.length < 20 && (<Text style={[
                        styles.messageTime,
                        item.user._id === userId ?
                            { color: 'white', marginLeft: 2 } : {}
                    ]}>{messageTime}</Text>)}
                </View>
                {item?.text?.length >= 20 && (<Text style={styles.messageTime}>{messageTime}</Text>)}
            </View>
        );
    };
    const insets = useSafeAreaInsets()


    const sendLastMessageToBackend = async (lastMessage: any) => {
        const token = await getToken();
        // setUser(user);
        // console.log('====================================');
        // console.log('token', token);
        // console.log('====================================');
        if (!token) {
            return;
        }
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);
        try {
            // console.log('====================================');
            // console.log('filterArray', filterArray);
            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                            mutation updateorderForChat($input: updateorderForChatInput) {
                            updateorderForChat(input: $input) {
                               id
                            }
                        }

                            `,
                        variables: {
                            input: {
                                id: order.id,
                                lastMsg: lastMessage.text
                            }
                        }


                    }),
                }
            );

            const response = await res.json();
            console.log('response yoooo', response);


        } catch (error) {
            console.log('error bro', error);
        }
    }

    useEffect(() => {
        const handleScreenExit = () => {
            if (messages.length > 0) {
                const lastMessage = messages[0];
                sendLastMessageToBackend(lastMessage);
            }
        };

        // Listen for when the user quits the chat screen
        const unsubscribe = navigation.addListener('beforeRemove', handleScreenExit);

        // Cleanup the listener on component unmount
        return unsubscribe;
    }, [navigation, messages]);


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 60} // Adjust the offset if needed
        >
            {error && <Text style={{ color: 'red' }}>{error}</Text>}

            <View className='px-3' style={{ paddingTop: insets.top + 10 }} >
                <View className='flex-row py-2 bg-white rounded-md' >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className='justify-center items-center rounded p-2'>
                        <Ionicons name="chevron-back" size={24} />
                    </TouchableOpacity>
                    <Image
                        className='bg-gray-200'
                        source={{
                            uri: order?.images?.[0]
                                || order?.artisant?.imageProfile

                        }} style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                        }} />
                    <View className='ml-2'>
                        <Text className='font-bold capitalize text-lg'  >
                            {order?.title}
                        </Text>
                        <Text className='text-lg capitalize' >
                            {
                                role === 'artisant' ? order?.owner?.firstName + " " + order?.owner?.lastName : (order?.artisant?.firstName || order?.artisantId?.firstName) + " " + (order?.artisant?.lastName || order?.artisantId?.lastName)
                            }
                        </Text>

                    </View>
                </View>
            </View>

            <FlatList
                data={messages}
                renderItem={renderMessageBubble}
                // @ts-ignore
                keyExtractor={item => item._id}
                inverted
                contentContainerStyle={styles.messageList}
            />
            <View style={[styles.inputContainer, { paddingBottom: insets?.bottom }]}>
                <TextInput
                    style={styles.textInput}
                    value={newMessage}
                    placeholderTextColor="black"

                    onChangeText={setNewMessage}
                    placeholder="Aa..."
                />
                <TouchableOpacity
                    onPress={() => {
                        if (newMessage.trim()) {
                            const newMessageObj: any = {
                                _id: new Date().getTime().toString(), // Generate a unique ID for the message
                                text: newMessage,
                                createdAt: new Date(),
                                user: {
                                    _id: userId,  // Replace with your user ID
                                    name: userName,  // Replace with your user name
                                }
                            };
                            onSend([newMessageObj]);
                            setNewMessage(''); // Clear the input after sending
                        }
                    }}
                    style={styles.sendButton}
                >
                    <Text style={styles.sendButtonText}>
                        <Ionicons name="send" size={24} color={'white'} />
                    </Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    );
};

export default ChatScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    messageList: {
        padding: 10,
    },
    messageBubble: {
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
        maxWidth: '80%',
    },
    messageContainer: {
        marginBottom: 0,
    },
    myMessageContainer: {
        alignItems: 'flex-end',
    },
    otherMessageContainer: {
        alignItems: 'flex-start',
    },
    messageTime: {
        color: '#999',
        fontSize: 12,
        marginTop: 0,
        marginLeft: 2
    },
    myMessage: {
        backgroundColor: COLORS.primary,
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
    },
    otherMessage: {
        backgroundColor: '#e5e5ea',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
    },
    myMessageText: {
        color: 'white',
        fontSize: 20
        // color: '',
    },
    messageText: {
        fontSize: 20
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
    },
    textInput: {
        flex: 1,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 20,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        padding: 10,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});