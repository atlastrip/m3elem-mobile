import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { Alert } from 'react-native';

const TextToSpeech = () => {
    const [Play, setPlay] = useState(false);
    const [text, setText] = useState(`Le Maroc est un pays où les cultures africaines, arabes et européennes s'entremêlent. Situé à l’embouchure de la mer Méditerranée, le Maroc est le point de contact le plus proche de l’Europe pour l’Afrique en tant que continent. Le Maroc est une terre de tolérance, un mélange de cultures et de religions, un pays connu pour son incroyable hospitalité. Le mélange fascinant d'histoire, d'art, de gastronomie, de musique et d'architecture fait du Maroc une destination inoubliable.

        Les labyrinthes toujours enchanteurs de bazars et de souks dans les vieilles médinas, les incroyables monuments historiques, les gens sympathiques, les vastes et magnifiques montagnes de l'Atlas aux sommets enneigés, la côte interminable de l'océan Atlantique, chaude et venteuse, et l'impressionnant désert du Sahara, célèbre comme un lieu de tournage de nombreux films hollywoodiens, ne sont que quelques-unes des beautés naturelles et culturelles du pays qui ne manquent jamais de laisser une impression durable.
        
        Qu'ils séjournent dans l'un de nos hôtels sélectionnés, dans des riads exclusifs ou même dans nos propres camps mobiles situés au milieu du désert du Sahara, les visiteurs peuvent s'attendre à être traités comme des rois par nos guides locaux hautement qualifiés et sympathiques. Nous veillons à ce que nos itinéraires mettent en valeur les aspects les plus importants du patrimoine historique et culturel de la région – ses monuments anciens, ses palais décadents et ses glorieuses mosquées, ainsi qu’aux nombreuses régions d’une beauté exceptionnelle du pays. Notre objectif est de créer des itinéraires personnalisés qui fusionnent le traditionnel et le contemporain.`)
    const speak = () => {
        if (text) {
            Speech.speak(text, {
                onDone: () => {
                    console.log('Speech finished');
                    setPlay(true)
                },
                onError: (error) => console.error('Speech error:', error),
            });
        } else {
            Alert.alert("Please enter some text to speak!");
        }
    };
    const stop = () => {
        setPlay(false)
        Speech.pause()
    }

    useEffect(() => {
        return () => {
            // Cleanup speech if component unmounts
            Speech.stop();
        };
    }, []);

    return (
        <View style={styles.container}>
            {Play ? (
                <Button title="Shut" onPress={stop} />
            ) : (
                <Button title="Speak" onPress={speak} />

            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
    },
});

export default TextToSpeech;
