import { View,FlatList} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import ContactListItem from "../../components/ContactListItem";
import {API,graphqlOperation} from 'aws-amplify';
import {listUsers} from '../../graphql/queries';

const Contacts = () => {
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    API.graphql(graphqlOperation(listUsers)).then((res)=>{
      setUsers(res.data?.listUsers?.items)
    })
  },[])
  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => <ContactListItem data={item} />}
        style={styles.list}
      />
    </View>
  );
};

export default Contacts;
