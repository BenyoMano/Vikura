import allRoomNames from './allRoomNames';
import getConvRefPath from './getConvRefPath';

const openConvo = async ({convos, setConvos, setConvRefPath}) => {

  const rumNamn = await allRoomNames();

  const newConvos = [];

  getConvRefPath({newConvos, setConvRefPath, rumNamn, setConvos})

  console.log('Convos :', convos)

};

export default openConvo;