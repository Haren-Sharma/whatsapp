import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ChatListItem from "../../components/ChatListItem/ChatListItem";
import styles from "./styles";
import { API, graphqlOperation,Auth } from "aws-amplify";
import {GetUserChatRooms} from './queries'

const ChatsScreen = () => {  
  const [chats,setChats]=useState([]);
  const [authUserId,setId]=useState('');
  useEffect(()=>{
    const syncData=async()=>{
      const authUser=await Auth.currentAuthenticatedUser();
      const chatrooms=await API.graphql(graphqlOperation(GetUserChatRooms,{
        id:authUser.attributes.sub
      }))
      setChats(chatrooms.data?.getUser?.ChatRooms?.items)
      setId(authUser.attributes.sub)
    }
    syncData();
  },[])
  return (
    <View>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatListItem chat={item.chatRoom} authid={authUserId}/>}
        style={styles.list}
      />
    </View>
  );
};

export default ChatsScreen;
