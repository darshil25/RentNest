import { useNavigation, useRoute } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native"

export default function LocationRender() {
    const navigation = useNavigation();
    const route = useRoute();
    const { selectedLocation } = route.params;
    console.log("Selected Location:", selectedLocation);
    const [locationData, setlocationData] = useState([]);
    const [loading,setLoading] = useState(false);

    const fetchData = async() => {
        setLoading(true);
        try{
            let response = await fetch(`https://rentnestserver.onrender.com/propost/search/${selectedLocation}`);
            let result =await response.json();
            // console.log(result);
            setlocationData(result);
        }catch(error){
            console.error(error);
        }
        setLoading(false);
    }   
    useEffect(()=>{
        fetchData();
    },[])

    const seeMoreDetails = (id,imguri) => {
        navigation.navigate('seedetails', { propertyId: id ,imgurl:imguri})
    }


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
    

    return (
        <View style={styles.maincontiner}>
            <StatusBar style='light' backgroundColor='black'/>
            <Text style={styles.selectedloc}>Selected Location : {selectedLocation}</Text>

            {loading?
            (
                <ActivityIndicator  size="large" color="#0000ff" style={{flex:1,justifyContent:'center'}}/>
            ):(
            <ScrollView>
                {locationData.map((item,index) => {
                    return(
                    <View style={styles.boxofpro}>
                        <Image
                            source={{ uri:  Propertyimage[index].uri  }}
                            style={{ height: 180 }}
                        />
                        <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                            <View style={styles.textview}>
                                <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 2 }}>Location                 : </Text>
                                <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 2 }}>Type of Property   : </Text>
                                <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 2 }}>BHK                         : </Text>
                                <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 2 }}>Rent Per Month    : </Text>
                            </View>
                            <View style={styles.textviewfull}>
                                <Text style={{ fontSize: 18, marginBottom: 2 }}>{item.location}</Text>
                                <Text style={{ fontSize: 18 , marginBottom: 2}}>{item.propertyType}</Text>
                                <Text style={{ fontSize: 18, marginBottom: 2 }}>{item.rentpermonth}</Text>
                                <Text style={{ fontSize: 18 , marginBottom: 2}}>{item.selectbhk}</Text>

                            </View>
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={()=>seeMoreDetails(item._id,Propertyimage[index].uri)} >
                            <Text style={{ fontSize: 17, fontWeight: '400' }}>Show More Details </Text>
                        </TouchableOpacity>
                    </View>
                )
            })}
            </ScrollView>
                    )}
        </View>
    )
}


const styles = StyleSheet.create({
    maincontiner: {
        margin: 5,
        flex: 1
    },
    boxofpro: {
        // margin:5
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        shadowColor: 'grey',
        elevation: 5,
        opacity: 5,
        flex: 1,
        marginTop:7,
        marginBottom:7
    },
    selectedloc: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '500',
        margin: 10,
    },
    textview: {
        // backgroundColor:'red',
        // width:160
        flex: 1,
    },
    textviewfull: {
        // backgroundColor:'blue',
        flex: 1,
    },
    btn: {
        backgroundColor: '#8ee3fd',
        height: 35,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        shadowColor:'black',
        elevation:2,
        shadowOpacity:2
    }
})