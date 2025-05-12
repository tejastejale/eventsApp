import {View, Text, ImageBackground} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getEvents = async () => {
        try {
          const strEvents = await AsyncStorage.getItem('events');
          const parsedEvents = JSON.parse(strEvents);
          console.log(parsedEvents, 'events');
          if (parsedEvents) {
            setEvents(parsedEvents);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getEvents();
    }, []),
  );

  const formatTimeTo12Hour = ({hours, minutes}) => {
    const hrs = hours % 12 === 0 ? 12 : hours % 12;
    const mins = minutes.toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';

    return `${hrs}:${mins} ${period}`;
  };

  return (
    <View style={tw`h-full bg-white p-4 gap-3`}>
      {events?.length > 0 &&
        events.map(item => (
          <View style={tw`rounded-xl overflow-hidden elevation-4`}>
            <ImageBackground
              source={{
                uri: item.mainImage.uri,
              }}
              resizeMode="cover"
              style={tw`w-full h-40`}>
              <View style={tw`w-full h-full p-4 justify-end bg-black/40`}>
                <Text style={tw`font-bold text-white text-lg`}>
                  {item.organizer} &nbsp;
                  {item.eventName}
                </Text>
                <View style={tw`flex-row gap-2`}>
                  <Text style={tw`font-semibold text-white`}>
                    {item.date}&nbsp;{formatTimeTo12Hour(item.time)}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        ))}
    </View>
  );
};

export default EventsList;
