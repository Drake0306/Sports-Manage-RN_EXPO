import React from 'react'
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { ArrowLeft, Search, Users } from 'lucide-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from "expo-router";

const users = [
  { id: '1', name: 'JADEN WALTON', avatar: '/placeholder.svg?height=50&width=50' },
  { id: '2', name: 'NOELLE SCHEPER', avatar: '/placeholder.svg?height=50&width=50' },
  { id: '3', name: 'SIDDHARTH CHOUHAN', avatar: '/placeholder.svg?height=50&width=50' },
  { id: '4', name: 'KHLOE KROEBE', avatar: '/placeholder.svg?height=50&width=50' },
  { id: '5', name: 'ABBY MCINTURF', avatar: '/placeholder.svg?height=50&width=50' },
  { id: '6', name: 'TONY ZINGALE', avatar: '/placeholder.svg?height=50&width=50' },
  { id: '7', name: 'CHARLES HALL', avatar: '/placeholder.svg?height=50&width=50' },
  { id: '8', name: 'ROB RICHARDSON', avatar: '/placeholder.svg?height=50&width=50' },
  { id: '9', name: 'KEVIN HARRINGTON', avatar: '/placeholder.svg?height=50&width=50' },
  { id: '10', name: 'JASON MURRAY', avatar: '/placeholder.svg?height=50&width=50' },
]

export default function PeopleList() {
  const redirect = (url) => {
    if(url === ''){
      router.back();
    } else {
      router.navigate(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => redirect('')}>
            <ArrowLeft color="#000" size={24} />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Search color="#999" size={20} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.createGroupButton} onPress={() => redirect('/pages/functionChat/createGroup')}>
          <Users color="#000" size={24} style={styles.groupIcon} />
          <Text style={styles.createGroupText}>Create Group Chat</Text>
        </TouchableOpacity>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.userName}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginLeft: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  createGroupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 12,
    margin: 16,
  },
  groupIcon: {
    marginRight: 8,
  },
  createGroupText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})