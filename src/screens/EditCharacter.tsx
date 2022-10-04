import React, { useMemo, useState } from 'react';
import { 
  StyleSheet,
  Text, 
  SafeAreaView, 
  TextInput,
  TouchableOpacity
} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { GET_CHARACTERS } from './HomeScreen';

const query = gql`
  query MyTodoAppQuery {
    todos {
      id
      text
      completed
    }
  }
`;

const EditCharacter = ({ route, navigation }): JSX.Element => {
  const [ name, setName ] = useState('');
  const [ location, setLocation ] = useState('');

  const { id } = route.params;
  const { error, loading, data, updateQuery } = useQuery(GET_CHARACTERS, { fetchPolicy: 'cache-only' });

  const user = data.characters.results;

  const currentUser = useMemo(() => {
    return user.find((user: any) => {
      return user.id === id
    })
  }, [user, id]);


  const updateData = () => {
    updateQuery((prev) => {
      const users = [...prev.characters.results];
      const userIndex = users.findIndex((user: any) => user.id === id);
      users[userIndex] = {
        ...users[userIndex],
        name,
        location: {...users[userIndex].location, name: location}   
      };

      return {
        ...prev,
        characters: {...prev.characters, results: users}
      };
    });
  }

  return (
    <SafeAreaView>
      <TextInput style={styles.textInput}  onChangeText={setName}
        defaultValue={currentUser.name}>
      </TextInput>
      <TextInput style={styles.textInput} onChangeText={setLocation} 
        defaultValue={currentUser.location.name}> 
      </TextInput>
      <TouchableOpacity style={styles.saveBtn} onPress={() => {
        console.log(currentUser.name, currentUser.location.name)
        setName(currentUser.name);
        // setLocation(currentUser.location.name);
        updateData();
        navigation.navigate('HomeScreen');
        }}>
        <Text style={styles.saveTxt}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default EditCharacter;