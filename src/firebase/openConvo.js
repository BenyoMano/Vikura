import allRoomNames from './allRoomNames';
import getConvRefPath from './getConvRefPath';

const openConvo = async ({convos, setConvos, setConvRefPath, setIsLoaded}) => {

  const rumNamn = await allRoomNames();

  const newConvos = [];

  getConvRefPath({newConvos, setConvRefPath, rumNamn, setConvos, setIsLoaded})

  console.log('Convos :', convos)

};

export default openConvo;