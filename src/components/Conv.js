import React from "react";
import { Text, View, FlatList } from 'react-native';
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useNavigation } from "@react-navigation/native";

const DATA = [
    {
        id: '1',
        title: 'First Item',
        text: 'Hej, jag känner såhär bla bla bla bla bla bla bla bla bla bla bla bla bla',
        timeStamp: '12 Jan'
    },
    {
        id: '2',
        title: 'Second Item',
        text: 'Hej, jag känner såhär bla bla bla bla bla bla bla bla bla bla bla bla bla',
        timeStamp: '12 Jan'
    },
    {
        id: '3',
        title: 'Third Item',
        text: 'Hej, jag känner såhär bla bla bla bla bla bla bla bla bla bla bla bla bla',
        timeStamp: '12 Jan'
    },
    {
        id: '4',
        title: 'Fourth Item',
        text: 'Hej, jag känner såhär bla bla bla bla bla bla bla bla bla bla bla bla bla',
        timeStamp: '12 Jan'
    },
    {
        id: '5',
        title: 'Fifth Item',
        text: 'Hej, jag känner såhär bla bla bla bla bla bla bla bla bla bla bla bla bla',
        timeStamp: '12 Jan'
    },
    {
        id: '6',
        title: 'Sixth Item',
        text: 'Hej, jag känner såhär bla bla bla bla bla bla bla bla bla bla bla bla bla',
        timeStamp: '12 Jan'
    },
    {
        id: '7',
        title: 'Seventh Item',
        text: 'Hej, jag känner såhär bla bla bla bla bla bla bla bla bla bla bla bla bla',
        timeStamp: '12 Jan'
    },
    {
        id: '8',
        title: 'Eighth Item',
        text: 'Hej, jag känner såhär bla bla bla bla bla bla bla bla bla bla bla bla bla',
        timeStamp: '12 Jan'
    },
    {
        id: '9',
        title: 'Ninth Item',
        text: 'Hej, jag känner såhär bla bla bla bla bla bla bla bla bla bla bla bla bla',
        timeStamp: '12 Jan'
    },
    {
        id: '10',
        title: 'Tenth Item',
        text: 'Hej, jag känner såhär bla bla bla bla bla bla bla bla bla bla bla bla bla',
        timeStamp: '12 Jan'
    },
    {
        id: '11',
        title: 'Eleventh Item',
        text: 'Hej, jag känner såhär bla bla bla bla bla bla bla bla bla bla bla bla bla',
        timeStamp: '12 Jan'
    },
];

function Item({ title, text, timeStamp }) {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate('Chatt')}>
            <View style={styles.item}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.timeStamp}>{timeStamp}</Text>
                </View>
                <View>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const Conv = () => {

    const renderItem = ({ item }) => (
        <Item title={item.title}
        timeStamp={item.timeStamp}
        text={item.text} />
    );

    return (

        <View style={styles.container}>
            <FlatList
            horizontal={false}
            numColumns={1}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
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
    timeStamp: {
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