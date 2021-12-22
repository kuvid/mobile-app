import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { Icon } from "react-native-elements";
import styles from "../styles/Style";
import AttendanceDataContext from "../context/AttendanceDataContext";
import AuthContext from "../context/AuthContext";
import StudentListContext from "../context/StudentListContext";
import CovidStatusContext from "../context/CovidStatusContext";
import HomeScreenLayout from "../components/HomeScreenLayout";
import CourseListScreen from "./CourseListScreen";
import axios from "axios";
import moment from "moment";

function HomeScreen({ navigation }) {
  const { addAttendanceData, pullData } = useContext(AttendanceDataContext);
  const { sendStudentList, getStudentList, courseName } =
    useContext(StudentListContext);
  const { name, familyName, email, group } = useContext(AuthContext);
  const {
    covidStatus,
    sendCovidStatusPositive,
    getCovidStatus,
    storeCovidStatusPositiveLocally,
    storeCovidStatusNegativeLocally,
    contacted,
  } = useContext(CovidStatusContext);

  var [isCovidPositive, setIsCovidPositive] = useState(
    covidStatus === "Positive"
  );

  const [modalVisible, setModalVisible] = useState(false);

  //console.log(covidStatus);

  useEffect(() => {
    setIsCovidPositive(covidStatus === "Positive");
  }, [covidStatus]);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.purpleButtonText}>
              After this action, you won’t be able to enter the campus until you
              send your negative COVID-19 test to the Health Center. Would you
              like to continue?
            </Text>

            <View style={styles.row}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.redButton}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.whiteButtonText}>NO</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.greenButton}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    storeCovidStatusPositiveLocally();
                  }}
                >
                  <Text style={styles.whiteButtonText}>YES</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              alignSelf: "flex-start",
              paddingLeft: 18,
              paddingTop: 18,
            }}
          >
            <Icon
              name="account-switch"
              type="material-community"
              size={36}
              iconStyle={contacted ? styles.allRed : styles.allWhite}
            />
          </TouchableOpacity>
          <Text
            style={
              contacted
                ? styles.closeContactTextVisible
                : styles.closeContactTextHidden
            }
          >
            CLOSE CONTACT!
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          style={{ alignSelf: "flex-end", paddingRight: 18, paddingTop: 18 }}
        >
          <Icon
            name="bell"
            type="material-community"
            size={36}
            iconStyle={{ color: "#7719B2" }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        {group === "Student" ? (
          <Image
            source={require("../images/girl.png")}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={require("../images/instructor.png")}
            style={styles.profileImage}
          />
        )}

        <Text style={[styles.boldPurpleText, styles.profileTextTopMargin]}>
          {name} {familyName}
        </Text>
        <Text style={styles.regularText}>{email}</Text>
        {group === "Instructor" ? (
          <Text style={styles.regularText}>{courseName}</Text>
        ) : null}
      </View>
      <View style={styles.row}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.lightPurpleButton}
            onPress={() => {
              if (group === "Student") {
                pullData();
                navigation.navigate("Attendance");
              } else if (group === "Instructor") {
                getStudentList();
                navigation.navigate("CourseList");
              }
            }}
          >
            <Icon
              iconStyle={styles.purpleIcon}
              size={48}
              name="school"
              type="material-community"
            />
            {group === "Student" ? (
              <Text style={styles.purpleButtonText}>My Attendance</Text>
            ) : (
              <Text style={styles.purpleButtonText}>My Courses</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={
              isCovidPositive ? styles.inactiveButton : styles.lightPurpleButton
            }
            onPress={() => {
              if (group === "Student") navigation.navigate("Register");
              //if (group === "Student") sendStudentList();
              // burası silincek
              //else sendStudentList();
              else {
                navigation.navigate("TakeAttendance");
              }
            }}
            disabled={isCovidPositive}
          >
            <Icon
              iconStyle={
                isCovidPositive ? styles.inactiveIcon : styles.purpleIcon
              }
              size={48}
              name="wifi"
              type="material-community"
            />
            {group === "Student" ? (
              <Text
                style={
                  isCovidPositive
                    ? styles.inactiveButtonText
                    : styles.purpleButtonText
                }
              >
                Self-Register
              </Text>
            ) : (
              <Text
                style={
                  isCovidPositive
                    ? styles.inactiveButtonText
                    : styles.purpleButtonText
                }
              >
                Take Attendance
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={isCovidPositive ? styles.inactiveButton : styles.purpleButton}
          onPress={() => setModalVisible(true)}
          disabled={isCovidPositive}
          //disabled={true}
        >
          <Icon
            iconStyle={isCovidPositive ? styles.inactiveIcon : styles.whiteIcon}
            size={48}
            name="doctor"
            type="material-community"
          />
          <Text
            style={
              isCovidPositive
                ? styles.inactiveButtonText
                : styles.whiteButtonText
            }
          >
            I HAVE COVID-19
          </Text>
        </TouchableOpacity>
      </View>
      {true ? null : (
        <View>
          <TouchableOpacity style={styles.greenButton} onPress={null}>
            <Icon
              iconStyle={styles.whiteIcon}
              size={48}
              name="doctor"
              type="material-community"
            />
            <Text style={styles.whiteButtonText}>scanAndConnect</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

export default HomeScreen;
