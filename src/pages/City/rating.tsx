// ReviewModal.tsx
import { ButtonPrimary } from '@/components/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from 'constants/theme';
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Modal, Portal, Button, Text } from 'react-native-paper';
import { Rating } from 'react-native-ratings';

interface ReviewModalProps {
    visible: boolean;
    audioId: string;
    onDismiss: () => void;
    onSubmitReview: (review: Review) => void;
}

interface Review {
    id: number;
    user: {
        fullName: string;
    };
    comment: string;
    review: number;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ visible, onDismiss, onSubmitReview , audioId }) => {
    const [fullName, setFullName] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [rating, setRating] = useState<number>(3);

    const handleRating = (newRating: number) => {
        setRating(newRating);
    };
    const [Loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        const UserFromAsyncStorage = await AsyncStorage.getItem("@user");
        const ParsedUser: any = await JSON.parse(UserFromAsyncStorage || "");

        const newReview: Review = {
            id: Date.now(), // Generate a unique ID for the review
            user: {
                fullName: ParsedUser?.fullName,
            },
            comment: comment,
            // @ts-ignore
            rating: rating,
        };
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const graphql = JSON.stringify({
            query: "mutation Mutation($input: inputAudioComment) {\r\n  createAudioComment(input: $input) {\r\n    user {\r\n      id\r\n      phone\r\n      fullName\r\n    }\r\n    comment\r\n    rating\r\n  }\r\n}\r\n",
            variables: {
                "input":
                {
                    "user": String(ParsedUser?.id),
                    "rating":String(rating),
                    "comment": comment,
                    "audio": audioId
                }
            }
        })
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: graphql
        };

        fetch("https://m3elem-app-ecj9f.ondigitalocean.app/m3elem", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                onSubmitReview(newReview);
                setLoading(false)
                setFullName('');
                setComment('');
                setRating(3);
                onDismiss();
            })
            .catch((error) => console.error(error));
    };

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
                <Text style={[styles.title, { color: 'black' }]}>Submit Your Review</Text>
                <TextInput
                    style={{
                        borderColor: "#00000050",
                    }}
                    placeholderTextColor={"#00000050"}
                    className="text-black border-b border-[#2B61E3] text-lg p-3 mb-3"
                    // keyboardType="number-pad"
                    placeholder="Enter your Comment"
                    value={comment}
                    onChangeText={setComment}
                />

                <Rating
                    type="star"
                    startingValue={rating}
                    imageSize={30}

                    onFinishRating={handleRating}
                    style={[styles.rating, {
                    }]}
                />
                <ButtonPrimary setLoading={() => { }} Loading={Loading} text='Submit Review' onPress={handleSubmit} />
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
        backgroundColor: 'white'
    },
    rating: {
        paddingVertical: 10,
    },
    button: {
        marginTop: 10,
    },
});

export default ReviewModal;
