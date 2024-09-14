import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const data = () => {
  return (
    <View>
      <Text>data</Text>
      <Link href="/list/grid">Grid</Link>
    </View>
  )
}

export default data