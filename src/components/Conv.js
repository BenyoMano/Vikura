import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from 'react-native';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';


const Conv = () => {
    const [convos, setConvos] = useState([]);

    useEffect(() => {
    const openConvo = async () => {
        const firebaseConvos = await firestore().collection('rooms').get();
        const newConvos = firebaseConvos.docs.map(firebaseConvos => ({
            timestamp: firebaseConvos.data().userRef,
            //text: firebaseConvos.data(),
            alias: firebaseConvos.data().users.client.alias,
        }));
        setConvos(newConvos)
    }
openConvo();
}, []) 

function Item({ alias, text, timestamp }) {
    const navigation = useNavigation();
    console.log('Alias:', timestamp)
    return (
        <Pressable onPress={() => navigation.navigate('Chatt')}>
            <View style={styles.item}>
                <View style={styles.header}>
                    <Text style={styles.title}>{alias}</Text>
                    <Text style={styles.timestamp}>{timestamp}</Text>
                </View>
                <View>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        </Pressable>
    );
}
    const renderItem = ({ item }) => (
        <Item 
        alias={item.alias}
        timeStamp={item.timestamp}
        text={item.text} 
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
            horizontal={false}
            numColumns={1}
            data={convos}
            renderItem={renderItem}
            keyExtractor={item => item.timestamp}
            />
        </View>
    );
}

const styles = {
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    container: {
        flex: 1,
        width: 'auto',
        marginTop: 55,
        marginBottom: 5,
        backgroundColor: 'black',
        borderRadius: 25,
        overflow: 'hidden',
    },
    title: {
        fontSize: 22,
        color: 'black',
        fontFamily: 'NunitoSans-Regular',
        paddingBottom: 5,
    },
    timestamp: {
        fontSize: 14,
        color: 'black',
        paddingTop: 5,
    },
    text: {
        fontSize: 14,
        color: 'black',
        fontFamily: 'NunitoSans-Regular',
    },
    item: {
        padding: 15,
        marginHorizontal: 0,
        marginVertical: 0,
        backgroundColor: '#EEEEEE',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderBottomColor: 'black',
    }
};

export default Conv;