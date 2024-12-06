// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     Image,
//     Modal,
//     TextInput,
//     Alert,
// } from 'react-native';
// import { Ionicons, Feather } from '@expo/vector-icons';
// import USAsvg from '../UsaSvg';

// const LandingPage = ({
//     selectedService,
//     setSelectedService,
//     zipCode,
//     setZipCode,
//     goToFilter,
// }: any) => {
//     // Categories Data
//     const categories = [
//         { name: 'Home & Garden', icon: 'home' },
//         { name: 'Health & Wellbeing', icon: 'heart-outline' },
//         { name: 'Weddings & Events', icon: 'gift' },
//         { name: 'Business Services', icon: 'briefcase' },
//         { name: 'Lessons & Training', icon: 'book' },
//         { name: 'Other Services', icon: 'more-horizontal' },
//     ];

//     // Featured Services Data
//     const featuredCategories = [
//         {
//             name: 'Home & Garden',
//             services: [
//                 {
//                     name: 'Roofing',
//                     img:
//                         'https://plus.unsplash.com/premium_photo-1682617326551-4749611516f6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9vZmluZ3xlbnwwfHwwfHx8MA%3D%3D',
//                 },
//                 {
//                     name: 'Gardening',
//                     img:
//                         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5rF8WaKV9uK7dG9CCCHRDTFP6mIa_PZFNFw&s',
//                 },
//                 {
//                     name: 'House Cleaning',
//                     img:
//                         'https://images.squarespace-cdn.com/content/v1/57ade0b9e58c6256b36898d4/bdfc5deb-9c4d-4acc-9422-d81e24038126/2.jpg',
//                 },
//             ],
//         },
//         {
//             name: 'Health & Wellbeing',
//             services: [
//                 {
//                     name: 'Personal Training',
//                     img:
//                         'https://media.freemalaysiatoday.com/wp-content/uploads/2022/05/personal-trainer-lifestyle-emel-pic-120522-1.jpg',
//                 },
//                 {
//                     name: 'Counselling',
//                     img:
//                         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv21Rwu-H-Ssin-RxyFZF-LJyL2NY35wd5ww&s',
//                 },
//                 {
//                     name: 'Massage Therapy',
//                     img:
//                         'https://vaughanwellness.com/wp-content/uploads/2023/08/image-1.jpeg',
//                 },
//             ],
//         },
//         {
//             name: 'Business Services',
//             services: [
//                 {
//                     name: 'Web Design',
//                     img:
//                         'https://www.webdesigncochin.in/wp-content/uploads/2022/06/web-design-companies-in-india.jpg',
//                 },
//                 {
//                     name: 'Accounting',
//                     img:
//                         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2W6NpkKYd78TVlILvKDLyXNztnb5sb-1mIQ&s',
//                 },
//                 {
//                     name: 'Social Media Marketing',
//                     img:
//                         'https://storage.needpix.com/rsynced_images/digital-marketing-4111002_1280.jpg',
//                 },
//             ],
//         },
//     ];

//     // Updated Testimonials Data (Fixed structure)
//     const featuredTestimonial = {
//         body: 'A House Guru made my home renovation project so much easier! Finding a reliable contractor has always been a headache, but with their platform, I found someone trustworthy and professional within a few days. The verification process gave me peace of mind, and the entire project was completed on time and within budget. I’ll definitely use A House Guru for my next project!',
//         author: {
//             name: 'Sarah T.',
//             handle: 'homeowner',
//             imageUrl: '', // Empty string to simulate missing image
//         },
//     };

//     const testimonials: any = [
//         [
//             {
//                 body: 'I’ve been in the industry for 15 years, and A House Guru is by far the best platform I’ve used. The quality of leads is excellent, and the transparency helps me build trust with clients from the start. It’s helped grow my business in ways I didn’t expect. I’m getting more jobs now than ever!',
//                 author: {
//                     name: 'Luis G.',
//                     handle: 'handyman',
//                     imageUrl: '', // Empty string to simulate missing image
//                 },
//             },
//             {
//                 body: 'I was nervous about hiring someone to repair my roof, but A House Guru made the process so smooth. The platform helped me compare professionals, and I felt reassured knowing they were vetted. The roofer I hired was fantastic – punctual, professional, and did great work. Highly recommend!',
//                 author: {
//                     name: 'Emily S.',
//                     handle: 'homeowner',
//                     imageUrl: '', // Empty string to simulate missing image
//                 },
//             },
//         ],
//         [
//             {
//                 body: 'I used A House Guru to find a painter for my home, and I couldn’t be happier with the results. I loved that I could see reviews, ratings, and even get a cost estimate before hiring anyone. The pro I hired was professional, and the work was flawless. Thank you, A House Guru, for making it so easy!',
//                 author: {
//                     name: 'Monica H.',
//                     handle: 'homeowner',
//                     imageUrl: '', // Empty string to simulate missing image
//                 },
//             },
//         ],
//         [
//             {
//                 body: 'As a contractor, A House Guru has been a game-changer for my business. They connect me with clients who are serious about getting the job done, and the leads I receive are always verified. I’ve never had to deal with time-wasters or scams. Plus, the platform\'s ease of use means I can focus on my work instead of chasing leads.',
//                 author: {
//                     name: 'James R.',
//                     handle: 'contractor',
//                     imageUrl: '', // Empty string to simulate missing image
//                 },
//             },
//         ],
//         [
//             {
//                 body: 'The best thing about A House Guru is the trust they’ve built between homeowners and professionals like me. Every job I’ve been connected with has led to positive outcomes. The platform is simple to use, and the customer support team is always helpful if I need anything. Highly recommended for contractors looking for good, solid leads.',
//                 author: {
//                     name: 'David W.',
//                     handle: 'contractor',
//                     imageUrl: '', // Empty string to simulate missing image
//                 },
//             },
//             {
//                 body: 'I’ve been using A House Guru for over a year now, and it’s one of the best investments I’ve made for my business. I get regular leads, and the clients are always easy to work with because they trust the platform’s verification process. It’s helped me stay busy and grow my team!',
//                 author: {
//                     name: 'Kevin M.',
//                     handle: 'contractor',
//                     imageUrl: '', // Empty string to simulate missing image
//                 },
//             },
//         ],
//     ];

//     // Trusted By Data
//     const trustedByText = {
//         title: 'Trusted by most Pros in all 50 states',
//         description:
//             'From plumbing to electrical work, connect with qualified professionals ready to tackle your home improvement needs.',
//     };

//     // State for Zip Code Modal
//     const [modalVisible, setModalVisible] = useState(false);
//     const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null); // State for Testimonial Modal

//     // Handle Zip Code Form Submission
//     const handleSubmit = () => {
//         if (zipCode.trim() === '') {
//             Alert.alert('Error', 'Please enter a valid zip code.');
//             return;
//         }
//         // Proceed with search/filter action
//         goToFilter();
//         setModalVisible(false);
//     };

//     const handleStatePress = (stateId: any) => {
//         Alert.alert('State Pressed', `You pressed state: ${stateId}`);
//     };

//     // Function to open Testimonial Modal
//     const openTestimonialModal = (testimonial: any) => {
//         setSelectedTestimonial(testimonial);
//     };

//     // Function to close Testimonial Modal
//     const closeTestimonialModal = () => {
//         setSelectedTestimonial(null);
//     };

//     // Custom Image Component to handle image loading errors
//     const CustomImage = ({ uri, style }: any) => {
//         const [error, setError] = useState(false);
//         return error || !uri ? (
//             <View style={[style, styles.placeholderBackground]}>
//                 <Ionicons name="person-circle-outline" size={style.width || 40} color="#ccc" />
//             </View>
//         ) : (
//             <Image
//                 source={{ uri }}
//                 style={style}
//                 onError={() => setError(true)}
//             />
//         );
//     };

//     return (
//         <ScrollView style={styles.container}>
//             {/* Featured Services */}
//             <View style={styles.section}>
//                 {featuredCategories.map((category, index) => (
//                     <View key={index} style={styles.featuredCategory}>
//                         <Text style={styles.featuredCategoryTitle}>{category.name}</Text>
//                         <View style={styles.servicesGrid}>
//                             {category.services.map((service, serviceIndex) => (
//                                 <TouchableOpacity
//                                     key={serviceIndex}
//                                     style={styles.serviceCard}
//                                     onPress={() => {
//                                         setSelectedService(service.name);
//                                         setModalVisible(true);
//                                     }}
//                                 >
//                                     <Image
//                                         source={{ uri: service.img }}
//                                         style={styles.serviceImage}
//                                     />
//                                     <View style={styles.serviceOverlay}>
//                                         <Text style={styles.serviceName}>{service.name}</Text>
//                                         <Ionicons name="arrow-forward" size={16} color="#fff" />
//                                     </View>
//                                 </TouchableOpacity>
//                             ))}
//                         </View>
//                     </View>
//                 ))}
//             </View>

//             {/* Testimonials Section */}
//             <View style={styles.section}>
//                 <Text style={styles.sectionSubtitle}>Testimonials</Text>
//                 <Text style={styles.sectionHeader}>
//                     We have worked with thousands of amazing people
//                 </Text>
//                 <View style={styles.testimonialsGrid}>
//                     {/* Featured Testimonial */}
//                     <TouchableOpacity
//                         style={styles.featuredTestimonial}
//                         onPress={() => openTestimonialModal(featuredTestimonial)}
//                     >
//                         <Text style={styles.testimonialText}>
//                             “{featuredTestimonial?.body?.length > 100
//                                 ? `${featuredTestimonial?.body.substring(0, 100)}...`
//                                 : featuredTestimonial?.body}”
//                         </Text>
//                         <View style={styles.testimonialAuthor}>
//                             <CustomImage
//                                 uri={featuredTestimonial?.author?.imageUrl}
//                                 style={styles.authorImage}
//                             />
//                             <View style={{ marginLeft: 8 }}>
//                                 <Text style={styles.authorName}>
//                                     {featuredTestimonial?.author?.name}
//                                 </Text>
//                                 <Text style={styles.authorHandle}>
//                                     @{featuredTestimonial?.author?.handle}
//                                 </Text>
//                             </View>
//                         </View>
//                         {featuredTestimonial?.body?.length > 100 && (
//                             <Text style={styles.readMoreText}>Read More</Text>
//                         )}
//                     </TouchableOpacity>
//                     {/* Other Testimonials */}
//                     {testimonials.map((group: any, groupIdx: any) => (
//                         <View key={groupIdx} style={styles.testimonialGroup}>
//                             {group.map((testimonial: any, idx: any) => (
//                                 <TouchableOpacity
//                                     key={idx}
//                                     style={styles.testimonial}
//                                     onPress={() => openTestimonialModal(testimonial)}
//                                 >
//                                     <Text style={styles.testimonialText}>
//                                         “{testimonial.body?.length > 100
//                                             ? `${testimonial.body.substring(0, 100)}...`
//                                             : testimonial.body}”
//                                     </Text>
//                                     <View style={styles.testimonialAuthor}>
//                                         <CustomImage
//                                             uri={testimonial?.author?.imageUrl}
//                                             style={styles.authorImage}
//                                         />
//                                         <View style={{ marginLeft: 8 }}>
//                                             <Text style={styles.authorName}>
//                                                 {testimonial?.author?.name}
//                                             </Text>
//                                             <Text style={styles.authorHandle}>
//                                                 @{testimonial?.author?.handle}
//                                             </Text>
//                                         </View>
//                                     </View>
//                                     {testimonial.body?.length > 100 && (
//                                         <Text style={styles.readMoreText}>Read More</Text>
//                                     )}
//                                 </TouchableOpacity>
//                             ))}
//                         </View>
//                     ))}
//                 </View>
//             </View>

//             {/* Trusted By Section */}
//             <View style={styles.section}>
//                 <View style={styles.trustedByContainer}>
//                     <View style={styles.trustedByText}>
//                         <Text style={styles.trustedByTitle}>
//                             {trustedByText.title}
//                         </Text>
//                         <Text style={styles.trustedByDescription}>
//                             {trustedByText.description}
//                         </Text>
//                     </View>
//                     <View style={styles.trustedByImage}>
//                         <USAsvg width={100} height={60} onStatePress={handleStatePress} />
//                     </View>
//                 </View>
//             </View>

//             {/* Zip Code Modal */}
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => {
//                     setModalVisible(false);
//                     setZipCode('');
//                 }}
//             >
//                 <View style={styles.modalBackground}>
//                     <View style={styles.modalContainer}>
//                         <Text style={styles.modalTitle}>Enter Zip Code</Text>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Zip Code"
//                             keyboardType="numeric"
//                             value={zipCode}
//                             onChangeText={setZipCode}
//                         />
//                         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//                             <Text style={styles.buttonText}>Start Search</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={styles.closeButton}
//                             onPress={() => {
//                                 setModalVisible(false);
//                                 setZipCode('');
//                             }}
//                         >
//                             <Feather name="x" size={24} color="#000" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>

//             {/* Testimonial Detail Modal */}
//             {selectedTestimonial && (
//                 <Modal
//                     animationType="fade"
//                     transparent={true}
//                     visible={!!selectedTestimonial}
//                     onRequestClose={closeTestimonialModal}
//                 >
//                     <View style={styles.modalBackground}>
//                         <View style={styles.testimonialModalContainer}>
//                             <TouchableOpacity
//                                 style={styles.closeButton}
//                                 onPress={closeTestimonialModal}
//                             >
//                                 <Feather name="x" size={24} color="#000" />
//                             </TouchableOpacity>
//                             <Text style={styles.testimonialModalText}>
//                                 “{selectedTestimonial.body}”
//                             </Text>
//                             <View style={styles.testimonialModalAuthor}>
//                                 <CustomImage
//                                     uri={selectedTestimonial?.author?.imageUrl}
//                                     style={styles.authorImage}
//                                 />
//                                 <View style={{ marginLeft: 8 }}>
//                                     <Text style={styles.authorName}>
//                                         {selectedTestimonial?.author?.name}
//                                     </Text>
//                                     <Text style={styles.authorHandle}>
//                                         @{selectedTestimonial?.author?.handle}
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>
//                     </View>
//                 </Modal>
//             )}
//         </ScrollView>
//     );
// };

// // Styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F3F4F6',
//     },
//     section: {
//         padding: 16,
//     },
//     sectionTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     },
//     categoriesGrid: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//     },
//     categoryCard: {
//         width: '30%',
//         backgroundColor: '#E5E7EB',
//         borderRadius: 8,
//         padding: 16,
//         alignItems: 'center',
//         marginBottom: 12,
//     },
//     categoryIcon: {
//         backgroundColor: '#3B82F6',
//         width: 48,
//         height: 48,
//         borderRadius: 24,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 8,
//     },
//     categoryText: {
//         textAlign: 'center',
//         fontSize: 14,
//         fontWeight: '500',
//     },
//     featuredCategory: {
//         marginBottom: 24,
//     },
//     featuredCategoryTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 12,
//     },
//     servicesGrid: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//     },
//     serviceCard: {
//         width: '48%',
//         height: 150,
//         borderRadius: 8,
//         overflow: 'hidden',
//         marginBottom: 12,
//     },
//     serviceImage: {
//         width: '100%',
//         height: '100%',
//     },
//     serviceOverlay: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         padding: 8,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     serviceName: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     sectionSubtitle: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#3B82F6',
//         textAlign: 'center',
//         marginBottom: 8,
//     },
//     sectionHeader: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         color: '#111827',
//         marginBottom: 24,
//     },
//     testimonialsGrid: {
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     featuredTestimonial: {
//         backgroundColor: '#fff',
//         padding: 16,
//         borderRadius: 12,
//         width: '90%',
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 10,
//         marginBottom: 16,
//     },
//     testimonialText: {
//         fontSize: 16,
//         fontStyle: 'italic',
//         color: '#374151',
//         marginBottom: 12,
//     },
//     testimonialAuthor: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     authorImage: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         backgroundColor: '#f0f0f0',
//     },
//     placeholderBackground: {
//         backgroundColor: '#f0f0f0',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     authorName: {
//         fontSize: 14,
//         fontWeight: '600',
//         color: '#111827',
//     },
//     authorHandle: {
//         fontSize: 12,
//         color: '#6B7280',
//     },
//     readMoreText: {
//         color: '#3B82F6',
//         marginTop: 8,
//         fontWeight: '500',
//     },
//     testimonialGroup: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '90%',
//     },
//     testimonial: {
//         backgroundColor: '#fff',
//         padding: 12,
//         borderRadius: 12,
//         width: '48%',
//         shadowColor: '#000',
//         shadowOpacity: 0.05,
//         shadowRadius: 5,
//         marginBottom: 12,
//     },
//     trustedByContainer: {
//         flexDirection: 'row',
//         backgroundColor: '#fff',
//         borderRadius: 12,
//         padding: 16,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOpacity: 0.05,
//         shadowRadius: 5,
//         justifyContent: 'space-between',
//     },
//     trustedByText: {
//         flex: 1,
//         paddingRight: 16,
//     },
//     trustedByTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 8,
//         color: '#111827',
//     },
//     trustedByDescription: {
//         fontSize: 14,
//         color: '#6B7280',
//         marginBottom: 16,
//     },
//     trustedByButtons: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     createAccountButton: {
//         backgroundColor: '#3B82F6',
//         paddingVertical: 8,
//         paddingHorizontal: 16,
//         borderRadius: 6,
//         marginRight: 12,
//     },
//     joinProText: {
//         fontSize: 14,
//         color: '#111827',
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: '600',
//     },
//     trustedByImage: {
//         width: 100,
//         height: 60,
//     },
//     usaImage: {
//         width: '100%',
//         height: '100%',
//     },
//     modalBackground: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalContainer: {
//         width: '80%',
//         backgroundColor: '#fff',
//         borderRadius: 12,
//         padding: 24,
//         alignItems: 'center',
//         position: 'relative',
//     },
//     testimonialModalContainer: {
//         width: '85%',
//         backgroundColor: '#fff',
//         borderRadius: 12,
//         padding: 24,
//         alignItems: 'center',
//         position: 'relative',
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: '600',
//         marginBottom: 16,
//     },
//     testimonialModalText: {
//         fontSize: 16,
//         fontStyle: 'italic',
//         color: '#374151',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     testimonialModalAuthor: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     input: {
//         width: '100%',
//         borderColor: '#D1D5DB',
//         borderWidth: 1,
//         borderRadius: 8,
//         padding: 12,
//         marginBottom: 16,
//     },
//     submitButton: {
//         backgroundColor: '#3B82F6',
//         paddingVertical: 12,
//         paddingHorizontal: 24,
//         borderRadius: 8,
//         width: '100%',
//         alignItems: 'center',
//     },
//     closeButton: {
//         position: 'absolute',
//         top: 12,
//         right: 12,
//     },
// });

// export default LandingPage;

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
import { Ionicons, Feather } from '@expo/vector-icons';
import USAsvg from '../UsaSvg';

const LandingPage = ({
    selectedService,
    setSelectedService,
    zipCode,
    setZipCode,
    goToFilter,
}: any) => {
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
                    name: 'Roofing',
                    img:
                        'https://plus.unsplash.com/premium_photo-1682617326551-4749611516f6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9vZmluZ3xlbnwwfHwwfHx8MA%3D%3D',
                },
                {
                    name: 'Gardening',
                    img:
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5rF8WaKV9uK7dG9CCCHRDTFP6mIa_PZFNFw&s',
                },
                {
                    name: 'House Cleaning',
                    img:
                        'https://images.squarespace-cdn.com/content/v1/57ade0b9e58c6256b36898d4/bdfc5deb-9c4d-4acc-9422-d81e24038126/2.jpg',
                },
            ],
        },
        {
            name: 'Health & Wellbeing',
            services: [
                {
                    name: 'Personal Training',
                    img:
                        'https://media.freemalaysiatoday.com/wp-content/uploads/2022/05/personal-trainer-lifestyle-emel-pic-120522-1.jpg',
                },
                {
                    name: 'Counselling',
                    img:
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv21Rwu-H-Ssin-RxyFZF-LJyL2NY35wd5ww&s',
                },
                {
                    name: 'Massage Therapy',
                    img:
                        'https://vaughanwellness.com/wp-content/uploads/2023/08/image-1.jpeg',
                },
            ],
        },
        {
            name: 'Business Services',
            services: [
                {
                    name: 'Web Design',
                    img:
                        'https://www.webdesigncochin.in/wp-content/uploads/2022/06/web-design-companies-in-india.jpg',
                },
                {
                    name: 'Accounting',
                    img:
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2W6NpkKYd78TVlILvKDLyXNztnb5sb-1mIQ&s',
                },
                {
                    name: 'Social Media Marketing',
                    img:
                        'https://storage.needpix.com/rsynced_images/digital-marketing-4111002_1280.jpg',
                },
            ],
        },
    ];

    // Updated Testimonials Data (Fixed structure)
    const featuredTestimonial = {
        body: "A House Guru made my home renovation project so much easier! Finding a reliable contractor has always been a headache, but with their platform, I found someone trustworthy and professional within a few days. The verification process gave me peace of mind, and the entire project was completed on time and within budget. I'll definitely use A House Guru for my next project!",
        author: {
            name: 'Sarah T.',
            handle: 'homeowner',
            imageUrl: '', // Empty string to simulate missing image
        },
    };

    const testimonials = [
        {
            body: "I've been in the industry for 15 years, and A House Guru is by far the best platform I've used. The quality of leads is excellent, and the transparency helps me build trust with clients from the start. It's helped grow my business in ways I didn't expect. I'm getting more jobs now than ever!",
            author: {
                name: 'Luis G.',
                handle: 'handyman',
                imageUrl: '', // Empty string to simulate missing image
            },
        },
        {
            body: 'I was nervous about hiring someone to repair my roof, but A House Guru made the process so smooth. The platform helped me compare professionals, and I felt reassured knowing they were vetted. The roofer I hired was fantastic – punctual, professional, and did great work. Highly recommend!',
            author: {
                name: 'Emily S.',
                handle: 'homeowner',
                imageUrl: '', // Empty string to simulate missing image
            },
        },
        {
            body: "I used A House Guru to find a painter for my home, and I couldn't be happier with the results. I loved that I could see reviews, ratings, and even get a cost estimate before hiring anyone. The pro I hired was professional, and the work was flawless. Thank you, A House Guru, for making it so easy!",
            author: {
                name: 'Monica H.',
                handle: 'homeowner',
                imageUrl: '', // Empty string to simulate missing image
            },
        },
        {
            body: "As a contractor, A House Guru has been a game-changer for my business. They connect me with clients who are serious about getting the job done, and the leads I receive are always verified. I've never had to deal with time-wasters or scams. Plus, the platform\'s ease of use means I can focus on my work instead of chasing leads.",
            author: {
                name: 'James R.',
                handle: 'contractor',
                imageUrl: '', // Empty string to simulate missing image
            },
        },
        {
            body: "The best thing about A House Guru is the trust they've built between homeowners and professionals like me. Every job I've been connected with has led to positive outcomes. The platform is simple to use, and the customer support team is always helpful if I need anything. Highly recommended for contractors looking for good, solid leads.",
            author: {
                name: 'David W.',
                handle: 'contractor',
                imageUrl: '', // Empty string to simulate missing image
            },
        },
        {
            body: "I've been using A House Guru for over a year now, and it's one of the best investments I've made for my business. I get regular leads, and the clients are always easy to work with because they trust the platform's verification process. It's helped me stay busy and grow my team!",
            author: {
                name: 'Kevin M.',
                handle: 'contractor',
                imageUrl: '', // Empty string to simulate missing image
            },
        },
    ];

    // Trusted By Data
    const trustedByText = {
        title: 'Trusted by most Pros in all 50 states',
        description:
            'From plumbing to electrical work, connect with qualified professionals ready to tackle your home improvement needs.',
    };

    // State for Zip Code Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null); // State for Testimonial Modal

    // Handle Zip Code Form Submission
    const handleSubmit = () => {
        if (zipCode.trim() === '') {
            Alert.alert('Error', 'Please enter a valid zip code.');
            return;
        }
        // Proceed with search/filter action
        goToFilter();
        setModalVisible(false);
    };

    const handleStatePress = (stateId: any) => {
        Alert.alert('State Pressed', `You pressed state: ${stateId}`);
    };

    // Function to open Testimonial Modal
    const openTestimonialModal = (testimonial: any) => {
        setSelectedTestimonial(testimonial);
    };

    // Function to close Testimonial Modal
    const closeTestimonialModal = () => {
        setSelectedTestimonial(null);
    };

    // Custom Image Component to handle image loading errors
    const CustomImage = ({ uri, style }: any) => {
        const [error, setError] = useState(false);
        return error || !uri ? (
            <View style={[style, styles.placeholderBackground]}>
                <Ionicons name="person-circle-outline" size={style.width || 40} color="#ccc" />
            </View>
        ) : (
            <Image
                source={{ uri }}
                style={style}
                onError={() => setError(true)}
            />
        );
    };

    return (
        <ScrollView style={styles.container}>
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
                    <TouchableOpacity
                        style={styles.featuredTestimonial}
                        onPress={() => openTestimonialModal(featuredTestimonial)}
                    >
                        <Text style={styles.testimonialText}>
                            "{featuredTestimonial?.body?.length > 100
                                ? `${featuredTestimonial?.body.substring(0, 100)}...`
                                : featuredTestimonial?.body}"
                        </Text>
                        <View style={styles.testimonialAuthor}>
                            <CustomImage
                                uri={featuredTestimonial?.author?.imageUrl}
                                style={styles.authorImage}
                            />
                            <View style={{ marginLeft: 8 }}>
                                <Text style={styles.authorName}>
                                    {featuredTestimonial?.author?.name}
                                </Text>
                                <Text style={styles.authorHandle}>
                                    @{featuredTestimonial?.author?.handle}
                                </Text>
                            </View>
                        </View>
                        {featuredTestimonial?.body?.length > 100 && (
                            <Text style={styles.readMoreText}>Read More</Text>
                        )}
                    </TouchableOpacity>
                    {/* Other Testimonials */}
                    <View style={styles.otherTestimonials}>
                        {testimonials.map((testimonial, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={styles.testimonial}
                                onPress={() => openTestimonialModal(testimonial)}
                            >
                                <Text style={styles.testimonialText}>
                                    "{testimonial.body?.length > 100
                                        ? `${testimonial.body.substring(0, 100)}...`
                                        : testimonial.body}"
                                </Text>
                                <View style={styles.testimonialAuthor}>
                                    <CustomImage
                                        uri={testimonial?.author?.imageUrl}
                                        style={styles.authorImage}
                                    />
                                    <View style={{ marginLeft: 8 }}>
                                        <Text style={styles.authorName}>
                                            {testimonial?.author?.name}
                                        </Text>
                                        <Text style={styles.authorHandle}>
                                            @{testimonial?.author?.handle}
                                        </Text>
                                    </View>
                                </View>
                                {testimonial.body?.length > 100 && (
                                    <Text style={styles.readMoreText}>Read More</Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
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
                    </View>
                    <View style={styles.trustedByImage}>
                        <USAsvg width={100} height={60} onStatePress={handleStatePress} />
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

            {/* Testimonial Detail Modal */}
            {selectedTestimonial && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={!!selectedTestimonial}
                    onRequestClose={closeTestimonialModal}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.testimonialModalContainer}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={closeTestimonialModal}
                            >
                                <Feather name="x" size={24} color="#000" />
                            </TouchableOpacity>
                            <Text style={styles.testimonialModalText}>
                                "{selectedTestimonial.body}"
                            </Text>
                            <View style={styles.testimonialModalAuthor}>
                                <CustomImage
                                    uri={selectedTestimonial?.author?.imageUrl}
                                    style={styles.authorImage}
                                />
                                <View style={{ marginLeft: 8 }}>
                                    <Text style={styles.authorName}>
                                        {selectedTestimonial?.author?.name}
                                    </Text>
                                    <Text style={styles.authorHandle}>
                                        @{selectedTestimonial?.author?.handle}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
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
        alignItems: 'stretch',
    },
    featuredTestimonial: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        width: '100%',
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    placeholderBackground: {
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
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
    readMoreText: {
        color: '#3B82F6',
        marginTop: 8,
        fontWeight: '500',
    },
    otherTestimonials: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    testimonial: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        width: '48%',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        marginBottom: 16,
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
    testimonialModalContainer: {
        width: '85%',
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
    testimonialModalText: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#374151',
        marginBottom: 20,
        textAlign: 'center',
    },
    testimonialModalAuthor: {
        flexDirection: 'row',
        alignItems: 'center',
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

