import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ChatListItem from "../../components/ChatListItem/ChatListItem";
import styles from "./styles";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { GetUserChatRooms } from "./queries";
import { useIsFocused } from "@react-navigation/native";

const ChatsScreen = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const isfocussed=useIsFocused();
  const fetchChatRooms = async () => {
    setLoading(true);
    const authUser = await Auth.currentAuthenticatedUser();
    const chatrooms = await API.graphql(
      graphqlOperation(GetUserChatRooms, {
        id: authUser.attributes.sub,
      })
    );
    const sorted = chatrooms.data?.getUser?.ChatRooms?.items || [];
    sorted.sort(
      (r1, r2) =>
        new Date(r2.chatRoom.updatedAt) - new Date(r1.chatRoom.updatedAt)
    );
    setChats(sorted);
    setLoading(false);
  };

  useEffect(() => {
    fetchChatRooms();
  }, [isfocussed]);

  return (
    <View>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatListItem key={item.chatRoom.id} chat={item.chatRoom} />}
        style={styles.list}
        onRefresh={fetchChatRooms}
        refreshing={loading}
      />
    </View>
  );
};

export default ChatsScreen;
