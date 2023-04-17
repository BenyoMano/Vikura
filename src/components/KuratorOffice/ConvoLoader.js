import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {useWindowDimensions} from 'react-native';

const ConvoLoader = () => {
  const {width, height} = useWindowDimensions();

  return (
    <ContentLoader
      speed={1}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#EEEEEE"
      foregroundColor="#dedede">
      <Rect x="0" y="0" rx="0" ry="0" width={width} height="84" />
      <Rect x="0" y="86" rx="0" ry="0" width={width} height="84" />
      <Rect x="0" y={2 * 86} rx="0" ry="0" width={width} height="84" />
      <Rect x="0" y={3 * 86} rx="0" ry="0" width={width} height="84" />
      <Rect x="0" y={4 * 86} rx="0" ry="0" width={width} height="84" />
      <Rect x="0" y={5 * 86} rx="0" ry="0" width={width} height="84" />
      <Rect x="0" y={6 * 86} rx="0" ry="0" width={width} height="84" />
      <Rect x="0" y={7 * 86} rx="0" ry="0" width={width} height="84" />
      <Rect x="0" y={8 * 86} rx="0" ry="0" width={width} height="84" />
      <Rect x="0" y={9 * 86} rx="0" ry="0" width={width} height="84" />
    </ContentLoader>
  );
};
export default ConvoLoader;
