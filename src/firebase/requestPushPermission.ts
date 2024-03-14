import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';


export const requestPushPermission = async ()=> {
  if(Platform.OS === 'ios') {
    await messaging().requestPermission();
    return;
  } 
  
  if(Platform.OS === 'android'){
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    return;
  }
}