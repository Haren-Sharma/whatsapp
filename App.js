import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigator from "./src/navigation";
import { API, Amplify, Auth, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";
import { useEffect } from "react";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";
Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

function App() {
  //as soon as the App mounts it means the user is authenticated
  useEffect(() => {
    //get Auth user
    const syncUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true, //it means it will by pass the cache and query
      });
      const id = authUser.attributes.sub;
      //query the databse using Auth user id(sub)
      const userData = await API.graphql(graphqlOperation(getUser, { id: id }));
      //if there is no users in db,create one}
      if (userData.data.getUser) {
        console.log("User is present in the database");
        return;
      }
      //creating one
      await API.graphql(graphqlOperation(createUser,{input:{
        id:id,
        name:"Haren",
        status:'Hey I am using Whatsapp',
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3PNNRDmwDV_an6mG4zJJyuV3ixJDdEDnIeq_jgXR_RmGHc4qGFI8Fkg2dPq3qcoD_ir0&usqp=CAU',
      }}));
    };
    syncUser();
  }, []);
  return (
    <View style={styles.container}>
      <Navigator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
});

export default withAuthenticator(App);
