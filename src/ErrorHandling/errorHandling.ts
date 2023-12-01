import {showMessage, Position} from 'react-native-flash-message';

interface ErrorHandlingProps {
  error: Error;
  position?: 'top' | 'bottom' | 'center';
  subject?: string;
  userId?: string;
  clientId?: string;
  setActionFinished?: (status: string) => void;
   
}

export const useDynamicAddUserErrorHandling = ({error, subject, userId}: ErrorHandlingProps) => {
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
}: ErrorHandlingProps) => {
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
  setActionFinished && setActionFinished('failed');
};

export const useGeneralErrorHandling = ({
  error,
  position,
}: ErrorHandlingProps) => {
  showMessage({
    message: 'Ojdå! Något gick fel :(',
    description: String(error.message),
    type: 'danger',
    autoHide: false,
    position: position as Position,
    floating: true,
    icon: 'danger',
  });
};
