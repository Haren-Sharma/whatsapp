import { View, Text, Pressable } from "react-native";
import React from "react";
import { Auth } from "aws-amplify";
const Settings = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Pressable
        onPress={() => {
          Auth.signOut();
        }}
        style={{
          backgroundColor: "royalblue",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: "white" }}>Signout</Text>
      </Pressable>
    </View>
  );
};

export default Settings;
