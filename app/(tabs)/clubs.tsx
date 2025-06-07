import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Card, Icon, Searchbar, Text } from 'react-native-paper';
import TopBar from '../../components/ui/TopBar';

export default function clubs() {
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const [searchbar, setSearchbar] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');

  const router = useRouter();
  return (

    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="auto" translucent backgroundColor="transparent" />

      <TopBar />
      <ScrollView contentContainerStyle={{ paddingBottom: 40, backgroundColor: "white" }}>



        <View style={{ display: "flex", justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'SpaceMono', color: "black" }}>
            Car Clubs
          </Text>

          <Button
            style={{ backgroundColor: "green" }}
            textColor="white"
            icon={searchbar === 1 ? "magnify" : "close"}
            mode="contained"
            onPress={() => setSearchbar(searchbar === 1 ? 0 : 1)}
          >
            {searchbar === 0 ? "Close Search" : "Search Clubs"}
          </Button>


        </View>

        {searchbar === 0 && (
          <View style={{ padding: 20, display: "flex", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Searchbar
              style={{ width: '70%', height: 50 }}
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />

            <Button
              style={{ backgroundColor: 'green' }}
              textColor="white"
              mode="contained"
              onPress={() => console.log('Search pressed')}
            >
              Search
            </Button>


          </View>
        )}



        <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'SpaceMono', color: "black", padding: 20 }}>Your Clubs</Text>
        <View style={{ padding: 20, display: "flex", flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>

          <Card style={styles.cards}>
            <Card.Content>
              <Image style={{ height: 60, borderRadius: 10 }} source={{ uri: "https://images.pexels.com/photos/16264341/pexels-photo-16264341/free-photo-of-rescue-helicopter-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=600" }} />
              <Text style={styles.title} variant="titleLarge">Mountain Crew</Text>
              <Text style={styles.description} variant="bodyMedium">8 members</Text>
              <Text style={styles.pill} variant="bodyMedium">Member</Text>

              <TouchableOpacity onPress={() => console.log('View Club pressed')}>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Icon source={'chat-outline'} color="green" size={20} />
                <Text style={{ fontFamily: 'SpaceMono', color: 'green', fontSize: 12,padding:3}}>Chat</Text>
              </View>
              </TouchableOpacity>
            </Card.Content>
          </Card>

          <Card style={styles.cards}>
            <Card.Content>
              <Image style={{ width: '100%', height: 60, borderRadius: 10 }} source={{ uri: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" }} />
              <Text style={styles.title} variant="titleLarge">Nairobi Riders</Text>
              <Text style={styles.description} variant="bodyMedium">12 members</Text>
              <Text style={styles.pill} variant="bodyMedium">Member</Text>

              <TouchableOpacity onPress={() => 
               
                router.push({ pathname: '/(screens)/[id]', params: { id: 'nairobi-riders' } })


              }>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Icon source={'chat-outline'} color="green" size={20} />
                <Text style={{ fontFamily: 'SpaceMono', color: 'green', fontSize: 12,padding:3}}>Chat</Text>
              </View>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>

        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'SpaceMono', color: "black" }}>Recommended Clubs</Text>


          <Card.Title
            title="Mlima Banters"
            titleStyle={{ fontFamily: 'SpaceMono', fontSize: 14, color: '#333' }}
            subtitle="24 members • Focus on cross-country trips"
            subtitleStyle={{ fontFamily: 'SpaceMono', fontSize: 12, color: '#666' }}
            left={(props) => <Avatar.Image size={40} source={{ uri: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" }} />}
            right={(props) =>
              <Button style={styles.pill} mode="contained" onPress={() => console.log('Join Club pressed')}>
                Join Club
              </Button>
            }
          />
          <Card.Title
            title="Coastal Cruisers"
            titleStyle={{ fontFamily: 'SpaceMono', fontSize: 14, color: '#333' }}
            subtitle="18 members • Beach and coastal trips"
            subtitleStyle={{ fontFamily: 'SpaceMono', fontSize: 12, color: '#666' }}
            left={(props) => <Avatar.Image size={40} source={{ uri: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" }} />}
            right={(props) =>
              <Button style={styles.pill} mode="contained" onPress={() => console.log('Join Club pressed')}>
                Join Club
              </Button>
            }
          />

          <Card.Title
            title="Long Distance Riders"
            titleStyle={{ fontFamily: 'SpaceMono', fontSize: 14, color: '#333', flexWrap: 'wrap' }}
            subtitle="24 members • Focus on cross-country trips"
            subtitleStyle={{ fontFamily: 'SpaceMono', fontSize: 12, color: '#666' }}
            left={(props) => <Avatar.Image size={40} source={{ uri: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" }} />}
            right={(props) =>
              <Button style={styles.pill} mode="contained" onPress={() => console.log('Join Club pressed')}>
                Join Club
              </Button>
            }
          />

          <Card.Title

            title="Safari Adventurers"
            titleStyle={{ fontFamily: 'SpaceMono', fontSize: 14, color: '#333' }}
            subtitle="15 members • Wildlife and camping trips"
            subtitleStyle={{ fontFamily: 'SpaceMono', fontSize: 12, color: '#666' }}
            left={(props) => <Avatar.Image size={40} source={{ uri: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" }} />}
            right={(props) =>
              <Button style={styles.pill} mode="contained" onPress={() => console.log('Join Club pressed')}>
                Join Club
              </Button>
            }
          />

          <Card.Title
            title="Long Distance Riders"
            titleStyle={{ fontFamily: 'SpaceMono', fontSize: 14, color: '#333', flexWrap: 'wrap' }}
            subtitle="24 members • Focus on cross-country trips"
            subtitleStyle={{ fontFamily: 'SpaceMono', fontSize: 12, color: '#666' }}
            left={(props) => <Avatar.Image size={40} source={{ uri: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" }} />}
            right={(props) =>
              <Button style={styles.pill} mode="contained" onPress={() => console.log('Join Club pressed')}>
                Join Club
              </Button>
            }
          />

          <Card.Title

            title="Safari Adventurers"
            titleStyle={{ fontFamily: 'SpaceMono', fontSize: 14, color: '#333' }}
            subtitle="15 members • Wildlife and camping trips"
            subtitleStyle={{ fontFamily: 'SpaceMono', fontSize: 12, color: '#666' }}
            left={(props) => <Avatar.Image size={40} source={{ uri: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" }} />}
            right={(props) =>
              <Button style={styles.pill} mode="contained" onPress={() => console.log('Join Club pressed')}>
                Join Club
              </Button>
            }
          />


          <Card.Title
            title="Long Distance Riders"
            titleStyle={{ fontFamily: 'SpaceMono', fontSize: 14, color: '#333', flexWrap: 'wrap' }}
            subtitle="24 members • Focus on cross-country trips"
            subtitleStyle={{ fontFamily: 'SpaceMono', fontSize: 12, color: '#666' }}
            left={(props) => <Avatar.Image size={40} source={{ uri: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" }} />}
            right={(props) =>
              <Button style={styles.pill} mode="contained" onPress={() => console.log('Join Club pressed')}>
                Join Club
              </Button>
            }
          />

          <Card.Title

            title="Safari Adventurers"
            titleStyle={{ fontFamily: 'SpaceMono', fontSize: 14, color: '#333' }}
            subtitle="15 members • Wildlife and camping trips"
            subtitleStyle={{ fontFamily: 'SpaceMono', fontSize: 12, color: '#666' }}
            left={(props) => <Avatar.Image size={40} source={{ uri: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" }} />}
            right={(props) =>
              <Button style={styles.pill} mode="contained" onPress={() => console.log('Join Club pressed')}>
                Join Club
              </Button>
            }
          />

          <Card.Title
            title="Long Distance Riders"
            titleStyle={{ fontFamily: 'SpaceMono', fontSize: 14, color: '#333', flexWrap: 'wrap' }}
            subtitle="24 members • Focus on cross-country trips"
            subtitleStyle={{ fontFamily: 'SpaceMono', fontSize: 12, color: '#666' }}
            left={(props) => <Avatar.Image size={40} source={{ uri: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" }} />}
            right={(props) =>
              <Button style={styles.pill} mode="contained" onPress={() => console.log('Join Club pressed')}>
                Join Club
              </Button>
            }
          />

          <Card.Title

            title="Safari Adventurers"
            titleStyle={{ fontFamily: 'SpaceMono', fontSize: 14, color: '#333' }}
            subtitle="15 members • Wildlife and camping trips"
            subtitleStyle={{ fontFamily: 'SpaceMono', fontSize: 12, color: '#666' }}
            left={(props) => <Avatar.Image size={40} source={{ uri: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600" }} />}
            right={(props) =>
              <Button style={styles.pill} mode="contained" onPress={() => console.log('Join Club pressed')}>
                Join Club
              </Button>
            }
          />





        </View>
      </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'SpaceMono',
  },
  cards: {
    width: '45%',
    padding: 2,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  pill: {
    backgroundColor: 'lightgreen',
    marginTop: 10,
    padding: 5,
    borderRadius: 20,
    textAlign: 'center',
    fontFamily: 'SpaceMono',
    color: '#333',
  },
})