import { View, Text, Image, Pressable } from "react-native";
import styles from "./styles";
import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { onUpdateChatRoom } from "../../graphql/subscriptions";
import { useEffect } from "react";
dayjs.extend(relativetime);

const ChatListItem = ({ chat }) => {
  const [chatRoom, setChatRoom] = useState(chat);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const handlePress = () => {
    navigation.navigate("Chat", {
      id: chatRoom.id,
      name: user?.name,
    });
  };
  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const userItem = chat.users.items.find(
        (item) => item.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };
    fetchUser();
  }, []);
  useEffect(() => {
    //subscribe to updates in the chatroom
    const sub = API.graphql(
      graphqlOperation(onUpdateChatRoom, {
        filter: {
          id: {
            eq: chatRoom.id,
          },
        },
      })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((cr) => ({
          ...(cr || {}),
          ...value?.data?.onUpdateChatRoom,
        }));
      },
      error: (err) => console.warn(err),
    });
    return () => sub.unsubscribe();
  }, []);
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
          {chatRoom?.LastMessage && (
            <Text style={styles.subTitle}>
              {dayjs(chatRoom?.LastMessage?.createdAt).fromNow(true)}
            </Text>
          )}
        </View>
        <Text style={styles.subTitle} numberOfLines={2}>
          {chatRoom?.LastMessage?.text}
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatListItem;
