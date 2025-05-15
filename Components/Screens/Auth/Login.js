import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import i18n from '../../Language/i18n';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderKit from 'react-native-loader-kit';

const languages = [
  {label: 'English', value: 'en'},
  {label: 'French', value: 'fr'},
  {label: 'Spanish', value: 'es'},
];

const Login = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [authData, setAuthData] = useState({
    username: '',
    password: '',
  });

  const [selectedLanguage, setSelectedLanguage] = useState({
    label: 'English',
    value: 'en',
  });

  useEffect(() => {
    changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    getLanguage();
  }, []);

  const getLanguage = async () => {
    setIsLoading(true);
    try {
      const strRes = await AsyncStorage.getItem('language');
      const res = JSON.parse(strRes);
      if (res) {
        setSelectedLanguage(res);
        await i18n.changeLanguage(res.value);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = async lng => {
    setIsLoading(true);
    try {
      await i18n.changeLanguage(lng?.value);
      const str = JSON.stringify(lng);
      await AsyncStorage.setItem('language', str);
    } catch (error) {
      console.error('Language change failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
    <>
      {isLoading ? (
        <LoaderKit
          style={tw`h-14 w-14 m-auto`}
          name={'BallClipRotatePulse'}
          color={'#7c3aed'}
        />
      ) : (
        <View style={tw`bg-white h-full w-full p-10`}>
          <Text style={tw`text-center text-4xl -mb-4 tracking-wider`}>
            {t('welcome')}
          </Text>
          <View style={tw`h-full w-full flex justify-between items-center`}>
            <View
              style={tw`m-auto w-full min-h-[250px] h-[40%] flex justify-center items-center gap-6 elevation-4 bg-purple-100 p-6 rounded-xl`}>
              <Dropdown
                placeholderStyle={tw`text-gray-400`}
                containerStyle={tw`bg-white rounded-lg mt-1`}
                selectedTextStyle={tw`text-gray-400`}
                data={languages}
                style={tw`w-full h-12 p-2 bg-white rounded-lg`}
                placeholder="Select language"
                value={selectedLanguage}
                onChange={item => setSelectedLanguage(item)}
                labelField="label"
                valueField="value"
                renderItem={item => (
                  <View
                    key={item.value}
                    style={tw`flex flex-row items-center p-2`}>
                    <Text style={tw`text-lg text-gray-400`}>{item.label}</Text>
                  </View>
                )}
              />
              <TextInput
                onChange={e => handleChange('username', e)}
                style={tw`bg-white rounded-lg w-full p-3`}
                placeholder={t('username')}
              />
              <TextInput
                onChange={e => handleChange('password', e)}
                secureTextEntry
                style={tw`bg-white rounded-lg w-full p-3`}
                placeholder={t('password')}
              />
            </View>
            <View style={tw`w-full gap-4`}>
              <TouchableOpacity
                onPress={() => handleLogin()}
                style={tw`bg-purple-600 w-full p-3 rounded-xl elevation-4`}>
                <Text
                  style={tw`text-center text-white text-xl font-semibold tracking-wider`}>
                  {t('organizer_login')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleLogin()}
                style={tw`bg-purple-600 w-full p-3 rounded-xl elevation-4`}>
                <Text
                  style={tw`text-center text-white text-xl font-semibold tracking-wider`}>
                  {t('attendee_login')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
