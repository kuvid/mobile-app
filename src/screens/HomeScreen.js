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
import AttendanceDataContext from "../context/AttendanceDataContext";
import AuthContext from "../context/AuthContext";
import CovidStatusContext from "../context/CovidStatusContext";
import axios from "axios";
import moment from "moment";

function HomeScreen({ navigation }) {
  const {
    addAttendanceData,
    pullData,
    sendAttendanceData,
    getInstructorAttendanceData,
  } = useContext(AttendanceDataContext);
  const { username, email } = useContext(AuthContext);
  const { covidStatus, sendCovidStatusPositive, getCovidStatus } =
    useContext(CovidStatusContext);

  //   async function sendCovidStatus() {
  //     await axios
  //       .post(
  //         "https://3mc5pe0gw4.execute-api.eu-central-1.amazonaws.com/Production/covid_status",
  //         {
  //           covid_code: "123",
  //           covid_status: "Positive",
  //           update_date: Date(),
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${idToken}` /* this is the JWT token from AWS Cognito. */,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then(() => {
  //         console.log(typeof Date());
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }

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
          {username}
        </Text>
        <Text style={styles.regularText}>{email}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.lightPurpleButton}
            onPress={() => {
              navigation.navigate("Attendance");
            }}
          >
            <Icon
              iconStyle={styles.purpleIcon}
              size={48}
              name="school"
              type="material-community"
            />
            <Text style={styles.purpleButtonText}>My Attendance</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.lightPurpleButton}
            onPress={addAttendanceData}
          >
            <Icon
              iconStyle={styles.purpleIcon}
              size={48}
              name="wifi"
              type="material-community"
            />
            <Text style={styles.purpleButtonText}>Self-Register</Text>
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
      {false ? null : (
        <View>
          <TouchableOpacity
            style={styles.purpleButton}
            onPress={getInstructorAttendanceData}
          >
            <Icon
              iconStyle={styles.whiteIcon}
              size={48}
              name="doctor"
              type="material-community"
            />
            <Text style={styles.whiteButtonText}>
              getInstructorAttendanceData
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

export default HomeScreen;
