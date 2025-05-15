import {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const checkApplicationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } catch (error) {
      console.error(error);
    }
  }
};

const RemoteNotification = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('📩 In-app message:', remoteMessage);

      const key = Date.now().toString(); // Key must be unique everytime

      PushNotification.createChannel({
        channelId: key,
        channelName: 'Local messasge',
        channelDescription: 'Notification for Local message',
        importance: 4,
        vibrate: true,
      });

      PushNotification.localNotification({
        channelId: key,
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    checkApplicationPermission();

    // Delete existing channels to avoid duplicate local notifications
    PushNotification.getChannels(function (channel_ids) {
      channel_ids.forEach(id => {
        PushNotification.deleteChannel(id);
      });
    });

    PushNotification.configure({
      // Called when a token is generated
      // onRegister: function (token) {
      //   console.log('TOKEN:', token);
      // },

      // Called when a notification is received or opened
      onNotification: function (notification) {
        const {message, title, id} = notification;

        const strTitle = JSON.stringify(title).split('"').join('');
        const strBody = JSON.stringify(message).split('"').join('');
        const key = JSON.stringify(id).split('"').join('');

        PushNotification.createChannel(
          {
            channelId: key,
            channelName: 'remote message',
            channelDescription: 'Notification for remote message',
            importance: 4,
            vibrate: true,
          },
          created => console.log(`createChannel returned '${created}'`),
        );

        PushNotification.localNotification({
          channelId: key,
          title: strTitle,
          message: strBody,
        });

        console.log(
          'REMOTE NOTIFICATION ==>',
          title,
          message,
          id,
          notification,
        );
      },

      // Required: FCM Sender ID
      senderID: '1234567890',

      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);

  return null;
};

export default RemoteNotification;
