import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Divider } from 'react-native-paper';

const ReviewsCard = ({ sortedReviews, data }: any) => {
  const [viewAllReviews, setViewAllReviews] = useState(false);

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Recent Reviews</Text>
          <Divider style={styles.divider} />
        </View>
        {sortedReviews?.length === 0 ? (
          <Text style={styles.noReviewsText}>No reviews yet.</Text>
        ) : (
          sortedReviews
            ?.slice(0, !viewAllReviews ? 5 : sortedReviews?.length)
            .map((review: any) => (
              <View key={review?.id} style={styles.reviewContainer}>
                <Text style={styles.reviewerName}>
                  {review?.owner?.firstName} {review?.owner?.lastName}
                </Text>
                <Text style={styles.reviewText}>{review?.description}</Text>
                <Divider style={styles.reviewDivider} />
              </View>
            ))
        )}
        {data?.userByPK.reviews?.length > 5 && (
          <TouchableOpacity
            onPress={() => setViewAllReviews(!viewAllReviews)}
            style={styles.viewAllButton}
          >
            <Text style={styles.viewAllText}>
              {viewAllReviews ? 'Show less reviews' : 'View all reviews'}
            </Text>
          </TouchableOpacity>
        )}
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
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50', // Darker color for better contrast
  },
  divider: {
    backgroundColor: '#dcdcdc',
    marginVertical: 10,
    height: 1,
  },
  noReviewsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 20,
  },
  reviewContainer: {
    marginBottom: 2,
    paddingVertical: 4,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  reviewDivider: {
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
    height: 1,
  },
  viewAllButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#007bff', // Blue color for clickable text
    textDecorationLine: 'underline',
  },
});

export default ReviewsCard;
