import {View, Text} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import EventCreation from '../NewEvent/EventCreation';
import EventsList from '../List/EventsList';

const NewEvent = () => {
  return (
    <View style={tw`w-full h-full bg-white p-10 gap-4`}>
      <EventCreation />
      {/* <EventsList /> */}
    </View>
  );
};

export default NewEvent;
