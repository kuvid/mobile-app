import React from "react";
import { StyleSheet } from "react-native";
import components from "./Components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "stretch",
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  redButton: {
    ...components.button,
    backgroundColor: "#EF4836",
  },
  greenButton: {
    ...components.button,
    backgroundColor: "#94DE45",
  },
  purpleButton: {
    ...components.button,
    backgroundColor: "#7719B2",
  },
  lightPurpleButton: {
    ...components.button,
    backgroundColor: "#EFEBFF",
  },
  inactiveButton: {
    ...components.button,
    backgroundColor: "#EDEDED",
  },
  whiteButtonText: {
    ...components.boldText,
    color: "white",
  },
  purpleButtonText: {
    ...components.boldText,
    color: "#7719B2",
  },
  inactiveButtonText: {
    ...components.boldText,
    color: "#A2A2A2",
  },
  boldText: {
    ...components.boldText,
    color: "#2C2C2C",
  },
  boldPurpleText: {
    ...components.boldText,
    color: "#7719B2",
  },
  regularText: {
    ...components.regularText,
    color: "#2C2C2C",
  },
  whiteIcon: {
    ...components.icon,
    color: "white",
  },
  purpleIcon: {
    ...components.icon,
    color: "#7719B2",
  },
  inactiveIcon: {
    ...components.icon,
    color: "#A2A2A2",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    paddingTop: 18,
  },
  profileTextTopMargin: {
    marginTop: 9,
  },
  input: {
    ...components.input,
  },
  inputText: {
    ...components.boldText,
    color: "white",
    marginLeft: 18,
  },
});

export default styles;
