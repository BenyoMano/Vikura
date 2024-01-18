import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  Linking,
} from 'react-native';
import WebView from 'react-native-webview';
import {Icon} from 'react-native-elements';
import MainText from '../../../../atoms/MainText';
import {EAPSettingsChoice} from './EulaAndPolicyScreen';

type DocumentViewProps = {
  settingsChoice: EAPSettingsChoice;
};

const DocumentView = ({settingsChoice}: DocumentViewProps) => {
  const [isLoading, setLoading] = useState(false);
  return (
    <View style={styles.mainContainer}>
      {settingsChoice === 'eula' && Platform.OS === 'android' ? (
        <View style={styles.boxContainer}>
          <View style={{flex: 1}}>
            <WebView
              onLoadProgress={({nativeEvent}) => {
                if (nativeEvent.progress !== 1 && !isLoading) {
                  setLoading(true);
                } else if (nativeEvent.progress === 1) {
                  setLoading(false);
                }
              }}
              source={{
                uri: 'https://www.termsfeed.com/live/2e00e7ce-8224-416e-ae6e-5adf222ceabe?fbclid=IwAR1YLW9rKtqYT2zFuOK805WS82VnqRSKSr9RKKq2FOzhLFztDpCpZjpbdxg',
              }}
            />
            {isLoading && <ActivityIndicator size={'large'} />}
          </View>
        </View>
      ) : settingsChoice === 'eula' && Platform.OS === 'ios' ? (
        <View style={styles.linkView}>
          <MainText
            title="Extern länk till Apples användarvilkor:"
            style={{fontSize: 24, textAlign: 'center', marginBottom: 40}}
          />
          <Pressable
            onPress={async () => {
              await Linking.openURL(
                'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/',
              );
            }}>
            <View style={styles.buttonView}>
              <Text style={styles.textButtonStyle}>Ta mig dit</Text>
              <Icon
                name="arrow-up-right"
                type="feather"
                color="black"
                size={24}
              />
            </View>
          </Pressable>
        </View>
      ) : settingsChoice === 'policy' ? (
        <View style={styles.boxContainer}>
          <View style={{flex: 1}}>
            <WebView
              onLoadProgress={({nativeEvent}) => {
                if (nativeEvent.progress !== 1 && !isLoading) {
                  setLoading(true);
                } else if (nativeEvent.progress === 1) {
                  setLoading(false);
                }
              }}
              source={{
                uri: 'https://www.termsfeed.com/live/60db37d2-737a-4190-8e1c-d2cb382e32ae?fbclid=IwAR3KBnwlGaMl5rxQK7EGA2B_TdKRhyiOvrVbfYf7CXnFgUSZ0N90NIG6D8c',
              }}
            />
            {isLoading && <ActivityIndicator size={'large'} />}
          </View>
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '88%',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 40,
  } as ViewStyle,
  boxContainer: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 12,
  } as ViewStyle,
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'lightblue',
    borderRadius: 12,
  } as ViewStyle,
  textButtonStyle: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 20,
    color: 'black',
    marginRight: 5,
  } as TextStyle,
  linkView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
});
export default DocumentView;
