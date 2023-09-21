import { View, Text, Image, Pressable } from "react-native";
import styles from "./styles";

const ContactListItem = ({data}) => {
  return (
    <Pressable style={styles.container}>
      <Image
        source={{
          uri: data.user.image,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {data.user.name}
          </Text>
        </View>
        <Text style={styles.subTitle} numberOfLines={2}>
            {data.user.status}
        </Text>
      </View>
    </Pressable>
  );
};

export default ContactListItem;