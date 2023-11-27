import React, {createContext, useState} from 'react';
import {useContext} from 'react';

const FontSizeContext = createContext();

export const FontSizeProvider = ({children}) => {
  const [fontSize, setFontSize] = useState(14);
  const updateFontSize = newSize => {
    setFontSize(newSize);
  };

  return (
    <FontSizeContext.Provider value={{fontSize, updateFontSize}}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  return useContext(FontSizeContext);
};
