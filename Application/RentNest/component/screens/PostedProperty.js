import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable, Alert, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function PostProperty() {
  const [data, setdata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPostedPro();
    };

    fetchData();
  }, []);

  const fetchPostedPro = async () => {
    try {
      const userid = await AsyncStorage.getItem('userid');
      let result = await fetch(`https://rentnestserver.onrender.com/propost/${userid}`);
      // console.log("Api : ", `https://rentnestserver.onrender.com/propost/${userid}`);
      let datajson = await result.json();
      setdata(datajson);
      // console.log(datajson);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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

  const editProperty = () => {
    Alert.alert("Edit property.")
  }
  return (
    <View>
      <StatusBar style='light' backgroundColor='black'/>
      {
        data ? (
          <ScrollView>
            {/* <Text>{id}</Text> */}
            <Text style={styles.headerofpage}>Here is your posted property!</Text>
            {
              data.map((item, index) => {
                return (
                  <View style={styles.box1}>
                    <Image
                      source={{ uri: Propertyimage[index].uri }}
                      style={{ height: 230 }}
                    />
                    <View style={{ margin: 17 }}>
                      <Text style={{ fontWeight: '600', fontSize: 20, marginBottom: 5 }}>{item.proname} {item.propertyType}</Text>
                      <Text style={{ fontSize: 17, marginBottom: 5 }}><Text style={{ fontWeight: '500' }}>Location :   </Text>{item.location}</Text>
                      <Text style={{ fontSize: 17, marginBottom: 5 }}><Text style={{ fontWeight: '500' }}>Type of Property :   </Text>{item.propertyType}</Text>
                      <Text style={{ fontSize: 17, marginBottom: 5 }}><Text style={{ fontWeight: '500' }}>Rent Per Month :   </Text> ₹ {item.rentpermonth}</Text>
                      <Text style={{ fontSize: 17, marginBottom: 5 }}><Text style={{ fontWeight: '500' }}>Area :   </Text>{item.area}</Text>
                      <Text style={{ fontSize: 17, marginBottom: 5 }}><Text style={{ fontWeight: '500' }}>Furniture :   </Text>{item.furnished}</Text>
                      <Text style={{ fontSize: 17, marginBottom: 5 }}><Text style={{ fontWeight: '500' }}>Contact :   </Text>+91 {item.mobilenumber}</Text>
                      <Text style={{ fontSize: 17, marginBottom: 5 }}><Text style={{ fontWeight: '500' }}>Extra  :   </Text>{item.otherthing}</Text>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                          <Image
                            source={require('../images/bed_icon.png')}
                            style={{ width: 22, height: 22, marginRight: 2 }}
                          />
                          <Text style={{ textAlignVertical: 'center', fontWeight: '500' }}>{item.selectbhk}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Image
                            source={require('../images/bath_icon.png')}
                            style={{ width: 20, height: 20, marginRight: 2 }}
                          />
                          <Text style={{ textAlignVertical: 'center', fontWeight: '500' }}>{item.bath}</Text>
                        </View>
                      </View>
                      <Pressable onPress={() => editProperty()}>
                        <Text style={styles.editbtn}>
                          Edit Your Property Details
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                )
              })
            }
          </ScrollView>
        ) : (
          <View style={{ marginTop: 20 }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create(
  {
    headerofpage: {
      textAlign: 'center',
      fontSize: 20,
      marginTop: 10,
      marginBottom: 10,
      fontWeight: '500'
    },
    box1: {
      borderRadius: 20,
      backgroundColor: 'white',
      margin: 10,
      overflow: 'scroll',
      shadowColor: 'black',
      elevation: 2,
      shadowOpacity: 10
    },
    editbtn: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '500',
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: 'skyblue',
      padding: 10,
      borderRadius: 10,
      // shadowColor:'blue',
      shadowColor: 'black',
      elevation: 5,
      shadowOpacity: 1,
    }
  }
)