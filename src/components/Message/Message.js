import { View, Text } from "react-native";
import styles from "./styles";
import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";
dayjs.extend(relativetime);

const Message = ({ message }) => {
  const isMyMsg = () => {
    return message.user.id === "u1";
  };
  return (
    <View
      style={[
        isMyMsg()
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
