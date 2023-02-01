import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {KEYS, storeData} from '../Helper/LocalStorage';
import {setUser} from '../Store/Reducers/UserInfo';

const RegisterScreen = () => {
  const [text, setText] = React.useState('');

  const onChangeText = val => setText(val);
  const [loading, setLoading] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const navigate = useNavigation();
  const [name, setName] = React.useState('');
  const dispatch = useDispatch();

  const hasErrors = () => {
    return text.length < 10;
  };
  const checkName = () => {
    return name.length < 3;
  };

  return (
    <View style={style.body}>
      <Text style={style.headlineStyle} variant="headlineLarge">
        Hi, there
      </Text>
      <Text style={style.labelStyle}>Enter your phone number*</Text>
      <TextInput
        placeholder="Phone number"
        style={style.textInput}
        maxLength={12}
        onChangeText={onChangeText}
        placeholderTextColor={'grey'}
        underlineColor={'transparent'}
        left={<TextInput.Icon icon={'phone'} iconColor={'grey'} />}
      />
      <HelperText style={style.errorText} type="error" visible={hasErrors()}>
        Invalid phone number
      </HelperText>
      <Text style={style.labelStyle}>Enter your name*</Text>
      <TextInput
        placeholder="Name"
        style={style.textInput}
        maxLength={12}
        onChangeText={setName}
        placeholderTextColor={'grey'}
        underlineColor={'transparent'}
        left={<TextInput.Icon icon={'phone'} iconColor={'grey'} />}
      />
      <HelperText type="error" visible={checkName()}>
        Invalid name
      </HelperText>
      <Button
        elevation={12}
        mode={'contained-tonal'}
        style={style.btnStyle}
        onPress={() => {
          if (checkName() && hasErrors()) {
            return;
          } else {
            setLoading(true);
            setTimeout(async () => {
              setLoading(false);
              setCompleted(true);
              dispatch(setUser({name: name, number: text}));
              await storeData({
                keystore: KEYS.adminUser,
                value: {name: name, number: text},
              });
              navigate.reset({
                routes: [{name: 'home'}],
              });
            }, 100);
          }
        }}
        loading={loading}>
        Continue
      </Button>
      <HelperText style={style.done} visible={completed} type="info">
        Done
      </HelperText>
    </View>
  );
};
export default RegisterScreen;

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingHorizontal: 26,
  },
  headlineStyle: {
    fontWeight: 'bold',
    fontFamily: 'Roboto-black',
    marginBottom: 20,
  },
  labelStyle: {
    color: 'grey',
    fontSize: 13,
  },
  textInput: {
    marginTop: 6,
    backgroundColor: 'rgba(245,245,245)',
    borderWidth: 0.5,
    borderRadius: 12,
  },
  errorText: {
    marginBottom: 12,
  },
  btnStyle: {
    marginTop: 30,
    elevation: 12,
    alignSelf: 'center',
  },
  done: {
    textAlign: 'center',
    backgroundColor: 'rgba(120,178,120,1)',
    alignSelf: 'center',
    color: 'white',
    marginTop: 12,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
