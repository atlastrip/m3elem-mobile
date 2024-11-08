import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Modal, StyleSheet, Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface ImageType {
  id: string;
  source: string;
}

export default function ImageGallery({ images }: { images: ImageType[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openPopup = (index: number) => {
    setSelectedIndex(index);
    setIsVisible(true);
  };

  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageGrid}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={image.id}
            style={styles.imageContainer}
            onPress={() => openPopup(index)}
          >
            <Image
              source={{ uri: image.source }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>

      {isVisible && (
        <Modal
          visible={isVisible}
          transparent={true}
          onRequestClose={closePopup}
          animationType="fade"
        >
          <View style={styles.modalContainer}>
            <Button
              mode="text"
              onPress={closePopup}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="white" />
            </Button>

            <PagerView
              style={styles.pagerView}
              initialPage={selectedIndex}
              onPageSelected={e => setSelectedIndex(e.nativeEvent.position)}
            >
              {images.map((image, index) => (
                <View key={image.id} style={styles.page}>
                  <Image
                    source={{ uri: image.source }}
                    style={styles.pagerImage}
                    resizeMode="contain"
                  />
                </View>
              ))}
            </PagerView>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                {selectedIndex + 1} / {images.length}
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  pagerView: {
    height: '70%',
    width: '100%',
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagerImage: {
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerText: {
    color: 'white',
    fontSize: 16,
  },
});
