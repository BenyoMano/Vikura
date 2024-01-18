import {TextStyle, ViewStyle} from 'react-native';

export const deleteRoom = (deleted: boolean) => {
  return {
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: !deleted ? '#329DFF' : '#696969',
    backgroundColor: !deleted ? 'white' : '#EEEEEE',
    overflow: 'visible',
  } as ViewStyle;
};

export const aliasStyle = (deleted: boolean) => {
  return {
    fontSize: 15,
    color: !deleted ? 'black' : '#696969',
    fontFamily: 'NunitoSans-Italic',
    paddingBottom: 8,
  } as TextStyle;
};

export const titleStyle = (deleted: boolean) => {
  return {
    fontSize: 15,
    color: !deleted ? 'black' : '#696969',
    fontFamily: 'NunitoSans-Regular',
    paddingBottom: 8,
  } as TextStyle;
};
export const timestampStyle = (deleted: boolean) => {
  return {
    fontSize: 12,
    color: !deleted ? 'black' : '#696969',
    paddingTop: 3,
  } as TextStyle;
};
