import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext, useCallback } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon as Ico } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserContext from '../context/UserContext';
import { ImagePickerAvatar } from '../components/ImagePicker';
import { ImagePickerModal } from '../components/ImagePicker';
// import * as ImagePicker from "react-native-image-picker"
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const [ errors, setErrors ] = React.useState({});
  const { data } = useContext(UserContext);


  // Image Picker Start
  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);
  
  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, setPickerResponse);
  }, []);

  const onCameraPress = useCallback(async() => {
    const options = {
      saveToPhotos: false,
      mediaType: 'photo',
      includeBase64: false,
    };
    const result = await launchCamera(options);
    console.log(result);
  }, []);

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
  // Image Picker End


  const [userDetails, setUserDetails] = React.useState()
  React.useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    AsyncStorage.setItem('user', JSON.stringify({ ...userDetails, loggedIn: false }));
    navigation.navigate('LoginScreen');
  }

  return ( 
    <View 
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40
      }}>
      <View 
      style={{ 
        width: 390, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 20, 
        marginTop: 40}}
      >
        <Text 
        style={{ 
          fontSize: 20, 
          fontWeight: 'bold' }}
        > Welcome {data.fullname}</Text>
          <TouchableOpacity 
          onPress={logout} 
          style={{ 
            backgroundColor: 'red', 
            paddingHorizontal: 20, 
            paddingVertical: 6, 
            borderRadius: 25, 
            borderColor: 'black', 
            borderWidth: 2}}
          >
            <Text style={{color: 'white', fontSize: 18}}>Log out</Text>
          </TouchableOpacity>
      </View>
      <ImagePickerAvatar uri={uri} onPress={() => setVisible(true)} />
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={onImageLibraryPress}
        onCameraPress={onCameraPress}
      />
      <View style={styles.layer}>
        <Ico style={{ marginRight: 30 }} name='person' color="#000099"/>
        <Text style={{ fontSize: 18}}>{data.fullname}</Text>
      </View>
      <View style={styles.layer}>
        <Ico style={{ marginRight: 30 }} name='event' color="#000099"/>
        <Text style={{ fontSize: 18}}>{data.instagram ? data.date : 'Birth Date'}</Text>
      </View>    
      <View style={styles.layer}>
        <Ico style={{ marginRight: 30 }} name='phone-iphone' color="#000099"/>
        <Text style={{ fontSize: 18}}>{data.phone}</Text>
      </View>
      <View style={styles.layer}>
        <Icon style={{ marginRight: 30, fontSize: 24 }} name='instagram' color="#000099"/>
        <Text style={{ fontSize: 18}}>{data.instagram ? data.instagram : 'Instagram account'}</Text>
      </View>    
      <View style={styles.layer}>
        <Ico style={{ marginRight: 30 }} name='mail' color="#000099"/>
        <Text style={{ fontSize: 18}}>{data.email}</Text>
      </View>    
      <View style={styles.layer}>
        <Ico style={{ marginRight: 30 }} name='lock-outline' color="#000099"/>
        <Text style={{ fontSize: 18}}>password</Text>
      </View>               
      <View style={styles.container}>
        <LinearGradient
          colors={['#000099', '#333399', '#663399']}
          start={{x: 0, y: 0.5}}
          end={{x: 0.6, y: 1}}
          style={styles.button}
        >
          <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')}>
            <Text style={styles.buttonText}>Edit profile</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    borderBottomColor: '#686868', 
    color: '#686868 ',
    borderBottomWidth: 1,
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    fontSize: 18
  },
  button: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 50 
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24
  },
  layer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    borderBottomWidth: 1, 
    borderColor: '#686868', 
    height: 60,  
    width: '100%'
  }
});

export default HomeScreen;