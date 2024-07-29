import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { Modal } from "react-native";


const Products = ({ navigation }: { navigation: Navigate }) => {
  const dispatch = useDispatch();
  const [User, setUser] = useState<IUser | null>(null);
  const insets = useSafeAreaInsets();
  const [Loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState([
    {
      name: "product 1",
      description: "description 1",
      image: "https://picsum.photos/200/300",
      points: 10
    },
    {
      name: "product 2",
      description: "description 2",
      image: "https://picsum.photos/200/300",
      points: 20
    },
    {
      name: "product 3",
      description: "description 3",
      image: "https://picsum.photos/200/300",
      points: 30
    },]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);



  const filterProductsByName = () => {
    // Use the filter method to create a new array of products that match the searchName
    const filteredProducts = data.filter((product: any) =>
      product.name.toLowerCase().includes(TextSearch.toLowerCase())
    );
    return filteredProducts
  }

  const [TextSearch, setTextSearch] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
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
          <ActivityIndicator color="white" />
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
          <Text className="text-lg font-bold text-white">Products</Text>
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="white"
          />
        }
      >

        {/* add search input and add button with icon and set a list of products */}
        <View className="p-3">
          <View className="flex-row justify-between items-center">
            {/* search button with width 80% and add button  */}
            <View className="flex-row justify-between items-center w-full ">
              {/* TextInput for search and icon  */}
              <View className="flex-row justify-between items-center bg-white/10 rounded-lg p-2 w-[83%]">
                <Ionicons
                  name="search"
                  size={24}
                  color="white"
                  style={{
                    paddingHorizontal: 10,
                  }}
                />
                <TextInput
                  onChangeText={setTextSearch}
                  placeholderTextColor={"#FFFFFF50"}
                  className="text-white text-base justify-end w-full"
                  value={TextSearch}
                  placeholder="Rechercher"
                />
              </View>
              <TouchableOpacity
                onPress={
                  () => {
                    navigation.navigate("AddProduct")
                  }
                }
                className="flex-row justify-between items-center bg-primary-500 rounded-lg p-1 py-2">
                <Ionicons
                  name="add"
                  size={24}
                  color="white"
                  style={{
                    paddingHorizontal: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {
          filterProductsByName()?.map((product, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => navigation.navigate('ProductQRCode', { product })}
            >
              <View
                key={product.name}
                className="  w-full mx-2 justify-center items-center  p-1">
                <View className="flex-row w-full mb-2 ">
                  <Image source={{ uri: product?.image }} style={styles.image} />
                  <View className="flex-row justify-between flex-1 mx-2 ">
                    <View className="  items-start px-2 w-full"
                    >
                      <Text style={styles.name}>{product.name}</Text>
                      <Text style={styles.description}>{product.description}</Text>
                      <View style={styles.pointsContainer}>
                        <Text className="text-primary-500 text-xl font-bold">Price: {product.points} bcs</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        }

      </ScrollView>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 12,
    color: '#555',
  },
  pointsContainer: {
    marginTop: 8,
  },
  points: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'green',
  },
  reserveButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 8,
  },
  reserveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});
