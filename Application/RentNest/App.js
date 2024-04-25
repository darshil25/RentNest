import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Intro from './component/Intro';
import Registration from './component/Registration';
import Login from './component/Login';
import Feed from './component/Feed';
import Forgotpass from './component/Forgotpass';
import BuyPage from './component/screens/BuyPage';
import { View, Image } from 'react-native';
import SeeDetails from './component/screens/SeeDetails';
import LocationRender from './component/screens/locationpro/LocationRender';
import PaymentGateway from './component/screens/PaymentGateway'; // Import PaymentGateway screen
import ProfileSettings from './component/screens/ProfileSettings'; // Import ProfileSettings screen
import NotificationSettings from './component/screens/NotificationSettings'; // Import NotificationSettings screen
import HelpAndSupport from './component/screens/HelpAndSupport'; // Import HelpAndSupport screen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="RentNest"
          component={Intro}
          options={{
            title: null,
            headerShown: false
          }}
        />

        <Stack.Screen
          name="registration"
          component={Registration}
          options={{
            title: null,
            headerShown: false
          }}
        />

        <Stack.Screen
          name="login"
          component={Login}
          options={{
            title: null,
            headerShown: false
          }}
        />

        <Stack.Screen
          name="feed"
          component={Feed}
          options={{
            title: null,
            headerShown: false
          }}
        />

        <Stack.Screen
          name="forgotpassword"
          component={Forgotpass}
          options={{
            title: null,
            headerShown: false
          }}
        />

        <Stack.Screen
          name="rentproperty"
          component={BuyPage}
          options={{
            title: 'RentNest',
            headerRight: () => (
              <View>
                <Image
                  source={require('./component/images/rentnestlogo.png')}
                  style={{ width: 28, height: 28, marginRight: 20 }}
                />
              </View>
            ),
          }}
        />

        <Stack.Screen
          name="seedetails"
          component={SeeDetails}
          options={{
            title: 'RentNest',
            headerRight: () => (
              <View>
                <Image
                  source={require('./component/images/rentnestlogo.png')}
                  style={{ width: 28, height: 28, marginRight: 20 }}
                />
              </View>
            ),
          }}
        />

        <Stack.Screen
          name='locationrender'
          component={LocationRender}
          options={{
            title: 'RentNest',
            headerRight: () => (
              <View>
                <Image
                  source={require('./component/images/rentnestlogo.png')}
                  style={{ width: 28, height: 28, marginRight: 20 }}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: null,
            headerShown: false
          }}
        />
        <Stack.Screen
          name="PaymentGateway"
          component={PaymentGateway}
          options={{ title: 'Payment Gateway' }}
        />

        {/* Add ProfileSettings screen */}
        <Stack.Screen
          name="ProfileSettings"
          component={ProfileSettings}
          options={{ title: 'Profile Settings' }}
        />

        {/* Add NotificationSettings screen */}
        <Stack.Screen
          name="NotificationSettings"
          component={NotificationSettings}
          options={{ title: 'Notification Settings' }}
        />

        {/* Add HelpAndSupport screen */}
        <Stack.Screen
          name="HelpAndSupport"
          component={HelpAndSupport}
          options={{ title: 'Help & Support' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
