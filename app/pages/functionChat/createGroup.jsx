import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Link, router } from "expo-router";

const contacts = [
  { id: '1', name: 'JADEN WALTON', image: 'https://v0.dev/placeholder.svg?height=50&width=50' },
  { id: '2', name: 'NOELLE SCHEPER', image: 'https://v0.dev/placeholder.svg?height=50&width=50' },
  { id: '3', name: 'SIDDHARTH CHOUHAN', image: 'https://v0.dev/placeholder.svg?height=50&width=50' },
  { id: '4', name: 'KHLOE KROEBE', image: 'https://v0.dev/placeholder.svg?height=50&width=50' },
  { id: '5', name: 'ABBY MCINTURF', image: 'https://v0.dev/placeholder.svg?height=50&width=50' },
  { id: '6', name: 'TONY ZINGALE', image: 'https://v0.dev/placeholder.svg?height=50&width=50' },
  { id: '7', name: 'CHARLES HALL', image: 'https://v0.dev/placeholder.svg?height=50&width=50' },
  { id: '8', name: 'ROB RICHARDSON', image: 'https://v0.dev/placeholder.svg?height=50&width=50' },
  { id: '9', name: 'KEVIN HARRINGTON', image: 'https://v0.dev/placeholder.svg?height=50&width=50' },
  { id: '10', name: 'JASON MURRAY', image: 'https://v0.dev/placeholder.svg?height=50&width=50' },
  { id: '11', name: 'EVAN PETERSON', image: 'https://v0.dev/placeholder.svg?height=50&width=50' },
  { id: '12', name: 'SAMANTHA WEBER', image: 'https://v0.dev/placeholder.svg?height=50&width=50' },
];

export default function CreateGroup() {
    const redirect = (url) => {
        if(url === ''){
          router.back();
        } else {
          router.navigate(url);
        }
      };

    const renderItem = ({ item }) => (
        <View style={styles.contactItem}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <Text style={styles.contactName}>{item.name}</Text>
        <TouchableOpacity style={styles.checkbox}>
            <View style={styles.checkboxInner} />
        </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => redirect('')}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <View style={styles.searchBar}>
                <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#999"
                />
                </View>
            </View>
            <FlatList
                data={contacts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Next</Text>
                <Icon name="arrow-forward" size={24} color="#fff" />
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  contactName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 25,
    margin: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 10,
  },
});