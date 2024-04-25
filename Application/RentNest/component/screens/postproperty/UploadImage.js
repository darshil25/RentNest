// UploadImage.js
import React from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';

export default function UploadImage({ images, setImages }) {

  const handleChooseImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      multiple: true,
    });

    if (!result.cancelled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setImages([...images, ...selectedImages]);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, imgIndex) => imgIndex !== index));
  };

  return (
    <View style={styles.container}>
      <StatusBar style='light' backgroundColor='black'/>
      <TouchableOpacity style={styles.button} onPress={handleChooseImages}>
        <Text style={styles.buttonText}>Choose Images</Text>
        <AntDesign name="camera" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView horizontal={true} contentContainerStyle={styles.imagesContainer}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => handleRemoveImage(index)}
            >
              <AntDesign name="closecircle" size={29} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom:5 
  },
  imagesContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'relative',
    margin: 5,
  },
  image: {
    width: 250,
    height: 250,
  },
  closeButton: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    marginRight: 10,
  },
});
