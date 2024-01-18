import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ViewStyle,
  Text,
  TextStyle,
  ScrollView,
} from 'react-native';
import SmallButton from '../../../atoms/SmallButton';
import {updateIssue} from '../../../firebase/UserManagement/Issue/updateIssue';

type IssueMessageModalProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  fixed: boolean;
  docId: string;
};

const IssueMessageModal: React.FC<IssueMessageModalProps> = ({
  modalVisible,
  setModalVisible,
  message,
  fixed,
  docId,
}) => {
  const onFixed = () => {
    updateIssue({docId});
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
          <Text style={styles.header}>Meddelande:</Text>
          <View style={styles.messageContainer}>
            <ScrollView>
              <Text style={styles.text}>{message}</Text>
            </ScrollView>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <SmallButton
            title="Tillbaka"
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
          {!fixed ? <SmallButton title="Fixad" onPress={onFixed} /> : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: '50%',
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
    justifyContent: 'space-between',
  } as ViewStyle,
  textContainer: {
    paddingVertical: 20,
    maxHeight: '80%',
  } as ViewStyle,
  messageContainer: {
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
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
    fontSize: 16,
  } as TextStyle,
});

export default IssueMessageModal;
