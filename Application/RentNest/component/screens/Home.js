import { View, Text, TextInput, Image, StyleSheet, ScrollView, Pressable, Alert, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-fontawesome';
import { StatusBar } from 'expo-status-bar';

export default function Home() {

  const navigation = useNavigation();
  const [showlgnbtn, setShowlgnbtn] = useState(false);

  const [prodata, setprodata] = useState(null);
  const fetchdata = async () => {
    try {
      let result = await fetch('https://rentnestserver.onrender.com/propost/getdata')
        .then((res) => res.json());
      if (Array.isArray(result)) {
        setprodata(result);
      } else {
        console.error("Invalid data format:", result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const loginpage = () => {
    navigation.navigate('login');
  }

  const checkuserlogin = async () => {
    const userId = await AsyncStorage.getItem('userid');
    if (userId === null) {
      setShowlgnbtn(true)
    }
  }

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    checkuserlogin();
  })

  const Propertyimage = [
    { uri: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://images.unsplash.com/photo-1558969763-1e911dcd91e6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://plus.unsplash.com/premium_photo-1661964475795-f0cb85767a88?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?q=80&w=1481&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
  ]
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  const gotobookpage = (id, imguri) => {
    navigation.navigate('seedetails', { propertyId: id, imgurl: imguri });
  }

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText) {
      navigation.navigate('locationrender', { selectedLocation: searchText });
    }
  }, [searchText]);

  const location = [
    { key: '1', value: 'Ahmedabad' },
    { key: '2', value: 'Surat' },
    { key: '3', value: 'Rajkot' },
    { key: '4', value: 'Vadodara' },
    { key: '5', value: 'Bhavnagar' },
    { key: '6', value: 'Jamnagar' },
    { key: '7', value: 'Gandhinagar' },
    { key: '8', value: 'Junagadh' },
    { key: '9', value: 'Gandhidham' },
    { key: '10', value: 'Anand' },
    { key: '11', value: 'Navsari' },
    { key: '12', value: 'Morbi' },
    { key: '13', value: 'Nadiad' },
    { key: '14', value: 'Surendranagar' },
    { key: '15', value: 'Bharuch' },
    { key: '16', value: 'Mehsana' },
    { key: '17', value: 'Bhuj' },
    { key: '18', value: 'Porbandar' },
    { key: '19', value: 'Palanpur' },
    { key: '20', value: 'Valsad' },
    { key: '21', value: 'Vapi' },
    { key: '22', value: 'Gondal' },
    { key: '23', value: 'Veraval' },
    { key: '24', value: 'Godhra' },
    { key: '25', value: 'Patan' },
    { key: '26', value: 'Kalol' },
    { key: '27', value: 'Botad' },
    { key: '28', value: 'Amreli' },
    { key: '29', value: 'Deesa' },
    { key: '30', value: 'Jetpur' }
  ];

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style='light' backgroundColor='black' />
      {prodata ? (
        <ScrollView>
          <View style={{ margin: 10 }}>
            {showlgnbtn ? (
              <Pressable onPress={() => loginpage()}>
                <Text style={styles.loginbtn}>Login</Text>
              </Pressable>
            ) : null}
            <Text style={{ fontWeight: '500', fontSize: 20, color: 'grey', marginBottom: 2, marginLeft: 17 }}>Hi there!</Text>
            <Text style={{ fontWeight: '500', fontSize: 20, color: 'darkblue', marginLeft: 17 }}>Start looking for your house</Text>
            <View style={styles.container}>
              <View style={styles.searchinput}>
                <View style={styles.textInputContainer}>
                  <SelectList
                    setSelected={(val) => setSearchText(val)}
                    data={location}
                    save="value"
                    defaultOption={{ key: 0, value: 'Select Location' }}
                    boxStyles={{ borderWidth: 2, borderColor: '#206391', height: 55 }}
                    inputStyles={{ fontSize: 17 }}
                    dropdownTextStyles={{ fontSize: 17 }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.poster1}>
              <Image
                source={require('../images/Poster_of_home_1.png')}
                style={styles.poster1img}
              />
            </View>
            <ScrollView horizontal={true}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 13, marginLeft: 2 }}>
                <TouchableOpacity style={[{ backgroundColor: activeTab === 0 ? '#99d3fa' : 'white', }, styles.tabswitch]} onPress={() => handleTabPress(0)}>
                  <Text style={{ textAlign: 'center', flex: 1, textAlignVertical: 'center', fontSize: 17, fontWeight: '400', padding: 10 }}>Apartment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{ backgroundColor: activeTab === 1 ? '#99d3fa' : 'white', }, styles.tabswitch]} onPress={() => handleTabPress(1)}>
                  <Text style={{ textAlign: 'center', flex: 1, textAlignVertical: 'center', fontSize: 17, fontWeight: '400', padding: 10 }}>Townhouse</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{ backgroundColor: activeTab === 2 ? '#99d3fa' : 'white', }, styles.tabswitch]} onPress={() => handleTabPress(2)}>
                  <Text style={{ textAlign: 'center', flex: 1, textAlignVertical: 'center', fontSize: 17, fontWeight: '400', padding: 10 }}>Bungalow</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{ backgroundColor: activeTab === 3 ? '#99d3fa' : 'white', }, styles.tabswitch]} onPress={() => handleTabPress(3)}>
                  <Text style={{ textAlign: 'center', flex: 1, textAlignVertical: 'center', fontSize: 17, fontWeight: '400', padding: 10 }}>Farmhouse</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <View>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 8 }}>
                <Text style={{ fontWeight: '600', fontSize: 18 }}>Best For You</Text>
                <Text>View More</Text>
              </View>
              <ScrollView horizontal={true}>
                <View style={{ flexDirection: 'row' }}>
                  {prodata.map((item, index) => (
                    <View key={index}>
                      <View style={{ borderRadius: 20, backgroundColor: 'white', marginRight: 10, overflow: 'hidden', shadowColor: 'black', elevation: 1, shadowOpacity: 10, marginBottom: 5 }}>
                        <Image
                          source={{ uri: Propertyimage[index].uri }}
                          style={{ width: 220, height: 200, }}
                        />
                        <View style={{ margin: 10 }}>
                          <Text style={{ fontWeight: '600', fontSize: 15 }}>{item.proname}</Text>
                          <Text style={{ fontSize: 12 }}>{item.location}</Text>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Image
                                source={require('../images/bed_icon.png')}
                                style={{ width: 20, height: 20, marginRight: 2 }}
                              />
                              <Text style={{ textAlignVertical: 'center' }}>{item.selectbhk}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              <Image
                                source={require('../images/bath_icon.png')}
                                style={{ width: 20, height: 20, marginRight: 2 }}
                              />
                              <Text style={{ textAlignVertical: 'center' }}>{item.bath}</Text>
                            </View>
                          </View>
                          <Text>Area : {item.area}</Text>
                          <TouchableOpacity style={styles.bookbtn} onPress={() => gotobookpage(item._id, Propertyimage[index].uri)}>
                            <Text style={styles.btntxt}>See Details</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={styles.poster1}>
              <Image
                source={require('../images/Poster_of_home_2.png')}
                style={styles.poster1img2}
              />
            </View>
            <View style={{ justifyContent: 'flex-end', marginTop: 15, marginBottom: 15 }}>
              <Text style={{ fontSize: 17 }}>Most Popular</Text>
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <ScrollView horizontal={true}>
                  {Propertyimage.map((imageurl, i) => (
                    <Image
                      key={i}
                      source={{ uri: imageurl.uri }}
                      style={{ width: 150, height: 150, borderRadius: 14, marginRight: 7 }}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={{ alignSelf: 'center', justifyContent: 'center', flex: 1 }}>
          <ActivityIndicator size="large" color="#5c7de8" />
          <Text>Loading ...</Text>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  loginbtn: {
    alignSelf: 'flex-#end3498DB',
    height: 35,
    width: 70,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 7,
    borderColor: '#3498DB',
    borderWidth: 2
  },
  tabswitch: {
    textAlign: 'center',
    height: 48,
    textAlignVertical: 'center',
    marginRight: 10,
    borderRadius: 8,
    shadowColor: 'black',
    elevation: 2,
    opacity: 2,
    paddingLeft: 10,
    paddingRight: 10
  },
  bookbtn: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: 'skyblue',
    padding: 7,
    borderRadius: 10,
    fontWeight: '500',
    shadowColor: 'black',
    elevation: 3,
    shadowOpacity: 1,
  },
  btntxt: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400'
  },
  poster1: {},
  poster1img: {
    width: 350,
    height: 350,
    alignSelf: 'center',
    borderRadius: 40,
  },
  poster1img2: {
    width: 350,
    height: 650,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
  },
});

