import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationSettings = () => {
  const [newPropertyListings, setNewPropertyListings] = useState(false);
  const [applicationUpdates, setApplicationUpdates] = useState(false);
  const [propertyAvailabilityAlerts, setPropertyAvailabilityAlerts] = useState(false);
  const [leaseRenewalReminders, setLeaseRenewalReminders] = useState(false);
  const [paymentDueNotices, setPaymentDueNotices] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);

  useEffect(() => {
    loadNotificationSettings();
  }, []);

  const loadNotificationSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('notificationSettings');
      if (savedSettings !== null) {
        const parsedSettings = JSON.parse(savedSettings);
        setNewPropertyListings(parsedSettings.newPropertyListings || false);
        setApplicationUpdates(parsedSettings.applicationUpdates || false);
        setPropertyAvailabilityAlerts(parsedSettings.propertyAvailabilityAlerts || false);
        setLeaseRenewalReminders(parsedSettings.leaseRenewalReminders || false);
        setPaymentDueNotices(parsedSettings.paymentDueNotices || false);
        setEmailNotifications(parsedSettings.emailNotifications || false);
        setPushNotifications(parsedSettings.pushNotifications || false);
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };

  const saveNotificationSettings = async () => {
    try {
      const settingsToSave = JSON.stringify({
        newPropertyListings,
        applicationUpdates,
        propertyAvailabilityAlerts,
        leaseRenewalReminders,
        paymentDueNotices,
        emailNotifications,
        pushNotifications,
      });
      await AsyncStorage.setItem('notificationSettings', settingsToSave);
      Alert.alert('Success', 'Changes saved successfully.');
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style='dark' backgroundColor='white' />
      <Text style={styles.title}>Notification Settings</Text>

      <View style={styles.notificationItem}>
        <Text style={styles.notificationLabel}>New Property Listings</Text>
        <Switch
          value={newPropertyListings}
          onValueChange={(value) => setNewPropertyListings(value)}
          trackColor={{ false: 'white', true: 'green' }}
          thumbColor={newPropertyListings ? 'yellow' : 'yellow'}
        />
      </View>
      <View style={styles.notificationItem}>
        <Text style={styles.notificationLabel}>Application Updates</Text>
        <Switch
          value={applicationUpdates}
          onValueChange={(value) => setApplicationUpdates(value)}
          trackColor={{ false: 'white', true: 'green' }}
          thumbColor={applicationUpdates ? 'yellow' : 'yellow'}
        />
      </View>
      <View style={styles.notificationItem}>
        <Text style={styles.notificationLabel}>Property Availability Alerts</Text>
        <Switch
          value={propertyAvailabilityAlerts}
          onValueChange={(value) => setPropertyAvailabilityAlerts(value)}
          trackColor={{ false: 'white', true: 'green' }}
          thumbColor={propertyAvailabilityAlerts ? 'yellow' : 'yellow'}
        />
      </View>
      <View style={styles.notificationItem}>
        <Text style={styles.notificationLabel}>Lease Renewal Reminders</Text>
        <Switch
          value={leaseRenewalReminders}
          onValueChange={(value) => setLeaseRenewalReminders(value)}
          trackColor={{ false: 'white', true: 'green' }}
          thumbColor={leaseRenewalReminders ? 'yellow' : 'yellow'}
        />
      </View>
      <View style={styles.notificationItem}>
        <Text style={styles.notificationLabel}>Payment Due Notices</Text>
        <Switch
          value={paymentDueNotices}
          onValueChange={(value) => setPaymentDueNotices(value)}
          trackColor={{ false: 'white', true: 'green' }}
          thumbColor={paymentDueNotices ? 'yellow' : 'yellow'}
        />
      </View>
      <View style={styles.notificationItem}>
        <Text style={styles.notificationLabel}>Email Notifications</Text>
        <Switch
          value={emailNotifications}
          onValueChange={(value) => setEmailNotifications(value)}
          trackColor={{ false: 'white', true: 'green' }}
          thumbColor={emailNotifications ? 'yellow' : 'yellow'}
        />
      </View>
      <View style={styles.notificationItem}>
        <Text style={styles.notificationLabel}>Push Notifications</Text>
        <Switch
          value={pushNotifications}
          onValueChange={(value) => setPushNotifications(value)}
          trackColor={{ false: 'white', true: 'green' }}
          thumbColor={pushNotifications ? 'yellow' : 'yellow'}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveNotificationSettings}>
        <FontAwesome name="save" size={24} color="white" />
        <Text style={styles.saveButtonText}>Save Preferences</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 35,
    color: 'black',
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  notificationLabel: {
    fontSize: 18,
    color: 'black',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'white',
  },
});

export default NotificationSettings;






