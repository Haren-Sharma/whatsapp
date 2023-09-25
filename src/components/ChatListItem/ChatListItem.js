import { View, Text, Image, Pressable } from "react-native";
import styles from "./styles";
import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";
dayjs.extend(relativetime);

const ChatListItem = ({ chat, authid }) => {
  const navigation = useNavigation();
  const users = chat?.users?.items;
  const user=users?.find((us)=>{
    if(us.user?.id!==authid){
      return true
    }
  }).user
  const handlePress = () => {
    navigation.navigate("Chat", {
      id: chat.id,
      name: user?.name,
    });
  };
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image
        source={{
          uri: user?.image,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {user?.name}
          </Text>
          <Text style={styles.subTitle}>
            {dayjs(chat?.LastMessage?.createdAt).fromNow(true)}
          </Text>
        </View>
        <Text style={styles.subTitle} numberOfLines={2}>
          {chat?.LastMessage?.text}
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatListItem;
