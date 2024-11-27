// import React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// const CreateNewProject = ({
//   setLoading,
//   category,
//   zipCodeRef,
//   categoryForAddOrder,
//   selectedCategoriesRef,
//   queryRef,
//   navigation
// }:any) => {

//   const handleCreateProject = () => {
//     setLoading(true);
//     const data = {
//       title: category,
//       description: '',
//       status: '',
//       images: [],
//       location: zipCodeRef.current,
//       professionals: [],
//       category: encodeURIComponent(
//         JSON.stringify({
//           id: categoryForAddOrder?.id || selectedCategoriesRef.current[0],
//         })
//       ),
//       locationType: '',
//     };

//     // Navigate to the NewOrder screen with parameters
//     navigation.navigate('NewOrder', {
//       title: data.title,
//       description: data.description,
//       status: data.status,
//       images: data.images,
//       location: data.location,
//       professionals: data.professionals,
//       category: data.category,
//       locationType: data.locationType,
//       zipCode: zipCodeRef.current,
//     });
//   };

//   const handleSearchAgain = () => {
//     if (queryRef.current) {
//       queryRef.current.focus();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.buttonRow}>
//         <TouchableOpacity style={styles.createButton} onPress={handleCreateProject}>
//           <Text style={styles.createButtonText}>Create a new project</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.searchButton} onPress={handleSearchAgain}>
//           <Text style={styles.searchButtonText}>Search again</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#FFFFFF', // bg-white
//     padding: 12, // p-3 (assuming p-3 = 12)
//     marginTop: 16, // mt-4 (assuming mt-4 = 16)
//     borderTopWidth: 4, // border-t-4
//     borderTopColor: '#3498db', // border-primary-500 (replace with your primary color)
//     borderRadius: 8, // rounded
//     // Shadow for iOS
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     // Elevation for Android
//     elevation: 5,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     // Since React Native doesn't support 'gap', use margin
//   },
//   createButton: {
//     backgroundColor: '#3498db', // bg-primary-500
//     paddingVertical: 8, // p-2
//     paddingHorizontal: 12,
//     borderRadius: 6, // rounded-md
//     flex: 1,
//     marginRight: 6, // gap-3 divided by 2
//     alignItems: 'center',
//   },
//   createButtonText: {
//     color: '#FFFFFF', // text-white
//     fontWeight: 'bold', // font-bold
//     fontSize: 16,
//   },
//   searchButton: {
//     borderColor: '#3498db', // border-primary-500
//     borderWidth: 2, // border-2
//     paddingVertical: 8, // p-2
//     paddingHorizontal: 12,
//     borderRadius: 6, // rounded-md
//     flex: 1,
//     marginLeft: 6, // gap-3 divided by 2
//     alignItems: 'center',
//   },
//   searchButtonText: {
//     color: '#3498db', // text-primary-500
//     fontWeight: 'bold', // font-bold
//     fontSize: 16,
//   },
// });

// export default CreateNewProject;


// CreateNewProject.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from 'constants/theme';

const CreateNewProject = ({
  setLoading,
  category,
  zipCode,
  categoryForAddOrder,
  selectedCategories,
  queryRef,
  navigation,
}: any) => {
  const handleCreateProject = () => {
    setLoading(true);
    const data: any = {
      title: category,
      description: '',
      status: '',
      images: [],
      location: zipCode,
      professionals: [],
      category: encodeURIComponent(
        JSON.stringify({
          id: categoryForAddOrder?.id || selectedCategories?.[0],
        })
      ),
      locationType: '',
    };
    console.log('data',data);
    
    // Navigate to the NewOrder screen with parameters
    navigation.replace('NewOrderComponent', {
      title: data.title,
      description: data.description,
      status: data.status,
      images: data.images,
      location: data.location,
      professionals: data.professionals,
      category: data.category,
      locationType: data.locationType,
      zipCode: zipCode,
    });
  };

  const handleSearchAgain = () => {
    if (queryRef?.current) {
      queryRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateProject}>
          <Text style={styles.createButtonText}>Create a new project</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchAgain}>
          <Text style={styles.searchButtonText}>Search again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 8,
    borderTopWidth: 4,
    borderTopColor: COLORS.primary,
    borderRadius: 8,
    // Position at the bottom
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 6,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchButton: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
    marginLeft: 6,
    alignItems: 'center',
  },
  searchButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreateNewProject;
