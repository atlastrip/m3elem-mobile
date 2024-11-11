import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Checkbox } from 'react-native-paper';
import tw from 'twrnc';
import Constants from 'expo-constants';
import { getToken } from '@/helpers/getToken';

interface ICategory {
    id: number;
    name: string;
    subcategories: ICategory[];
}

interface CategorySelectorProps {
    setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
    selectedCategories: number[];
    setDone?: any;
    withInfo?: boolean;
}

const CategoriesCreateSelector: React.FC<CategorySelectorProps> = ({ setSelectedCategories, selectedCategories, withInfo = true, setDone = () => { } }) => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [openCategories, setOpenCategories] = useState<{ [key: number]: boolean }>({});
    const [loading, setLoading] = useState(false);

    // Fetch categories using an API call
    const fetchCategories = async () => {
        setLoading(true);
        const token = await getToken();

        try {
            //   const response = await fetch(Constants.expoConfig?.extra?.apiUrl);
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${token}`);

            const response = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                                    query getCategoriesAsString {
                    getCategoriesAsString{
                        categoriesAsString
                    }
                    }
                `,
                    }),
                }
            );
            const data = await response.json();
            // console.log('====================================');
            // console.log('data', data);
            // console.log('====================================');
            setCategories(JSON.parse(data?.data?.getCategoriesAsString?.categoriesAsString)); // Assuming the response has categories in JSON string format
            setDone(true);
        } catch (error:any) {
            console.error("Error fetching categories:", error.message);
            Alert.alert("Error", "Failed to load categories.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryChange = (category: ICategory, checked: boolean) => {
        const updateSelection = (category: ICategory, select: boolean, selectedIds: number[]): number[] => {
            let updatedSelection = select
                ? [...selectedIds, category.id]
                : selectedIds.filter(id => id !== category.id);
            category?.subcategories?.forEach(subcategory => {
                updatedSelection = updateSelection(subcategory, select, updatedSelection);
            });
            return updatedSelection;
        };

        setSelectedCategories(prevSelected => updateSelection(category, checked, prevSelected));
    };

    const handleCollapseToggle = (categoryId: number) => {
        setOpenCategories(prevOpen => ({
            ...prevOpen,
            [categoryId]: !prevOpen[categoryId],
        }));
    };

    const renderCategories = (categories: ICategory[]) => {
        return categories.map((category) => {
            const isChecked = selectedCategories.includes(category.id);
            const isOpen = openCategories[category.id] || false;

            return (
                <View key={category.id} style={tw`border-b-2 border-gray-50 rounded-md my-1`}>
                    <View style={tw`flex-row items-center`}>
                        {category.subcategories?.length > 0 && (
                            <TouchableOpacity onPress={() => handleCollapseToggle(category.id)}>
                                <Text style={tw`text-xl pr-2`}>{isOpen ? '−' : '+'}</Text>
                            </TouchableOpacity>
                        )}
                        <View className='bg-gray-100 rounded mr-1'>

                        <Checkbox
                            status={isChecked ? 'checked' : 'unchecked'}
                            onPress={() => handleCategoryChange(category, !isChecked)}
                            color="#4CAF50"
                            />
                            </View>
                        <Text>{category.name}</Text>
                    </View>

                    {isOpen && (
                        <View style={tw`ml-6`}>
                            {renderCategories(category.subcategories)}
                        </View>
                    )}
                </View>
            );
        });
    };

    if (loading) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    return (
        <ScrollView style={tw`w-full`}>
            <View style={tw`p-4`}>
                <View style={tw`w-full flex-row`}>
                    <View style={tw`flex-1`}>
                        {renderCategories(categories)}
                    </View>

                    {withInfo && (
                        <View style={tw`hidden sm:flex w-1/3 border-l-[1px] border-gray-200 p-4`}>
                            <View style={tw`bg-gray-50 p-3 rounded-md`}>
                                <View style={tw`flex-row items-center`}>
                                    {/* <Info size={20} style={tw`mr-2`} /> */}
                                    <Text>Info</Text>
                                </View>
                                <Text style={tw`mt-3 text-sm`}>
                                    Select the categories that you want to associate with this product. You can select multiple categories.
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default CategoriesCreateSelector;
