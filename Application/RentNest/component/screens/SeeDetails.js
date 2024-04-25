import { useNavigation, useRoute } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar";
import { useState,useEffect } from "react";
import { View,Text ,Image, StyleSheet, Pressable, Alert,ActivityIndicator, TouchableOpacity} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function SeeDetails(){

    const route = useRoute();
    const {propertyId,imgurl} = route.params;
    // console.log(imgurl);
    const [data, setdata] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        await fetchPostedPro();
      };
  
      fetchData();
    }, []); 
  
    const fetchPostedPro = async () => {
      try {
        let result = await fetch(`https://rentnestserver.onrender.com/propost/getproperty/${propertyId}`);
        // console.log("Api : ", `https://rentnestserver.onrender.com/propost/getproperty/${propertyId}`);
        let datajson = await result.json();
        setdata(datajson);
        // console.log(datajson);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    const navigation = useNavigation();
    const gotobuypage = ()=>{
        navigation.navigate('rentproperty',{propertyId:propertyId})
    }
      return(
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style='light' backgroundColor='black'/>
          <View>
             {
                data?(
            <ScrollView>
              {/* <Text>{id}</Text> */}
              <View style={styles.box1}>
                        {/* <View style={{ flexDirection: 'row' }}> */}
                        <Image
                          source={{ uri:imgurl  }}
                          style={{ height: 230 }}
                        />
                        {/* </View> */}
                        <View style={{ margin: 17 }}>
                          <Text style={{ fontWeight: '600', fontSize: 20,marginBottom:5 }}>{data.proname} {data.propertyType}</Text>
                          <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Location{'               '}:   </Text>{data.location}</Text>
                          <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Type of Property{' '}:   </Text>{data.propertyType}</Text>
                          <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Rent Per Month{'   '}:   </Text> ₹ {data.rentpermonth}</Text>
                          <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Area{'                      '}:   </Text>{data.area}</Text>
                          <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Furniture{'               '}:   </Text>{data.furnished}</Text>
                          <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Contact{'                 '}:   </Text>+91 {data.mobilenumber}</Text>
                          <Text style={{ fontSize: 17,marginBottom:5 }}><Text style={{fontWeight:'500'}}>Extra{'                      '}:   </Text>{data.otherthing}</Text>
  
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                            <View style={{ flexDirection: 'row',marginBottom:5 }}>
                              <Image
                                source={require('../images/bed_icon.png')}
                                style={{ width: 32, height: 32, marginLeft: 4 ,marginRight:6}}
                              />
                              <Text style={{ textAlignVertical: 'center',fontWeight:'500',fontSize:17}}>{data.selectbhk}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              <Image
                                source={require('../images/bath_icon.png')}
                                style={{ width: 32, height: 32, marginRight: 2 ,marginRight:6}}
                              />
                              <Text style={{ textAlignVertical: 'center',fontWeight:'500',fontSize:17 }}>{data.bath}</Text>
                            </View>
                          </View>
                          <TouchableOpacity style={styles.btn} onPress={()=>gotobuypage()}>
                            <Text style={styles.editbtn}>
                              Book For Rent
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      </ScrollView>
                      ):(
                        <View style={{ marginTop: 20 }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                      </View>
                      )}
          </View>
          </GestureHandlerRootView>
      )
}

const styles = StyleSheet.create(
    {
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
        margin:10 ,
        overflow: 'hidden', 
        shadowColor: 'black', 
        elevation: 2, 
        shadowOpacity: 10 ,
        marginTop:40
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
      }
    }
  )