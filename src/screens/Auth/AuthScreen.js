import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Image,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { Auth } from "aws-amplify";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

import Input from "../../components/TextInput";
const AuthScreen = () => {
  const [loginScreen, setloginScreen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [err_msg, setErr] = useState(null);
  const [loader, setLoader] = useState(false);
  const [code, setCode] = useState("");
  const handleSignIn = async () => {
    try {
      setLoader(true);
      setErr(null);
      const res = await Auth.signIn({ username: email, password: password });
      setLoader(false);
    } catch (err) {
      setLoader(false);
      setErr(err.message);
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await Auth.signUp({
        username: email,
        password: password,
      });
    } catch (err) {
      setErr(err.message);
    }
  };
  const handleForgetPassword = () => {};
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient colors={["#FF8A78", "#FF4570"]} style={styles.container}>
        <View style={{ flex: 1, marginVertical: 30 }}>
          {loginScreen ? (
            <>
              <Text style={styles.heading}>WE</Text>
              <Text style={styles.heading}>CHAT</Text>
            </>
          ) : (
            <Text style={styles.heading}>Sign Up</Text>
          )}
        </View>
        <View
          style={{
            padding: 15,
            alignItems: "center",
          }}
        >
          <AntDesign
            name="wechat"
            size={Dimensions.get("screen").width / 2}
            color="white"
          />
        </View>
        {!loginScreen && (
          //Input Username
          <Input
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
            placeholder="Username"
          />
        )}
        {/*Input Email*/}
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          onFocus={() => setErr(null)}
        />
        {/*Input Password*/}
        <Input
          value={password}
          secure={secureText}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your password"
          toggleSecure={() => setSecureText((bool) => !bool)}
          onFocus={() => setErr(null)}
        />
        {/*forgot password*/}
        {loginScreen && (
          <Pressable onPress={handleForgetPassword}>
            <Text style={[styles.btn_text, { fontWeight: "bold" }]}>
              Forget Password ?
            </Text>
          </Pressable>
        )}
        <Pressable
          style={({ pressed }) => [
            styles.btn,
            (pressed || loader) && { opacity: 0.7 },
            (email.length === 0 || password.length === 0) && styles.disabled,
          ]}
          onPress={handleSignIn}
          disabled={email.length === 0 || password.length === 0}
        >
          {loader && (
            <ActivityIndicator
              color="white"
              size={20}
              style={{ marginRight: 5 }}
            />
          )}
          <Text style={styles.btn_text}>
            {loginScreen ? "Sign In" : "Sign Up"}
          </Text>
        </Pressable>
        {err_msg && <Text style={styles.errmsg}>{err_msg}</Text>}
        <View style={styles.sub}>
          <Text style={styles.btn_text}>
            {loginScreen
              ? `Don't have an account?`
              : `Already have an account?`}
          </Text>
          <Pressable
            onPress={() => {
              loginScreen ? setloginScreen(false) : setloginScreen(true);
            }}
          >
            <Text style={[styles.btn_text, styles.sign_up_btn_text]}>
              {loginScreen ? "Sign Up Now" : "Sign In"}
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default AuthScreen;
