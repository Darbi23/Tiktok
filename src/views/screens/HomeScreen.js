import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
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
  console.log(userDetails);
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
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  )
};

export default HomeScreen;