/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import Button from '../../atoms/Button';
import Form from './Form';
import MainText from '../../atoms/MainText';
import {MyKeyboardAvoidingView} from '../../atoms/MyKeyboardAvoidingView';
import {HeaderView} from '../Header/HeaderView';
import createUser from './createUser';
import SmallButton from '../../atoms/SmallButton';

const AddUserView = ({navigation}) => {
  const {textStyling, viewStyle} = styles;
  const [modalVisible, setModalVisible] = useState(false);
  const [checkboxState, setCheckboxState] = React.useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasAddedUser, setHasAddedUser] = useState(false);
  const showIfKurator = checkboxState ? 'JA' : 'NEJ';
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
            styles.greyScale.mainContainer,
            {
              flexDirection: 'column',
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
            }}>
            <HeaderView navigation={navigation} hasAddedUser={hasAddedUser} setHasAddedUser={setHasAddedUser} />
          </View>
          <View style={{justifyContent: 'center'}}>
            <MainText
              title="Lägg till elev"
              style={{fontSize: 32, color: 'black', marginTop: 15, top: 0}}
            />
            <MainText
              title="Skapa konto:"
              style={{
                fontSize: 18,
                color: 'grey',
                top: 0,
                marginTop: 20,
                marginBottom: 15,
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
              <View style={viewStyle.modalContainer.greyScale}>
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
                  <View style={{margin: 10}}>
                    <SmallButton
                      title="Tillbaka"
                      onPress={() => setModalVisible(!modalVisible)}
                    />
                  </View>
                  <View style={{margin: 10}}>
                    <SmallButton
                      title="Bekräfta"
                      onPress={() => {
                        createUser({
                          userPropToAdd,
                          setUserPropToAdd,
                          checkboxState,
                          setCheckboxState,
                          setSubmitted,
                          setHasAddedUser,
                        });
                        setSubmitted(true);
                        setModalVisible(!modalVisible);
                      }}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <ScrollView
            contentContainerStyle={styles.greyScale.scrollViewContainer}>
            <Form
              userPropToAdd={userPropToAdd}
              setUserPropToAdd={setUserPropToAdd}
              checkboxState={checkboxState}
              setCheckboxState={setCheckboxState}
              submitted={submitted}
            />
          </ScrollView>
          <View style={{marginVertical: 10}}>
            <Button title="Registrera" onPress={() => setModalVisible(true)} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </MyKeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  greyScale: {
    scrollViewContainer: {
      paddingHorizontal: 20,
      paddingBottom: 15,
      backgroundColor: '#EEEEEE',
      borderRadius: 20,
      width: '100%',
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      width: '100%',
    },
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
  viewStyle: {
    modalContainer: {
      greyScale: {
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
    },
    label: {
      marginLeft: 10,
      marginTop: 30,
    },
    info: {
      marginLeft: 10,
      marginTop: 5,
    },
  },
});

export default AddUserView;
