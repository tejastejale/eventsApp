import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import tw from 'twrnc';
import user from '../../../Assets/user.png';
import RNQRGenerator from 'rn-qr-generator';
import base64 from 'react-native-base64';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Camera, CameraType} from 'react-native-camera-kit';
import {useTranslation} from 'react-i18next';

const Profile = () => {
  const [userData, setUserDate] = useState({
    name: 'User Name',
    email: 'mail@gmail.com',
    num: '1234567890',
    address: 'example,example 422002',
  });
  const [showQR, setShowQR] = useState(false);
  const [image, setImage] = useState(null);
  const [scan, setScan] = useState(false);
  const cameraRef = useRef();
  const {t} = useTranslation();

  useEffect(() => {
    createQR();
  }, []);

  const createQR = async () => {
    try {
      const data = await base64.encode(JSON.stringify(userData));
      RNQRGenerator.generate({
        value: data,
        height: 200,
        width: 200,
      }).then(res => {
        setImage(res.uri);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleScan = async event => {
    const {codeStringValue} = event.nativeEvent;
    if (codeStringValue) {
      const decoded = base64.decode(codeStringValue);
      const parsed = JSON.parse(decoded);
      Alert.alert('QR Code Scanned', JSON.stringify(parsed, null, 2));
    }
    setScan(false);
  };

  return (
    <View style={tw`w-full h-full bg-white`}>
      <TouchableOpacity
        onPress={() => setScan(!scan)}
        style={tw`absolute right-5 top-5 z-50`}>
        <Ionicons name={'scan'} color={scan ? 'white' : 'black'} size={30} />
      </TouchableOpacity>

      {scan ? (
        <Camera
          ref={cameraRef}
          scanBarcode={true}
          onReadCode={event => {
            handleScan(event);
          }}
          style={tw`h-full w-full`}
        />
      ) : (
        <View
          style={tw`m-auto flex justify-between max-h-2/3 min-h-1/2 w-3/4 bg-purple-100 elevation-4 rounded p-4`}>
          <View style={tw`items-center gap-6`}>
            <View
              style={tw`h-36 w-36 -mt-20 rounded-full bg-white items-center justify-center shadow-lg`}>
              <Image
                source={user}
                style={tw`h-32 w-32 rounded-full`}
                resizeMode="cover"
              />
            </View>
            {showQR ? (
              <Image source={{uri: image}} style={tw`w-60 h-60 mb-6 rounded`} />
            ) : (
              <View style={tw`flex gap-2 w-full items-center`}>
                <Text style={tw`text-xl font-semibold tracking-wider`}>
                  {userData.name}
                </Text>
                <Text
                  style={tw`text-lg font-medium tracking-wider text-center`}>
                  {userData.email}
                </Text>
                <Text
                  style={tw`text-lg font-medium tracking-wider text-center`}>
                  {userData.num}
                </Text>
                <Text
                  style={tw`text-lg font-medium tracking-wider text-center`}>
                  {userData.address}
                </Text>
              </View>
            )}
          </View>

          {image && (
            <TouchableOpacity
              onPress={() => setShowQR(!showQR)}
              style={tw`bg-purple-600 p-3 rounded-lg`}>
              <Text style={tw`text-lg text-white font-semibold text-center`}>
                {showQR ? t('hide_qr') : t('show_qr')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default Profile;
