import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native'; 
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const Setting = () => { 
  const [darkMode, setDarkMode] = useState(false); 

  const navigation = useNavigation();

  const handleSettingsOptionClick = (option) => { 
    console.log(`Navigating to ${option}`); 
    navigation.navigate(option);
  }; 
  
  const gotoForgotPass = () => {
    navigation.navigate('forgotpassword');
  }

  const handleThemeToggle = () => { 
    setDarkMode(!darkMode); 
  }; 

  return ( 
    <View style={[styles.container, darkMode && styles.darkContainer]}> 
      <StatusBar style='light' backgroundColor='black'/>
      <Text style={[styles.title, darkMode && styles.darkTitle]}>Settings</Text> 
      <TouchableOpacity 
        style={[styles.optionButton, darkMode && styles.darkOptionButton]} 
        onPress={() => gotoForgotPass()}
      > 
        <Text style={[styles.optionText, darkMode && styles.darkOptionText]}>Change Password</Text> 
        <AntDesign name="arrowright" size={24} color="orange" />
      </TouchableOpacity> 

      <TouchableOpacity 
        style={[styles.optionButton, darkMode && styles.darkOptionButton]} 
        onPress={() => handleSettingsOptionClick('ProfileSettings')}
      > 
        <Text style={[styles.optionText, darkMode && styles.darkOptionText]}>Profile Settings</Text> 
        <AntDesign name="arrowright" size={24} color="orange" />
      </TouchableOpacity> 

      <TouchableOpacity 
        style={[styles.optionButton, darkMode && styles.darkOptionButton]} 
        onPress={() => handleSettingsOptionClick('NotificationSettings')}
      > 
        <Text style={[styles.optionText, darkMode && styles.darkOptionText]}>Notification Settings</Text> 
        <AntDesign name="arrowright" size={24} color="orange" />
      </TouchableOpacity> 

      <TouchableOpacity 
        style={[styles.optionButton, darkMode && styles.darkOptionButton]} 
        onPress={() => handleSettingsOptionClick('HelpAndSupport')}
      > 
        <Text style={[styles.optionText, darkMode && styles.darkOptionText]}>Help & Support</Text> 
        <AntDesign name="arrowright" size={24} color="orange" />
      </TouchableOpacity> 

      <View style={[styles.optionButton, darkMode && styles.darkOptionButton]}> 
        <Text style={[styles.optionText, darkMode && styles.darkOptionText]}>Dark Mode</Text> 
        <Switch 
          trackColor={{ false: "gray", true: "lightblue" }} 
          thumbColor={darkMode ? "yellow" : "lightgray"} 
          onValueChange={handleThemeToggle} 
          value={darkMode} 
        /> 
      </View> 
    </View> 
  ); 
}; 

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    backgroundColor: 'lightgrey', // Light gray background color 
    paddingHorizontal: 20, 
    paddingTop: 30, 
  }, 
  darkContainer: { 
    backgroundColor: 'black', // Dark background color for dark mode 
  }, 
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: 'black', 
    textAlign: 'center', 
    textTransform: 'uppercase', 
  }, 
  darkTitle: { 
    color: 'white', // Change text color for dark mode 
  }, 
  optionButton: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: 'white', // White background for option buttons 
    paddingVertical: 20, 
    paddingHorizontal: 20, 
    borderRadius: 12, 
    marginBottom: 30, 
    borderWidth: 3, 
    borderColor: 'skyblue' }, 
  darkOptionButton: { 
    backgroundColor: 'darkslategrey', // Dark background color for option buttons in dark mode 
    borderColor: 'blue' }, 
  optionText: { 
    fontSize: 18, 
    color: 'black', 
    fontWeight: 'bold', 
    flex: 1, 
  }, 
  darkOptionText: { 
    color: 'white', // Change text color for option text in dark mode 
  }, 
}); 

export default Setting;

