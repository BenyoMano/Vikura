import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGeneralErrorHandling} from '../../../ErrorHandling/errorHandling';

type FontSizeContextProps = {
  fontSize: number;
  updateFontSize: (newSize: number) => void;
};

const FontSizeContext = createContext<FontSizeContextProps | undefined>(
  undefined,
);

type FontSizeProviderProps = {
  children: ReactNode;
};

export const FontSizeProvider: React.FC<FontSizeProviderProps> = ({
  children,
}) => {
  const [fontSize, setFontSize] = useState<number>(14);
  const updateFontSize = async (newSize: number) => {
    setFontSize(+newSize);
    try {
      await AsyncStorage.setItem('@fontSize', newSize.toString());
    } catch (error) {
      useGeneralErrorHandling({error, position: 'top'});
    }
  };

  const loadFontSize = async () => {
    try {
      const size = await AsyncStorage.getItem('@fontSize');
      if (size !== null) {
        setFontSize(+size);
      }
    } catch (error) {
      useGeneralErrorHandling({error, position: 'top'});
    }
  };

  useEffect(() => {
    loadFontSize();
  }, []);

  return (
    <FontSizeContext.Provider value={{fontSize, updateFontSize}}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = (): FontSizeContextProps => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};
