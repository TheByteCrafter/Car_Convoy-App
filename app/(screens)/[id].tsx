import { useFonts } from 'expo-font';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Appbar, Avatar, Icon, Text, TextInput, useTheme } from 'react-native-paper';
export default function ChatScreenWall() {
    const [fontsLoaded] = useFonts({
        'SpaceMono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
    });

    fontsLoaded

    const theme = useTheme();


    const { id } = useLocalSearchParams();
    if (!id) {
        return null;
    }

    const [messages, setMessages] = React.useState<{ id: number; text: string; sender: string; timestamp: string }[]>([]);
    const [newMessage, setNewMessage] = React.useState('');

    const [forceUpdate, setForceUpdate] = React.useState(false);
    const { width } = useWindowDimensions();

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: messages.length + 1,
                text: newMessage,
                sender: 'You',
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, message]);
            setNewMessage('');

            setForceUpdate(!forceUpdate);

            setMessages((prevMessages) => [...prevMessages, message]);
            setNewMessage('');



        }
    }

    React.useEffect(() => {

        const initialMessages = [
            {
                id: 1, text: "Many of the components require the react-native-vector-icons library to render correctly. If you're using Expo, you don't need to do anything extra, but if it's a vanilla React Native project, you need to link the library as described in the getting started guide.", sender: 'Alice',
                timestamp: '10:00 AM'
            },
            { id: 2, text: 'Hi there!', sender: 'Bob', timestamp: '10:01 AM' },
            {
                id: 3, text: 'How are you?', sender: 'Alice',
                timestamp: '10:02 AM'
            },
            { id: 4, text: 'I am good, thanks!', sender: 'Bob', timestamp: '10:03 AM' },

            {
                id: 5, text: "Many of the components require the react-native-vector-icons library to render correctly. If you're using Expo, you don't need to do anything extra, but if it's a vanilla React Native project, you need to link the library as described in the getting started guide.", sender: 'Alice',
                timestamp: '10:00 AM'
            },
            {
                id: 6, text: "Many of the components require the react-native-vector-icons library to render correctly. If you're using Expo, you don't need to do anything extra, but if it's a vanilla React Native project, you need to link the library as described in the getting started guide.", sender: 'Alice',
                timestamp: '10:00 AM'
            },
        ];
        setMessages(initialMessages);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ImageBackground
                source={{
                    uri: 'https://img.freepik.com/free-vector/abstract-realistic-technology-particle-background_23-2148435701.jpg?ga=GA1.1.1819406291.1748975294&semt=ais_items_boosted&w=740'
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    margin: 0,
                    padding: 0,

                }}
                imageStyle={{ borderRadius: 10 }}
            >
                <Appbar.Header style={{
                    backgroundColor: '#022e75',
                    borderBottomWidth: 1,
                    borderBottomColor: '#022e75',
                    paddingHorizontal: 10,
                    justifyContent: 'space-between',
                }}>


                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <Appbar.BackAction onPress={() => { router.back() }} color='white' />
                        <Avatar.Image
                            size={40}
                            source={{ uri: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" }}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ color: 'white', fontWeight: 'bold', fontSize: 16, maxWidth: width * 0.45 }}
                            >
                                {Array.isArray(id) ? id.join(', ') : id}
                            </Text>
                            <Text style={{ color: 'white', fontSize: 12 }}>34 Members</Text>
                        </View>
                    </View>

                    {/* Right section: Back, Search, Menu */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Appbar.Action icon="magnify" onPress={() => { }} color='white' />
                        <Appbar.Action icon="dots-vertical" onPress={() => { }} color='white' />
                    </View>
                </Appbar.Header>

                <ScrollView contentContainerStyle={{ padding: 1 }}>

                    {messages.length === 0 && (
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                            <Text>Start A Chat</Text>
                        </View>
                    )}


                    {messages.map((message) => (
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 5, paddingHorizontal: 10 }} key={message.id}>

                            <Avatar.Image size={30} source={{ uri: message.sender === 'You' ? "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" : "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" }} />
                            <View style={{
                                margin: 10,
                                padding: 10,
                                maxWidth: '80%',
                                backgroundColor: message.sender === 'You' ? '#022e75' : '#022e75',
                                borderRadius: 10,
                                alignSelf: message.sender === 'You' ? 'flex-end' : 'flex-start',
                            }}>
                                <Text style={{ color: message.sender === 'You' ? 'white' : 'orange', fontWeight: 'bold', fontFamily: 'SpaceMono' }}>{message.sender}</Text>
                                <Text style={{ color: message.sender === 'You' ? 'white' : 'white', fontFamily: 'SpaceMono', }}>{message.text}</Text>
                                <Text style={{ color: message.sender === 'You' ? 'white' : 'white', fontSize: 10, marginTop: 5, display: 'flex', justifyContent: 'flex-end', fontFamily: 'SpaceMono' }}>{message.timestamp}</Text>
                            </View>
                        </View>
                    ))}



                </ScrollView>

                <View style={{ height: 60, padding: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>

                    <View style={{ backgroundColor: '#5A5A5A', borderRadius: 15, padding: 1, width: '85%' }}>
                        <TextInput
                            left={<TextInput.Icon icon="attachment" />}
                            right={<TextInput.Icon icon="camera" />}
                            value={newMessage}
                            onChangeText={setNewMessage}
                            placeholder="Type a message..."
                            underlineColor='transparent'
                            activeUnderlineColor='transparent'
                            cursorColor='white'
                            selectionColor='pink'
                            placeholderTextColor="white"
                            style={{
                                width: '100%',
                                backgroundColor: 'transparent',
                                borderRadius: 20,
                                height: 50,
                                color: 'white',

                            }}
                            theme={{
                                colors: {
                                    text: 'white',
                                    placeholder: 'white',
                                },
                            }}
                        />
                    </View>

                    <TouchableOpacity onPress={() => { handleSendMessage }} >
                        <View style={{ backgroundColor: '#022e75', borderRadius: 15, padding: 5 }}>
                            <Icon
                                source="send"
                                color='white'
                                size={30}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        </View>
    )
}