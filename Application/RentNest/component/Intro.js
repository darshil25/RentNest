import { View, Text, Dimensions, ScrollView, ImageBackground, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useRef,useEffect } from 'react';
import Login from './Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';


export default function Intro() {
    const { width, height } = Dimensions.get('window');

    const [fontsLoaded] = useFonts({
        'Ubuntu-Light': require('../assets/fonts/Ubuntu/Ubuntu-Light.ttf'),
      });
      const scrollViewRef = useRef(null);

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal={true}
                    scrollEventThrottle={16}
                    pagingEnabled={true}
                >

                    <View style={{ flex: 1, justifyContent: 'center', width, height, backgroundColor: 'white' }}>
                        <View style={{ width, height }}>
                            <ImageBackground
                                source={require('./images/Rent.png')}
                                resizeMode="stretch"
                                style={[styles.image, { width, height }]}
                            >
                                <View style={{flex: 1, justifyContent: 'flex-end',marginRight:40,marginBottom:30,shadowColor:'black',elevation:300}}>
                                    <Text style={styles.text}>Explore Your </Text>
                                    <View style={{flexDirection:'row',alignSelf:'flex-end'}}>

                                    <Text style={[styles.text,{fontWeight:'700',fontStyle:'italic'}]}>Dream </Text>
                                    <Text style={styles.text}>House</Text>
                                    </View>
                                </View>
                                <Pressable onPress={()=>{
                                    scrollViewRef.current?.scrollTo({ x: width, animated: true });
                                }}>
                                <View style={styles.btn}>
                                    <Text style={{textAlign:'center',textAlignVertical:'center',flex:1,fontSize:19,fontWeight:'600'}}>
                                        Get Started    {">>>"}
                                    </Text>
                                </View>
                                </Pressable>
                            </ImageBackground>
                        </View>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', width, height }}>
                        <Login />
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        justifyContent: 'center',
    },
    text:{
        color:'white',
        textAlign:'center',
        fontWeight:'400',
        fontSize:30,
        // fontFamily:'Ubuntu-Light'
    },
    btn:{
        backgroundColor:'white',
        height:45,
        width:300,
        alignSelf:'center',
        borderRadius:10,
        marginBottom:50,
        shadowColor: 'white',
        elevation: 5,
        shadowOpacity:1 
    }
});
