import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { showMessage } from "react-native-flash-message";

const getRoomName = async ({ clientUserId }) => {
  
  const roomName = await firestore().collection("rooms").where("users.client.id", "==", clientUserId).get();
  
  try {
    roomName;
  } catch (error) {
    showMessage({
      message: "Varning!",
      description: String(error),
      type: "danger",
      duration: 3200,
    });
  }
  return roomName?.docs[0];
};


export const useRoomId = (clientUserId) => {
  const [roomId, setRoomId] = useState();

  useEffect(() => {
    const fetchRoom = async () => {
      const roomName = await getRoomName({ clientUserId });
      console.log('roomName', roomName);
      console.log('roomName.id', roomName.id);
      const newRoomId = roomName?.id;
      console.log('newRoomId', newRoomId);
      setRoomId(newRoomId);
    };

    fetchRoom();
  }, [clientUserId]);
  console.log('useRoomId', roomId);
  return roomId;
};
