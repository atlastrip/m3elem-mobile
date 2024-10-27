// import React, { useState, useEffect } from "react";
// import {
//     View,
//     Text,
//     ActivityIndicator,
//     Image,
//     Alert,
//     TouchableOpacity,
//     ScrollView,
//     Linking,
// } from "react-native";
// import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
// import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
// import Constants from "expo-constants";
// import tw from "twrnc";
// import { getToken } from "@/helpers/getToken";
// import { storage } from "../../firebase/index";

// const UploadDocs = ({ dataDocs }: any) => {
//     const [files, setFiles] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [uploadedFiles, setUploadedFiles] = useState([]);

//     console.log("dataDocs", dataDocs);

//     const detectFileType = (file: any) => {
//         const { type, name } = file;
//         if (type && type !== "application/octet-stream") return type;

//         const extension = name.split(".").pop().toLowerCase();
//         switch (extension) {
//             case "jpg":
//             case "jpeg":
//                 return "image/jpeg";
//             case "png":
//                 return "image/png";
//             case "gif":
//                 return "image/gif";
//             case "pdf":
//                 return "application/pdf";
//             case "doc":
//                 return "application/msword";
//             case "docx":
//                 return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
//             case "mp4":
//                 return "video/mp4";
//             case "mov":
//                 return "video/quicktime";
//             case "avi":
//                 return "video/x-msvideo";
//             default:
//                 return "application/octet-stream";
//         }
//     };

//     const fetchUserData = async () => {
//         setLoading(true);
//         const token = await getToken();
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);

//         try {
//             const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: "POST",
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//             query getUserData {
//               user {
//                 documents {
//                   url
//                   type
//                 }
//               }
//             }
//           `,
//                 }),
//             });

//             const data = await response.json();
//             setUploadedFiles(data?.data?.user?.documents || []);
//         } catch (error) {
//             console.error("Error fetching user data:", error);
//             Alert.alert("Error", "Failed to load user documents.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUserData();
//     }, []);

//     const handleFileSelection = async () => {
//         const result = await launchImageLibraryAsync({
//             mediaTypes: MediaTypeOptions.All,
//             allowsMultipleSelection: true,
//             quality: 1,
//         });

//         if (!result.canceled) {
//             const selectedFiles: any = result.assets.map((asset) => ({
//                 uri: asset.uri,
//                 name: asset.uri.split("/").pop(),
//                 type:
//                     asset.type ||
//                     detectFileType({ name: asset.uri.split("/").pop() }),
//             }));
//             setFiles(selectedFiles);
//         }
//     };

//     const uploadFilesToBackend = async () => {
//         if (files.length === 0) {
//             Alert.alert("No files selected", "Please select files to upload.");
//             return;
//         }

//         setLoading(true);

//         try {
//             const token = await getToken();
//             const headers = new Headers();
//             headers.append("Content-Type", "application/json");
//             headers.append("Authorization", `Bearer ${token}`);

//             const uploadPromises = files.map((file: any) => {
//                 const fileType = detectFileType(file);

//                 return new Promise((resolve, reject) => {
//                     const storageRef = ref(storage, `documents/${file.name}`);

//                     // Fetch the file from the local URI
//                     fetch(file.uri)
//                         .then((res) => res.blob())
//                         .then((blob) => {
//                             // Upload the blob to Firebase Storage
//                             const uploadTask = uploadBytesResumable(storageRef, blob, {
//                                 contentType: fileType,
//                             });

//                             uploadTask.on(
//                                 "state_changed",
//                                 (snapshot) => {
//                                     const progress =
//                                         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                                     console.log(`Upload is ${progress}% done`);
//                                 },
//                                 (error) => {
//                                     console.error("Error during upload:", error);
//                                     reject(error);
//                                 },
//                                 async () => {
//                                     const downloadURL = await getDownloadURL(
//                                         uploadTask.snapshot.ref
//                                     );

//                                     const response = await fetch(
//                                         Constants.expoConfig?.extra?.apiUrl,
//                                         {
//                                             method: "POST",
//                                             headers,
//                                             body: JSON.stringify({
//                                                 query: `
//                           mutation createDocs($input: inputDocs) {
//                             createDocs(input: $input) {
//                               id
//                               url
//                               type
//                             }
//                           }
//                         `,
//                                                 variables: {
//                                                     input: { url: downloadURL, type: fileType },
//                                                 },
//                                             }),
//                                         }
//                                     );

//                                     const result = await response.json();
//                                     resolve(result?.data?.createDocs);
//                                 }
//                             );
//                         })
//                         .catch((error) => {
//                             console.error("Error fetching file:", error);
//                             reject(error);
//                         });
//                 });
//             });

//             const uploadedFilesData = await Promise.all(uploadPromises);
//             const newUrlsToSave = uploadedFilesData.map((file: any) => file.id);

//             // Update documents on the server
//             await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: "POST",
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//             mutation updateDocsArtisant($input: inputDocsArtisant) {
//               updateDocsArtisant(input: $input)
//             }
//           `,
//                     variables: {
//                         input: { documents: newUrlsToSave },
//                     },
//                 }),
//             });

//             await fetchUserData(); // Reload files after upload
//             setFiles([]);
//             Alert.alert("Success", "Files uploaded successfully.");
//         } catch (error) {
//             console.error("Error uploading files:", error);
//             Alert.alert("Upload Failed", "Error uploading files.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const renderUploadedFile = (file: any, index: any) => {
//         if (file.type.startsWith("image")) {
//             return (
//                 <Image
//                     key={index}
//                     source={{ uri: file.url }}
//                     style={tw`w-full h-40 rounded-md`}
//                 />
//             );
//         } else if (file.type.startsWith("video")) {
//             return (
//                 <TouchableOpacity key={index} onPress={() => openFile(file.url)}>
//                     <Text style={tw`text-blue-500 underline`}>
//                         Play Video {index + 1}
//                     </Text>
//                 </TouchableOpacity>
//             );
//         } else {
//             return (
//                 <TouchableOpacity key={index} onPress={() => openFile(file.url)}>
//                     <Text style={tw`text-blue-500 underline`}>
//                         Open Document {index + 1}
//                     </Text>
//                 </TouchableOpacity>
//             );
//         }
//     };

//     return (
//         <ScrollView style={tw`w-full`}>
//             <View style={tw`p-4`}>
//                 <Text style={tw`text-2xl font-bold mb-4`}>Upload Documents</Text>

//                 {/* File Selection Button */}
//                 <TouchableOpacity
//                     onPress={handleFileSelection}
//                     style={tw`bg-blue-500 text-white px-4 py-2 rounded-md mb-4`}
//                 >
//                     <Text style={tw`text-white text-center`}>Select Files</Text>
//                 </TouchableOpacity>

//                 {/* Upload Button */}
//                 <TouchableOpacity
//                     onPress={uploadFilesToBackend}
//                     style={tw`bg-green-500 text-white px-4 py-2 rounded-md mb-4`}
//                     disabled={loading}
//                 >
//                     <Text style={tw`text-white text-center`}>
//                         {loading ? "Uploading..." : "Upload Files"}
//                     </Text>
//                 </TouchableOpacity>

//                 {/* Loading Indicator */}
//                 {loading && (
//                     <View style={tw`justify-center items-center`}>
//                         <ActivityIndicator size="large" color="#4CAF50" />
//                     </View>
//                 )}

//                 {/* Uploaded Files Section */}
//                 <View style={tw`mt-6`}>
//                     <Text style={tw`text-lg font-semibold mb-4`}>Uploaded Files</Text>
//                     {uploadedFiles.length > 0 ? (
//                         uploadedFiles.map((file, index) => (
//                             <View
//                                 key={index}
//                                 style={tw`border p-2 rounded-md bg-gray-50 mb-2`}
//                             >
//                                 {renderUploadedFile(file, index)}
//                             </View>
//                         ))
//                     ) : (
//                         <Text>No files uploaded yet.</Text>
//                     )}
//                 </View>
//             </View>

//             {/* Info Section */}
//             <View style={tw`hidden sm:flex w-1/3 border-l border-gray-200 p-4`}>
//                 <View style={tw`bg-gray-50 p-3 rounded-md`}>
//                     <Text style={tw`text-lg font-semibold`}>Info</Text>
//                     <Text style={tw`mt-3 text-sm`}>
//                         This page allows you to upload documents like diplomas. Get verified
//                         to unlock more leads. Customers trust our verified professionals
//                         more!
//                     </Text>
//                 </View>
//             </View>
//         </ScrollView>
//     );
// };

// export default UploadDocs;

// // Helper to open files
// const openFile = (url: any) => {
//     if (url) {
//         Linking.canOpenURL(url)
//             .then((supported) => {
//                 if (supported) {
//                     Linking.openURL(url);
//                 } else {
//                     Alert.alert("Error", "Cannot open the file URL.");
//                 }
//             })
//             .catch((err) =>
//                 console.error("An error occurred while opening the file:", err)
//             );
//     } else {
//         Alert.alert("Invalid URL", "Cannot open the file due to invalid URL.");
//     }
// };

// import React, { useState, useEffect } from "react";
// import {
//     View,
//     Text,
//     ActivityIndicator,
//     Image,
//     Alert,
//     TouchableOpacity,
//     ScrollView,
//     Linking,
//     Platform,
// } from "react-native";
// import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
// import {
//     ref,
//     uploadBytesResumable,
//     getDownloadURL,
// } from "@firebase/storage";
// import Constants from "expo-constants";
// import tw from "twrnc";
// import { getToken } from "@/helpers/getToken";
// import { storage } from "../../firebase/index";
// import { ProgressBar } from "react-native-paper"; // Import ProgressBar component

// const UploadDocs = () => {
//     const [files, setFiles] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [uploadedFiles, setUploadedFiles] = useState([]);
//     const [uploadProgress, setUploadProgress]: any = useState({}); // State to track upload progress
//     const [loadingUpload, setLoadingUpload] = useState(false);
//     // console.log("dataDocs", dataDocs);

//     const detectFileType = (file: any) => {
//         const { type, name } = file;
//         if (type && type !== "application/octet-stream") return type;

//         const extension = name.split(".").pop().toLowerCase();
//         switch (extension) {
//             case "jpg":
//             case "jpeg":
//                 return "image/jpeg";
//             case "png":
//                 return "image/png";
//             case "gif":
//                 return "image/gif";
//             case "pdf":
//                 return "application/pdf";
//             case "doc":
//                 return "application/msword";
//             case "docx":
//                 return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
//             case "mp4":
//                 return "video/mp4";
//             case "mov":
//                 return "video/quicktime";
//             case "avi":
//                 return "video/x-msvideo";
//             default:
//                 return "application/octet-stream";
//         }
//     };

//     const fetchUserData = async () => {
//         setLoading(true);
//         const token = await getToken();
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);

//         try {
//             const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: "POST",
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//                 query getUserData {
//                   user {
//                     documents {
//                       url
//                       type
//                     }
//                   }
//                 }
//               `,
//                 }),
//             });

//             const data = await response.json();
//             setUploadedFiles(data?.data?.user?.documents || []);
//         } catch (error) {
//             console.error("Error fetching user data:", error);
//             Alert.alert("Error", "Failed to load user documents.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUserData();
//     }, []);

//     const handleFileSelection = async () => {
//         const result = await launchImageLibraryAsync({
//             mediaTypes: MediaTypeOptions.All,
//             allowsMultipleSelection: true,
//             quality: 1,
//         });

//         if (!result.canceled) {
//             const selectedFiles: any = result.assets.map((asset) => ({
//                 uri: asset.uri,
//                 name: asset.uri.split("/").pop(),
//                 type:
//                     asset.type ||
//                     detectFileType({ name: asset.uri.split("/").pop() }),
//             }));
//             setFiles(selectedFiles);
//         }
//     };

//     const uploadFilesToBackend = async () => {
//         if (files.length === 0) {
//             Alert.alert("No files selected", "Please select files to upload.");
//             return;
//         }

//         setLoadingUpload(true);

//         try {
//             const token = await getToken();
//             const headers = new Headers();
//             headers.append("Content-Type", "application/json");
//             headers.append("Authorization", `Bearer ${token}`);

//             const uploadPromises = files.map((file: any) => {
//                 const fileType = detectFileType(file);

//                 return new Promise((resolve, reject) => {
//                     const storageRef = ref(storage, `documents/${file.name}`);

//                     // Fetch the file from the local URI
//                     fetch(file.uri)
//                         .then((res) => res.blob())
//                         .then((blob) => {
//                             // Upload the blob to Firebase Storage
//                             const uploadTask = uploadBytesResumable(storageRef, blob, {
//                                 contentType: fileType,
//                             });

//                             uploadTask.on(
//                                 "state_changed",
//                                 (snapshot) => {
//                                     const progress =
//                                         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                                     console.log(`Upload is ${progress}% done`);

//                                     // Update upload progress state
//                                     setUploadProgress((prevProgress: any) => ({
//                                         ...prevProgress,
//                                         [file.name]: progress,
//                                     }));
//                                 },
//                                 (error) => {
//                                     console.error("Error during upload:", error);
//                                     reject(error);
//                                 },
//                                 async () => {
//                                     const downloadURL = await getDownloadURL(
//                                         uploadTask.snapshot.ref
//                                     );

//                                     const response = await fetch(
//                                         Constants.expoConfig?.extra?.apiUrl,
//                                         {
//                                             method: "POST",
//                                             headers,
//                                             body: JSON.stringify({
//                                                 query: `
//                               mutation createDocs($input: inputDocs) {
//                                 createDocs(input: $input) {
//                                   id
//                                   url
//                                   type
//                                 }
//                               }
//                             `,
//                                                 variables: {
//                                                     input: { url: downloadURL, type: fileType },
//                                                 },
//                                             }),
//                                         }
//                                     );

//                                     const result = await response.json();

//                                     // Remove the file from uploadProgress after completion
//                                     setUploadProgress((prevProgress: any) => {
//                                         const updatedProgress = { ...prevProgress };
//                                         delete updatedProgress[file.name];
//                                         return updatedProgress;
//                                     });

//                                     resolve(result?.data?.createDocs);
//                                 }
//                             );
//                         })
//                         .catch((error) => {
//                             console.error("Error fetching file:", error);
//                             reject(error);
//                         });
//                 });
//             });

//             const uploadedFilesData = await Promise.all(uploadPromises);
//             const newUrlsToSave = uploadedFilesData.map((file: any) => file.id);

//             // Update documents on the server
//             await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: "POST",
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//                 mutation updateDocsArtisant($input: inputDocsArtisant) {
//                   updateDocsArtisant(input: $input)
//                 }
//               `,
//                     variables: {
//                         input: { documents: newUrlsToSave },
//                     },
//                 }),
//             });

//             await fetchUserData(); // Reload files after upload
//             setFiles([]);
//             Alert.alert("Success", "Files uploaded successfully.");
//         } catch (error) {
//             console.error("Error uploading files:", error);
//             Alert.alert("Upload Failed", "Error uploading files.");
//         } finally {
//             setLoadingUpload(false);
//         }
//     };

//     const renderUploadedFile = (file: any, index: any) => {
//         if (file.type.startsWith("image")) {
//             return (
//                 <Image
//                     key={index}
//                     source={{ uri: file.url }}
//                     style={tw`w-full h-40 rounded-md`}
//                 />
//             );
//         } else if (file.type.startsWith("video")) {
//             return (
//                 <TouchableOpacity key={index} onPress={() => openFile(file.url)}>
//                     <Text style={tw`text-blue-500 underline`}>
//                         Play Video {index + 1}
//                     </Text>
//                 </TouchableOpacity>
//             );
//         } else {
//             return (
//                 <TouchableOpacity key={index} onPress={() => openFile(file.url)}>
//                     <Text style={tw`text-blue-500 underline`}>
//                         Open Document {index + 1}
//                     </Text>
//                 </TouchableOpacity>
//             );
//         }
//     };

//     const renderProgressBar = (fileName: any) => {
//         const progress = uploadProgress[fileName] || 0;

//         return (
//             <View style={tw`w-full mt-2`}>
//                 <ProgressBar
//                     progress={progress / 100}
//                     color="#4CAF50"
//                     style={tw`h-4 rounded-md`}
//                 />
//                 <Text style={tw`text-sm mt-1`}>{Math.round(progress)}%</Text>
//             </View>
//         );
//     };

//     return (
//         <ScrollView style={tw`w-full`}>
//             <View style={tw`p-4`}>
//                 <Text style={tw`text-2xl font-bold mb-4`}>Upload Documents</Text>

//                 {/* File Selection Button */}
//                 <TouchableOpacity
//                     onPress={handleFileSelection}
//                     style={tw`bg-blue-500 text-white px-4 py-2 rounded-md mb-4`}
//                 >
//                     <Text style={tw`text-white text-center`}>Select Files</Text>
//                 </TouchableOpacity>

//                 {/* Upload Button */}
//                 <TouchableOpacity
//                     onPress={uploadFilesToBackend}
//                     style={tw`bg-green-500 text-white px-4 py-2 rounded-md mb-4`}
//                     disabled={loading}
//                 >
//                     <Text style={tw`text-white text-center`}>
//                         {loading ? "Uploading..." : "Upload Files"}
//                     </Text>
//                 </TouchableOpacity>

//                 {/* Progress Bars for each file */}
//                 {Object.keys(uploadProgress).length > 0 && (
//                     <View style={tw`mt-4`}>
//                         {files.map((file: any, index: any) => (
//                             uploadProgress[file.name] !== undefined && (
//                                 <View key={index} style={tw`mb-4`}>
//                                     <Text>{file.name}</Text>
//                                     {renderProgressBar(file.name)}
//                                 </View>
//                             )
//                         ))}
//                     </View>
//                 )}

//                 {/* Uploaded Files Section */}
//                 <View style={tw`mt-6`}>
//                     <Text style={tw`text-lg font-semibold mb-4`}>Uploaded Files</Text>
//                     {uploadedFiles.length > 0 ? (
//                         uploadedFiles.map((file: any, index: any) => (
//                             <View
//                                 key={index}
//                                 style={tw`border p-2 rounded-md bg-gray-50 mb-2`}
//                             >
//                                 {renderUploadedFile(file, index)}
//                             </View>
//                         ))
//                     ) : (
//                         <Text>No files uploaded yet.</Text>
//                     )}
//                 </View>
//             </View>

//             {/* Info Section */}
//             <View style={tw`hidden sm:flex w-1/3 border-l border-gray-200 p-4`}>
//                 <View style={tw`bg-gray-50 p-3 rounded-md`}>
//                     <Text style={tw`text-lg font-semibold`}>Info</Text>
//                     <Text style={tw`mt-3 text-sm`}>
//                         This page allows you to upload documents like diplomas. Get verified
//                         to unlock more leads. Customers trust our verified professionals
//                         more!
//                     </Text>
//                 </View>
//             </View>
//         </ScrollView>
//     );
// };

// export default UploadDocs;

// // Helper to open files
// const openFile = (url: any) => {
//     if (url) {
//         Linking.canOpenURL(url)
//             .then((supported) => {
//                 if (supported) {
//                     Linking.openURL(url);
//                 } else {
//                     Alert.alert("Error", "Cannot open the file URL.");
//                 }
//             })
//             .catch((err) =>
//                 console.error("An error occurred while opening the file:", err)
//             );
//     } else {
//         Alert.alert("Invalid URL", "Cannot open the file due to invalid URL.");
//     }
// };


import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Image,
    Alert,
    TouchableOpacity,
    ScrollView,
    Linking,
    Platform,
} from "react-native";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "@firebase/storage";
import Constants from "expo-constants";
import tw from "twrnc";
import { getToken } from "@/helpers/getToken";
import { storage } from "../../firebase/index";
import { ProgressBar, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons from Expo

const UploadDocs = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadProgress, setUploadProgress]: any = useState({});
    const [loadingUpload, setLoadingUpload] = useState(false);

    const detectFileType = (file: any) => {
        const { type, name } = file;
        if (type && type !== "application/octet-stream") return type;

        const extension = name.split(".").pop().toLowerCase();
        switch (extension) {
            case "jpg":
            case "jpeg":
                return "image/jpeg";
            case "png":
                return "image/png";
            case "gif":
                return "image/gif";
            case "pdf":
                return "application/pdf";
            case "doc":
                return "application/msword";
            case "docx":
                return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            case "mp4":
                return "video/mp4";
            case "mov":
                return "video/quicktime";
            case "avi":
                return "video/x-msvideo";
            default:
                return "application/octet-stream";
        }
    };

    const fetchUserData = async () => {
        setLoading(true);
        const token = await getToken();
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);

        try {
            const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    query: `
                query getUserData {
                  user {
                    documents {
                      url
                      type
                      
                    }
                  }
                }
              `,
                }),
            });

            const data = await response.json();
            console.log('data', data);
            
            setUploadedFiles(data?.data?.user?.documents || []);
        } catch (error) {
            console.error("Error fetching user data:", error);
            Alert.alert("Error", "Failed to load user documents.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleFileSelection = async () => {
        const result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.All,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedFiles: any = result.assets.map((asset) => ({
                uri: asset.uri,
                name: asset.uri.split("/").pop(),
                type:
                    asset.type ||
                    detectFileType({ name: asset.uri.split("/").pop() }),
            }));
            setFiles(selectedFiles);
        }
    };

    const uploadFilesToBackend = async () => {
        if (files.length === 0) {
            Alert.alert("No files selected", "Please select files to upload.");
            return;
        }

        setLoadingUpload(true);

        try {
            const token = await getToken();
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${token}`);

            const uploadPromises = files.map((file: any) => {
                const fileType = detectFileType(file);

                return new Promise((resolve, reject) => {
                    const storageRef = ref(storage, `documents/${file.name}`);

                    // Fetch the file from the local URI
                    fetch(file.uri)
                        .then((res) => res.blob())
                        .then((blob) => {
                            // Upload the blob to Firebase Storage
                            const uploadTask = uploadBytesResumable(storageRef, blob, {
                                contentType: fileType,
                            });

                            uploadTask.on(
                                "state_changed",
                                (snapshot) => {
                                    const progress =
                                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log(`Upload is ${progress}% done`);

                                    // Update upload progress state
                                    setUploadProgress((prevProgress:any) => ({
                                        ...prevProgress,
                                        [file.name]: progress,
                                    }));
                                },
                                (error) => {
                                    console.error("Error during upload:", error);
                                    reject(error);
                                },
                                async () => {
                                    const downloadURL = await getDownloadURL(
                                        uploadTask.snapshot.ref
                                    );

                                    const response = await fetch(
                                        Constants.expoConfig?.extra?.apiUrl,
                                        {
                                            method: "POST",
                                            headers,
                                            body: JSON.stringify({
                                                query: `
                              mutation createDocs($input: inputDocs) {
  createDocs(input: $input) {
    id
  }
}

                            `,
                                                variables: {
                                                    input: { url: downloadURL, type: fileType },
                                                },
                                            }),
                                        }
                                    );

                                    const result = await response.json();

                                    // Remove the file from uploadProgress after completion
                                    setUploadProgress((prevProgress: any) => {
                                        const updatedProgress: any = { ...prevProgress };
                                        delete updatedProgress[file.name];
                                        return updatedProgress;
                                    });

                                    resolve(result?.data?.createDocs);
                                }
                            );
                        })
                        .catch((error) => {
                            console.error("Error fetching file:", error);
                            reject(error);
                        });
                });
            });

            const uploadedFilesData = await Promise.all(uploadPromises);
            const newUrlsToSave = uploadedFilesData.map((file: any) => file.id);

            // Update documents on the server
            await fetch(Constants.expoConfig?.extra?.apiUrl, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    query: `
                mutation updateDocsArtisant($input: inputDocsArtisant) {
                  updateDocsArtisant(input: $input)
                }
              `,
                    variables: {
                        input: { documents: newUrlsToSave },
                    },
                }),
            });

            await fetchUserData(); // Reload files after upload
            setFiles([]);
            Alert.alert("Success", "Files uploaded successfully.");
        } catch (error) {
            console.error("Error uploading files:", error);
            Alert.alert("Upload Failed", "Error uploading files.");
        } finally {
            setLoadingUpload(false);
        }
    };

    const renderUploadedFile = (file: any, index: any) => {
        if (file.type.startsWith("image")) {
            return (
                <Card key={index} style={tw`mb-4`}>
                    <Card.Cover source={{ uri: file.url }} />
                    <Card.Title title={`Image ${index + 1}`} />
                </Card>
            );
        } else if (file.type.startsWith("video")) {
            return (
                <Card key={index} style={tw`mb-4 p-4`}>
                    <Ionicons name="videocam-outline" size={40} color="#4B5563" />
                    <TouchableOpacity onPress={() => openFile(file.url)}>
                        <Text style={tw`text-blue-500 underline mt-2`}>
                            Play Video {index + 1}
                        </Text>
                    </TouchableOpacity>
                </Card>
            );
        } else {
            return (
                <Card key={index} style={tw`mb-4 p-4`}>
                    <Ionicons name="document-text-outline" size={40} color="#4B5563" />
                    <TouchableOpacity onPress={() => openFile(file.url)}>
                        <Text style={tw`text-blue-500 underline mt-2`}>
                            Open Document {index + 1}
                        </Text>
                    </TouchableOpacity>
                </Card>
            );
        }
    };

    const renderProgressBar = (fileName: any) => {
        const progress = uploadProgress[fileName] || 0;

        return (
            <View style={tw`w-full mt-2`}>
                <ProgressBar
                    progress={progress / 100}
                    color="#4CAF50"
                    style={tw`h-4 rounded-md`}
                />
                <Text style={tw`text-sm mt-1 text-right`}>{Math.round(progress)}%</Text>
            </View>
        );
    };

    return (
        <ScrollView style={tw`flex-1 bg-white`}>
            <View style={tw`p-6`}>
                <Text style={tw`text-3xl font-bold text-gray-800 mb-6`}>Upload Documents</Text>

                {/* File Selection Button */}
                <TouchableOpacity
                    onPress={handleFileSelection}
                    style={tw`flex-row items-center justify-center bg-blue-600 px-5 py-3 rounded-lg mb-4`}
                >
                    <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
                    <Text style={tw`text-white text-lg ml-2`}>Select Files</Text>
                </TouchableOpacity>

                {/* Display Selected Files */}
                {files.length > 0 && (
                    <View style={tw`mb-4`}>
                        <Text style={tw`text-xl font-semibold text-gray-700 mb-2`}>Selected Files</Text>
                        {files.map((file: any, index) => (
                            <View key={index} style={tw`flex-row items-center justify-between p-3 bg-gray-100 rounded-md mb-2`}>
                                <View style={tw`flex-row items-center`}>
                                    <Ionicons name="document-outline" size={20} color="#6B7280" />
                                    <Text style={tw`ml-2 text-gray-800`}>{file.name}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    setFiles(files.filter((_, i) => i !== index));
                                }}>
                                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}

                {/* Upload Button */}
                <TouchableOpacity
                    onPress={uploadFilesToBackend}
                    style={tw`flex-row items-center justify-center bg-green-600 px-5 py-3 rounded-lg mb-6`}
                    disabled={loadingUpload}
                >
                    {loadingUpload ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <>
                            <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
                            <Text style={tw`text-white text-lg ml-2`}>Upload Files</Text>
                        </>
                    )}
                </TouchableOpacity>

                {/* Progress Bars for each file */}
                {Object.keys(uploadProgress).length > 0 && (
                    <View style={tw`mb-6`}>
                        <Text style={tw`text-xl font-semibold text-gray-700 mb-2`}>Upload Progress</Text>
                        {files.map((file: any, index: any) => (
                            uploadProgress[file.name] !== undefined && (
                                <View key={index} style={tw`mb-4`}>
                                    <Text style={tw`text-gray-800 mb-1`}>{file.name}</Text>
                                    {renderProgressBar(file.name)}
                                </View>
                            )
                        ))}
                    </View>
                )}

                {/* Uploaded Files Section */}
                <View style={tw`mb-6`}>
                    <Text style={tw`text-2xl font-semibold text-gray-800 mb-4`}>Uploaded Files</Text>
                    {loading ? (
                        <ActivityIndicator size="large" color="#4B5563" />
                    ) : uploadedFiles.length > 0 ? (
                        uploadedFiles.map((file, index) => renderUploadedFile(file, index))
                    ) : (
                        <Text style={tw`text-gray-600`}>No files uploaded yet.</Text>
                    )}
                </View>

                {/* Info Section */}
                <View style={tw`bg-gray-50 p-4 rounded-lg`}>
                    <Text style={tw`text-xl font-semibold text-gray-800`}>Info</Text>
                    <Text style={tw`mt-3 text-gray-600`}>
                        Upload important documents like diplomas to get verified and unlock more leads.
                        Verified professionals are trusted more by customers!
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default UploadDocs;

// Helper to open files
const openFile = (url: any) => {
    if (url) {
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert("Error", "Cannot open the file URL.");
                }
            })
            .catch((err) =>
                console.error("An error occurred while opening the file:", err)
            );
    } else {
        Alert.alert("Invalid URL", "Cannot open the file due to invalid URL.");
    }
};
