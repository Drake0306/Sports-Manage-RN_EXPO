import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="coaches"  
        options={{
          title: "coaches",
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />

      <Stack.Screen 
        name="chat"  
        options={{
          title: "chat",
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />

      <Stack.Screen 
        name="parentSettings"  
        options={{
          title: "parentSettings",
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
    </Stack>
  );
}
