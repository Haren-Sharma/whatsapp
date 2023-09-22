import { TextInput } from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import {API,Auth,graphqlOperation} from 'aws-amplify'
import {createMessage,updateChatRoom} from '../../graphql/mutations';

const InputBox = ({chatroom}) => {
  const [msg, setMsg] = useState("");
  const onSend = async() => {
    const authUser=await Auth.currentAuthenticatedUser();
    const newMessage=await API.graphql(graphqlOperation(createMessage,{
      input:{
        chatroomID:chatroom.id,
        text:msg,
        userID:authUser.attributes.sub,
      }
    }))
    //set the message as the last message of the chatroom
    await API.graphql(graphqlOperation(updateChatRoom,{
      input:{
        _version:chatroom._version,
        chatRoomLastMessageId:newMessage.data?.createMessage?.id,
        id:chatroom.id
      }
    }))
    setMsg("");
  };
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <AntDesign name="plus" size={20} color="royalblue" />
      <TextInput
        value={msg}
        onChangeText={(text) => setMsg(text)}
        style={styles.input}
        placeholder="type your message.."
      />
      <MaterialIcons
        onPress={onSend}
        style={styles.send}
        name="send"
        size={16}
        color="white"
      />
    </SafeAreaView>
  );
};

export default InputBox;
