import React from 'react';
import {View, StyleSheet, ViewStyle, Platform} from 'react-native';
import auth from '@react-native-firebase/auth';
import SmallLogo from './SmallLogo';
import BackButton from './BackButton';
import LogoutButton from './LogoutButton';
import StylingContainer from './StylingContainer';

type AddUserScreenHeaderViewProps = {
  navigation: any;
};

const AddUserScreenHeaderView: React.FC<AddUserScreenHeaderViewProps> = ({
  navigation,
}) => {
  const handleLogoutPress = () => {
    navigation.navigate('HomeScreen');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const platformStyle =
    Platform.OS === 'android'
      ? {
          marginTop: '12%',
        }
      : {marginTop: '15%'};

  return (
    <View style={[styles.viewStyle, platformStyle]}>
      <SmallLogo />
      <StylingContainer>
        {!auth().currentUser ? (
          <LogoutButton onPress={handleLogoutPress} />
        ) : auth().currentUser ? (
          <BackButton onPress={handleBackPress} />
        ) : null}
      </StylingContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '12%',
  } as ViewStyle,
});
export default AddUserScreenHeaderView;
