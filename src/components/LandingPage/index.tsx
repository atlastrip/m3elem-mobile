import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';

const LandingPage = () => {
  // Categories Data
  const categories = [
    { name: 'Home & Garden', icon: 'home' },
    { name: 'Health & Wellbeing', icon: 'heart-outline' },
    { name: 'Weddings & Events', icon: 'gift' },
    { name: 'Business Services', icon: 'briefcase' },
    { name: 'Lessons & Training', icon: 'book' },
    { name: 'Other Services', icon: 'more-horizontal' },
  ];

  // Featured Services Data
  const featuredCategories = [
    {
      name: 'Home & Garden',
      services: [
        {
          name: 'Gardening',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5rF8WaKV9uK7dG9CCCHRDTFP6mIa_PZFNFw&s',
        },
        {
          name: 'House Cleaning',
          img: 'https://images.squarespace-cdn.com/content/v1/57ade0b9e58c6256b36898d4/bdfc5deb-9c4d-4acc-9422-d81e24038126/2.jpg',
        },
        {
          name: 'Painting & Decorating',
          img: 'https://storage.needpix.com/rsynced_images/painting-wall-11291581001pYx.jpg',
        },
      ],
    },
    {
      name: 'Health & Wellbeing',
      services: [
        {
          name: 'Personal Training',
          img: 'https://media.freemalaysiatoday.com/wp-content/uploads/2022/05/personal-trainer-lifestyle-emel-pic-120522-1.jpg',
        },
        {
          name: 'Counselling',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv21Rwu-H-Ssin-RxyFZF-LJyL2NY35wd5ww&s',
        },
        {
          name: 'Massage Therapy',
          img: 'https://vaughanwellness.com/wp-content/uploads/2023/08/image-1.jpeg',
        },
      ],
    },
    {
      name: 'Business Services',
      services: [
        {
          name: 'Web Design',
          img: 'https://www.webdesigncochin.in/wp-content/uploads/2022/06/web-design-companies-in-india.jpg',
        },
        {
          name: 'Accounting',
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2W6NpkKYd78TVlILvKDLyXNztnb5sb-1mIQ&s',
        },
        {
          name: 'Social Media Marketing',
          img: 'https://storage.needpix.com/rsynced_images/digital-marketing-4111002_1280.jpg',
        },
      ],
    },
  ];

  // Testimonials Data
  const featuredTestimonial = {
    body: 'This service exceeded my expectations!',
    author: {
      name: 'Jane Doe',
      handle: 'jane_doe',
    },
  };

  const testimonials = [
    [
      {
        body: 'Amazing experience, highly recommend!',
        author: { name: 'John Smith', handle: 'john_smith' },
      },
      {
        body: 'Professional and timely service.',
        author: { name: 'Alice Johnson', handle: 'alice_j' },
      },
    ],
    [
      {
        body: 'Great quality work!',
        author: { name: 'Mike Brown', handle: 'mike_b' },
      },
      {
        body: 'Very satisfied with the results.',
        author: { name: 'Sara Wilson', handle: 'sara_w' },
      },
    ],
  ];

  // Trusted By Data
  const trustedByText = {
    title: 'Trusted by most Pros in all 50 states',
    description:
      'From plumbing to electrical work, connect with qualified professionals ready to tackle your home improvement needs.',
  };

  // State for Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Handle Form Submission
  const handleSubmit = () => {
    if (zipCode.trim() === '') {
      Alert.alert('Error', 'Please enter a valid zip code.');
      return;
    }
    // Save to session storage equivalent in React Native (using AsyncStorage or similar)
    // For simplicity, we'll use Alert
    Alert.alert(
      'Search Started',
      `Category: ${selectedService}\nZip Code: ${zipCode}`
    );
    setModalVisible(false);
    setZipCode('');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Categories Navigation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Discover Services</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              onPress={() => Alert.alert('Category', category.name)}
            >
              <View style={styles.categoryIcon}>
                {category.name === 'Home & Garden' && (
                  <Ionicons name="home" size={24} color="#fff" />
                )}
                {category.name === 'Health & Wellbeing' && (
                  <Ionicons name="heart-outline" size={24} color="#fff" />
                )}
                {category.name === 'Weddings & Events' && (
                  <Ionicons name="gift" size={24} color="#fff" />
                )}
                {category.name === 'Business Services' && (
                  <Ionicons name="briefcase" size={24} color="#fff" />
                )}
                {category.name === 'Lessons & Training' && (
                  <Ionicons name="book" size={24} color="#fff" />
                )}
                {category.name === 'Other Services' && (
                  <Feather name="more-horizontal" size={24} color="#fff" />
                )}
              </View>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Services */}
      <View style={styles.section}>
        {featuredCategories.map((category, index) => (
          <View key={index} style={styles.featuredCategory}>
            <Text style={styles.featuredCategoryTitle}>{category.name}</Text>
            <View style={styles.servicesGrid}>
              {category.services.map((service, serviceIndex) => (
                <TouchableOpacity
                  key={serviceIndex}
                  style={styles.serviceCard}
                  onPress={() => {
                    setSelectedService(service.name);
                    setModalVisible(true);
                  }}
                >
                  <Image
                    source={{ uri: service.img }}
                    style={styles.serviceImage}
                  />
                  <View style={styles.serviceOverlay}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Ionicons name="arrow-forward" size={16} color="#fff" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Testimonials Section */}
      <View style={styles.section}>
        <Text style={styles.sectionSubtitle}>Testimonials</Text>
        <Text style={styles.sectionHeader}>
          We have worked with thousands of amazing people
        </Text>
        <View style={styles.testimonialsGrid}>
          {/* Featured Testimonial */}
          <View style={styles.featuredTestimonial}>
            <Text style={styles.testimonialText}>
              “{featuredTestimonial.body}”
            </Text>
            <View style={styles.testimonialAuthor}>
              <Text style={styles.authorName}>
                {featuredTestimonial.author.name}
              </Text>
              <Text style={styles.authorHandle}>
                @{featuredTestimonial.author.handle}
              </Text>
            </View>
          </View>
          {/* Other Testimonials */}
          {testimonials.map((group, groupIdx) => (
            <View key={groupIdx} style={styles.testimonialGroup}>
              {group.map((testimonial, idx) => (
                <View key={idx} style={styles.testimonial}>
                  <Text style={styles.testimonialText}>
                    “{testimonial.body}”
                  </Text>
                  <View style={styles.testimonialAuthor}>
                    <Text style={styles.authorName}>
                      {testimonial.author.name}
                    </Text>
                    <Text style={styles.authorHandle}>
                      @{testimonial.author.handle}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Trusted By Section */}
      <View style={styles.section}>
        <View style={styles.trustedByContainer}>
          <View style={styles.trustedByText}>
            <Text style={styles.trustedByTitle}>
              {trustedByText.title}
            </Text>
            <Text style={styles.trustedByDescription}>
              {trustedByText.description}
            </Text>
            <View style={styles.trustedByButtons}>
              <TouchableOpacity
                style={styles.createAccountButton}
                onPress={() =>
                  Alert.alert('Navigate', 'Navigate to Create Account')
                }
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Alert.alert('Navigate', 'Navigate to Join as PRO')}
              >
                <Text style={styles.joinProText}>
                  Join as PRO <Ionicons name="arrow-forward" size={16} color="#000" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.trustedByImage}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/USA_flag_60th.svg',
              }}
              style={styles.usaImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* Zip Code Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setZipCode('');
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Zip Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Zip Code"
              keyboardType="numeric"
              value={zipCode}
              onChangeText={setZipCode}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Start Search</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                setZipCode('');
              }}
            >
              <Feather name="x" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '30%',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    backgroundColor: '#3B82F6',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  featuredCategory: {
    marginBottom: 24,
  },
  featuredCategoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  serviceOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 24,
  },
  testimonialsGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  featuredTestimonial: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 16,
  },
  testimonialText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#374151',
    marginBottom: 12,
  },
  testimonialAuthor: {
    flexDirection: 'column',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  authorHandle: {
    fontSize: 12,
    color: '#6B7280',
  },
  testimonialGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  testimonial: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    marginBottom: 12,
  },
  trustedByContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    justifyContent: 'space-between',
  },
  trustedByText: {
    flex: 1,
    paddingRight: 16,
  },
  trustedByTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
  },
  trustedByDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  trustedByButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createAccountButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginRight: 12,
  },
  joinProText: {
    fontSize: 14,
    color: '#111827',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  trustedByImage: {
    width: 100,
    height: 60,
  },
  usaImage: {
    width: '100%',
    height: '100%',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});

export default LandingPage;
