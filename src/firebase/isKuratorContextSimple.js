import { createContext, useContext, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useEffect } from "react";

export const IsKuratorContext = createContext(undefined);

// export const IsKuratorProvider = ({ children }) => {
//     const [isKurator, setIsKurator] = useState(undefined)
//     const user = auth().currentUser;

//         const getKurator = async () => {
//             const fetchKurator = await firestore()
//                 .collection('Users')
//                 .doc(user.uid)
//                 .get();
//             const kurator = fetchKurator.get('kurator');
//             setIsKurator(kurator);
//         };


// }
// export const useIsKurator = () => useContext(IsKuratorContext)