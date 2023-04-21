import React, {useEffect, useState} from "react";
import { Alert } from "react-native";
import CopyButton from './CopyButton';

const ClipboardHandler = ({clipboardString, setClipboardString, userDetails}) => {
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