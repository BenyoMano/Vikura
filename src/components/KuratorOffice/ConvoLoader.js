import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

  const ConvoLoader = () => {
    return (    
     <ContentLoader
        speed={1} 
        width={410}
        height={686}
        viewBox='0 0 410 686'
        backgroundColor='#EEEEEE'
        foregroundColor='#dedede'>
        <Rect x="0" y="0" rx="0" ry="0" width="410" height="84" />
        <Rect x="0" y="86" rx="0" ry="0" width="410" height="84" />
        <Rect x="0" y={2*86} rx="0" ry="0" width="410" height="84" />
        <Rect x="0" y={3*86} rx="0" ry="0" width="410" height="84" />
        <Rect x="0" y={4*86} rx="0" ry="0" width="410" height="84" />
        <Rect x="0" y={5*86} rx="0" ry="0" width="410" height="84" />
        <Rect x="0" y={6*86} rx="0" ry="0" width="410" height="84" />
        <Rect x="0" y={7*86} rx="0" ry="0" width="410" height="84" />
      </ContentLoader>)
  }
export default ConvoLoader;
