import * as React from 'react';
import {Text, useWindowDimensions, TouchableOpacity, View} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import EventsList from './EventsList';
import tw from 'twrnc';
import {useTranslation} from 'react-i18next';

const renderScene = SceneMap({
  upcoming: EventsList,
  registred: EventsList,
});

export default function Pager() {
  const {t} = useTranslation();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  let routes = [
    {key: 'upcoming', title: t('upcoming')},
    {key: 'registred', title: t('registered')},
  ];

  const renderCustomTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: '#f3e8ff',
        height: 5,
      }}
      style={{
        backgroundColor: '#7c3aed',
      }}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderCustomTabBar}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}
