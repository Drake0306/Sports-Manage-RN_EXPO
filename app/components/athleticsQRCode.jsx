import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, Share } from 'lucide-react-native';

export default function AthleticsQRCode() {
  const handleCopyLink = () => {
    // Implement copy link functionality
    console.log('Copy link pressed');
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share pressed');
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>WALNUT HILLS HIGH SCHOOL ATHLETICS</Text> */}
      <Text style={styles.title}>Comming Soon </Text>

      {/* <Image
        source={require('../../assets/images/qrcode.png')} // Replace with actual QR code image
        style={styles.qrCode}
      /> */}
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.copyButton} onPress={handleCopyLink}>
          <Link size={20} color="#000" />
          <Text style={styles.buttonText}>COPY LINK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Share size={20} color="#000" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  shareButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 20,
  },
});