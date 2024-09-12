import React from 'react';
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl">Sports Info</Text>
      <StatusBar style="auto" />
      <Link href="/home" className='mt-3'>Go to Home</Link>
      <Link href="/LoginScreen" className='mt-3'>SignIn</Link>
    </View>
  );
}
