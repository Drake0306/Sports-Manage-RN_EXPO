import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router';
import { icons } from '@/constants';

const TabIcon = ({ icon, name, focused, color }) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='w-12 h-12'
            />
        </View>
    )
}

export default () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#ff311a',
                    tabBarInactiveTintColor: '#000000',
                    tabBarStyle: {
                        backgroundColor: 'white',
                        borderTopWidth: 0,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        borderBottomWidth: 0,
                        height: 100
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                focused={focused}
                                name="Home"
                            />
                        )
                    }}
                />

                <Tabs.Screen
                    name="communication"
                    options={{
                        title: "Communication",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.messenger}
                                color={color}
                                focused={focused}
                                name="Communication"
                            />
                        )
                    }}
                />

                <Tabs.Screen
                    name="calander"
                    options={{
                        title: "Calander",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.calendar}
                                color={color}
                                focused={focused}
                                name="Calander"
                            />
                        )
                    }}
                />

            </Tabs>
        </>
    )
}
