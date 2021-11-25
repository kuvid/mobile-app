import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import { Icon } from "react-native-elements";
import StudentListContext from "../context/StudentListContext";
import styles from "../styles/Style";
import { dummyStudentData } from "../dummies/dummyStudentData";

export default function TakeAttendanceScreen() {
  const { sendStudentList } = useContext(StudentListContext);
  useEffect(() => {
    sendStudentList();
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <FlatList
        data={dummyStudentData}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={elementStyles.container}>
              <View style={{ flexDirection: "row", alignItems: "stretch" }}>
                <View style={{ paddingLeft: 18 }}>
                  <Text style={styles.boldText}>{item.student_name}</Text>
                </View>
                <View style={{ paddingLeft: 18 }}>
                  <Text style={styles.boldText}>{item.student_id}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.student_id}
      />
      <Text style={[styles.boldText, styles.profileTextTopMargin]}>
        Attendance data successfully sent!
      </Text>

      <View>
        <Icon
          iconStyle={{ color: "#94DE45" }}
          size={96}
          name="check"
          type="material-community"
        />
      </View>
    </SafeAreaView>
  );
}

const elementStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#F2F2F2",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
});
