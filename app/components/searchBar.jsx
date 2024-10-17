import React from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Link, router } from "expo-router";

export default function SearchBar() {
    const redirect = (url) => {
        if(url === ''){
          router.back();
        } else {
          router.navigate(url);
        }
      };

    return (
        <View style={styles.container}>
        <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="#999"
            />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => redirect('/pages/functionChat/peopleList')}>
            <Feather name="plus" size={24} color="black" />
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    paddingBottom: 30,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
})