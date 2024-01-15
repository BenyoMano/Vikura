import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';

type UseAppVersion = {
  shouldUpdate: boolean | undefined;
  mustUpdate: boolean | undefined;
};

export const useAppVersion = (): UseAppVersion => {
  const [shouldUpdate, setShouldUpdate] = useState<boolean>();
  const [mustUpdate, setMustUpdate] = useState<boolean>();
  const localVersion = Number(DeviceInfo.getVersion());

  const getAppVersion = async () => {
    const versionDoc = await firestore()
      .collection('appData')
      .doc('document')
      .get();

    const versionFieldValue = versionDoc.get('app-version');
    const minVersionFieldValue = versionDoc.get('force-update');
    if (typeof minVersionFieldValue === 'number') {
      if (minVersionFieldValue > localVersion) {
        setMustUpdate(true);
      } else {
        setMustUpdate(false);
      }
    }
    if (typeof versionFieldValue === 'number') {
      if (versionFieldValue > localVersion) {
        setShouldUpdate(true);
      } else {
        setShouldUpdate(false);
      }
    }
  };
  useEffect(() => {
    getAppVersion();
  }, []);
  return {shouldUpdate, mustUpdate};
};
