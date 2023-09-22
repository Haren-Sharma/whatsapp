import { View, Text } from "react-native";
import styles from "./styles";
import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
dayjs.extend(relativetime);

const Message = ({ message }) => {
  const [isMe, setIsMe] = useState(false);
  useEffect(() => {
    const isMyMsg = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      setIsMe(message?.userID === authUser.attributes.sub);
    };
    isMyMsg();
  }, []);
  return (
    <View
      style={[
        isMe
          ? { backgroundColor: "#DCF8C5", alignSelf: "flex-end" }
          : { backgroundColor: "white", alignSelf: "flex-start" },
        styles.container,
      ]}
    >
      <Text style={styles.msg}>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
      {/*true->to remove ago*/}
    </View>
  );
};

export default Message;
