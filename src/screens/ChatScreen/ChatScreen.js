import {
  ImageBackground,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import bgimg from "../../../assets/images/BG.png";
import styles from "./styles";
import Message from "../../components/Message/Message";
import InputBox from "../../components/InputBox/InputBox";
import { getChatRoom, listMessagesByChatRoom } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { onCreateMessage } from "../../graphql/subscriptions";

const ChatScreen = ({ navigation, route }) => {
  const { id, name } = route.params;
  const [chatroom, setChatroom] = useState(null);
  const [messages, setMessages] = useState([]);

  //fetch the chatroom
  useEffect(() => {
    navigation.setOptions({ title: name });
    API.graphql(graphqlOperation(getChatRoom, { id })).then((res) => {
      setChatroom(res.data?.getChatRoom);
    });
  }, [name]);

  //fetch the messages
  useEffect(() => {
    API.graphql(
      graphqlOperation(listMessagesByChatRoom, {
        chatroomID: id,
        sortDirection: "DESC",
      })
    ).then((res) => {
      setMessages(res.data?.listMessagesByChatRoom?.items);
    });
    //subscribe to new messages
    const subscription=API.graphql(graphqlOperation(onCreateMessage,{
      filter:{
        chatroomID:{
          eq:id
        }
      }
    })).subscribe({
      next: ({ value }) => {
        setMessages((msgs) => [value?.data?.onCreateMessage,...msgs]);
      },
      error: (error) => console.warn(error),
    });
    return ()=>subscription.unsubscribe();
  }, [id]);
  if (!chatroom) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={40} color="red" />
      </View>
    );
  }
  return (
    //here we are using keyboardavoiding view is for ios only
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.bgimg}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
    >
      <ImageBackground source={bgimg} style={styles.bgimg}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <Message message={item} />}
          style={styles.list}
          inverted
        />
        <InputBox chatroom={chatroom} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
