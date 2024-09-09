import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Divider } from 'react-native-paper';

const ServicesCard = ({ data }: any) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.title}>Services Offered</Text>
        <Divider style={styles.divider} />
        <View style={styles.infoGrid}>
          {data?.userByPK?.categories.map((category: any) => (
            <View key={category?.id} style={styles.categoryContainer}>
              <Text style={styles.categoryItem}>
                {category?.name}
              </Text>
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
  },
  cardContent: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',  // Darker color for title
    textAlign: 'center',
    marginBottom: 12,
  },
  divider: {
    backgroundColor: '#dcdcdc',
    marginVertical: 10,
    height: 1,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryContainer: {
    backgroundColor: '#f0f0f0',  // Light background for each category
    padding: 10,
    borderRadius: 8,
    margin: 6,
    width: '45%',  // Set a fixed width for better grid alignment
  },
  categoryItem: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default ServicesCard;
