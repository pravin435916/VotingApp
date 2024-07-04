import { Stack } from "expo-router";
// import {useFonts} from 'expo-font'
export default function RootLayout() {
  // useFonts({
  //   'Outfit-Regular' : require('../assets/fonts/Outfit-Regular.ttf'),
  //   'Outfit-Bold' : require('../assets/fonts/Outfit-Bold.ttf')
  // })
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
