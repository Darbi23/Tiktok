import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { DisplayImageOrVideo } from '../components/DisplayImageOrVideo';
import { fileType } from './AddCharacter';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        image
        location {
          name
        }
      }
    }
  }
`;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const ref = useRef(null);
  const [, setCurrentSlideIndex] = useState(0);

  const [item, setItem] = useState(null);

  const udpateCurrentSlideIndex = (e: any) => {
    const contentOffsetY = e.nativeEvent.contentOffset.y;
    const currentIndex = Math.round(contentOffsetY / windowHeight);
    setCurrentSlideIndex(currentIndex);
  };

  const { error, loading, data } = useQuery(GET_CHARACTERS);

  if (loading) {
    return <Text>Spinning...</Text>;
  }

  if (error) {
    return <Text>Something went wrong</Text>;
  }
  return (
    <SafeAreaView>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={udpateCurrentSlideIndex}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        data={data.characters.results}
        renderItem={({ item }) => (
          <View style={{ width: windowWidth, height: windowHeight }}>
            {DisplayImageOrVideo(fileType, item.image, styles.video)}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.location}>{item.location.name}</Text>
            <TouchableOpacity
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ position: 'absolute', top: 20 }}
              onPress={() => {
                setItem(item);
                setModalVisible(true);
              }}>
              <Icon name="menu" size={42} color="#000" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                  // @ts-ignore: Object is possibly 'null'
                  navigation.navigate('AddCharacter', { id: item.id });
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.text}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  // @ts-ignore: Object is possibly 'null'
                  navigation.navigate('EditCharacter', { id: item.id });
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.text}>Edit</Text>
              </TouchableOpacity>
              <Pressable style={styles.closeBtn} onPress={() => setModalVisible(!modalVisible)}>
                <Icon name="close" size={34} color="#000" />
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    height: 200,
    width: 200,
    backgroundColor: 'green',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 30,
    left: 20,
    color: 'black',
  },
  location: {
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 10,
    left: 20,
    color: 'red',
  },
  btn: {
    height: 40,
    width: 200,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18,
    position: 'absolute',
    top: 60,
    left: 10,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addBtn: {
    height: 40,
    width: 200,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18,
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 8,
  },
  video: {
    width: windowWidth,
    height: windowHeight,
  },
  centeredView: {
    position: 'absolute',
    top: 20,
  },
  modalView: {
    // margin: 20,
    position: 'absolute',
    top: windowHeight - 160,
    width: windowWidth,
    height: 160,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default HomeScreen;
