import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="parentView" />
      <Stack.Screen name="coachView" />
      <Stack.Screen name="coaches" />
    </Stack>
  );
}
