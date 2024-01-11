import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {IssueData} from './useIssueData';
import {DeleteUserModal} from './DeleteUserModal';

const IssueItem: React.FC<IssueData> = ({
  clientUserId,
  alias,
  deleted,
  timestamp,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const modalStyle = {
    backgroundColor: modalVisible ? 'lightgrey' : 'white',
  } as ViewStyle;

  const opacityAnimation = new Animated.Value(1);
  const fadeIn = () => {
    Animated.timing(opacityAnimation, {
      toValue: 0.5,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      onLongPress={() => {
        setModalVisible(!modalVisible);
      }}>
      <Animated.View
        style={[
          styles.conversationRoom.item,
          modalStyle,
          {
            opacity: opacityAnimation,
          },
        ]}>
        {modalVisible && (
          <DeleteUserModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            clientUserId={clientUserId}
          />
        )}
        <View
          style={{
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 50,
              backgroundColor: '#CC2020',
            }}
          />
        </View>
        <View style={{paddingHorizontal: 10}}>
          <View style={styles.header}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.alias}>{alias + ' '}</Text>
              <Text style={styles.title}>begärde radering</Text>
            </View>
            <Text style={styles.timestamp}>{timestamp.toLocaleString()}</Text>
          </View>
          <View>
            <Text style={styles.timestamp}>UID: {clientUserId}</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  } as ViewStyle,
  alias: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'NunitoSans-Italic',
    paddingBottom: 5,
  } as TextStyle,
  title: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'NunitoSans-Regular',
    paddingBottom: 5,
  } as TextStyle,
  timestamp: {
    fontSize: 12,
    color: 'black',
    paddingTop: 3,
  } as TextStyle,
  isDeleted: {
    text: {
      fontSize: 14,
      color: 'black',
      fontFamily: 'NunitoSans-Regular',
    } as TextStyle,
  },
  isNotDeleted: {
    text: {
      fontSize: 14,
      color: 'black',
      fontFamily: 'NunitoSans-Bold',
    } as TextStyle,
  },
  conversationRoom: {
    item: {
      flexDirection: 'row',
      position: 'relative',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderWidth: 2,
      borderRadius: 12,
      borderColor: '#329DFF',
      zIndex: 1,
      elevation: 1,
      overflow: 'visible',
    } as ViewStyle,
  },
};

export default IssueItem;
