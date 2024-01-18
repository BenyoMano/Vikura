import React, {useState} from 'react';
import {View, Text, Pressable, Animated, ViewStyle, Alert} from 'react-native';
import {DeleteData} from './useDeleteData';
import {DeleteUserModal} from './DeleteUserModal';
import {
  aliasStyle,
  deleteRoom,
  timestampStyle,
  titleStyle,
} from './deleteItemStyles';
import {Icon} from 'react-native-elements';
import {useClipboard} from '@react-native-clipboard/clipboard';

const DeleteItem: React.FC<DeleteData> = ({
  clientUserId,
  alias,
  deleted,
  timestamp,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [clipboardString, setClipboardString] = useClipboard();

  const modalStyle = {
    backgroundColor: '#EEEEEE',
    borderWidth: 3,
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

  const onPress = () => {
    if (!deleted) {
      setModalVisible(!modalVisible);
    }
  };
  const onLongPress = () => {
    setClipboardString(clientUserId);
    Alert.alert(
      'Kopierat UID: ',
      clipboardString,
      [
        {
          text: 'OK',
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      onLongPress={onLongPress}>
      <Animated.View
        style={[
          deleteRoom(deleted),
          modalVisible && modalStyle,
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
        <View style={styles.indicatorContainer}>
          {!deleted ? (
            <View style={styles.indicatorStyle} />
          ) : (
            <Icon
              name="trash-bin-outline"
              type="ionicon"
              color="#696969"
              size={24}
            />
          )}
        </View>
        <View style={styles.cardDetails}>
          <View style={styles.header}>
            <View style={{flexDirection: 'row'}}>
              <Text style={aliasStyle(deleted)}>{alias + ' '}</Text>
              <Text style={titleStyle(deleted)}>begärde radering</Text>
            </View>
            <Text style={timestampStyle(deleted)}>
              {timestamp.toLocaleString([], {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          </View>
          <View>
            <Text style={timestampStyle(deleted)}>UID: {clientUserId}</Text>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = {
  cardDetails: {
    paddingHorizontal: 10,
    width: '91%',
  } as ViewStyle,
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  } as ViewStyle,
  indicatorContainer: {
    width: '12%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  indicatorStyle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: '#CC2020',
  } as ViewStyle,
};

export default DeleteItem;
