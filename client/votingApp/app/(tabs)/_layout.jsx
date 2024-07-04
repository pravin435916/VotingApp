import { Tabs } from "expo-router";
import {useFonts} from 'expo-font'
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import {Colors} from '../../constants/Colors'
export default function RootLayout() {
    useFonts({
        'outfit' : require('../../assets/fonts/Outfit-Bold.ttf')
    })
  return (
    <Tabs screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:Colors.PRIMARY
    }}>
      <Tabs.Screen name="home"
      options={{
        tabBarLabel:'Home',
        tabBarIcon:({color})=><AntDesign name="home" size={24} color="black" />
      }} />
      <Tabs.Screen name="vote" 
       options={{
        tabBarLabel:'Vote',
        tabBarIcon:({color})=><MaterialCommunityIcons name="vote" size={24} color={color} />
      }} />
      <Tabs.Screen name="profile" 
       options={{
        tabBarLabel:'Profile',
        tabBarIcon:({color})=><FontAwesome name="user" size={24} color={color}/>
      }} />
    </Tabs>
  );
}
