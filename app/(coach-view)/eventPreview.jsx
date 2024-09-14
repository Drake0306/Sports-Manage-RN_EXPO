import React from 'react';
import { Link, router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
// import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export default function EventPreview() {
    const redirect = (url) => {
        router.navigate(url);
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WEIGHT TRAINING</Text>
      
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
        <TouchableOpacity onPress={() => redirect('/(coach-view)/eventModefier')} style={styles.actionButton}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
});