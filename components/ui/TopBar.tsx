import { Image } from 'expo-image';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import ModalMessage from './modaldisplay';

export default function TopBar() {
  const [notficationbadgedot, setDotbadge] = useState(false);
  const [visible, setVisible] = useState(false);
  const [profileNotifications, setProfileNotifications] = useState<string[]>([]); 
  const [userphoto, setUserPhoto] = useState('');

  useEffect(() => {
    const checkProfileComplete = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const incompleteFields: string[] = [];

        if (!data.fullName) incompleteFields.push('Full Name');
        if (!data.bio) incompleteFields.push('Bio');
        if (!data.location) incompleteFields.push('Location');
        if (!data.photoURL || data.photoURL.trim() === '') {
          incompleteFields.push('Photo');
        } else {
          setUserPhoto(data.photoURL);
        }
        if (!data.vehicleInfo || data.vehicleInfo.length === 0 || data.vehicleInfo.every((v: null) => v === null)) {
          incompleteFields.push('Vehicle Info');
        }

        if (incompleteFields.length > 0) {
          setDotbadge(true);
          setProfileNotifications(incompleteFields);
        }
      }
    };

    checkProfileComplete();
  }, []);

 
  const groupedNotifications = [
    {
      title: 'Profile Updates',
      icon: 'account-alert',
      subtitle: profileNotifications.length > 0
        ? 'Your profile is incomplete. Please update the following fields:'
        : 'Your profile is complete. You can now join clubs and plan car trips!',
      data: profileNotifications
    },
    {
      title: 'Club Posts',
      icon: 'car-multiple',
      data: []
    },
    {
      title: 'Events',
      icon: 'calendar',
      data: []
    }
  ];

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: '#03a832' }}>
        <Appbar.Action iconColor="white" icon="car" onPress={() => {}} />
        <Appbar.Content
          title="Kenyan Convoy"
          titleStyle={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'SpaceMono'
          }}
        />
        <View style={{ position: 'relative' }}>
          <Appbar.Action
            iconColor="white"
            icon="bell"
            onPress={() => setVisible(true)}
          />
          {notficationbadgedot && (
            <View
              style={{
                position: 'absolute',
                top: 15,
                right: 15,
                backgroundColor: 'red',
                width: 10,
                height: 10,
                borderRadius: 5
              }}
            />
          )}
        </View>
        {userphoto && (
          <Image
            style={{ width: 40, height: 40, borderRadius: 15 }}
            source={{ uri: userphoto }}
          />
        )}
      </Appbar.Header>

      <ModalMessage
        visible={visible}
        hideModal={() => setVisible(false)}
        groupedNotifications={groupedNotifications}
      />
    </View>
  );
}
