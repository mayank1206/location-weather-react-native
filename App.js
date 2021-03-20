import * as React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GoogleMap from './component/GoogleMap';
import Accordion from './component/Accordion';




const Tab = createBottomTabNavigator();

export default function App() {
  const [mapLocations, setMapLocation] = useState([]);

  const AddMarker = (data) => {
    setMapLocation([...mapLocations, data]);
  };
  const expandClose = (index) => {
    let newArr = [...mapLocations];
    newArr[index]['expand'] = !newArr[index]['expand'];
    setMapLocation(newArr);
  };
  const onDelete = (index) => {
    let newArr = [...mapLocations];
    newArr.splice(index, 1);
    setMapLocation(newArr);
  };
  const GoogleMapScreen = () => {
    return (
      <GoogleMap onAddMarker={AddMarker} mapLocations={mapLocations} />
    );
  };
  const AccordionScreen = () => {
    return (
      <Accordion mapLocations={mapLocations} expandClose={expandClose} onDelete={onDelete} />
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={GoogleMapScreen} />
        <Tab.Screen name="Accordion" component={AccordionScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}