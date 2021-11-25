import React, { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import styles from "../styles/Style";

import CovidStatusContext from "../context/CovidStatusContext";

export default function HomeScreenLayout({
  name,
  familyName,
  email,
  firstButtonFunction,
  firstButtonText,
  secondButtonFunction,
  secondButtonText,
}) {
  const { covidStatus, sendCovidStatusPositive, getCovidStatus } =
    useContext(CovidStatusContext);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Notifications")}
        style={{ alignSelf: "flex-end", paddingRight: 18, paddingTop: 18 }}
      >
        <Icon
          name="bell"
          type="material-community"
          size={24}
          iconStyle={{ color: "#7719B2" }}
        />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image
          source={require("../images/girl.png")}
          style={styles.profileImage}
        />
        <Text style={[styles.boldPurpleText, styles.profileTextTopMargin]}>
          {name} {familyName}
        </Text>
        <Text style={styles.regularText}>{email}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.lightPurpleButton}
            onPress={firstButtonFunction}
          >
            <Icon
              iconStyle={styles.purpleIcon}
              size={48}
              name="school"
              type="material-community"
            />
            <Text style={styles.purpleButtonText}>{firstButtonText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.lightPurpleButton}
            onPress={secondButtonFunction}
          >
            <Icon
              iconStyle={styles.purpleIcon}
              size={48}
              name="wifi"
              type="material-community"
            />
            <Text style={styles.purpleButtonText}>{secondButtonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.purpleButton}
          onPress={sendCovidStatusPositive}
        >
          <Icon
            iconStyle={styles.whiteIcon}
            size={48}
            name="doctor"
            type="material-community"
          />
          <Text style={styles.whiteButtonText}>I HAVE COVID-19</Text>
        </TouchableOpacity>
      </View>
      {/* {true ? null : (
        <View>
          <TouchableOpacity
            style={styles.purpleButton}
            onPress={getStudentList}
          >
            <Icon
              iconStyle={styles.whiteIcon}
              size={48}
              name="doctor"
              type="material-community"
            />
            <Text style={styles.whiteButtonText}>getStudentList</Text>
          </TouchableOpacity>
        </View>
      )} */}
    </SafeAreaView>
  );
}
