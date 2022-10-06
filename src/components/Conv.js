import React, { useCallback, useEffect, useState } from "react";
import { Text, View, FlatList, RefreshControl } from 'react-native';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
//import { RouteProp } from '@react-navigation/native';


const Conv = () => {
    const [convos, setConvos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const openConvo = async () => {

    const getRoomName = await firestore().collection('rooms').where('users.client.uid', '!=', '').get();
    const newConvos = [];
        getRoomName.docs.map(d => {
            const splitRef = d.ref.path.split('/');
            const last = splitRef[splitRef.length -1];
            const docPath = firestore().collection('rooms').doc(last).collection('messages');
            
            docPath.orderBy('timestamp').limitToLast(1).onSnapshot(a => {
                a.docs.forEach(b => {
                    console.log('msgUID', b.data().uid)
                    newConvos.push ({
                    timestamp: b.data().timestamp.toDate(),
                    text: b.data().msg,
                    alias: b.data().author,
                    uid: b.data().uid
                })})
                setConvos(newConvos);
            });
        });
    }

    useEffect(() => {
        openConvo();
        return () => openConvo();
    }, []) 

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        console.log('Refreshing...')
        openConvo()
        setRefreshing(false);
        console.log('--refreshed--')
    }, [refreshing]);

function Item({ alias, text, timestamp, uid }) {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate('Chatt', {id: uid})}>
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
        timestamp={item.timestamp.toLocaleString()}
        text={item.text} 
        uid={item.uid}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
            horizontal={false}
            numColumns={1}
            data={convos/* .sort((b, a) => a.alias < b.alias) */} //a.timestamp.localeCompare(b.timestamp)
            renderItem={renderItem}
            keyExtractor={item => item.alias}
            refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh} />
            }
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
        backgroundColor: 'white',
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