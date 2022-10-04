import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../const/colors';

const Input = ({
  label,
  iconName,
  error,
  password,
  type,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);

  return (
    <View style={styles.view}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkblue
              : COLORS.light,
          },
        ]}
      >
        <Icon name={iconName} type={type} style={styles.iconStyle} />
        <TextInput
          autoCapitalize='none'
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={styles.textInput}
          {...props}
        />
        {password && (
          <Icon
            style={styles.iconNoMargin}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            onPress={() => setHidePassword(!hidePassword)}
          />
        )}
      </View>
      {error && <Text style={styles.text}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginBottom: 10,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    color: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: 22,
    color: COLORS.darkblue,
    marginRight: 10,
  },
  iconNoMargin: {
    fontSize: 22,
    color: COLORS.darkblue,
  },
  textInput: {
    color: COLORS.darkblue,
    flex: 1,
  },
  text: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 7,
  },
});

export default Input;
