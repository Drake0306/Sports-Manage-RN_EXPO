import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function SignUpUserType() {
  const router = useRouter();
  const userTypes = [
    {name: 'STUDENT-ATHLETE', url: '/student/profileCreation'},
    {name: 'PARENT/GUARDIAN', url: '/parent/profileCreation'}, 
    {name: 'COACH', url: '/coach/profileCreation'},
];

  const refirect = (url) => {
    if (url == '') {
        router.back();
    } else {
        router.navigate(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => refirect('')} style={styles.backButton}>
            <ArrowLeft color="#000" size={24} />
        </TouchableOpacity>
        <View style={styles.contentContainer}>
            <Text style={styles.title}>CREATE AN ACCOUNT</Text>
            <Text style={styles.subtitle}>WHO ARE YOU?</Text>
            {userTypes.map((type, index) => (
            <TouchableOpacity key={index} onPress={() => refirect(type.url)} style={styles.button}>
                <Text style={styles.buttonText}>{type.name}</Text>
            </TouchableOpacity>
            ))}
        </View>
        <View style={styles.footer}>
            <Text style={styles.footerText}>
            Already have an account? 
                <TouchableOpacity style={{marginTop: -2}} onPress={() => refirect('/sign-in')}>
                    <Text style={styles.logInText}>Log In</Text>
                </TouchableOpacity>
            </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
  },
  logInText: {
    fontWeight: 'bold',
    color: '#000000',
  },
});