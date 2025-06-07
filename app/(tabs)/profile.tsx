import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, List, Text } from 'react-native-paper';
import TopBar from '../../components/ui/TopBar';
import { auth } from '../../libs/firebaseconfig';


export default function profile() {
    const [userData, setUserData] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        'SpaceMono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;
                if (!user) return;

                const db = getFirestore();
                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setUserData(userSnap.data());
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const [userStats, setUserStats] = useState({
        tripsApproved: 0,
        kilometersTravelled: 0,
        rating: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) return;

            const db = getFirestore();
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const data = userSnap.data();

                setUserStats({
                    tripsApproved: data.tripsApproved || 0,
                    kilometersTravelled: data.kilometersTravelled || 0,
                    rating: data.rating || 0,
                });
            }
        };

        fetchStats();
    }, []);


    const handleLogout = async () => {
        try {
            await signOut(auth);
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('userId');
            router.replace("/(screens)/login");
        } catch (error) {
            console.error("Logout error:", error);
            alert("Failed to log out. Please try again.");
        }
    };

    if (!fontsLoaded || loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading profile...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
                <TopBar />
                <ScrollView contentContainerStyle={{ paddingBottom: 100, backgroundColor: "white" }}>
                    <View style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', padding: 20, alignItems: 'center' }}>
                        <Avatar.Image
                            size={85}
                            source={{ uri: userData?.photoURL || 'https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?semt=ais_items_boosted&w=740' }}
                        />
                        <Text style={{ fontFamily: "SpaceMono", color: "black", fontSize: 24 }}>{userData?.fullName || 'Unknown'}</Text>
                        <Text style={{ fontFamily: "SpaceMono", color: "black" }}>{userData?.location || 'Not set'}</Text>
                    </View>


                    <View style={{ padding: 20, display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: "SpaceMono", color: "black", fontSize: 16, fontWeight: 'bold' }}>Your Profile</Text>
                        <TouchableOpacity onPress={() => { router.push("/(screens)/editprofile") }}>
                            <Text style={{ fontFamily: "SpaceMono", color: "green" }}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                    <Card style={{ margin: 10, borderRadius: 10, backgroundColor: "white" }}>
                        <Card.Content>
                            <View style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: 4 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="account" size={20} color="#03a832" style={{ marginRight: 5 }} />
                                    <Text style={{ fontFamily: 'SpaceMono', color: 'black' }}>Full Name: {userData?.fullName || 'N/A'}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <MaterialCommunityIcons name="phone" size={20} color="#03a832" style={{ marginRight: 5 }} />
                                    <Text style={{ fontFamily: "SpaceMono", color: "black" }}>Phone Number: {userData?.phone || 'N/A'}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <MaterialCommunityIcons name="calendar" size={20} color="#03a832" style={{ marginRight: 5 }} />
                                    <Text style={{ fontFamily: "SpaceMono", color: "black" }}>
                                        Member Since: {
                                            userData?.createdAt
                                                ? new Date(
                                                    typeof userData.createdAt === 'string'
                                                        ? userData.createdAt
                                                        : userData.createdAt.seconds * 1000
                                                ).toLocaleDateString()
                                                : 'N/A'
                                        }
                                    </Text>

                                </View>
                            </View>
                        </Card.Content>
                    </Card>


                    <View style={{ padding: 20, display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: "SpaceMono", color: "black", fontSize: 16, fontWeight: 'bold' }}>Driver Information</Text>

                    </View>

                    <Card style={{ margin: 10, borderRadius: 10, backgroundColor: "white" }}>
                        <Card.Content>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontFamily: "SpaceMono", color: "black" }}>License Number:</Text>
                                <Text style={{ fontFamily: "SpaceMono", color: "black", fontWeight: 'bold' }}>
                                    {userData?.vehicleInfo?.[0]?.licensePlate || 'N/A'}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                <Text style={{ fontFamily: "SpaceMono", color: "black" }}>Vehicle:</Text>
                                <Text style={{ fontFamily: "SpaceMono", color: "black", fontWeight: 'bold' }}>
                                    {userData?.vehicleInfo?.[0]?.make || 'Not specified'}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                <Text style={{ fontFamily: "SpaceMono", color: "black" }}>Member Since:</Text>
                                <Text style={{ fontFamily: "SpaceMono", color: "black", fontWeight: 'bold' }}>
                                    {userData?.vehicleInfo?.[0]?.dateadded
                                        ? new Date(
                                            typeof userData.createdAt === 'string'
                                                ? userData.createdAt
                                                : userData.createdAt.seconds * 1000
                                        ).toLocaleDateString()
                                        : 'N/A'}
                                </Text>
                            </View>
                        </Card.Content>
                    </Card>


                    <Card style={{ margin: 10, borderRadius: 10, backgroundColor: "white" }}>
                        <Card.Content>
                            <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="titleLarge">Stats</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, padding: 20 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontFamily: "SpaceMono", color: "green", fontWeight: 'bold', fontSize: 20 }}>
                                        {userStats.tripsApproved}
                                    </Text>
                                    <Text style={{ fontFamily: "SpaceMono", color: "black", fontSize: 10 }}>Trips Approved</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontFamily: "SpaceMono", color: "green", fontSize: 20, fontWeight: 'bold' }}>
                                        {userStats.kilometersTravelled.toLocaleString()}
                                    </Text>
                                    <Text style={{ fontFamily: "SpaceMono", color: "black", fontSize: 10 }}>Km Travelled</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontFamily: "SpaceMono", color: "green", fontSize: 20, fontWeight: 'bold' }}>
                                        {userStats.rating.toFixed(1)}
                                    </Text>
                                    <Text style={{ fontFamily: "SpaceMono", color: "black", fontSize: 10 }}>Rating</Text>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>


                    <View style={{ padding: 10 }}>
                        <Card style={{ borderRadius: 10, backgroundColor: "white" }}>
                            <Card.Content>
                                <TouchableOpacity>
                                    <List.Item title="My Cars" titleStyle={{ color: 'black' }} description="Manage your vehicles" left={props => <List.Icon {...props} color="green" icon="car" />} right={props => <List.Icon {...props} icon="chevron-right" color="black" />} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <List.Item title="Settings" titleStyle={{ color: 'black' }} description="App preferences" left={props => <List.Icon {...props} color="blue" icon="cog-outline" />} right={props => <List.Icon {...props} icon="chevron-right" color="black" />} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <List.Item title="Help" titleStyle={{ color: 'black' }} description="Get assistance" left={props => <List.Icon {...props} color="orange" icon="help-circle" />} right={props => <List.Icon {...props} icon="chevron-right" color="black" />} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <List.Item title="About App" titleStyle={{ color: 'black' }} description="Learn more about the app" left={props => <List.Icon {...props} color="orange" icon="android" />} right={props => <List.Icon {...props} icon="chevron-right" color="black" />} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleLogout}>
                                    <List.Item title="Logout" titleStyle={{ color: 'black' }} description="Sign out of your account" left={props => <List.Icon {...props} color="brown" icon="logout" />} />
                                </TouchableOpacity>
                            </Card.Content>
                        </Card>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
