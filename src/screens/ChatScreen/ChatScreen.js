import {
  ImageBackground,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import bgimg from "../../../assets/images/BG.png";
import styles from "./styles";
import msgs from "../../../assets/data/messages.json";
import Message from "../../components/Message/Message";
import InputBox from "../../components/InputBox/InputBox";
import { getChatRoom } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

const ChatScreen = ({ navigation, route }) => {
  const { id, name } = route.params;
  const [chatroom, setChatroom] = useState(null);
  useEffect(() => {
    navigation.setOptions({ title: name });
    API.graphql(graphqlOperation(getChatRoom, { id })).then((res) =>
      setChatroom(res.data?.getChatRoom)
    );
  }, [name]);
  if(!chatroom){
    return <ActivityIndicator size={20} color='red'/>
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
          data={chatroom?.Messages?.items}
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
