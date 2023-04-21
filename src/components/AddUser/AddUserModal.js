import React from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import createUser from './createUser';
import SmallButton from '../../atoms/SmallButton';

export const AddUserModal = ({
    modalVisible,
    setModalVisible,
    userPropToAdd,
    setUserPropToAdd,
    checkboxState,
    setCheckboxState,
    setSubmitted,
    setHasAddedUser,
}) => {
    const {textStyling, viewStyle} = styles;
    const showIfKurator = checkboxState ? 'JA' : 'NEJ';

    return (
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
    );
}

const styles = StyleSheet.create({
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