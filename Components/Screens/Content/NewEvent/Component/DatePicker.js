import {Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import tw from 'twrnc';
import DateTimePicker, {useDefaultStyles} from 'react-native-ui-datepicker';

const DatePicker = ({isVisible, onChange, handleDateTimeVisible}) => {
  const [date, setDate] = useState(new Date());
  const defaultStyles = useDefaultStyles();

  // useEffect(() => {
  //   const temp = new Date(date).toDateString();
  //   onChange('date', temp);
  // }, [date]);

  const handleConfirm = () => {
    const temp = new Date(date).toDateString();
    onChange('date', temp);
    handleDateTimeVisible('isDatePickerVisible', isVisible);
  };

  return (
    <View>
      <ReactNativeModal isVisible={isVisible.isDatePickerVisible}>
        <View style={tw`m-auto p-6 bg-purple-100 rounded-xl`}>
          <DateTimePicker
            mode="single"
            date={date}
            onChange={({date}) => setDate(date)}
            minDate={new Date()}
            styles={{
              ...defaultStyles,
              header: {
                backgroundColor: '#ffffff',
                borderRadius: 9999,
                marginBottom: 20,
              },
              dayContainer: {
                alignItems: 'center',
                justifyContent: 'center',
              },
              today: {
                backgroundColor: '#ffffff', // bg-purple-600
                borderRadius: 9999,
              },
              today_label: {
                fontWeight: 'bold',
                fontSize: 16,
              },
              selected: {
                backgroundColor: '#7c3aed', // bg-purple-600
                borderRadius: 9999,
              },
              selected_label: {
                color: '#ffffff', // white text for today
                fontWeight: 'bold',
                fontSize: 16,
              },
            }}
          />
          <View style={tw`flex-row w-full gap-2`}>
            <TouchableOpacity
              onPress={() =>
                handleDateTimeVisible('isDatePickerVisible', isVisible)
              }
              style={tw`flex-1 bg-white p-3 rounded-lg`}>
              <Text style={tw`font-semibold text-black text-center`}>
                Cancle
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleConfirm()}
              style={tw`flex-1 bg-purple-600 p-3 rounded-lg`}>
              <Text style={tw`font-semibold text-white text-center`}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default DatePicker;
