import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ViewStyle,
  Text,
  TextStyle,
  Platform,
  Linking,
} from 'react-native';
import UpdateButton from './UpdateButton';

type UpdateModalProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  mustUpdate?: boolean;
};

const UpdateModal: React.FC<UpdateModalProps> = ({
  modalVisible,
  setModalVisible,
  mustUpdate,
}) => {
  const onPress = () => {
    if (Platform.OS === 'android') {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.omnitalk',
      );
    }
    if (Platform.OS === 'ios') {
      Linking.openURL(
        'https://apps.apple.com/us/app/vikura-by-omnivation-group-ab/id6475302193',
      );
    }
    setModalVisible(!modalVisible);
  };
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>Det finns en ny uppdatering!</Text>
          <View style={styles.messageContainer}>
            <Text style={styles.text}>Vill du ladda ned den nu?</Text>
          </View>
        </View>
        <View
          style={[
            styles.buttonContainer,
            {
              justifyContent: mustUpdate ? 'center' : 'space-between',
            },
          ]}>
          {!mustUpdate && (
            <UpdateButton
              title="Senare"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          )}
          <UpdateButton title="Ta mig dit" onPress={onPress} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: '60%',
    paddingHorizontal: 25,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 30,
    elevation: 30,
  } as ViewStyle,
  buttonContainer: {
    flexDirection: 'row',
  } as ViewStyle,
  textContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  } as ViewStyle,
  messageContainer: {
    paddingVertical: 10,
    borderRadius: 12,
  } as ViewStyle,
  header: {
    color: 'black',
    fontFamily: 'NunitoSans-Bold',
    fontSize: 18,
    marginBottom: 20,
  } as TextStyle,
  text: {
    color: 'black',
    fontFamily: 'NunitoSans-Regular',
    fontSize: 18,
  } as TextStyle,
});

export default UpdateModal;
