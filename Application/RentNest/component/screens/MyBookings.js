import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from 'expo-status-bar';

export default function MyBookings() {
  const [orderData, setOrderData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrderById = async () => {
    try {
      const userId = await AsyncStorage.getItem('userid');
      const response = await fetch(`https://rentnestserver.onrender.com/order/${userId}`);
      const data = await response.json();
      setOrderData(data);
      const fetchPropertyData = async () => {
        await Promise.all(data.map(item => fetchProperty(item.propertyid)));
        setIsLoading(false);
      };
      fetchPropertyData();
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const fetchProperty = async (id) => {
    try {
      const response = await fetch(`https://rentnestserver.onrender.com/propost/getproperty/${id}`);
      const data = await response.json();
      setPropertyData(prevData => [...prevData, data]);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  useEffect(() => {
    fetchOrderById();
  }, []);

  useEffect(() => {
    // console.log(propertyData);
  }, [propertyData]);

  const Propertyimage = [
    { uri: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://images.unsplash.com/photo-1558969763-1e911dcd91e6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    { uri: "https://plus.unsplash.com/premium_photo-1661964475795-f0cb85767a88?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?q=80&w=1481&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { uri: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
  ];


  return (
    <View style={styles.mainContainer}>
      <StatusBar style='light' backgroundColor='black'/>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>

        {orderData.map((item, index) => (
          <View key={index} style={styles.orderid}>
            <Text style={{ fontSize: 19,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Order {'                        '}: </Text> {index+1}</Text>
            {/* <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Id {'                               '}: </Text>{item.userid}</Text> */}
            <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Name {'                        '}: </Text>{item.customer_name}</Text>
            <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Email {'                         '}: </Text>{item.customer_email}</Text>
            <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Mobile Number {'       '}: </Text> {item.customer_mobilenumber}</Text>
            <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Number of Months {'  '}: </Text>{item.number_of_months}</Text>
            <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Number of Peoples {'  '}: </Text>{item.number_of_people}</Text>
            <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Student / Family {'        '}: </Text>{item.student_family}</Text>
              <View style={styles.box1}>
                <Image
                  source={{ uri: Propertyimage[index % Propertyimage.length].uri }}
                  style={{ height: 230 }}
                />
               <View style={{ margin: 17 }}>
                          <Text style={{ fontWeight: '600', fontSize: 20,marginBottom:5 }}>{propertyData[index].proname} {propertyData[index].propertyType}</Text>
                          <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Location{'               '}:   </Text>{propertyData[index].location}</Text>
                          <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Type of Property{' '}:   </Text>{propertyData[index].propertyType}</Text>
                          <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Rent Per Month{'   '}:   </Text> ₹ {propertyData[index].rentpermonth}</Text>
                          <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Area{'                      '}:   </Text>{propertyData[index].area}</Text>
                          <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Furniture{'               '}:   </Text>{propertyData[index].furnished}</Text>
                          <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Contact{'                 '}:   </Text>+91 {propertyData[index].mobilenumber}</Text>
                          <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Extra{'                      '}:   </Text>{propertyData[index].otherthing}</Text>
  
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                            <View style={{ flexDirection: 'row',marginBottom:5 }}>
                              <Image
                                source={require('../images/bed_icon.png')}
                                style={{ width: 32, height: 32, marginLeft: 4 ,marginRight:6}}
                              />
                              <Text style={{ textAlignVertical: 'center',fontWeight:'500',fontSize:17}}>{propertyData[index].selectbhk}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              <Image
                                source={require('../images/bath_icon.png')}
                                style={{ width: 32, height: 32, marginRight: 2 ,marginRight:6}}
                              />
                              <Text style={{ textAlignVertical: 'center',fontWeight:'500',fontSize:17 }}>{propertyData[index].bath}</Text>
                            </View>
                          </View>
                  </View>
              </View>
              <View style={{
                marginTop:15,
                marginBottom:15,
                height: 1,
                backgroundColor: '#727171',
              }} />
          </View>
        ))
      }
      </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: 'red',
    margin: 2,
    borderRadius:6,
    // shadowColor:'black',
    // elevation:0.5,
    // shadowOpacity:0.5,
    padding:7,
    borderWidth:0.5
  },
  headerofpage:{
    textAlign:'center',
    fontSize:20,
    marginTop:10,
    marginBottom:10,
    fontWeight:'500'
  },
  box1:{ 
    borderRadius: 20, 
    backgroundColor: 'white', 
    // margin:2 ,
    overflow: 'hidden', 
    shadowColor: 'black', 
    elevation: 2, 
    shadowOpacity: 10 ,
    marginTop:10
  },
  editbtn:{
    // fontWeight: 'bold',
    fontWeight:'500',
    fontSize: 19,
    textTransform: 'uppercase',
    // shadowColor:'blue',
    // shadowColor: 'black',
    // elevation: 5,
    // shadowOpacity: 1,
  },
  btn:{
    backgroundColor: '#60c5ff',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor:'black',
    shadowOpacity:2,
    marginTop:15
  },
  orderid:{

  }
});
