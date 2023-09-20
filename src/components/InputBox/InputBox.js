import { View, TextInput } from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

const InputBox = () => {
  const [msg,setMsg]=useState('');
  const onSend=()=>{
    console.warn(msg);
    setMsg('');
  }
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <AntDesign name="plus" size={20} color="royalblue" />
      <TextInput value={msg} onChangeText={(text)=>setMsg(text)} style={styles.input} placeholder="type your message.." />
      <MaterialIcons onPress={onSend} style={styles.send} name="send" size={16} color="white" />
    </SafeAreaView>
  );
};

export default InputBox;
