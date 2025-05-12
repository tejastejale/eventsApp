import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventsList from './List/EventsList';
import Profile from './Profile/Profile';
import EventCreation from './NewEvent/EventCreation';
import Pager from './List/Pager';

export default function Bottom() {
  const ref = useRef();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => ref?.current.setVisible(false),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => ref?.current.setVisible(true),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const _renderIcon = (routeName, selectedTab) => {
    let icon = 'apps-sharp';
    switch (routeName) {
      case 'EventList':
        icon = 'list';
        break;
      case 'Profile':
        icon = 'person';
        break;
      default:
        icon = 'apps-sharp';
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? '#7c3aed' : 'gray'}
      />
    );
  };

  const renderTabBar = ({routeName, selectedTab, navigate}) => {
    if (routeName === 'NewEvent') return null; // hide the middle tab from tabbar

    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      ref={ref}
      type="DOWN"
      screenOptions={{headerShown: false}}
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={55}
      circleWidth={50}
      bgColor="#f3e8ff"
      initialRouteName="EventList"
      renderCircle={({selectedTab, navigate}) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('NewEvent')} // navigate to center screen
          >
            <Ionicons
              name={'add'}
              color={selectedTab === 'NewEvent' ? '#7c3aed' : 'gray'}
              size={25}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}>
      <CurvedBottomBar.Screen
        name="EventList"
        position="LEFT"
        component={Pager}
      />
      <CurvedBottomBar.Screen
        name="NewEvent"
        position="CENTER"
        component={EventCreation}
      />
      <CurvedBottomBar.Screen
        name="Profile"
        position="RIGHT"
        component={Profile}
      />
    </CurvedBottomBar.Navigator>
  );
}

const styles = StyleSheet.create({
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    elevation: 6,
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3e8ff',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 6,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
