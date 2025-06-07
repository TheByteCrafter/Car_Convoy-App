import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Divider, Icon, MD3Colors, Surface, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../libs/firebaseconfig';

export default function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginerror, setLoginError] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();



    const handleLogin = async () => {
        setIsLoading(true);

        if (!email || !password) {
            setError('Please enter both email and password');
            alert("Please enter both email and password");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
            const user = userCredential.user;
            await AsyncStorage.setItem('userId', user.uid);
            alert("Login Successful");
            router.replace('/(tabs)/home');
        } catch (error: any) {
            alert("Login Failed"+ error.message);
            
            if (error.code === 'auth/user-not-found') {
                setError('User not found. Please check your email or register.');
               
            }
            else if (error.code === 'auth/wrong-password') {
                setError('Invalid password or Email. Please try again.');
              
            }
            else if (error.code === 'auth/invalid-email') {
                setError('Invalid email or password. Please enter a valid email address.');
                
            }
            setLoginError(1);
        }finally {
            setIsLoading(false);
            setTimeout(() => {
                setLoginError(0);
            }, 3000);
        }
    };

    const isBothFieldsFilled = !email || !password;
    return (
        <SafeAreaView style={{ flex: 1, marginTop: 20, backgroundColor: Colors.dark.background }}>

            <View style={{ backgroundColor: Colors.dark.background }}>

                <View style={{ alignSelf: 'center', marginTop: 40 }}>
                    <Icon
                        source="camera"
                        color={MD3Colors.primary100}
                        size={40}
                    />
                </View>

                <View style={{ alignSelf: 'center', marginTop: 10 }}>
                    <Text style={styles.textcolor} variant="headlineMedium">Welcome To Car Convoy</Text>
                </View>


                <View style={{ alignSelf: 'center', marginTop: 10 }}>
                    <Text style={styles.textcolor} variant="titleMedium">Login to your account</Text>
                </View>

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
                            Please enter Both fields.
                        </Text>
                    ) : null}

                    {loginerror === 1 ? (
                        <Text style={{ color: 'red', textAlign: 'center' }}>
                            {error}
                        </Text>
                    ) : null}

                    <View style={{ margin: 10, marginTop: 20 }}>
                        <Text style={styles.textcolor} variant="titleMedium">
                            Email address:
                        </Text>

                        <TextInput style={{ backgroundColor: Colors.dark.background, borderRadius: 30 }} onChange={(e) => setEmail(e.nativeEvent.text)} placeholder='Enter your Email'
                            mode='outlined'>

                        </TextInput>
                        <Divider />
                    </View>
                    <View style={{ margin: 10, marginTop: 20 }}>
                        <Text style={styles.textcolor} variant="titleMedium">
                            Password:
                        </Text>

                        <TextInput style={{ backgroundColor: Colors.dark.background, borderRadius: 30 }} onChange={(e) => setPassword(e.nativeEvent.text)} placeholder='Enter your password'
                            mode='outlined'
                            secureTextEntry={true}
                            right={<TextInput.Icon icon="eye" />}>
                        </TextInput>
                        <Divider />



                        <Button loading={isLoading} style={{ alignSelf: 'center', marginTop: 20, height: 60, width: 290, padding: 10 }} icon="login" mode="contained" onPress={handleLogin}>
                            Log me In
                        </Button>
                    </View>
                    <View style={{ alignSelf: 'center', marginTop: 10 }}>
                        <Text style={styles.textcolor} variant="titleMedium">
                            Or Login with:
                        </Text>
                    </View>
                    <Divider />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                        <Icon source="google" color="rgb(0, 255, 157)" size={40} />
                        <Icon source="facebook" color={MD3Colors.primary100} size={40} />
                        <Icon source="apple" color={MD3Colors.primary100} size={40} />
                    </View>

                    <Divider style={{ marginTop: 20 }} />
                    <View style={{ alignSelf: 'center', marginTop: 10 }}>
                        <Text style={styles.textcolor} variant="titleMedium">
                            Don't have an account?
                        </Text>
                        <Text style={styles.textcolor} variant="titleMedium">
                            <TouchableOpacity onPress={() => router.push('/(screens)/register')}>
                                <Text style={{ color: MD3Colors.primary100 }}>Sign Up</Text>

                            </TouchableOpacity>

                        </Text>
                    </View>
                </Surface>
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