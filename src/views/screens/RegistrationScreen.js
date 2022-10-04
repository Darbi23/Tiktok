import AsyncStorage from ' native-async-storage/async-storage';
import React, { useState, useContext, useCallback } from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import COLORS from '../../const/colors';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import UserContext from '../context/UserContext';

const RegistrationScreen = ({ navigation }) => {
  const { data, submitData } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: '',
    fullname: '',
    phone: '',
    password: '',
  });

  const validate = useCallback(() => {
    Keyboard.dismiss();
    let valid = true;
    if (inputs.email.length <= 0) {
      handleError('Please input an email', 'email');
      valid = false;
    } else if (
      !inputs.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/)
    ) {
      handleError('Email type not valid', 'email');
      valid = false;
    }
    if (inputs.fullname.length <= 0) {
      handleError('Please input fullname', 'fullname');
      valid = false;
    }
    if (inputs.phone.length <= 0) {
      handleError('Please input phone', 'phone');
      valid = false;
    }
    if (inputs.password.length <= 0) {
      handleError('Please input password', 'password');
      valid = false;
    } else if (inputs.password.length < 8) {
      handleError('Minimum password length of 8', 'password');
      valid = false;
    }
    if (valid) {
      register();
    }
  });

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        AsyncStorage.setItem('user', JSON.stringify(inputs));
        submitData(inputs);
        navigation.navigate('HomeScreen');
      } catch (err) {
        Alert.alert('Error', 'Something went wrong');
      }
    }, 2000);
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Loader visible={loading} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.register}>Register</Text>
        <Text style={styles.details}>Enter your details to register</Text>
        <View style={styles.view}>
          <Input
            placeholder='Enter your email address'
            label='Email'
            iconName='email-outline'
            error={errors.email}
            onFocus={() => {
              handleError(null, 'email');
            }}
            onChangeText={(text) => handleOnChange(text, 'email')}
          />
          <Input
            placeholder='Enter your fullname'
            label='Fullname'
            iconName='account-outline'
            error={errors.fullname}
            onFocus={() => {
              handleError(null, 'fullname');
            }}
            onChangeText={(text) => handleOnChange(text, 'fullname')}
          />
          <Input
            keyboardType='numeric'
            placeholder='Enter your phone number'
            label='Phone Number'
            iconName='phone-outline'
            error={errors.phone}
            onFocus={() => {
              handleError(null, 'phone');
            }}
            onChangeText={(text) => handleOnChange(text, 'phone')}
          />
          <Input
            placeholder='Enter your password'
            label='Password'
            iconName='lock-outline'
            error={errors.password}
            onFocus={() => {
              handleError(null, 'password');
            }}
            password
            onChangeText={(text) => handleOnChange(text, 'password')}
          />
          <Button title='Register' onPress={validate} />
          <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={styles.loginStyle}
          >
            Already have an account ? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  contentContainer: {
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  register: {
    color: COLORS.black,
    fontSize: 40,
    fontWeight: 'bold',
  },
  details: {
    color: COLORS.grey,
    fontSize: 18,
    marginVertical: 10,
  },
  view: {
    marginVertical: 20,
  },
  loginStyle: {
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default RegistrationScreen;
