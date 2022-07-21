import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const ImagePickerAvatar = ({ uri, onPress }) => {
  return (
    <View
      style={styles.imageBackground}
      source={require('../../../assets/images/whatsappBackground.jpg')}
    >
      <LinearGradient
        colors={['#000099', '#333399', '#663399']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0.6, y: 1 }}
      >
        <View style={styles.avatar}>
          <Image
            style={styles.avatarImage}
            source={
              uri ? { uri } : require('../../../assets/images/avatar.jpg')
            }
          />
          <TouchableOpacity style={styles.addButton} onPress={onPress}>
            <Image
              style={styles.addButtonIcon}
              source={require('../../../assets/images/addButton.png')}
            />
          </TouchableOpacity>
          <Text style={styles.usernameText}>Upload Image</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    backgroundColor: '#000099',
    width: 420,
  },
  avatar: {
    alignItems: 'center',
    marginTop: '10%',
  },
  avatarImage: {
    height: 130,
    width: 130,
    overflow: 'hidden',
    borderColor: '#ffffff',
    borderWidth: 4,
    borderRadius: 150 / 2,
  },
  addButton: {
    height: 44,
    width: 44,
    backgroundColor: '#f2f2fC',
    borderRadius: 50,
    position: 'absolute',
    right: 155,
    bottom: 55,
  },
  addButtonIcon: {
    height: 44,
    width: 44,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 20,
  },
});
