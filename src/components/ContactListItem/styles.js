import { StyleSheet } from "react-native";
export default styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        marginHorizontal:10,
        marginVertical:5,
        height:70,
    },
    image:{
        width:60,
        height:60,
        borderRadius:30,//half of width
    },
    content:{
        marginLeft:15,
        flex:1,
        borderBottomColor:'lightgray',
        borderBottomWidth:StyleSheet.hairlineWidth,//the smallest possible width
    },
    name:{
        flex:1,//basically it takes all the available space and leave the required for time 
        fontWeight:'bold'
    },
    row:{
        flexDirection:'row',
        marginBottom:5,
    },
    subTitle:{
        color:'gray'
    }
})