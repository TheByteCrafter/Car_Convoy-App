import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Icon, Text } from 'react-native-paper';
import TopBar from '../../components/ui/TopBar';

export default function trips() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <TopBar />

      <ScrollView contentContainerStyle={{ paddingBottom: 40, backgroundColor: "white" }}>
        <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: "black", fontFamily: "SpaceMono" }} variant="headlineLarge">
            Your Trips

          </Text>

          <Button textColor="white" icon={"plus"} mode="contained" style={{ margin: 5, backgroundColor: "green", }} onPress={() => { }}>
            New Trip

          </Button>


        </View>

        <Card style={{ margin: 10, borderRadius: 10, backgroundColor: "white" }}>
          <Card.Content>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="titleLarge">
                
                Nairobi to Mombasa</Text>
              <Text style={Styles.pill} variant="bodyMedium">Active</Text>
            </View>
            <Text style={{ fontFamily: "SpaceMono", color: "black",marginBottom: 10 }} variant="bodyMedium">
              <Icon source="calendar" size={20} color='green' />
              {' '}
              
              Today, 8:00 AM - 2:00 PM</Text>



            <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="bodyMedium" >
              <Icon source="car-multiple" size={20} color='green' />
              {' '}
              4 cars in convoy</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="bodyMedium" >
             
                480 km</Text>
              <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="bodyMedium" >
                Est. 6 hours</Text>
            </View>

            <Divider />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

              <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="bodyMedium" >

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon color='green' source={"map-marker"} size={20} />
                  <Text style={{ fontFamily: "SpaceMono", color: "black", marginLeft: 5 }}>View Route</Text>
                </View>
              </Text>

              <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="bodyMedium" >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon source={"chat"} size={20} color='green' />
                  <Text style={{ marginLeft: 5, fontFamily: "SpaceMono", color: "black" }}>Chat</Text>
                </View>
              </Text>
            </View>
          </Card.Content>
        </Card>


        <Card style={{ margin: 10, borderRadius: 10, backgroundColor: "white" }}>
          <Card.Content>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="titleLarge">
                
              Nairobi to Nakuru</Text>
              <Text style={Styles.upcomingpill} variant="bodyMedium">Upcoming</Text>
            </View>
            <Text style={{ fontFamily: "SpaceMono", color: "black",marginBottom: 10 }} variant="bodyMedium">
              <Icon source="calendar" size={20} color='green' />
              {' '}
              
              Sat, May 20 • 7:00 AM</Text>



            <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="bodyMedium" >
              <Icon source="car-multiple" size={20} color='green' />
              {' '}
              5 cars in convoy</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="bodyMedium" >
             
              160 km</Text>
              <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="bodyMedium" >
                Est. 2.5 hours</Text>
            </View>

            <Divider />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

              <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="bodyMedium" >

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon color='green' source={"map-marker"} size={20} />
                  <Text style={{ fontFamily: "SpaceMono", color: "black", marginLeft: 5 }}>View Route</Text>
                </View>
              </Text>

              <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="bodyMedium" >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon source={"chat"} size={20} color='green' />
                  <Text style={{ marginLeft: 5, fontFamily: "SpaceMono", color: "black" }}>Chat</Text>
                </View>
              </Text>
            </View>
          </Card.Content>
        </Card>


        <Card style={{ margin: 10, borderRadius: 10, backgroundColor: "white" }}>
          <Card.Content>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="titleLarge">
                
              Nairobi to Kisumu</Text>
              <Text style={Styles.upcomingpill} variant="bodyMedium">Upcoming</Text>
            </View>
            <Text style={{ fontFamily: "SpaceMono", color: "black",marginBottom: 10 }} variant="bodyMedium">
              <Icon source="calendar" size={20} color='green' />
              {' '}
              
              Sun, May 28 • 6:30 AM</Text>



            <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="bodyMedium" >
              <Icon source="car-multiple" size={20} color='green' />
              {' '}
              24 cars in convoy</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="bodyMedium" >
             
              350 km</Text>
              <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="bodyMedium" >
                Est. 5 hours</Text>
            </View>

            <Divider />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

              <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="bodyMedium" >

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon color='green' source={"map-marker"} size={20} />
                  <Text style={{ fontFamily: "SpaceMono", color: "black", marginLeft: 5 }}>View Route</Text>
                </View>
              </Text>

              <Text style={{ fontFamily: "SpaceMono", color: "black" }} variant="bodyMedium" >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon source={"chat"} size={20} color='green' />
                  <Text style={{ marginLeft: 5, fontFamily: "SpaceMono", color: "black" }}>Chat</Text>
                </View>
              </Text>
            </View>
          </Card.Content>
        </Card>

      </ScrollView>
    </View>
  )
}

const Styles = StyleSheet.create({
  pill: {
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#f2bd52',
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    textAlign: 'center',
    fontFamily: 'SpaceMono',
    color: '#333',
  },
  upcomingpill: {
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#a7defc',
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    textAlign: 'center',
    fontFamily: 'SpaceMono',
    color: '#000',
  },


})