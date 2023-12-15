import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGeneralErrorHandling} from '../../../ErrorHandling/errorHandling';

type BubbleColorContextProps = {
  colorCodes: ColorCode;
  backgroundColorSend: string;
  backgroundColorRecieve: string;
  backgroundColorId: number;
  updateBackgroundColorId: (newColorId: number) => void;
};

const BubbleColorContext = createContext<BubbleColorContextProps | undefined>(
  undefined,
);

type BubbleColorProvider = {
  children: ReactNode;
};

type ColorCode = {
  [key: string]: {
    send: string;
    receive: string;
  };
};

export const BubbleColorProvider: React.FC<BubbleColorProvider> = ({
  children,
}) => {
  const [backgroundColorId, setBackgroundColorId] = useState<number>(1);
  const updateBackgroundColorId = async (newColorId: number) => {
    setBackgroundColorId(+newColorId);
    try {
      await AsyncStorage.setItem('@bubbleColor', newColorId.toString());
    } catch (error) {
      useGeneralErrorHandling({error, position: 'top'});
    }
  };

  const loadBackgroundColorId = async () => {
    try {
      const id = await AsyncStorage.getItem('@bubbleColor');
      if (id !== null) {
        setBackgroundColorId(+id);
      }
    } catch (error) {
      useGeneralErrorHandling({error, position: 'top'});
    }
  };

  const colorCodes: ColorCode = {
    colorCode1: {
      send: '#8CA0F5',
      receive: '#F4D554',
    },
    colorCode2: {
      send: '#9DE3BC',
      receive: '#EB95C5',
    },
    colorCode3: {
      send: '#EC9BB4',
      receive: '#9BECD3',
    },
  };

  const backgroundColorSend =
    backgroundColorId === 1
      ? colorCodes.colorCode1.send
      : backgroundColorId === 2
      ? colorCodes.colorCode2.send
      : backgroundColorId === 3
      ? colorCodes.colorCode3.send
      : '';

  const backgroundColorRecieve =
    backgroundColorId === 1
      ? colorCodes.colorCode1.receive
      : backgroundColorId === 2
      ? colorCodes.colorCode2.receive
      : backgroundColorId === 3
      ? colorCodes.colorCode3.receive
      : '';

  useEffect(() => {
    loadBackgroundColorId();
  }, []);

  return (
    <BubbleColorContext.Provider
      value={{
        colorCodes,
        backgroundColorSend,
        backgroundColorRecieve,
        backgroundColorId,
        updateBackgroundColorId,
      }}>
      {children}
    </BubbleColorContext.Provider>
  );
};

export const useBubbleColor = (): BubbleColorContextProps => {
  const context = useContext(BubbleColorContext);
  if (!context) {
    throw new Error('useBubbleColor must be used within a BubbleColorProvider');
  }
  return context;
};
