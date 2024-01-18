import React, {useState} from 'react';
import {FlatList, StyleSheet, TextStyle, View} from 'react-native';
import SettingsMenuBlock from './SettingsMenuBlock';
import {useSettingsMenu} from './useSettingsMenu';
import BackArrow from './BackArrow';

const SettingsMenu = ({settingsLevel, setSettingsLevel}) => {
  const [showBackArrow, setShowBackArrow] = useState(false);

  const {settingsBlock} = useSettingsMenu({
    settingsLevel,
    setSettingsLevel,
  });

  const BlockItem = ({item}) => {
    return (
      <SettingsMenuBlock
        name={item.name}
        type={item.type}
        text={item.text}
        iconColor={item.iconColor}
        textColor={item.textColor}
        onPress={item.onPress}
        setShowBackArrow={setShowBackArrow}
        settingsLevel={settingsLevel}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backArrowContainer}>
        {showBackArrow ? (
          <BackArrow
            setSettingsLevel={setSettingsLevel}
            setShowBackArrow={setShowBackArrow}
          />
        ) : null}
      </View>
      <FlatList data={settingsBlock} renderItem={BlockItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  backArrowContainer: {
    width: '13%',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'black',
  } as TextStyle,
});

export default SettingsMenu;
