import React from 'react';
import { Link, router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
// import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import { ArrowLeft } from 'lucide-react-native';

export default function EventPreview() {
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
            <ArrowLeft style={styles.chevronIcon} size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>WEIGHT TRAINING</Text>
        </View>
        
        <Text style={styles.sectionTitle}>DETAILS</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Time</Text>
          <View style={styles.dotLine} />
          <Text style={styles.detailValue}>10:00 - 11:30 AM</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location</Text>
          <View style={styles.dotLine} />
          <Text style={styles.detailValue}>Weight Room</Text>
        </View>
        
        <Text style={styles.sectionTitle}>DESCRIPTION</Text>
        <Text style={styles.description}>
          Focusing on free throws and endurance - bring your running shoes!
        </Text>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="copy" size={24} color="#333" />
            <Text style={styles.actionText}>Duplicate</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => redirect('/pages/eventModefier')} style={styles.actionButton}>
            <Feather name="edit-2" size={24} color="#333" />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="share-2" size={24} color="#333" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="trash-2" size={24} color="#333" />
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    width: 80,
  },
  dotLine: {
    flex: 1,
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderStyle: 'dotted',
    marginHorizontal: 10,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});