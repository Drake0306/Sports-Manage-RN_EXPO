import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { ArrowLeft, Plus, UserPlus, Bug, Lightbulb } from 'lucide-react-native';

export default function ParentSettings() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.backButton}>
          {/* <ArrowLeft color="#000" size={24} /> */}
        </TouchableOpacity>
        
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: '/placeholder.svg?height=100&width=100' }}
              style={styles.avatar}
            />
            <View style={styles.plusIconContainer}>
              {/* <Plus color="#fff" size={20} /> */}
            </View>
          </View>
          <Text style={styles.name}>JASON MURRAY</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>EDIT PROFILE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ATHLETES</Text>
            <TouchableOpacity>
              {/* <UserPlus color="#000" size={24} /> */}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.athleteItem}>
            <Image
              source={{ uri: '/placeholder.svg?height=40&width=40' }}
              style={styles.athleteAvatar}
            />
            <Text style={styles.athleteName}>JADEN WALTON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.athleteItem}>
            <Image
              source={{ uri: '/placeholder.svg?height=40&width=40' }}
              style={styles.athleteAvatar}
            />
            <Text style={styles.athleteName}>NOELLE SCHEPER</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            {/* <Bug color="#000" size={24} /> */}
            <Text style={styles.menuItemText}>Report a bug</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            {/* <Lightbulb color="#000" size={24} /> */}
            <Text style={styles.menuItemText}>Submit a feature request</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Change password</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.footerLink, styles.logoutText]}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  plusIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  editButtonText: {
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  athleteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 24,
    padding: 12,
    marginBottom: 12,
  },
  athleteAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  athleteName: {
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
  },
  menuItemText: {
    marginLeft: 12,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  footerLink: {
    marginBottom: 8,
    color: '#000',
  },
  logoutText: {
    color: 'red',
  },
});