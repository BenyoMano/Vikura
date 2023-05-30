import { useState, useEffect } from "react";
import getRoomName from "./roomName";

export const useRoomId = (clientUserId) => {
  const [roomId, setRoomId] = useState();

  useEffect(() => {
    const fetchRoom = async () => {
      const roomName = await getRoomName({ clientUserId });
      const newRoomId = roomName.docs.id;
      setRoomId(newRoomId);
    };

    fetchRoom();
  }, []);
  return roomId;
};
