import {showMessage} from 'react-native-flash-message';

export const useDynamicErrorHandling = ({
  error,
  clientId,
  subject,
  setDelFinished,
}) => {
  console.error('Error deleting room: ', error);
  showMessage({
    message: 'Ojdå! Något gick fel :(',
    description: String(
      `När ${subject} för klient-ID ${clientId} skulle raderas: \n` + error,
    ),
    type: 'danger',
    autoHide: false,
    position: 'bottom',
    floating: true,
    icon: 'danger',
  });
  setDelFinished('failed');
};

export const useGeneralErrorHandling = ({error, setDelFinished}) => {
  showMessage({
    message: 'Ojdå! Något gick fel :(',
    description: String(error.message),
    type: 'danger',
    autoHide: false,
    position: 'bottom',
    floating: true,
    icon: 'danger',
  });
  setDelFinished('failed');
};
