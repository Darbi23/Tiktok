import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, Keyboard, SafeAreaView, ScrollView, Text, View} from 'react-native';
import COLORS from '../../const/colors';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';

const RegistrationScreen = ({ navigation }) => {
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
    } else if (!inputs.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/)) {
      handleError('Email type not valid', 'email');
      valid = false;
    }
    if(!inputs.fullname) {
      handleError('Please input fullname', 'fullname');
      valid = false;
    }
    if(!inputs.phone) {
      handleError('Please input phone', 'phone');
      valid = false;
    }
    if(!inputs.password) {
      handleError('Please input password', 'password');
      valid = false;
    } else if (inputs.password.length < 8) {
      handleError('Minimum password length of 8', 'password');
      valid = false;
    }
    if (valid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        AsyncStorage.setItem("user", JSON.stringify(inputs));
        navigation.navigate('LoginScreen');
      } catch (err) {
        Alert.alert("Error", 'Something went wrong')
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
      <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>Register</Text>
      <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>Enter your details to register</Text>
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
          placeholder="Enter your fullname" 
          label="Fullname" 
          iconName="account-outline"
          error={errors.fullname}
          onFocus={() => {
            handleError(null, 'fullname');
          }}
          onChangeText={text => handleOnChange(text, "fullname")}
        />
        <Input 
          keyboardType="numeric"
          placeholder="Enter your phone number" 
          label="Phone Number" 
          iconName="phone-outline"
          error={errors.phone}
          onFocus={() => {
            handleError(null, 'phone');
          }}
          onChangeText={text => handleOnChange(text, "phone")}
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
        <Button title='Register' onPress={validate}/>
        <Text 
          onPress={() => navigation.navigate('LoginScreen')}
          style={{ 
            color: COLORS.black, 
            textAlign: 'center', 
            fontSize: 16, 
            fontWeight: 'bold'
          }}>
          Already have an account ? Login
        </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
  
};

export default RegistrationScreen;