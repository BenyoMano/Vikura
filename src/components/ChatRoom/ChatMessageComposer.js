import React from "react";
import { View, StyleSheet } from "react-native";
import InputBarChatt from "./InputbarChat";
import SendButton from "./SendButton";
import handleSendMessage from "./handleSendMessage";

const ChatMessageComposer = ({messageToSend, setMessageToSend, isCurrentUserKurator, user, refPath, roomId}) => {
    return (
        <View style={styles.viewStyle}>
            <InputBarChatt messageToSend={messageToSend} setMessageToSend={setMessageToSend} />
            <SendButton 
                title="Skicka"
                onPress={() => {
                handleSendMessage({isCurrentUserKurator, messageToSend, user, refPath, roomId});
                setMessageToSend('');
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '88%',
        marginBottom: '6%',
    }
})
export default ChatMessageComposer;