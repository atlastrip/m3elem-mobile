// NewOrderComponent.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  HelperText,
  Provider as PaperProvider,
  Appbar,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
// import { generateRandomFilename } from '@/hooks'; // Ensure this hook is compatible with React Native
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
// import { storage } from '../../app/firebase/index'; // Ensure Firebase is properly configured for React Native
// import { useAddLeadMutation } from '@/app/graphql/generated/graphql'; // Ensure Apollo Client is set up
// import { InfoIcon } from 'lucide-react-native'; // Replace with a compatible icon library for React Native

interface Professional {
  id: string;
  name: string;
}

const NewOrderComponent = ({ route }: any) => {
  const navigation = useNavigation();

  // const {title,
  //   description,
  //   status,
  //   images,
  //   location,
  //   professionals,
  //   category,
  //   locationType,
  //   zipCode} =  route.params;

  const [title, setTitle] = useState(route.params.title);
  const [description, setDescription] = useState(route.params.description);
  const [images, setImages] = useState<string[]>(route.params.images);
  const [location, setLocation] = useState(route.params.location);
  const [category, setCategory] = useState<any>(route.params.category); // Define appropriate type
  const [zipCode, setZipCode] = useState(route.params.zipCode);
  const [professionals, setProfessionals]: any = useState([]);
  const [selectedProfessionals, setSelectedProfessionals] = useState<string[]>([]);
  // const [addLead, { data: addLeadData, loading: addLeadLoading, error: addLeadError }] = useAddLeadMutation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch or set professionals as needed
    setProfessionals([
      { id: '1', name: 'Professional 1' },
      { id: '2', name: 'Professional 2' },
      { id: '3', name: 'Professional 3' },
    ]);
  }, []);

  const handleAddImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "You've refused to allow this app to access your photos!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      base64: true,
    });

    if (!pickerResult.canceled) {
      const selectedImages = pickerResult.assets.map(asset => asset.base64 ? `data:image/jpeg;base64,${asset.base64}` : asset.uri);
      setImages(prevImages => [...prevImages, ...selectedImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!title || !description || !location) {
      Alert.alert('Validation Error', 'Please fill out all required fields.');
      return;
    }

    setLoading(true);

    const newOrder = {
      title,
      description,
      images,
      location,
      category,
      zipCode,
    };

    try {
      const random = "generateRandomFilename();"
      console.log('Random filename:', random);

      // const uploadedImages = await Promise.all(
      //     images.map(async (image: any) => {
      //         try {
      //             // Convert base64 to blob
      //             const response = await fetch(image);
      //             const blob = await response.blob();

      //             const storageRef = ref(storage, `images/${random}`);
      //             const uploadTask = uploadBytesResumable(storageRef, blob);

      //             return new Promise<string>((resolve, reject) => {
      //                 uploadTask.on(
      //                     "state_changed",
      //                     (snapshot) => {
      //                         // Optionally handle progress
      //                     },
      //                     (error) => {
      //                         console.error('Upload error:', error);
      //                         reject(error);
      //                     },
      //                     async () => {
      //                         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      //                         console.log('Download URL:', downloadURL);
      //                         resolve(downloadURL);
      //                     }
      //                 );
      //             });
      //         } catch (error) {
      //             console.error('Error uploading image:', error);
      //             throw new Error('Error uploading images.');
      //         }
      //     })
      // );

      // console.log('Uploaded images:', uploadedImages);

      // const order = await addLead({
      //     variables: {
      //         input: {
      //             description,
      //             title,
      //             images: uploadedImages,
      //             location,
      //             status: "NEW",
      //             categoryId: category?.id || '',
      //             zipCode: zipCode,
      //         },
      //     },
      //     context: {
      //         headers: {
      //             Authorization: `Bearer YOUR_AUTH_TOKEN`, // Replace with actual token retrieval method
      //         },
      //     },
      // });

      // console.log('Order created:', order);

      // setLoading(false);
      // navigation.navigate("UserOrders"); // Replace with actual route name

    } catch (error: any) {
      setLoading(false);
      console.error('Error submitting order:', error.message);
      Alert.alert('Submission Error', 'An error occurred while submitting the order. Please try again.');
    }
  };

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add New Project" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Title"
              value={title}
              onChangeText={text => setTitle(text)}
              mode="outlined"
              style={styles.input}

            />
            <TextInput
              label="Description"
              value={description}
              onChangeText={text => setDescription(text)}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={styles.input}

            />
            <TextInput
              label="Location"
              value={location}
              onChangeText={text => setLocation(text)}
              mode="outlined"
              style={styles.input}

            />
            <TextInput
              label="Zip Code"
              value={zipCode}
              onChangeText={text => setZipCode(text)}
              mode="outlined"
              style={styles.input}
            />

            {/* Image Picker */}
            <View style={styles.imagePickerContainer}>
              <Text style={styles.imagePickerLabel}>Add Images:</Text>
              <View style={styles.imageGrid}>
                {images.map((image, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveImage(index)}>
                      <Text style={styles.removeButtonText}>X</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
                  <Text style={styles.addImageButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card.Content>
          <Card.Actions style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add New Project"}
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
          </Card.Actions>
        </Card>

        {/* Information Section */}
        <Card style={styles.infoCard}>
          {/* <Card.Title
                        title="What is this?"
                        left={() => <InfoIcon size={20} />}
                    /> */}
          <Card.Content>
            <Paragraph>
              In this section, you can create a new order based on your requirements by providing the following details:
            </Paragraph>
            <View style={styles.list}>
              <Text>- Title</Text>
              <Text>- Description</Text>
              <Text>- Zip code</Text>
              <Text>- Images</Text>
            </View>
            <Paragraph>
              A notification will be sent to all professionals we think can assist you.
            </Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    
  },
  input: {
    marginBottom: 16,
  },
  imagePickerContainer: {
    marginBottom: 16,
  },
  imagePickerLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 8,
    marginBottom: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageButtonText: {
    fontSize: 24,
    color: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  cancelButton: {
    marginLeft: 8,
  },
  infoCard: {
    padding: 16,
  },
  list: {
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
  },
});

export default NewOrderComponent;
