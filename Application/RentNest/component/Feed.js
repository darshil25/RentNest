import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home';
import Payment from './screens/Payment';
import Setting from './screens/Setting';
import Contactus from './screens/Contactus';
import PostProperty from './screens/postproperty/PostProperty';
import RentReceipt from './screens/RentReceipt';
import MyBookings from './screens/MyBookings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import PostedProperty from './screens/PostedProperty';

const Drawer = createDrawerNavigator(); 
const SignOutScreen = () => {
  Alert.alert(
    'SignOut',
    'Thank You !',
    [
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Cancel Pressed'),
        style: 'cancel',
      },
    ],
    {
      // cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  );
};

export default function Feed() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View style={{
              marginTop: 30,
              height: 200,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image
                source={require('./images/profile_icon.png')}
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 65,
                }}
              />
              <Text style={{ marginTop: 20 }}>            Rishabh                       rishabhlsr715@gmail.com</Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        )
      }}
      screenOptions={
        {
          drawerStyle: {
            // backgroundColor:'grey',
            width: 250
          },
          // headerStyle:{
          //   backgroundColor:'grey'
          // }
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          drawerActiveTintColor: 'blue',
          drawerLabelStyle: {
            // backgroundColor:'#111'
          }
        }
      }
    >
      <Drawer.Screen name="home" component={Home}
        options={
          {
            drawerLabel: "Home",
            title: "RentNest",
            drawerIcon:()=>(
              <Image source={require('./images/home_icon.png')} style={{width:25,height:25}} />
            ),
            // headerTitleAlign: 'center',
            headerBackVisible: false,
            headerRight: () => <View>
              <Image
                source={require('../component/images/rentnestlogo.png')}
                style={{ width: 28, height: 28, marginRight: 20 }}
              />
            </View>,
          }
        }
      />
      <Drawer.Screen name="mybookings" component={MyBookings}
        options={
          {
            drawerLabel: "My Bookings",
            title: "RentNest",
            drawerIcon:()=>(
              <Image source={require('./images/mybooking_icon.png')} style={{width:25,height:25}} />
            ),
            // headerTitleAlign: 'center',
            headerBackVisible: false,
            headerRight: () => <View>
              <Image
                source={require('../component/images/rentnestlogo.png')}
                style={{ width: 28, height: 28, marginRight: 20 }}
              />
            </View>,
          }
        }
      />
      <Drawer.Screen name="postproperty" component={PostProperty}
        options={
          {
            drawerLabel: "Post Your Property",
            title: "RentNest",
            drawerIcon:()=>(
              <Image source={require('./images/postproperty_icon.png')} style={{width:25,height:25}} />
            ),
            // headerTitleAlign: 'center',
            headerBackVisible: false,
            headerRight: () => <View>
              <Image
                source={require('../component/images/rentnestlogo.png')}
                style={{ width: 28, height: 28, marginRight: 20 }}
              />
            </View>,
          }
        }
      />
      <Drawer.Screen name="rentreceipt" component={RentReceipt}
        options={
          {
            drawerLabel: "Rent Receipt",
            title: "RentNest",
            drawerIcon:()=>(
              <Image source={require('./images/rentreceipt_icon.png')} style={{width:25,height:30}} />
            ),
            // headerTitleAlign: 'center',
            headerBackVisible: false,
            headerRight: () => <View>
              <Image
                source={require('../component/images/rentnestlogo.png')}
                style={{ width: 28, height: 28, marginRight: 20 }}
              />
            </View>,
          }
        }
      />
      <Drawer.Screen name="payment" component={Payment}
        options={
          {
            drawerLabel: "Payment",
            title: "RentNest",
            drawerIcon:()=>(
              <Image source={require('./images/payment_icon.png')} style={{width:25,height:25}} />
            ),
            // headerTitleAlign: 'center',
            headerBackVisible: false,
            headerRight: () => <View>
              <Image
                source={require('../component/images/rentnestlogo.png')}
                style={{ width: 28, height: 28, marginRight: 20 }}
              />
            </View>,
          }
        }
      />

      <Drawer.Screen name="setting" component={Setting}
        options={
          {
            drawerLabel: "Setting",
            title: "RentNest",
            drawerIcon:()=>(
              <Image source={require('./images/setting_icon.png')} style={{width:25,height:25}} />
            ),
            // headerTitleAlign: 'center',
            headerBackVisible: false,
            headerRight: () => <View>
              <Image
                source={require('../component/images/rentnestlogo.png')}
                style={{ width: 28, height: 28, marginRight: 20 }}
              />
            </View>,
          }
        }
      />
      <Drawer.Screen name="contactus" component={Contactus}
        options={
          {
            drawerLabel: "Contact us",
            title: "RentNest",
            drawerIcon:()=>(
              <Image source={require('./images/contactus_icon.png')} style={{width:25,height:25}} />
            ),
            // headerTitleAlign: 'center',
            headerBackVisible: false,
            headerRight: () => <View>
              <Image
                source={require('../component/images/rentnestlogo.png')}
                style={{ width: 28, height: 28, marginRight: 20 }}
              />
            </View>,
          }
        }
      />
  
        <Drawer.Screen name="signout" component={SignOutScreen}
          options={
            {
              drawerLabel: "Sign Out",
              title: "RentNest",
              drawerIcon:()=>(
                <Image source={require('./images/logout_icon.png')} style={{width:25,height:25}} />
              ),
              // headerTitleAlign: 'center',
              headerBackVisible: false,
              headerRight: () => <View>
                <Image
                  source={require('../component/images/rentnestlogo.png')}
                  style={{ width: 28, height: 28, marginRight: 20 }}
                />
              </View>,
            }
          }
        />
    </Drawer.Navigator>
  )
}
