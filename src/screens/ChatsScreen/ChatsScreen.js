import { View, Text, FlatList } from "react-native";
import React from "react";
import chats from "../../../assets/data/chats.json";
import ChatListItem from "../../components/ChatListItem/ChatListItem";
import styles from "./styles";

const ChatsScreen = () => {
  return (
    <View>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatListItem chat={item} />}
        style={styles.list}
      />
    </View>
  );
};

export default ChatsScreen;
