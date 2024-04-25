import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home() {
  const [file, setFile] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setFile(result.uri);
    }
  };

  const removeImage = () => {
    setFile(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar style='light' backgroundColor='black'/>
      {file ? (
        <View style={styles.fullScreen}>
          <Image source={{ uri: file }} style={styles.image} />
          <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  fullScreen: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
    zIndex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  uploadButton: {
    backgroundColor: "#007AFF",
    padding: 20,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

