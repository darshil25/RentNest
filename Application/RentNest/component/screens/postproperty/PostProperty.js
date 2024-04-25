import { View, Text, TextInput,StyleSheet, ScrollView,Pressable,onPress,ToastAndroid, ActivityIndicator} from 'react-native'
import React, { useState,  useEffect  } from 'react'
import UploadImage from './UploadImage';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

export default function PostProperty() {
  const [image, setImages] = useState([]);
  const [proname,setproname] = useState();
  const [location, setLocation] = useState();
  const [mobilenumber,setmobilenumber] = useState();
  const [area,setArea] = useState();
  const [rentpermonth,setrentpermonth] = useState('₹');
  const [propertyType, setpropertType] = React.useState([]);
  const [otherthing, setOther] = useState();
  const [furnished,setfurnished] = React.useState([]);
  const [selectbhk, setselectbhk] = React.useState([]);
  const [bath,setBath] = useState([]);
  const [loading,setLoading] =  useState(false);
  // console.log(propertyType);
  
  const data = [
      {key:'1', value:'Apartment'},
      {key:'2', value:'Row House'},
      {key:'3', value:'Bungalow'},
      {key:'4', value:'Single-Family Home'},
      {key:'5', value:'Duplex'},
      {key:'6', value:'Townhouse'},
      {key:'7', value:'Cottage'},
      {key:'8', value:'Tiny House'},

  ]  
  const dataofbhk = [
      {key:'1', value:'1 BHK'},
      {key:'2', value:'2 BHK'},
      {key:'3', value:'3 BHK'},
      {key:'4', value:'4 BHK'},
      {key:'5', value:'5 BHK'},

  ] 
  // console.log(selectbhk);


  const dataoffurnished = [
    {key:'1',value:'Fully Furnished'},
    {key:'2',value:'UnFurnished'},
    {key:'3',value:'Semi-Furnished'},
    {key:'4',value:'Custom Furnished'},
    {key:'5',value:'Basic Furnished'},
    {key:'6',value:'Designer Furnished'},

  ]

  const dataofBath = [
    {key:'1', value:"1 Bath"},
    {key:'2', value:"2 Bath"},
    {key:'3', value:"3 Bath"},
    {key:'4', value:"4 Bath"}
  ]
  const saveData = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userid');
      console.log(userId);
      const formData = new FormData();
      formData.append('userid',userId);
      image.forEach((img, index) => {
        formData.append('files', {
          uri: img,
          type: 'image/jpeg',
          name: `image_${index}.jpg`,
        });
      });
      formData.append('proname', proname);
      formData.append('location', location);
      formData.append('mobilenumber', mobilenumber);
      formData.append('area', area);
      formData.append('rentpermonth', rentpermonth);
      formData.append('propertyType', propertyType);
      formData.append('otherthing', otherthing);
      formData.append('furnished', furnished);
      formData.append('selectbhk', selectbhk);
      formData.append('bath', bath);

      // console.log(formData);
      const response = await fetch('https://rentnestserver.onrender.com/propost/adddata', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Property Added:', data);
      setImages([]);
      setproname();
      setLocation();
      setmobilenumber();
      setArea();
      setrentpermonth();
      setpropertType([]);
      setOther();
      setfurnished([]);
      setselectbhk([]);
      setBath([]);
      ToastAndroid.show('Property Added', ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error:', error.message);
      ToastAndroid.show('Network request failed. Please check your connection.', ToastAndroid.SHORT);
    }
    setLoading(false);
  };

  const locationdata = [
    {key:'1', value:'Ahmedabad'},
    {key:'2', value:'Surat'},
    {key:'3', value:'Rajkot'},
    {key:'4', value:'Vadodara'},
    {key:'5', value:'Bhavnagar'},
    {key:'6', value:'Jamnagar'},
    {key:'7', value:'Gandhinagar'},
    {key:'8', value:'Junagadh'},
    {key:'9', value:'Gandhidham'},
    {key:'10', value:'Anand'},
    {key:'11', value:'Navsari'},
    {key:'12', value:'Morbi'},
    {key:'13', value:'Nadiad'},
    {key:'14', value:'Surendranagar'},
    {key:'15', value:'Bharuch'},
    {key:'16', value:'Mehsana'},
    {key:'17', value:'Bhuj'},
    {key:'18', value:'Porbandar'},
    {key:'19', value:'Palanpur'},
    {key:'20', value:'Valsad'},
    {key:'21', value:'Vapi'},
    {key:'22', value:'Gondal'},
    {key:'23', value:'Veraval'},
    {key:'24', value:'Godhra'},
    {key:'25', value:'Patan'},
    {key:'26', value:'Kalol'},
    {key:'27', value:'Botad'},
    {key:'28', value:'Amreli'},
    {key:'29', value:'Deesa'},
    {key:'30', value:'Jetpur'}
];

  return (
    <View style={{flex:1}}>
      <StatusBar style='light' backgroundColor='black'/>
      <ScrollView>
      <View style={{flex:1,marginTop:10,marginLeft:20,marginRight:20,marginBottom:20}}>
      <Text style={{marginVertical:20,fontSize:22,textAlign:'center',fontWeight:'500'}}>Post Your Property, Here!</Text>
      <View style={{}}>
      <UploadImage images={image} setImages={setImages} />
      </View>
      
      <View style={{marginBottom:10}}>
      <Text style={styles.textinfo}>Property name</Text>
      <TextInput
        value={proname}
        style={styles.textinput}
        placeholder="Type here..."
        onChangeText={(text) => {
          setproname(text)
        }}
        />
        </View>

        <View style={{marginBottom:10}}>
          <Text style={styles.textinfo}>Property Type</Text>
          <SelectList 
          setSelected={(val) => setpropertType(val)} 
          data={data} 
          save="value"
          boxStyles={{height:55}} 
          inputStyles={{fontSize:17}}
          dropdownTextStyles={{fontSize:17}}
          />
        </View>

        <View style={{marginBottom:10}}>
          <Text style={styles.textinfo}>Property Rent Per Month</Text>
          <View>
          <TextInput
            value={rentpermonth}
            style={styles.textinput}
            placeholder="Type here..."
            keyboardType='numeric'
            onChangeText={(text) => {
              setrentpermonth(text)
            }}
            />
            </View>
        </View>

        <View style={{marginBottom:10}}>
          <Text style={styles.textinfo}>Location</Text>
            <SelectList 
            setSelected={(val) => setLocation(val)} 
            data={locationdata} 
            save="value"
            boxStyles={{height:55}} 
            inputStyles={{fontSize:17}}
            dropdownTextStyles={{fontSize:17}}
            />
        </View>

        <View style={{marginBottom:10}}>
          <Text style={styles.textinfo}>Mobile Number</Text>
            <TextInput
              value={mobilenumber}
              style={styles.textinput}
            keyboardType='numeric'
              placeholder="Type here..."  
              onChangeText={(text) => {
                setmobilenumber(text)
              }}
            />
        </View>

        <View style={{marginBottom:10}}>
      <Text style={styles.textinfo}>BHK</Text>
        <SelectList 
          setSelected={(val) => setselectbhk(val)} 
          data={dataofbhk} 
          save="value"
          boxStyles={{height:55}} 
          inputStyles={{fontSize:17}}
          dropdownTextStyles={{fontSize:17}}
          />
        </View>

        <View style={{marginBottom:10}}>
      <Text style={styles.textinfo}> Built Up Area </Text>
      <TextInput
        value={area}
        style={styles.textinput}
        placeholder="For Exa: 250 sqft"
        onChangeText={(text) => {
          setArea(text)
        }}
        />
        </View>

      <View style={{marginBottom:10}}>
      <Text style={styles.textinfo}> Furniture </Text>
      <SelectList 
          setSelected={(val) => setfurnished(val)} 
          data={dataoffurnished} 
          save="value"
          boxStyles={{height:55}} 
          inputStyles={{fontSize:17}}
          dropdownTextStyles={{fontSize:17}}
          />
        </View>
        
        <View style={{marginBottom:10}}>
          <Text style={styles.textinfo}> Bath </Text>
          <SelectList 
              setSelected={(val) => setBath(val)} 
              data={dataofBath} 
              save="value"
              boxStyles={{height:55}} 
              inputStyles={{fontSize:17}}
              dropdownTextStyles={{fontSize:17}}
            />
        </View>

        <View style={{marginBottom:10}}>
          <Text style={styles.textinfo}> Other things  </Text>
          <TextInput
            value={otherthing}
            style={styles.textinput}
            placeholder="Exa:Washing Machine, Freeze, R.O., "
            onChangeText={(text) => {
              setOther(text)
            }}
          />
        </View>

        {
          loading?(
            <View style={{ marginTop: 20 }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ):
          (<Pressable style={styles.button} onPress={()=>saveData()}>
            <Text style={styles.textbtn}> Save </Text>
          </Pressable>)
        }
          </View>
          </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    // paddingTop:50,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    flex:8
  },
  textinfo:{
    fontSize:18,
    marginBottom:2
  },
  textinput:{
    height:55, 
    fontSize: 17, 
    // color: 'steelblue' ,
    borderColor:'grey',
    borderRadius:10,
    borderWidth:1,
    // width:250,
    overflow:'scroll',
    paddingLeft:10,
    paddingRight:10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  textbtn: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});