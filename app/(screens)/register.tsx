import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Divider, MD3Colors, Snackbar, Surface, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../../libs/firebaseconfig';

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginerror, setLoginError] = useState(0);
    const [phoneNumbber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = React.useState(false);

   

    const onDismissSnackBar = () => setVisible(false);


    const router = useRouter();


    const [imageUri, setImageUri] = useState<string | null>(null);

    const pickImage = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission denied!');
            return;
        }

      
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };


    const uploadToCloudinary = async (uri: string): Promise<string | null> => {
        const apiUrl = 'https://api.cloudinary.com/v1_1/dsqfbbf6m/image/upload';
        const data = new FormData();
      
        data.append('file', {
          uri,
          type: 'image/jpeg',
          name: 'profile.jpg',
        } as any);
      
        data.append('upload_preset', 'expo_uploads');
      
        try {
          const res = await fetch(apiUrl, {
            method: 'POST',
            body: data,
          });
      
          const json = await res.json();
      
          if (json.secure_url) {
            return json.secure_url;
          } else {
            console.error('Upload failed:', json);
            return null;
          }
        } catch (err) {
          console.error('Cloudinary error:', err);
          return null;
        }
      };
      


    const handleRegister = async () => {
        setIsLoading(true);

        if (!email || !password || !phoneNumbber) {
            setError('Please fill in all fields');
            setLoginError(1);
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            let photoURL = '';
            if (imageUri) {
                const uploadedUrl = await uploadToCloudinary(imageUri);
                if (uploadedUrl) {
                    photoURL = uploadedUrl;
                    await updateProfile(user, { photoURL });
                }
            }

            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                phone: phoneNumbber,
                photoURL ,
                fullName: null,
                bio: null,
                location: null,
                vehicleInfo:[null],
                createdAt: new Date().toISOString()
              });
              


            await AsyncStorage.setItem('user', JSON.stringify(user));
            await AsyncStorage.setItem('userId', user.uid);

            alert('Registration Successful');
            router.replace('/(tabs)/home');
        } catch (error) {
            //console.error(error);
            if ((error as { code: string }).code === 'auth/email-already-in-use') {
                setError('This email is already in use.');
            } else if ((error as { code: string }).code === 'auth/invalid-email') {
                setError('Invalid email address.');
            } else if ((error as { code: string }).code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else {
                setError('Registration failed. Please try again.');
            }
            setLoginError(1);
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setLoginError(0);
            }, 3000);
        }
    };

    const scrollRef = useRef<ScrollView>(null);

    const scrollToTop = () => {
        scrollRef.current?.scrollToEnd({ animated: true });

    };

    const scrollToBottom = () => {
        scrollRef.current?.scrollToEnd({ animated: true });
    };


    const isBothFieldsFilled = !email || !password || !phoneNumbber;

    return (
        <SafeAreaView style={{ flex: 1, marginTop: 10, backgroundColor: Colors.dark.background }}>

            <View style={{ backgroundColor: Colors.dark.background }}>


                <View style={{ alignSelf: 'center', marginTop: 10 }}>
                    <Text style={styles.textcolor} variant="titleMedium">Create your account</Text>
                </View>

                <ScrollView
                    ref={scrollRef}
                    contentContainerStyle={{ padding: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Divider />

                    <Surface style={{
                        margin: 10,
                        marginTop: 20,
                        padding: 20,
                        borderRadius: 10,
                        backgroundColor: Colors.dark.background,
                    }}>
                        {isBothFieldsFilled ? (
                            <Text style={{ color: 'red', textAlign: 'center' }}>
                                Please enter All fields.
                            </Text>
                        ) : null}

                        {error ? (
                            <Snackbar
                                visible={visible}
                                onDismiss={onDismissSnackBar}
                                action={{
                                    label: 'Undo',
                                    onPress: () => {
                                        // Do something
                                    },
                                }}>
                                {error}
                            </Snackbar>
                        ) : null}


                        {loginerror === 1 ? (
                            <Text style={{ color: 'red', textAlign: 'center' }}>
                                {error}
                            </Text>
                        ) : null}



                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={pickImage}>
                                {imageUri ? (
                                    <Avatar.Image size={64} source={{ uri: imageUri }} />
                                ) : (
                                    <Avatar.Icon size={64} icon="account" />
                                )}
                            </TouchableOpacity>
                            <Text style={{ marginTop: 10 }}>Choose A Profile Picture</Text>
                        </View>


                        <View style={{ margin: 10, marginTop: 20 }}>
                            <Text style={styles.textcolor} variant="titleMedium">
                                Email address:
                            </Text>

                            <TextInput style={{ backgroundColor: Colors.dark.background, borderRadius: 30 }} onChange={(e) =>
                                setEmail(e.nativeEvent.text)} placeholder='Enter your Email'
                                mode='outlined'
                                right={<TextInput.Icon icon="email" />}>

                            </TextInput>
                            <Divider />
                        </View>
                        <View style={{ margin: 10, marginTop: 20 }}>
                            <Text style={styles.textcolor} variant="titleMedium">
                                Password:
                            </Text>

                            <TextInput style={{ backgroundColor: Colors.dark.background, borderRadius: 30 }} onFocus={scrollToBottom} onChange={(e) =>
                                setPassword(e.nativeEvent.text)
                            } placeholder='Enter your password'
                                mode='outlined'
                                secureTextEntry={true}
                                right={<TextInput.Icon icon="eye" />}>
                            </TextInput>
                            <Divider />
                        </View>

                        <View style={{ margin: 10, marginTop: 20 }}>
                            <Text style={styles.textcolor} variant="titleMedium">
                                Your Phone Number:
                            </Text>

                            <TextInput style={{ backgroundColor: Colors.dark.background, borderRadius: 30 }} onFocus={scrollToTop} onChange={(e) => setPhoneNumber(e.nativeEvent.text)} placeholder='Your Phone Number'
                                mode='outlined'

                                right={<TextInput.Icon icon="phone" />}>
                            </TextInput>
                            <Divider />
                        </View>
                        <Button loading={isLoading} style={{ alignSelf: 'center', marginTop: 20, height: 60, width: 290, padding: 10 }} icon="login" mode="contained" onPress={handleRegister}>
                            Sign me In
                        </Button>



                        <Divider style={{ marginTop: 20 }} />
                        <View style={{ alignSelf: 'center', marginTop: 10 }}>
                            <Text style={styles.textcolor} variant="titleMedium">
                                Already have an account?
                            </Text>
                            <Text style={styles.textcolor} variant="titleMedium">
                                <TouchableOpacity onPress={() => router.push('/(screens)/login')}>
                                    <Text style={{ color: MD3Colors.primary100 }}>Sign In</Text>

                                </TouchableOpacity>

                            </Text>
                        </View>
                    </Surface>
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textcolor: {
        color: 'white',
        fontFamily: 'SpaceMono',
    },
    title: {
        padding: 10,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 5,
    },
})