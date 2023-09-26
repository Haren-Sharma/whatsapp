import { StyleSheet } from "react-native";
//align-self
//The align-self CSS property overrides a grid or flex item's align-items value.
// In Grid, it aligns the item inside the grid area.
// In Flexbox, it aligns the item on the cross axis.
export default styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
    shadowColor: "#000000",
    elevation: 5,
    //for ios
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
  },
  msg: {},
  time: {
    color: "gray",
    alignSelf: "flex-end", //to align the time component always on the right
  },
  img_msg: {
    height: 150,
    width: 200,
    borderColor: "white",
    borderWidth: 2,
    marginBottom:10,
  },
});
