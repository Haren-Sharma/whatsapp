import { View, Text, Image, Pressable } from "react-native";
import styles from "./styles";

const ContactListItem = ({data}) => {
  return (
    <Pressable style={styles.container}>
      <Image
        source={{
          uri:"https://image.shutterstock.com/image-vector/super-mom-hero-superhero-cartoon-600w-720015928.jpg",
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {data.name}
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
