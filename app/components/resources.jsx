import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { FileText, ShoppingCart, Ticket, Compass } from 'lucide-react-native';

const NoteItem = ({ icon, title, placeholder }) => (
  <View style={styles.itemContainer}>
    <View style={styles.leftBox}>
      {icon}
      <Text style={styles.title}>{title}</Text>
    </View>
    <TextInput
      style={styles.textArea}
      multiline
      numberOfLines={4}
      placeholder={placeholder}
      placeholderTextColor="#999"
    />
  </View>
);

export default function Resources() {
  const items = [
    { icon: <FileText size={24} color="#000" />, title: "final forms" },
    { icon: <ShoppingCart size={24} color="#000" />, title: "Spirit Shop" },
    { icon: <Ticket size={24} color="#000" />, title: "tickets" },
    { icon: <Compass size={24} color="#000" />, title: "Dragonfly" },
  ];

  return (
    <ScrollView style={styles.container}>
      {items.map((item, index) => (
        <NoteItem
          key={index}
          icon={item.icon}
          title={item.title}
          placeholder="Notes..."
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
    flex: 1,
  },
  title: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textArea: {
    flex: 1,
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    textAlignVertical: 'top',
  },
});