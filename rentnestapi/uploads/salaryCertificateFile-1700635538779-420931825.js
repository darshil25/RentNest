import axios from 'axios';

// import { useSelector } from "react-redux"
// import { store } from "../Redux/store"
// import { useNavigation } from "@react-navigation/native"

export const googleApiKey =
{
    key: "AIzaSyAV2a8fa27mtsXyuQ-__N5xj3d_8TFa0Yc"
}


export const colors = {
    button: "#ed54a5",
    clr: "#0dbab7",
    Darkblue: '#2a2d3f',
    gray: '#a4a4a4',
    pink: '#ed54a5',
    nebula: '#cad8d6',
    blue: '#0dbab7',
    purple: '#5b4ac8',
    TFColor: '#EDEDED',
    whiteBackground: 'white',
    grayWhite: '#f0f0f0',
    backgroundClr: '#f5f6fa'
}

export const globalId =
{
    userId: ""
}

export const fonts = {
    bold: 'Poppins-Bold',
    regular: 'Poppins-Regular',
    semibold: 'Poppins-SemiBold',
    black: 'Poppins-Black',
    medium: 'Poppins-Medium',
    font_15: 15,
    font_20: 20,
    font_17: 17,
    font_25: 25,
    font_23: 23,
    font_30: 30,
    font_10: 10,
    font_13: 13,
    font_16: 16,
    font_18: 18,
    font_14: 14,
    font_11: 11,
    font_12: 12,
    font_22: 22
}



// export const fetchData = async (url, raw) => {

//     var myHeaders = new Headers();
//     myHeaders.append("x-token", URL.xtoken);
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Accept", "application/json");

//     var requestOptions =
//     {
//         method: 'POST',
//         headers: myHeaders,
//         body: JSON.stringify(raw)
//     };

//     let response = await fetch(URL.uatUrl + url, requestOptions);
//     let json = await response.json();

//     if (json.error == "tokenmissmatch") {
//         AsyncStorage.clear()
//         console.log('check errror is ', json);

//         // navigation.push('Login') 
//         return json
//     }
//     else {
//         return json;
//     }
// }


export const fetchFormData = async (url, raw) => {
  try{
    const token =  window.localStorage.getItem('token');
    // console.log('check x token is', token);

    const headers = {
      'x-token': token,
      'Content-Type': 'multipart/form-data',
    };

    // var requestOptions =
    // {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    // };

    let response = await axios.post(URL.uatUrl + url, raw, {headers});
    if (response.data.error === "tokenmissmatch") {
      console.log('check error is ', response.data);

      return response.data;
    } else {
      return response.data;
    }
  }
  catch (error) {
    // Handle any request errors here
    console.error('Request error:', error);
    throw error;
  }
}

export const fetchData = async (url, raw) => {
  try {
    const headers = {
      // 'x-token': URL.xtoken,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const response = await axios.post(URL.uatUrl + url, JSON.stringify(raw), { headers });

    if (response.data.error === "tokenmissmatch") {
      console.log('check error is ', response.data);

      // navigation.push('Login');
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    // Handle any request errors here
    console.error('Request error:', error);
    throw error;
  }
};

export const fetchDataPrivate = async (url, raw) => {
  try {
    const token =  window.localStorage.getItem('token');
    const headers = {
      'x-token': token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Credentials": "true",
      // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    };

    const response = await axios.post(URL.uatUrl + url, JSON.stringify(raw), { headers });

    if (response.data.error === "tokenmissmatch") {
      console.log('check error is ', response.data);

      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    // Handle any request errors here
    console.error('Request error:', error);
    throw error;
  }
};

export const URL =
{
    uatUrl: 'https://api.gogagner.com/BF/',
    // prodUrl: 'https://dawnapplication.azurewebsites.net/HI/api/',
    xtoken: "",
    fcmToken: ""
}

export const channels =
{
    createChannel: 'C05731M0LR3',
    jobChannel: 'C0578EP0BM2'
}

// Create Slack Data 
export const slackFetchData = async (url, raw, Authorization) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json;charset=UTF-8");
    myHeaders.append("Authorization", Authorization);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
    };

    let response = await fetch(url, requestOptions);
    let json = await response.json();


    return json;
}

// export const INFO =
// {
//     deviceName: (DeviceInfo.getDeviceNameSync() + ""),
//     appVersion: DeviceInfo.getVersion(),
//     deviceOsVersion: (DeviceInfo.getSystemVersion() + ""),
//     deviceOs: (Platform.OS),
// }