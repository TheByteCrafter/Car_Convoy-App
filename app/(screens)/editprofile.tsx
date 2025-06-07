import CarMakeModelSelector from '@/components/ui/carmakes';
import ProfileTopBar from '@/components/ui/profileTopAppbar';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  View
} from 'react-native';
import { Avatar, Button, Divider, List, Text } from 'react-native-paper';
import { auth } from '../../libs/firebaseconfig';

export default function EditProfile() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [suggestedCounties, setSuggestedCounties] = useState<string[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [profileimg, setProfileImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState({ make: '', model: '', licensePlate: '', dateadded: new Date().toISOString() });

  const router = useRouter();

  const counties = [
    "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", "Homa Bay",
    "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu",
    "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit", "Meru",
    "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
    "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River", "Tharaka-Nithi", "Trans Nzoia",
    "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
  ];

  const filterCounties = (query: string) => {
    setLocationQuery(query);
    setSuggestedCounties(
      counties.filter((county) =>
        county.toLowerCase().startsWith(query.toLowerCase())
      )
    );
  };

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
      return json.secure_url || null;
    } catch (err) {
      console.error('Cloudinary error:', err);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          const vehicleFromDB = data.vehicleInfo?.[0] || { make: '', model: '', licensePlate: '', dateadded: new Date().toISOString() };

          if (!vehicleFromDB.dateadded) {
            vehicleFromDB.dateadded = new Date().toISOString();
          }

          setVehicle(vehicleFromDB);
          setName(data.fullName || '');
          setPhone(data.phone || '');
          setLocation(data.location || '');
          setLocationQuery(data.location || '');
          setSuggestedCounties([]);
          setProfileImg(data.photoURL || '');
          setBio(data.bio || '');
          setImageUri(data.photoURL || null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserData();
  }, []);


  const handleSave = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);

      let uploadedImageUrl = null;
      if (imageUri) {
        uploadedImageUrl = await uploadToCloudinary(imageUri);
      }

      // Ensure dateadded is always set
      const vehicleToSave = {
        ...vehicle,
        dateadded: vehicle.dateadded || new Date().toISOString(),
      };

      await updateDoc(userRef, {
        fullName: name,
        phone,
        bio,
        location,
        vehicleInfo: [vehicleToSave],
        ...(uploadedImageUrl && { photoURL: uploadedImageUrl }),
      });

      router.back();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <ProfileTopBar />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 20 }}>
          <Text style={styles.header}>Edit Profile</Text>

          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={100}
              source={{
                uri: profileimg || 'https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?semt=ais_items_boosted&w=740'
              }}
            />
            <Button onPress={pickImage} textColor="white" style={styles.chooseImageBtn}>
              Choose Image
            </Button>
          </View>

          <Text style={styles.sectionTitle}>Account Information</Text>
          <Divider style={styles.divider} />

          <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
          <TextInput style={[styles.input, styles.bioInput]} placeholder="Bio" multiline value={bio} onChangeText={setBio} />

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            marginBottom: 10,
          }}>
            <Ionicons name="location-outline" size={20} color="#555" style={{ marginRight: 8 }} />
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Enter County"
              value={locationQuery}
              onChangeText={filterCounties}
            />
          </View>
          {suggestedCounties.length > 0 && (
            <List.Section style={{ backgroundColor: 'white', borderRadius: 8, marginBottom: 20 }}>
              {suggestedCounties.map((item) => (
                <List.Item
                  key={item}
                  title={item}
                  titleStyle={{ fontFamily: 'SpaceMono', fontSize: 16, color: '#222' }}
                  onPress={() => {
                    setLocation(item);
                    setLocationQuery(item);
                    setSuggestedCounties([]);
                  }}
                  style={{ borderBottomWidth: 1, borderColor: '#eee' }}
                />
              ))}
            </List.Section>
          )}

          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Driving Information</Text>
            <Divider style={styles.divider} />

            <CarMakeModelSelector
              initialMake={vehicle.make}
              initialModel={vehicle.model}
              onSelect={(make, model) =>
                setVehicle((prev) => ({
                  ...prev,
                  make,
                  model,
                }))
              }
            />

            <TextInput
              style={styles.input}
              placeholder="License Plate"
              value={vehicle.licensePlate}
              onChangeText={(text) => setVehicle({ ...vehicle, licensePlate: text })}
            />
          </View>

          <Button
            mode="contained"
            onPress={handleSave}
            loading={loading}
            textColor="white"
            disabled={loading}
            style={styles.saveButton}
          >
            Save Changes
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = {
  header: {
    fontFamily: 'SpaceMono',
    fontSize: 28,
    color: '#2c3e50',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center' as const,
    marginBottom: 30,
  },
  chooseImageBtn: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#3D5AFE',
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'SpaceMono',
    fontSize: 18,
    color: '#388e3c',
    marginBottom: 5,
  },
  divider: {
    marginBottom: 20,
    marginTop: 5,
  },
  input: {
    fontFamily: 'SpaceMono',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000', // improved visibility
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top' as 'top',
  },
  sectionBlock: {
    marginTop: 30,
  },
  saveButton: {
    marginTop: 30,
    borderRadius: 8,
    backgroundColor: '#3D5AFE',
    paddingVertical: 10,
  },
  suggestionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
};
