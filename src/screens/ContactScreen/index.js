import { View,FlatList } from "react-native";
import React from "react";
import chats from "../../../assets/data/chats.json";
import styles from "./styles";
import ContactListItem from "../../components/ContactListItem";

const Contacts = () => {
  return (
    <View>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ContactListItem data={item} />}
        style={styles.list}
      />
    </View>
  );
};

export default Contacts;
