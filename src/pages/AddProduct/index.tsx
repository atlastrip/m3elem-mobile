import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Attendances, ButtonPrimary } from "../../components/index";
import { useDispatch } from "react-redux";
import { IUser, setBackTo } from "../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import window from "../../constants/Layout";
import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import { useFocusEffect } from "@react-navigation/native";
import { Navigate } from "navigation";
import { getData } from "../../graphql/fetcher";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const AddProduct = ({ navigation }: { navigation: Navigate }) => {
  const dispatch = useDispatch();
  const [User, setUser] = useState<IUser | null>(null);
  const insets = useSafeAreaInsets();
  const [Loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints]: any = useState(0);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result: any = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   // setBlob(result.assets[0].uri)
  //   if (!result.canceled) {
  //     setImageUri(result.assets[0].uri);
  //   }
  // };

  // const deleteImage = () => {
  //   setImageUri(null);
  // };

  // const handleImageUpload = () => {
  //   // Implement image upload logic here
  //   // You can use ImagePicker or another library to handle image selection
  // };

  const handleAddProduct = () => {
    // Implement product addition logic here
    // You can send the product data (name, description, points, imageUri) to your backend or store it locally
  };

  const [amount, setAmount] = useState('');

  const handlePress = (value) => {
    setAmount((prevAmount) => prevAmount + value);
  };

  const handleDelete = () => {
    setAmount((prevAmount) => prevAmount.slice(0, -1));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {false && (
        <View
          style={{
            width: window.width,
            height: window.height,
          }}
          className="absolute top-0 left-0 justify-center items-center z-50"
        >
          <ActivityIndicator color="black" />
        </View>
      )}
      <View
        style={{
          paddingTop: insets?.top + 10,
          paddingBottom: 10,
        }}
        className="p-2 flex-row justify-center items-center bg-white/5"
      >
        <View className="p-3">
          <Text className="text-lg font-bold text-black">ServiceDay</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.displayTitle}>
          <Text style={styles.displayTitleText}>Insérer la valeur</Text>
        </View>
        <View style={styles.display}>
          <Text style={styles.displayText}>{amount}</Text>
        </View>
        <View style={styles.keyboard}>
          <View style={styles.row}>

            <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}>
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}>
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}>
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}>
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}>
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}>
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}>
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}>
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}>
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}>
              <Text style={styles.buttonText}>00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}>
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
              {/* <Text style={styles.buttonText}>Delete</Text> */}
              <Ionicons name="backspace-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            padding: 16,
            borderRadius: 40,
          }}
          className="bg-primary-500 mx-5"
          onPress={() =>
            navigation.navigate("GestionDeCompte")}>
          <Text style={styles.addButtonText}>Continuer </Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    marginTop: 33,
    padding: 22,
  },
  display: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
  },
  displayTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 4,
    // marginBottom: 3,
    // fontFamily: 'normal',
    color: '#210264',
    fontSize: 20,
  },
  displayTitleText: {
    fontFamily: 'bold',
    color: '#210264',
    fontSize: 20,
  },
  displayText: {
    fontFamily: 'bold',
    color: '#210264',
    fontSize: 40,
    margin: 5,
    padding: 16,
  },
  keyboard: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 5,
    padding: 16,
    borderRadius: 5,
    color: 'black',
  },
  buttonText: {
    fontSize: 22,
    fontStyle: 'bold',
    color: '#210264',
    margin: 5,
    padding: 16,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
