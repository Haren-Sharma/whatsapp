import {
  ImageBackground,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect } from "react";
import bgimg from "../../../assets/images/BG.png";
import styles from "./styles";
import msgs from "../../../assets/data/messages.json";
import Message from "../../components/Message/Message";
import InputBox from "../../components/InputBox/InputBox";

const ChatScreen = ({ navigation, route }) => {
  const { id, name } = route.params;
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name]);
  return (
    //here we are using keyboardavoiding view is for ios only
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.bgimg}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
    >
      <ImageBackground source={bgimg} style={styles.bgimg}>
        <FlatList
          data={msgs}
          renderItem={({ item }) => <Message message={item} />}
          style={styles.list}
          inverted
        />
        <InputBox />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
