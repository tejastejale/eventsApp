import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import {TimerPickerModal} from 'react-native-timer-picker';
import LinearGradient from 'react-native-linear-gradient';

export const TimePicker = ({
  isVisible,
  onChange,
  handleDateTimeVisible,
  formData,
}) => {
  return (
    <View>
      <TimerPickerModal
        initialValue={formData.time}
        hideSeconds
        visible={isVisible.isTimePickerVisible}
        setIsVisible={() =>
          handleDateTimeVisible(
            'isTimePickerVisible',
            isVisible.isTimePickerVisible,
          )
        }
        onConfirm={pickedDuration => {
          onChange('time', pickedDuration);
          handleDateTimeVisible(
            'isTimePickerVisible',
            isVisible.isTimePickerVisible,
          );
        }}
        onCancel={() =>
          handleDateTimeVisible(
            'isTimePickerVisible',
            isVisible.isTimePickerVisible,
          )
        }
        closeOnOverlayPress
        use12HourPicker
        LinearGradient={LinearGradient}
        styles={{
          theme: 'light',
          backgroundColor: '#f3e8ff',
          confirmButton: {
            backgroundColor: '#7c3aed',
            color: '#ffffff',
            width: '120%',
            textAlign: 'center',
          },
          container: {
            width: '90%',
          },
          cancelButton: {
            backgroundColor: '#ffffff',
            width: '120%',
            textAlign: 'center',
            margin: 0,
          },
          button: {
            borderWidth: 0,
          },
          buttonContainer: {
            width: '90%',
            display: 'flex',
            justifyContent: 'space-evenly',
            marginRight: 40,
          },
        }}
      />
    </View>
  );
};
