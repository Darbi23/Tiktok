import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import COLORS from '../../const/colors';
import Input from '../components/Input';
import Loader from '../components/Loader';
import UserContext from '../context/UserContext';
import { LinearGradient } from 'expo-linear-gradient';

const EditProfileScreen = ({ navigation }) => {
  const { data, submitData } = useContext(UserContext);
  const [inputs, setInputs] = useState({
    email: data.email,
    fullname: data.fullname,
    phone: data.phone,
    password: data.password,
    instagram: '',
    date: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
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
  };

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
    <SafeAreaView style={styles.SafeAreaView}>
      <Loader visible={loading} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.view}>
          <Input
            value={inputs.fullname}
            label='Fullname'
            type='ionicon'
            iconName='account'
            error={errors.fullname}
            onFocus={() => handleError(null, 'fullname')}
            onChangeText={(text) => handleOnChange(text, 'fullname')}
          />
          <Input
            keyboardType='numeric'
            placeholder='Enter Birth date'
            label='Birth date'
            iconName='calendar'
            error={errors.date}
            onFocus={() => handleError(null, 'date')}
            onChangeText={(text) => handleOnChange(text, 'date')}
          />
          <Input
            value={inputs.phone}
            keyboardType='numeric'
            placeholder='Enter your phone number'
            label='Phone Number'
            iconName='cellphone'
            error={errors.phone}
            onFocus={() => handleError(null, 'phone')}
            onChangeText={(text) => handleOnChange(text, 'phone')}
          />
          <Input
            placeholder='Enter your Instagram account'
            label='Instagram Account'
            iconName='instagram'
            error={errors.instagram}
            onFocus={() => handleError(null, 'instagram')}
            onChangeText={(text) => handleOnChange(text, 'instagram')}
          />
          <Input
            value={inputs.email}
            placeholder='Enter your email address'
            label='Email'
            iconName='email-outline'
            error={errors.email}
            onFocus={() => handleError(null, 'email')}
            onChangeText={(text) => handleOnChange(text, 'email')}
          />
          <Input
            value={inputs.password}
            placeholder='Enter your password'
            label='Password'
            iconName='lock-outline'
            error={errors.password}
            onFocus={() => handleError(null, 'password')}
            password
            onChangeText={(text) => handleOnChange(text, 'password')}
          />

          <View>
            <LinearGradient
              colors={['#000099', '#333399', '#663399']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 0.6, y: 1 }}
              style={styles.button}
            >
              <TouchableOpacity onPress={validate}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.cancelBtn}>
            <LinearGradient
              colors={['#000099', '#333399', '#663399']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 0.6, y: 1 }}
              style={styles.button}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    fontSize: 18,
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
  safeAreaView: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  contentContainer: {
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  view: {
    marginVertical: 20,
  },
  cancelBtn: {
    marginTop: -12,
  },
});

export default EditProfileScreen;
