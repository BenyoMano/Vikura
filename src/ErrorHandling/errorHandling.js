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
    position: 'top',
    floating: true,
    icon: 'danger',
  });
};

export const useDynamicDeleteUserErrorHandling = ({
  error,
  clientId,
  subject,
  setActionFinished,
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
  setActionFinished('failed');
};

export const useGeneralErrorHandling = ({error, position}) => {
  showMessage({
    message: 'Ojdå! Något gick fel :(',
    description: String(error.message),
    type: 'danger',
    autoHide: false,
    position: String(position),
    floating: true,
    icon: 'danger',
  });
};
