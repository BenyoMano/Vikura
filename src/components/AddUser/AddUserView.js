import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  ScrollView,
} from 'react-native';
import Button from '../../atoms/Button';
import Form from './Form';
import Welcome from '../../atoms/MainText';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import {HeaderView} from '../Header/HeaderView';
import createUser from './createUser';

const AddUserView = ({navigation}) => {
  const {textStyling, viewStyle} = styles;
  const [modalVisible, setModalVisible] = useState(false);
  const capitalize = 'none';
  const showIfKurator = checkboxState === true ? 'JA' : 'NEJ';
  const [checkboxState, setCheckboxState] = React.useState(false);
  const [userPropToAdd, setUserPropToAdd] = useState({
    firstName: '',
    secondName: '',
    mejl: '',
    password: '',
    personnummer: '',
    firstLogin: true,
    kurator: checkboxState,
  });

  return (
    <MyKeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.container,
            {
              flexDirection: 'column',
            },
          ]}>
          <View style={{flexDirection: 'row', width: 360}}>
            <HeaderView navigation={navigation} />
          </View>
          <View style={{justifyContent: 'center'}}>
            <Welcome
              title="Lägg till elev"
              style={{fontSize: 32, color: 'black', marginTop: 20}}
            />
            <Welcome
              title="Skapa konto:"
              style={{
                fontSize: 18,
                color: 'grey',
                marginTop: 20,
                marginBottom: 10,
              }}
            />
          </View>

          <View style={{justifyContent: 'center'}}>
            <Modal
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={viewStyle.container}>
                <View style={viewStyle.label}>
                  <Text style={textStyling.label}>Namn:</Text>
                </View>
                <View style={viewStyle.info}>
                  <Text style={textStyling.info}>
                    {userPropToAdd.firstName} {userPropToAdd.secondName}
                  </Text>
                </View>
                <View style={viewStyle.label}>
                  <Text style={textStyling.label}>Mail:</Text>
                </View>
                <View style={viewStyle.info}>
                  <Text style={textStyling.info}>{userPropToAdd.mejl}</Text>
                </View>
                <View style={viewStyle.label}>
                  <Text style={textStyling.label}>Lösenord:</Text>
                </View>
                <View style={viewStyle.info}>
                  <Text style={textStyling.info}>{userPropToAdd.password}</Text>
                </View>
                <View style={viewStyle.label}>
                  <Text style={textStyling.label}>Personnummer:</Text>
                </View>
                <View style={viewStyle.info}>
                  <Text style={textStyling.info}>
                    {userPropToAdd.personnummer}
                  </Text>
                </View>
                <View style={viewStyle.label}>
                  <Text style={textStyling.label}>Kurator:</Text>
                </View>
                <View style={viewStyle.info}>
                  <Text style={textStyling.info}> {showIfKurator} </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 15,
                  }}>
                  <Pressable
                    style={[viewStyle.button, {margin: 10}]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={textStyling.label}>Tillbaka</Text>
                  </Pressable>
                  <Pressable
                    style={[viewStyle.button, {margin: 10}]}
                    onPress={() => {
                      createUser({
                        userPropToAdd,
                        setUserPropToAdd,
                        checkboxState,
                        setCheckboxState,
                      });
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={textStyling.label}>Bekräfta</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>

          <View style={{flex: 3}}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <Form
                userPropToAdd={userPropToAdd}
                setUserPropToAdd={setUserPropToAdd}
                checkboxState={checkboxState}
                setCheckboxState={setCheckboxState}
              />
            </ScrollView>
          </View>

          <View style={{marginBottom: 10}}>
            <Button title="Registrera" onPress={() => setModalVisible(true)} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </MyKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#F7F7F7',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  textStyling: {
    label: {
      fontSize: 20,
      color: 'black',
      fontFamily: 'NunitoSans-Regular',
    },
    info: {
      fontSize: 20,
      color: 'grey',
      fontFamily: 'NunitoSans-Regular',
    },
  },
  //===========================
  viewStyle: {
    container: {
      backgroundColor: 'white',
      borderRadius: 20,
      alignSelf: 'center',
      top: '28%',
      paddingHorizontal: 15,
      paddingBottom: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 30,
    },
    label: {
      marginLeft: 10,
      marginTop: 30,
    },
    info: {
      marginLeft: 10,
      marginTop: 5,
    },
    button: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
      backgroundColor: 'lightgrey',
    },
  },
});

export default AddUserView;
