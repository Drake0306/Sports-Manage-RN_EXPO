import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FileText, ShoppingCart, Ticket } from 'lucide-react-native';

const Section = ({ icon, title }) => (
  <View style={styles.section}>
    <View style={styles.leftContent}>
      {icon}
      <Text style={styles.title}>{title}</Text>
    </View>
    <View style={styles.notesContainer}>
      <Text style={styles.notesText}>Notes...</Text>
    </View>
  </View>
);

export default function Resources() {
  return (
    <ScrollView style={styles.container}>
      <Section icon={<FileText stroke="black" size={24} />} title="FINAL FORMS" />
      <Section icon={<ShoppingCart stroke="black" size={24} />} title="SPIRIT SHOP" />
      <Section icon={<Ticket stroke="black" size={24} />} title="TICKETS" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  notesContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 8,
    minWidth: 100,
  },
  notesText: {
    color: '#999',
  },
});