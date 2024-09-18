import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="chat" />
      <Stack.Screen name="eventPreview" />
      <Stack.Screen name="eventModefier" />
      <Stack.Screen name="userProfile" />
      <Stack.Screen name="parentProfile" />
      <Stack.Screen name="userEditProfile" />
      <Stack.Screen name="notification" screenOptions={{presentation: 'modal'}} />
    </Stack>
  );
}
