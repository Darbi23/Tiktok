import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, Text, View, Keyboard } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import COLORS from '../../const/colors';

const LoginScreen = ({ navigation }) => {
  const [ inputs, setInputs ] = React.useState({
    email: '',
    fullname: '',
    phone: '',
    password: ''
  });
  const [ errors, setErrors ] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if(!inputs.email) {
      handleError('Please input an email', 'email');
      valid = false;
    } 

    if(!inputs.password) {
      valid = false;
      handleError('Please input password', 'password');
    }
    if (valid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem("user");
      if (userData) {
        userData = JSON.parse(userData);
        if (inputs.email === userData.email && inputs.password === userData.password) {
          AsyncStorage.setItem("user", JSON.stringify({ ...userData, loggedIn: true}));
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert("Error", "Invalid Details");
        }
      } else {
        Alert.alert("Error", "User does not exist");
      }
    }, 3000);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }))
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView contentContainerStyle={{ paddingTop: 70, paddingHorizontal: 20 }}>
      <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>Login</Text>
      <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>Enter your details to Login</Text>
      <View style={{ marginVertical: 20 }}>
        <Input 
          placeholder="Enter your email address" 
          label="Email" 
          iconName="email-outline"
          error={errors.email}
          onFocus={() => {
            handleError(null, 'email');
          }}
          onChangeText={text => handleOnChange(text, "email")}
        />
        <Input 
          placeholder="Enter your password" 
          label="Password" 
          iconName="lock-outline"
          error={errors.password}
          onFocus={() => {
            handleError(null, 'password');
          }}
          password
          onChangeText={text => handleOnChange(text, "password")}
        />
        <Button title='Login' onPress={validate}/>
        <Text 
          onPress={() => navigation.navigate('RegistrationScreen')}
          style={{ 
            color: COLORS.black, 
            textAlign: 'center', 
            fontSize: 16, 
            fontWeight: 'bold'  
          }}>
          Don't have an account ? Register
        </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
};

export default LoginScreen;