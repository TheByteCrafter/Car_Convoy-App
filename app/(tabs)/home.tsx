import TopBar from '@/components/ui/TopBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Divider, Icon, MD3Colors, Text } from 'react-native-paper';
export default function HomeScreen() {
    const [user, setUser] = useState<string | null>(null);

    const [notficationbadgedot, setDotbadge] = useState(false);

    useEffect(() => {
        const getuser = async () => {
            const fetchuser = await AsyncStorage.getItem('user');
            if (fetchuser) {
                const userObject = JSON.parse(fetchuser);
                const userEmail = userObject.email;
                setUser(userEmail);
            }
        };
        getuser();
    }, []);

 



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

            <TopBar />


            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={styles.textcolor}>Welcome back, {user}</Text>

                    <View style={{ padding: 10 }}>
                        <Card
                            style={{
                                backgroundColor: '#166534',
                                borderRadius: 16,
                                padding: 16,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.2,
                                shadowRadius: 6,
                                elevation: 5,
                            }}
                        >
                            <Card.Content>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                    <View>
                                        <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontFamily: "SpaceMono" }}>Current Trip</Text>
                                        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginTop: 4, fontFamily: "SpaceMono" }}>Nairobi to Mombasa</Text>
                                    </View>
                                    <View
                                        style={{
                                            backgroundColor: '#facc15',
                                            paddingVertical: 4,
                                            paddingHorizontal: 10,
                                            borderRadius: 999,
                                        }}
                                    >
                                        <Text style={{ color: '#065f46', fontSize: 12, fontWeight: 'bold' }}>IN PROGRESS</Text>
                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, }}>
                                    <View>
                                        <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontFamily: "SpaceMono" }}>Departure</Text>
                                        <Text style={{ fontSize: 14, color: 'white', fontWeight: '500', marginTop: 2 }}>Today, 8:00 AM</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontFamily: "SpaceMono" }}>Arrival</Text>
                                        <Text style={{ fontSize: 14, color: 'white', fontWeight: '500', marginTop: 2 }}>Today, 2:00 PM</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontFamily: "SpaceMono" }}>Distance</Text>
                                        <Text style={{ fontSize: 14, color: 'white', fontWeight: '500', marginTop: 2 }}>480 km</Text>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                    </View>



                    <Divider style={{ marginVertical: 20 }} />


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                        <Text style={styles.textcolor} >Upcoming Car Trips for Volvo XC60</Text>

                        <TouchableOpacity onPress={() => { alert("See All Trips") }}>
                            <Text style={{ fontFamily: "SpaceMono", color: "green" }}>See All</Text>
                        </TouchableOpacity>

                    </View>


                    {[1, 2, 3].map((_, index) => (
                        <View key={index} style={{ position: 'relative', marginBottom: 16 }}>
                            <Card style={styles.upcomingCard}>
                                <Card.Content style={{ padding: 10 }}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                        <Icon source="map-marker" color="#03a832" size={20} />
                                        <Text style={styles.upcomingTitle}>Nairobi to Kisumu</Text>
                                    </View>

                                    <View style={styles.pill}>
                                        <Text style={styles.pillText}>4 Cars</Text>
                                    </View>


                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 5 }}>
                                        <Icon source="calendar" color={MD3Colors.error50} size={20} />
                                        <Text style={styles.upcomingSub}>Sat, May 20</Text>
                                        <Icon source="clock" color="#4CAF50" size={20} />
                                        <Text style={styles.upcomingSub}>7:00 AM</Text>
                                    </View>


                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <Icon source="account-group" size={20} color="darkgreen" />
                                        <Text style={[styles.upcomingSub, { marginLeft: 5 }]}>James M., Sarah K., 3 others</Text>
                                    </View>

                                </Card.Content>
                            </Card>
                        </View>
                    ))}



                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                            <Text style={styles.textcolor} >Your Clubs</Text>

                            <TouchableOpacity onPress={() => { alert("See All Trips") }}>
                                <Text style={{ fontFamily: "SpaceMono", color: "green" }}>See All</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                            <Card style={styles.upcomingCard}>
                                <Card.Content>
                                    <Image style={{ width: '100%', height: 50 }} source={{ uri: "https://images.pexels.com/photos/16264341/pexels-photo-16264341/free-photo-of-rescue-helicopter-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=600" }} />
                                    <Text style={styles.textcolor} variant="titleLarge">Mountain Crew</Text>
                                    <Text style={{ color: "black", fontFamily: "SpaceMono" }} variant="bodyMedium">8 members</Text>
                                </Card.Content>
                            </Card>

                            <Card style={styles.upcomingCard}>
                                <Card.Content>
                                    <Image style={{ width: '100%', height: 50 }} source={{ uri: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" }} />
                                    <Text style={styles.textcolor} variant="titleLarge">Nairobi Riders</Text>
                                    <Text style={{ color: "black", fontFamily: "SpaceMono" }} variant="bodyMedium">12 members</Text>
                                </Card.Content>
                            </Card>

                        </View>



                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    textcolor: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        fontFamily: "SpaceMono",
    },
    container: {
        marginTop: 20,
        backgroundColor: '#03a832',
        borderRadius: 10,
        padding: 10,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 5,
        fontFamily: "SpaceMono",
    },
    card: {
        backgroundColor: '#03a832',
        borderRadius: 10,
    },

    cardContent: {
        paddingVertical: 16,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        color: 'white',
        fontFamily: "SpaceMono",
    },

    dividerLine: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginVertical: 10,
    },

    statusBadge: {
        backgroundColor: '#facc15',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
    },
    statusText: {
        fontSize: 12,
        color: '#065f46',
        fontWeight: 'bold',
    },
    tripDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailItem: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 11,
        color: '#f3f4f6',
        fontWeight: '500',
        marginBottom: 2,
        fontFamily: "SpaceMono",
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: "SpaceMono",
    },
    upcomingCard: {
        backgroundColor: "white",
        marginTop: 10,
        borderRadius: 10,
        padding: 5,
    },
    upcomingTitle: {
        color: "black",
        paddingTop: 10,
        fontFamily: "SpaceMono",
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 7,
        paddingLeft: 2,
    },
    upcomingSub: {
        color: "black",
        paddingTop: 5,
        fontFamily: "SpaceMono",
    },


    pill: {
        backgroundColor: '#facc15',
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 20,
        alignSelf: 'flex-end',
    },

    pillText: {
        color: '#065f46',
        fontWeight: 'bold',
        fontSize: 12,
        fontFamily: 'SpaceMono',
    },
});
