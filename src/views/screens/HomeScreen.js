import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import UserContext from '../context/UserContext';
import { ImagePickerAvatar } from '../components/ImagePickerAvatar';
import { ImagePickerModal } from '../components/ImagePickerModal';
import { LinearGradient } from 'expo-linear-gradient';
import Label from '../components/Label';

import * as ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const options = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: false,
};

const HomeScreen = ({ navigation }) => {
  const { data } = useContext(UserContext);

  // Image Picker Start
  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);

  const onImageLibraryPress = useCallback(() => {
    launchImageLibrary(options, setPickerResponse);
  }, []);

  const onCameraPress = useCallback(async () => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    const result = await launchCamera(options);
    console.log(result);
  }, []);

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
  // Image Picker End

  // const [userDetails, setUserDetails] = useState();
  // React.useEffect(() => {
  //   getUserDetails();
  // }, []);
  // const getUserDetails = async () => {
  //   const userData = await AsyncStorage.getItem('user');
  //   if (userData) {
  //     setUserDetails(JSON.parse(userData));
  //   }
  // };

  const logout = () => {
    // AsyncStorage.setItem('user', JSON.stringify({ ...userDetails, loggedIn: false }));
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.header}>
        <Text style={styles.welcomeTxt}>Welcome {data.fullname}</Text>
        <TouchableOpacity onPress={logout} style={styles.logout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>

      <ImagePickerAvatar uri={uri} onPress={() => setVisible(true)} />
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={onImageLibraryPress}
        onCameraPress={onCameraPress}
      />

      <Label iconName='person' text={data.fullname} />
      <Label iconName='event' text={data.date ? data.date : 'Birth Date'} />
      <Label iconName='phone-iphone' text={data.phone} />
      <Label
        iconName='instagram'
        iconType='feather'
        text={data.instagram ? data.instagram : 'Instagram account'}
      />
      <Label iconName='mail' text={data.email} />
      <Label iconName='lock-outline' text='password' />

      <View style={styles.container}>
        <LinearGradient
          colors={['#000099', '#333399', '#663399']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.6, y: 1 }}
          style={styles.button}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfileScreen')}
          >
            <Text style={styles.buttonText}>Edit profile</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  header: {
    width: 390,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 40,
  },
  button: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
  },
  logout: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 2,
  },
  welcomeTxt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutTxt: {
    color: 'white',
    fontSize: 18,
  },
});

export default HomeScreen;
