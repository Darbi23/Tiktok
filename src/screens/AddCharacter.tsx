import React, { useState } from 'react';
import { 
  StyleSheet,
  Text, 
  SafeAreaView, 
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { GET_CHARACTERS } from './HomeScreen';
import { launchImageLibrary } from 'react-native-image-picker';
import { DisplayImageOrVideo } from '../components/DisplayImageOrVideo';

const query = gql`
  query MyTodoAppQuery {
    todos {
      id
      text
      completed
    }
  }
`;

export let fileType = '';

const AddCharacter = ({ route, navigation }): JSX.Element => {
  const [ name, setName ] = useState('');
  const [ location, setLocation ] = useState('');
  const [ image, setImage ] = useState('');
  const { id } = route.params;
  const { error, loading, data, updateQuery } = useQuery(GET_CHARACTERS, { fetchPolicy: 'cache-only' });

  const openCamera = () => {
    const options = {mediaType: 'mixed'};
    launchImageLibrary(options, response => {
      setImage(response.assets[0].uri);
      fileType = response.assets[0].type === 'video/mp4' ? 'video' : 'image';
      console.log(fileType);
    });  
  }

  const addData = () => {  
    updateQuery((prev) => {
      const users = [...prev.characters.results];     
      const userSample = {...prev.characters.results[0]};     
      const newUser = {...userSample, image, name, location: {...userSample.location, name: location}, id: users.length + 1};
      users.push(newUser);

      return {
        ...prev,
        characters: {...prev.characters, results: users}
      };
    });
  }

  return (
    <SafeAreaView>
      <Button title='choose photo' onPress={() => openCamera()}/>
      {image && DisplayImageOrVideo(fileType, image, styles.video)}
      <TextInput style={styles.textInput} onChangeText={setName}></TextInput>
      <TextInput style={styles.textInput} onChangeText={setLocation}></TextInput>
      <TouchableOpacity style={styles.saveBtn} onPress={() => {
        addData();
        navigation.navigate('HomeScreen');
        } }>
        <Text style={styles.saveTxt}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  video: {
    width: 200,
    height: 200
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 4
  },
  saveBtn: {
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: 'blue',
    width: 100,
    padding: 10
  },
  saveTxt: {
    color: 'white',
    fontSize: 18, 
    textAlign: 'center'
  }
});

export default AddCharacter;