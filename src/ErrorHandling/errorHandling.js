import {showMessage} from 'react-native-flash-message';

export const useDynamicAddUserErrorHandling = ({error, subject, userId}) => {
  console.error('Error skapa användare: ', error);
  showMessage({
    message: 'Ojdå! Något gick fel :(',
    description: String(
      `Kunde inte ${subject} för klient-ID ${userId}: \n` + error,
    ),
    type: 'danger',
    autoHide: false,
    position: 'bottom',
    floating: true,
    icon: 'danger',
  });
};

export const useDynamicDeleteUserErrorHandling = ({
  error,
  clientId,
  subject,
  setactionFinished,
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
  setactionFinished('failed');
};

export const useGeneralErrorHandling = ({error, setactionFinished}) => {
  showMessage({
    message: 'Ojdå! Något gick fel :(',
    description: String(error.message),
    type: 'danger',
    autoHide: false,
    position: 'bottom',
    floating: true,
    icon: 'danger',
  });
  setactionFinished('failed');
};
