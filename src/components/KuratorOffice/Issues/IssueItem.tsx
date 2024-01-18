import React, {useState} from 'react';
import {View, Text, Pressable, Animated, ViewStyle, Alert} from 'react-native';
import {IssueData} from './useIssueData';
import {Icon} from 'react-native-elements';
import {useClipboard} from '@react-native-clipboard/clipboard';
import {
  issueRoom,
  aliasStyle,
  timestampStyle,
  messageStyle,
} from './issueItemStyles';
import IssueMessageModal from './IssueMessageModal';

const IssueItem: React.FC<IssueData> = ({
  clientUserId,
  mail,
  category,
  timestamp,
  message,
  fixed,
  docId,
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
    setModalVisible(!modalVisible);
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
          issueRoom(fixed),
          modalVisible && modalStyle,
          {
            opacity: opacityAnimation,
          },
        ]}>
        {modalVisible && (
          <IssueMessageModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            message={message}
            docId={docId}
            fixed={fixed}
          />
        )}
        <View style={styles.indicatorContainer}>
          {!fixed ? (
            <View style={styles.indicatorStyle} />
          ) : (
            <Icon
              name="checkmark-circle"
              type="ionicon"
              color="#696969"
              size={24}
            />
          )}
        </View>
        <View style={styles.cardDetails}>
          <View style={styles.header}>
            <Text style={aliasStyle(fixed)}>{mail + ' '}</Text>
            <Text style={timestampStyle(fixed)}>
              {timestamp.toLocaleString([], {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          </View>
          <View>
            <Text style={timestampStyle(fixed)}>UID: {clientUserId}</Text>
          </View>
          <View>
            <Text style={messageStyle(fixed)}>
              {message.length < 30 ? message : message.substring(0, 30) + '...'}
            </Text>
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

export default IssueItem;
