import React from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import COLORS from '../../const/colors';

const Loader = ({ visible = false }) => {
  const { height, width } = useWindowDimensions();
  if (visible) {
    return (
      <View style={[styles.container, { height, width }]}>
        <View style={styles.loader}>
          <ActivityIndicator size='large' color={COLORS.blue} />
          <Text style={styles.text}>Loading...</Text>
        </View>
      </View>
    );
  } else {
    return null;
  }
  // return (
  //   visible && (
  //     <View style={[styles.container, { height, width }]}>
  //       <View style={styles.loader}>
  //         <ActivityIndicator size='large' color={COLORS.blue} />
  //         <Text style={styles.text}>Loading...</Text>
  //       </View>
  //     </View>
  //   )
  // );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  loader: {
    height: 77,
    backgroundColor: COLORS.white,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default Loader;
