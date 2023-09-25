import { View, Text, Image, Pressable } from "react-native";
import styles from "./styles";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import { useNavigation } from "@react-navigation/native";
import { getCommonChatRoom } from "../../utils/ChatRoomService";
import { useEffect, useRef, useState } from "react";

const ContactListItem = ({ data }) => {
  const navigation = useNavigation();
  const [name, setName] = useState(data?.name);
  useEffect(() => {
    const fun = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      if (authUser.attributes.sub === data.id) {
        setName("You");
      }
    };
    fun();
  }, []);
  const handleContactPress = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    //check if we already have a chatroom with the user
    const chatRoomId = await getCommonChatRoom(
      authUser.attributes.sub,
      data.id
    );
    if (chatRoomId !== null) {
      //navigate to the newly created chatroom
      navigation.navigate("Chat", {
        id: chatRoomId,
        name: data.name,
      });
      return;
    }
    //create a new chatroom
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );
    if (!newChatRoomData.data?.createChatRoom) {
      console.log("Error in creating the chatroom");
    }
    const chatRoom = newChatRoomData.data?.createChatRoom;
    //add the clicked user to the chatroom
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: {
          chatRoomId: chatRoom.id,
          userId: data.id,
        },
      })
    );
    //add the auth user to the chatroom
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: {
          chatRoomId: chatRoom.id,
          userId: authUser.attributes.sub,
        },
      })
    );
    //navigate to the newly created chatroom
    navigation.navigate("Chat", {
      id: chatRoom.id,
      name: data.name,
    });
  };
  return (
    <Pressable style={styles.container} onPress={handleContactPress}>
      <Image
        source={{
          uri: data.image,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {name}
          </Text>
        </View>
        <Text style={styles.subTitle} numberOfLines={2}>
          {data.status}
        </Text>
      </View>
    </Pressable>
  );
};

export default ContactListItem;
