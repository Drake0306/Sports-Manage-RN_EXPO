import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const playerData = [
  { id: '1', name: 'JADEN WALTON', position: 'Senior | WR, DB', stats: "6' / 175 lbs.", color: '#FF6B6B', image: '/placeholder.svg?height=60&width=60' },
  { id: '2', name: 'NOELLE SCHEPER', position: 'Senior | DE', stats: "5'10\" / 110 lbs.", color: '#FF6B6B', image: '/placeholder.svg?height=60&width=60' },
  { id: '3', name: 'SIDDHARTH SINGH CHOUHAN', position: 'Junior | DB', stats: "6'4\" / 200 lbs.", color: '#FF9F1C', image: '/placeholder.svg?height=60&width=60' },
  { id: '5', name: 'EVAN PETERSON', position: 'Sophomore | TE, LB', stats: "6'3\" / 200 lbs.", color: '#2EC4B6', image: '/placeholder.svg?height=60&width=60' },
  { id: '7', name: 'KEVIN HARRINGTON', position: 'Junior | QB', stats: "5'10\" / 155 lbs.", color: '#FF9F1C', image: '/placeholder.svg?height=60&width=60' },
  { id: '11', name: 'KHLOE KROEBE', position: 'Sophomore | WR', stats: "5'11\" / 165 lbs.", color: '#2EC4B6', image: '/placeholder.svg?height=60&width=60' },
];

const PlayerItem = ({ item }) => (
  <View style={styles.playerItem}>
    <Image source={{ uri: item.image }} style={styles.profilePic} />
    <View style={[styles.numberSquare, { backgroundColor: item.color }]}>
      <Text style={styles.numberText}>{item.id}</Text>
    </View>
    <View style={styles.playerInfo}>
      <Text style={styles.playerName}>{item.name}</Text>
      <Text style={styles.playerPosition}>{item.position}</Text>
      <Text style={styles.playerStats}>{item.stats}</Text>
    </View>
  </View>
);

const Header = ({ sortOrder, onSortPress }) => (
  <View style={styles.header}>
    <Text style={styles.title}>TEAM ROSTER</Text>
    <View style={styles.icons}>
      <Ionicons name="search" size={24} color="black" style={styles.icon} />
      <Ionicons name="filter" size={24} color="black" style={styles.icon} />
      {/* Sort Icon Button */}
      <TouchableOpacity onPress={onSortPress}>
        <Ionicons name={sortOrder === 'asc' ? 'arrow-down' : 'arrow-up'} size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);

export default function TeamRoster() {
  const [data, setData] = useState(playerData);
  const [sortOrder, setSortOrder] = useState('desc'); // Track the sorting order

  // Function to sort data
  const sortData = () => {
    // Clone the data to avoid direct mutation
    let newData = [...data];
    
    if (sortOrder === 'asc') {
      // Sort in ascending order by id
      newData.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      setSortOrder('desc');
    } else {
      // Sort in descending order by id
      newData.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      setSortOrder('asc');
    }
    
    setData(newData); // Update the state with the sorted data
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={data}
        renderItem={({ item }) => <PlayerItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Header sortOrder={sortOrder} onSortPress={sortData} />}
        stickyHeaderIndices={[0]} // Keeps the header sticky
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 16,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  numberSquare: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  numberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerPosition: {
    fontSize: 14,
    color: '#666',
  },
  playerStats: {
    fontSize: 14,
    color: '#666',
  },
});
