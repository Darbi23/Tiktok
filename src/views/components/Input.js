import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Icon as Ico } from 'react-native-elements';
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
  const [ isFocused, setIsFocused ] = React.useState(false); 
  const [ hidePassword, setHidePassword ] = React.useState(password);

  return (
    <View style={{ marginBottom: 10 }}> 
      <Text style={styles.label}>{label}</Text>
      <View 
        style={[
          styles.inputContainer,
          { 
            borderColor: error 
            ? COLORS.red 
            : isFocused 
            ? COLORS.darkblue 
            : COLORS.light 
          }
        ]}>
        <Icon name={iconName} type={type} style={{ fontSize: 22, color: COLORS.darkblue, marginRight: 10 }}/>
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
          style={{ color: COLORS.darkblue, flex: 1 }} 
          { ...props } 
        />
        {password && (
          <Icon 
            style={{ fontSize:22, color:COLORS.darkblue }} 
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            onPress={() => setHidePassword(!hidePassword) } 
          />
        )}
      </View>
      { error && (
        <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 7 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey
  },
  inputContainer: {
    height: 55,
    color: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: 'center'
  }
});

export default Input;