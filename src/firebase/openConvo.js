import allRoomNames from './allRoomNames';
import getConvRefPath from './getConvRefPath';

const openConvo = async ({setConvos, setIsLoaded}) => {
  const newConvos = [];
  const roomNames = await allRoomNames();
  getConvRefPath({newConvos, roomNames})
  setConvos(newConvos)
  setIsLoaded(true);
};

export default openConvo;

