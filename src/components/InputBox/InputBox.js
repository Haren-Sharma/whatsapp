import { TextInput, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import { createMessage, updateChatRoom } from "../../graphql/mutations";
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const InputBox = ({ chatroom }) => {
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState(null);
  const onSend = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    let message = {
      chatroomID: chatroom.id,
      text: msg,
      userID: authUser.attributes.sub,
    };
    if (image) {
      message.image = [await uploadFile(image)];
      setImage(null);
    }
    const newMessage = await API.graphql(
      graphqlOperation(createMessage, {
        input: message,
      })
    );

    //set the message as the last message of the chatroom
    await API.graphql(
      graphqlOperation(updateChatRoom, {
        input: {
          _version: chatroom._version,
          chatRoomLastMessageId: newMessage.data?.createMessage?.id,
          id: chatroom.id,
        },
      })
    );
    setMsg("");
  };
  const pickImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!res.canceled) {
      setImage(res.assets[0].uri);
    }
  };
  const uploadFile = async (fileUri) => {
    try {
      const res = await fetch(fileUri);
      const blob = await res.blob();
      const key = `${uuidv4()}.png`;
      await Storage.put(key, blob, {
        contentType: "image/png",
      });
      return key;
    } catch (err) {
      console.log("Error in uploading the file", err);
    }
  };
  return (
    <>
      {image && (
        <Image source={{ uri: image }} style={{ height: 100, width: 100 }} />
      )}
      <SafeAreaView edges={["bottom"]} style={styles.container}>
        <AntDesign
          onPress={pickImage}
          name="plus"
          size={20}
          color="royalblue"
        />
        <TextInput
          value={msg}
          onChangeText={(text) => setMsg(text)}
          style={styles.input}
          placeholder="Type your message.."
        />
        <MaterialIcons
          onPress={onSend}
          style={styles.send}
          name="send"
          size={16}
          color="white"
        />
      </SafeAreaView>
    </>
  );
};

export default InputBox;
