import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [authData, setAuthData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setAuthData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  };

  return (
    <View style={tw`bg-white h-full w-full p-10 `}>
      <View style={tw`h-full w-full flex justify-between items-center`}>
        <View
          style={tw`m-auto w-full h-[40%] flex justify-center items-center gap-6 elevation-4 bg-purple-100 p-6 rounded-xl`}>
          <TextInput
            onChange={e => handleChange('username', e)}
            style={tw`bg-white rounded-lg w-full p-3`}
            placeholder="Username"
          />
          <TextInput
            onChange={e => handleChange('password', e)}
            secureTextEntry
            style={tw`bg-white rounded-lg w-full p-3`}
            placeholder="Password"
          />
        </View>
        <View style={tw`w-full h-fit gap-4`}>
          <TouchableOpacity
            onPress={() => handleLogin()}
            style={tw`bg-purple-600 w-full p-3 rounded-xl elevation-4`}>
            <Text
              style={tw`text-center text-white text-xl font-semibold tracking-wider`}>
              Organizer login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLogin()}
            style={tw`bg-purple-600 w-full p-3 rounded-xl elevation-4`}>
            <Text
              style={tw`text-center text-white text-xl font-semibold tracking-wider`}>
              Attendee login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
