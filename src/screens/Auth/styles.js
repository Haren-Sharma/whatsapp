import { Dimensions, StyleSheet } from "react-native";
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 24,
    color: "white",
    marginBottom: 2,
  },
  btn: {
    backgroundColor: "royalblue",
    flexDirection:'row',
    marginVertical: 8,
    justifyContent:'center',
    padding: 14,
    borderRadius: 10,
  },
  btn_text: { color: "white" },
  sub: {
    flexDirection: "row",
    justifyContent: "center",
  },
  sign_up_btn_text: {
    fontWeight: "bold",
    marginLeft: 5,
    textAlign: "center",
  },
  errmsg:{
    color:'red',
    fontSize:16,
    textAlign:'center',
    textTransform:'capitalize',
  },
  disabled:{
    opacity:0.5,
  },
  heading:{
    color:'lightgray',
    fontFamily:'Kalam-bold',
    fontSize:Dimensions.get('screen').width/4
  }
});
