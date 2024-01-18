import {useEffect, useState} from 'react';
import {SettingsLevel} from './UserSettingsScreen';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../../../../App';

type SettingsBlockProps = {
  name: string;
  type: string;
  text: string;
  iconColor?: string;
  textColor?: string;
  onPress: () => void;
};
type SettingsMenuProps = {
  settingsLevel: SettingsLevel;
  setSettingsLevel: React.Dispatch<React.SetStateAction<SettingsLevel>>;
};

export const useSettingsMenu = ({
  settingsLevel,
  setSettingsLevel,
}: SettingsMenuProps) => {
  const [settingsBlock, setSettingsBlock] = useState<
    SettingsBlockProps[] | null
  >(null);

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const createLevelSettings = [
    {
      name: 'person',
      type: 'octicon',
      text: 'Konto',
      onPress: () => setSettingsLevel('account'),
    },
    {
      name: 'headphones',
      type: 'feather',
      text: 'Hjälpcenter',
      onPress: () => setSettingsLevel('helpcenter'),
    },
    {
      name: 'document-text-outline',
      type: 'ionicon',
      text: 'Användarvilkor & sekretesspolicy',
      onPress: () => setSettingsLevel('eulaAndPolicy'),
    },
  ];
  const createLevelAccount = [
    {
      name: 'person',
      type: 'octicon',
      text: 'Alias & Lösenord',
      onPress: () => navigation.navigate('ChangeAliasPasswordScreen'),
    },
    {
      name: 'delete-forever',
      type: 'material-icons',
      text: 'Begär radering av kontot',
      iconColor: 'red',
      textColor: 'red',
      onPress: () => navigation.navigate('RequestDeleteScreen'),
    },
  ];
  const createLevelHelpcenter = [
    {
      name: 'alert-circle-outline',
      type: 'ionicon',
      text: 'Jag har problem med appen',
      iconColor: 'red',
      onPress: () =>
        navigation.navigate('HelpcenterScreen', {settingsChoice: 'problem'}),
    },
    {
      name: 'head-lightbulb-outline',
      type: 'material-community',
      text: 'Jag har en åsikt om appen',
      onPress: () =>
        navigation.navigate('HelpcenterScreen', {settingsChoice: 'opinion'}),
    },
  ];
  const createLevelPolicy = [
    {
      name: 'document-text-outline',
      type: 'ionicon',
      text: 'Användarvilkor',
      onPress: () =>
        navigation.navigate('EulaAndPolicyScreen', {settingsChoice: 'eula'}),
    },
    {
      name: 'document-text-outline',
      type: 'ionicon',
      text: 'Sekretesspolicy',
      onPress: () =>
        navigation.navigate('EulaAndPolicyScreen', {settingsChoice: 'policy'}),
    },
  ];
  useEffect(() => {
    if (settingsLevel === 'settings') {
      setSettingsBlock(createLevelSettings);
    }
    if (settingsLevel === 'account') {
      setSettingsBlock(createLevelAccount);
    }
    if (settingsLevel === 'helpcenter') {
      setSettingsBlock(createLevelHelpcenter);
    }
    if (settingsLevel === 'eulaAndPolicy') {
      setSettingsBlock(createLevelPolicy);
    }
  }, [settingsLevel]);

  return {settingsBlock};
};
