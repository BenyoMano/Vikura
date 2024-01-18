import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import CopyButton from './CopyButton';
import {UserDetails} from '../../firebase/userDetails';

type ClipboardHandlerProps = {
  clipboardString: string;
  setClipboardString: React.Dispatch<React.SetStateAction<string>>;
  userDetails: UserDetails;
};

const ClipboardHandler = ({
  clipboardString,
  setClipboardString,
  userDetails,
}): ClipboardHandlerProps => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      Alert.alert(
        'Kopierat till ditt ClipBoard: ',
        clipboardString,
        [
          {
            text: 'OK',
          },
        ],
        {
          cancelable: true,
        },
      );
      setShowAlert(false);
    }
  }, [clipboardString, showAlert]);

  return (
    <CopyButton
      onPress={() => {
        setClipboardString(
          '\n' +
            userDetails.firstName +
            ' ' +
            userDetails.secondName +
            '\n' +
            userDetails.mail +
            '\n' +
            userDetails.personNummer,
        );
        setShowAlert(true);
      }}
    />
  );
};
export default ClipboardHandler;
