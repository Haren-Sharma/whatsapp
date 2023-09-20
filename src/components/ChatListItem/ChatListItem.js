import { View, Text, Image, Pressable } from "react-native";
import styles from "./styles";
import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";
dayjs.extend(relativetime);

const ChatListItem = ({ chat }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Chat", {
      id: chat.id,
      name: chat.user.name,
    });
  };
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image
        source={{
          uri: chat.user.image,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {chat.user.name}
          </Text>
          <Text style={styles.subTitle}>
            {dayjs(chat.lastMessage.createdAt).fromNow()}
          </Text>
        </View>
        <Text style={styles.subTitle} numberOfLines={2}>
          {chat.lastMessage.text}
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatListItem;
