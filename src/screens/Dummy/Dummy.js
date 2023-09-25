import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {API,graphqlOperation} from 'aws-amplify'
import {listUsers} from '../../graphql/queries'
const Dummy = () => {
  const [data,setData]=useState([]);
  useEffect(()=>{
    API.graphql(graphqlOperation(listUsers)).then((res)=>{
      setData(res.data?.listUsers?.items);
    })
  },[])
  useEffect(()=>{
    console.log("Data from the query:",data);
  },[data])
  return (
    <View>
      <Text>Dummy</Text>
    </View>
  )
}

export default Dummy