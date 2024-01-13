import {showMessage, Position} from 'react-native-flash-message';
import {ActionState} from '../components/KuratorOffice/DeleteUser/DeleteButton/DeleteUserButton';

interface ErrorHandlingProps {
  error: Error;
  position?: 'top' | 'bottom' | 'center';
  subject?: string;
  userId?: string;
  clientUserId?: string;
  setActionFinished?: React.Dispatch<React.SetStateAction<ActionState>>;
}

export const useDynamicAddUserErrorHandling = ({
  error,
  subject,
  userId,
}: ErrorHandlingProps) => {
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
  clientUserId,
  subject,
  setActionFinished,
}: ErrorHandlingProps) => {
  showMessage({
    message: 'Ojdå! Något gick fel :(',
    description: String(
      `När ${subject} för klient-ID ${clientUserId} skulle raderas: \n` + error,
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
