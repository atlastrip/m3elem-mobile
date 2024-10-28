import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface ICategory {
  id: number;
  name: string;
  subcategories: ICategory[];
}

interface CategorySelectorProps {
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategories: string[];
  setDone?: (done: boolean) => void;
  withInfo?: boolean;
  SelectedTypeOfView: 'grid' | 'list';
}

const BubblesCategoriesCreateSelector: React.FC<CategorySelectorProps> = ({
  setSelectedCategories,
  selectedCategories,
  withInfo = true,
  setDone = () => {},
  SelectedTypeOfView
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [openCategories, setOpenCategories] = useState<{ [key: number]: boolean }>({});
  const [SelectedCategoriesBubble, setSelectedCategoriesBubble] = useState<ICategory[]>([]);

  // Mock function to fetch categories
  const fetchCategories = async () => {
    // Replace this with your actual API call
    const mockCategories = [
      { id: 1, name: 'Category 1', subcategories: [
        { id: 3, name: 'Subcategory 1', subcategories: [] },
        { id: 4, name: 'Subcategory 2', subcategories: [] },
      ]},
      { id: 2, name: 'Category 2', subcategories: [] },
    ];
    setCategories(mockCategories);
    setSelectedCategoriesBubble(mockCategories[0].subcategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length !== 0) {
      setDone(true);
    }
  }, [categories]);

  const handleCategoryChange = (category: ICategory, checked: boolean): void => {
    const updateSelection = (category: ICategory, select: boolean, selectedIds: string[]): string[] => {
      let updatedSelection = select
        ? [...selectedIds, category.id.toString()]
        : selectedIds.filter((id) => id !== category.id.toString());
      category.subcategories.forEach(subcategory => {
        updatedSelection = updateSelection(subcategory, select, updatedSelection);
      });
      return updatedSelection;
    };

    setSelectedCategories(prevSelected => updateSelection(category, checked, prevSelected));
  };

  const handleCollapseToggle = (categoryId: number): void => {
    setOpenCategories(prevOpen => ({
      ...prevOpen,
      [categoryId]: !prevOpen[categoryId],
    }));
  };

  const renderCategories = (categories: ICategory[]): JSX.Element[] => {
    return categories.map((category) => {
      const isChecked = selectedCategories.includes(category.id.toString());
      const isOpen = openCategories[category.id] || false;

      return (
        <View key={category.id} style={styles.categoryItem}>
          <View style={styles.categoryHeader}>
            {category.subcategories.length > 0 && (
              <TouchableOpacity onPress={() => handleCollapseToggle(category.id)}>
                <Ionicons 
                  name={isOpen ? 'chevron-down' : 'chevron-forward'} 
                  size={24} 
                  color="black" 
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              style={styles.checkbox}
              onPress={() => handleCategoryChange(category, !isChecked)}
            >
              <Ionicons 
                name={isChecked ? 'checkbox' : 'square-outline'} 
                size={24} 
                color="black" 
              />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          </View>

          {category.subcategories.length > 0 && isOpen && (
            <Animated.View style={[
              styles.subcategoriesContainer,
              useAnimatedStyle(() => ({
                height: withTiming(isOpen ? 'auto' : 0),
                opacity: withTiming(isOpen ? 1 : 0),
              }))
            ]}>
              {renderCategories(category.subcategories)}
            </Animated.View>
          )}
        </View>
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {SelectedTypeOfView === "grid" ? (
          <View style={styles.gridContainer}>
            {SelectedCategoriesBubble.map((cat, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleCategoryChange(cat, !selectedCategories.includes(cat.id.toString()))}
                style={[
                  styles.bubble,
                  selectedCategories.includes(cat.id.toString()) && styles.selectedBubble
                ]}
              >
                <Text style={[
                  styles.bubbleText,
                  selectedCategories.includes(cat.id.toString()) && styles.selectedBubbleText
                ]}>
                  + {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.listContainer}>
            {renderCategories(categories)}
          </View>
        )}
      </View>

      {withInfo && (
        <View style={styles.infoContainer}>
          <View style={styles.infoContent}>
            <Ionicons name="information-circle-outline" size={20} style={styles.infoIcon} />
            <Text style={styles.infoTitle}>Info</Text>
          </View>
          <Text style={styles.infoText}>
            Select the categories that you want. You can select multiple categories.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  bubble: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 20,
    padding: 8,
    margin: 4,
  },
  selectedBubble: {
    backgroundColor: '#007AFF',
  },
  bubbleText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  selectedBubbleText: {
    color: 'white',
  },
  listContainer: {
    marginTop: 16,
  },
  categoryItem: {
    marginBottom: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryName: {
    marginLeft: 8,
    fontSize: 16,
  },
  subcategoriesContainer: {
    marginLeft: 24,
  },
  infoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginTop: 24,
    borderRadius: 8,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
});

export default BubblesCategoriesCreateSelector;