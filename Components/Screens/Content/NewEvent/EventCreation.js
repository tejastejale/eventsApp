import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from './Component/DatePicker';
import {TimePicker} from './Component/TimePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

const EventCreation = () => {
  const [dateTimePicker, setDateTimePicker] = useState({
    isDatePickerVisible: false,
    isTimePickerVisible: false,
  });

  const [formData, setFormData] = useState({
    eventName: '',
    organizer: '',
    date: '',
    time: '',
    attendees: '',
    mainImage: null,
    eventImages: [],
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    requestStoragePermission();
  }, []);

  useEffect(() => {
    const isValid =
      formData.eventName &&
      formData.organizer &&
      formData.date &&
      formData.time &&
      formData.attendees &&
      formData.mainImage &&
      formData.eventImages.length > 0;

    setIsFormValid(isValid);
  }, [formData]);

  const requestStoragePermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const selectMainImage = async () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, res => {
      if (!res.didCancel && res.assets?.length) {
        setFormData(prev => ({...prev, mainImage: res.assets[0]}));
      }
    });
  };

  const selectEventImages = async () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 4}, res => {
      if (!res.didCancel && res.assets?.length) {
        setFormData(prev => ({
          ...prev,
          eventImages: [...prev.eventImages, ...res.assets],
        }));
      }
    });
  };

  const removeMainImage = () =>
    setFormData(prev => ({...prev, mainImage: null}));

  const removeEventImage = index =>
    setFormData(prev => ({
      ...prev,
      eventImages: prev.eventImages.filter((_, i) => i !== index),
    }));

  const handleDateTimeVisible = (type, isVisible) => {
    setDateTimePicker(prev => ({
      ...prev,
      [type]: !isVisible,
    }));
  };

  const handleDateTimeChange = (type, value) => {
    setFormData(prev => ({...prev, [type]: value}));
  };

  const formatTimeTo12Hour = ({hours, minutes}) => {
    const hrs = hours % 12 === 0 ? 12 : hours % 12;
    const mins = minutes.toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';

    return `${hrs}:${mins} ${period}`;
  };

  const handleCreate = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      let eventsArray = [];

      if (storedEvents) {
        eventsArray = JSON.parse(storedEvents);
      }

      eventsArray.push(formData); // Add the new event to the array

      await AsyncStorage.setItem('events', JSON.stringify(eventsArray));
      console.log('Event saved successfully');
    } catch (error) {
      console.log('Error saving event:', error);
    }
  };

  return (
    <View style={tw`w-full p-8`}>
      <View
        style={tw`w-full justify-center p-6 gap-3 bg-purple-100 rounded-xl elevation-4`}>
        {/* Inputs */}
        <TextInput
          style={tw`bg-white rounded-lg w-full p-3`}
          placeholder={t('event_name')}
          value={formData.eventName}
          onChangeText={text =>
            setFormData(prev => ({...prev, eventName: text}))
          }
        />
        <TextInput
          style={tw`bg-white rounded-lg w-full p-3`}
          placeholder={t('organizer_name')}
          value={formData.organizer}
          onChangeText={text =>
            setFormData(prev => ({...prev, organizer: text}))
          }
        />

        <View style={tw`flex-row gap-2`}>
          <TouchableOpacity
            onPress={() =>
              handleDateTimeVisible(
                'isDatePickerVisible',
                dateTimePicker.isDatePickerVisible,
              )
            }
            style={tw`bg-white rounded-lg flex-1 p-3`}>
            <Text style={tw`text-gray-400`}>
              {formData.date || t('select_date')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleDateTimeVisible(
                'isTimePickerVisible',
                dateTimePicker.isTimePickerVisible,
              )
            }
            style={tw`bg-white rounded-lg flex-1 p-3`}>
            <Text style={tw`text-gray-400`}>
              {Object.keys(formData.time).length > 0
                ? formatTimeTo12Hour(formData.time)
                : t('select_time')}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={tw`bg-white rounded-lg w-full p-3`}
          placeholder={t('total_attendees')}
          keyboardType="decimal-pad"
          value={formData.attendees}
          onChangeText={text =>
            setFormData(prev => ({...prev, attendees: text}))
          }
        />

        {/* Image Pickers */}
        <ScrollView>
          <TouchableOpacity
            onPress={selectMainImage}
            style={tw`bg-purple-100 p-4 rounded-lg justify-center mb-4 border border-dashed border-white`}>
            {formData.mainImage ? (
              <View style={tw`relative`}>
                <Image
                  source={{uri: formData.mainImage.uri}}
                  style={tw`w-16 h-16 rounded`}
                />
                <TouchableOpacity
                  onPress={removeMainImage}
                  style={tw`absolute -top-2 left-12 bg-white p-1 rounded-full`}>
                  <Icon name="close" size={20} color="black" />
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={tw`text-gray-500 text-center`}>
                {t('tap_add_main_image')}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={selectEventImages}
            style={tw`bg-purple-100 p-4 rounded-lg items-center justify-center mb-4 border border-dashed border-white`}>
            <Text style={tw`text-gray-500`}>
              {t('tap_select_event_images')}
            </Text>
          </TouchableOpacity>

          <ScrollView horizontal style={tw`flex-row gap-2`}>
            {formData.eventImages.map((img, i) => (
              <View key={i} style={tw`relative mr-2`}>
                <Image source={{uri: img.uri}} style={tw`w-12 h-12 rounded`} />
                <TouchableOpacity
                  onPress={() => removeEventImage(i)}
                  style={tw`absolute -top-2 -right-2 bg-white p-1 rounded-full`}>
                  <Icon name="close" size={16} color="black" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </ScrollView>

        {/* Date & Time Picker Components */}
        <View style={tw`absolute`}>
          <DatePicker
            onChange={handleDateTimeChange}
            isVisible={dateTimePicker}
            handleDateTimeVisible={handleDateTimeVisible}
            setDate={date => setFormData(prev => ({...prev, date}))}
          />
          <TimePicker
            formData={formData}
            onChange={handleDateTimeChange}
            isVisible={dateTimePicker}
            handleDateTimeVisible={handleDateTimeVisible}
            setTime={time => setFormData(prev => ({...prev, time}))}
          />
        </View>
      </View>

      {/* Create Button */}
      <TouchableOpacity
        disabled={!isFormValid}
        onPress={() => handleCreate()}
        style={tw`${
          !isFormValid ? 'bg-purple-300' : 'bg-purple-600'
        } my-4 p-3 rounded-xl`}>
        <Text
          style={tw`text-center text-lg font-semibold text-white tracking-wider`}>
          {t('create')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventCreation;
