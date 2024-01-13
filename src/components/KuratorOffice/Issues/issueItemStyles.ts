import {TextStyle, ViewStyle} from 'react-native';

export const issueRoom = (fixed: boolean) => {
  return {
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: !fixed ? '#329DFF' : '#696969',
    backgroundColor: !fixed ? 'white' : '#EEEEEE',
    overflow: 'visible',
  } as ViewStyle;
};

export const aliasStyle = (fixed: boolean) => {
  return {
    fontSize: 15,
    color: !fixed ? 'black' : '#696969',
    fontFamily: 'NunitoSans-Italic',
    paddingBottom: 8,
  } as TextStyle;
};

export const messageStyle = (fixed: boolean) => {
  return {
    fontSize: 12,
    color: !fixed ? 'black' : '#696969',
    fontFamily: 'NunitoSans-Bold',
    paddingBottom: 8,
  } as TextStyle;
};
export const timestampStyle = (fixed: boolean) => {
  return {
    fontSize: 12,
    color: !fixed ? 'black' : '#696969',
    paddingTop: 3,
  } as TextStyle;
};
