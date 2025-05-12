import * as React from 'react';
import {Text, useWindowDimensions, TouchableOpacity, View} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import EventsList from './EventsList';
import tw from 'twrnc';

const renderScene = SceneMap({
  upcoming: EventsList,
  registred: EventsList,
});

const routes = [
  {key: 'upcoming', title: 'Upcoming'},
  {key: 'registred', title: 'Registred'},
];

export default function Pager() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

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
