import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';

export const useTextSizing = () => {
  const [size, setSize] = useState(16);

  useEffect(() => {}, []);
  return {size};
};
