import { View,Text, ImageBackground, Dimensions,SafeAreaView, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Pressable, TextInput, TouchableOpacity, ActivityIndicator,ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

export default function Login() {
  const { width, height } = Dimensions.get('window');

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [btn, setbtn] = useState(false);

  const fetchdata = async () => {
    try {
      const response = await fetch('https://rentnestserver.onrender.com/login', {
        method: 'POST',
        body: JSON.stringify({ email, pass }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.name) {
        await AsyncStorage.setItem('username',data.name);
        await AsyncStorage.setItem('useremail',data.email);
        await AsyncStorage.setItem('userid', data._id);
        navigation.navigate('feed');
      } else {
        ToastAndroid.show('Login failed. Please check your credentials and try again.', ToastAndroid.TOP);
      }
    } catch (error) {
      console.error('Error during login:', error);
      ToastAndroid.show('An error occurred. Please try again later.', ToastAndroid.TOP);
    }

  }


  const login = async () => {
    setbtn(true);
    if (email === '') {
      ToastAndroid.show('Email is required!', ToastAndroid.TOP);
    } else if (!email.includes('@')) {
      ToastAndroid.show('Include @ in your email!', ToastAndroid.TOP);
    } else if (pass === '') {
      ToastAndroid.show('Password is required!', ToastAndroid.TOP);
    } else if (pass.length < 6) {
      ToastAndroid.show('Password must be at least 6 characters!', ToastAndroid.TOP);
    } else {
      try {
        const response = await fetch('https://rentnestserver.onrender.com/checkEmail', {
          method: 'POST',
          body: JSON.stringify({ email }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!data.exists) {
          ToastAndroid.show("Email doesn't exists. Please use a different email.", ToastAndroid.TOP);
        } else {
          // Email is available, proceed with login
          fetchdata();
        }
      } catch (error) {
        console.error('Error checking email:', error);
        ToastAndroid.show('An error occurred. Please try again later.', ToastAndroid.TOP);
      }
    }
    setbtn(false);
  }

  const registernow = () => {
    // console.warn('Register');
    navigation.navigate('registration');
  }

  const gotoforgot = () => {
    navigation.navigate('forgotpassword');

  }
  const [toggle, setToggle] = useState(true);
  const togglepass = () => {
    setToggle(!toggle);
  }

  const gotomainpage= ()=>{
    navigation.navigate('feed');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar  style='light' backgroundColor='black'/>
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <ImageBackground
            source={require('./images/loginback.png')}
            style={{ width, height }}
          >
 
            <View style={{ flex: 1 }}>
              <Pressable onPress={gotomainpage}>
             <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text style={{textAlign: 'right',marginTop: 15,marginRight:15,fontSize:15,color:'blue',fontWeight:'600',textDecorationLine:'underline',backgroundColor:'#F4FCF9',padding:5,borderRadius:11 }}>SKIP</Text>
             </View>
              </Pressable>

              <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: 28, fontWeight: '700', color: 'black', marginTop: 100, }}>--------------</Text>
              <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: 28, fontWeight: '600', color: '#B6ECBF', shadowColor: 'blue', elevation: 5 }}>RentNest</Text>
              <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: 28, fontWeight: '700', color: 'black' }}>--------------</Text>

            </View>
            <View style={{ flex: 1.5, borderRadius: 20 }}>

              <View style={styles.login}>
                <View style={{}}>
                  <Text style={{ marginTop: 30, fontSize: 30, fontWeight: 500, textAlign: 'center' }}>Welcome</Text>
                  <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 15 }}>Don't have an account?
                    <Pressable onPress={registernow}>
                      <Text style={{ color: 'red', marginTop: 6, fontSize: 15 }}> Register Now</Text>
                    </Pressable>
                  </Text>
                </View>
                <View style={styles.textbox1}>
                  {/* <View> */}
                  <Image
                    source={require('./images/email.png')}
                    style={styles.icon}
                  />
                  {/* </View> */}
                  <ScrollView horizontal={true}>
                    <TextInput style={styles.textbox1text} placeholder='Enter Email' value={email} onChangeText={(text) => setEmail(text.toLowerCase())} />
                  </ScrollView>
                </View>
                <View style={styles.textbox2}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={require('./images/password.png')}
                      style={styles.icon}
                    />
                    <TextInput secureTextEntry={toggle} style={styles.textbox1text} placeholder='Enter Password' value={pass} onChangeText={(text) => setPass(text)} />
                  </View>
                  {toggle ?
                    <Pressable onPress={togglepass}>
                      <Image
                        source={require('./images/passhide.png')}
                        style={[styles.icon, { marginRight: 10 }]}
                      />
                    </Pressable>
                    :
                    <Pressable onPress={togglepass}>
                      <Image
                        source={require('./images/passshow.png')}
                        style={[styles.icon, { marginRight: 10 }]}
                      />
                    </Pressable>
                  }
                </View>
                <View>
                  {btn ? (
                    <View style={{ marginTop: 20 }}>
                      <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                  ) :

                    <Pressable onPress={login}>
                      <View style={styles.btn}>
                        <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'white', flex: 1, fontWeight: 800, fontSize: 20 }}>Login</Text>
                      </View>
                    </Pressable>
                  }
                </View>

                <View>
                  <TouchableOpacity onPress={gotoforgot}>
                    <Text style={{ textAlign: 'center', marginTop: 35, color: 'darkblue', fontSize: 14 }}>
                      Forgot password ?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginTop: 12,
    marginLeft: 8,
    alignContent: 'center',
  },
  lotify: {
    width: 400,
    height: 200,
    alignSelf: 'center',
    flex: 0.5,
  },
  login: {
    // backgroundColor: '#F5FBFF',
    // marginRight:20,
    // flex: 1,
    // borderTopLeftRadius: 70,
    // borderTopRightRadius: 70,
    // shadowColor: 'black',
    // elevation: 10,
    // shadowOpacity: 1,
  },
  textbox1: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    width: 250,
    borderRadius: 20,
    height: 50,
    marginTop: 25,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  textbox1text: {
    height: 50,
    fontSize: 15,
    marginLeft: 10,
    marginTop: -3,
  },
  textbox2: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    width: 250,
    borderRadius: 20,
    height: 50,
    marginTop: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: '#5B83A5',
    width: 150,
    borderRadius: 40,
    height: 50,
    marginTop: 30,
    shadowColor: 'black',
    elevation: 5,
    shadowOpacity: 1,
  },
});
