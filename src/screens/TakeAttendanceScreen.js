import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { manager } from "../bluetooth/BleManager";

import { Icon } from "react-native-elements";
import StudentListContext from "../context/StudentListContext";
import styles from "../styles/Style";
import { dummyStudentData } from "../dummies/dummyStudentData";

export default function TakeAttendanceScreen() {
  const [deviceNames, setDeviceNames] = useState("hello");

  const { sendStudentList, courseName } = useContext(StudentListContext);
  const [spinnerShown, setSpinnerShown] = useState(true);
  useEffect(() => {
    sendStudentList();
    const interval = setInterval(() => {
      setSpinnerShown(false);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    manager.onStateChange((state) => {
      const subscription = manager.onStateChange((state) => {
        if (state === "PoweredOn") {
          scanAndConnect();
          alert("bişiler oluyo");
          subscription.remove();
        }
      }, true);

      return () => subscription.remove();
    });
  }, [manager]);

  function scanAndConnect() {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return;
      }
      //setDeviceNames(device.name);
      alert(device.name);
      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      // if (device.name === "TI BLE Sensor Tag" || device.name === "SensorTag") {
      //   // Stop scanning as it's not necessary if you are scanning for one device.
      //manager.stopDeviceScan();

      //   // Proceed with connection.
      // }
    });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={[styles.boldPurpleText, styles.profileTextTopMargin]}>
        {deviceNames}
      </Text>
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

      {spinnerShown ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      ) : null}
      {!spinnerShown ? (
        <View>
          <Text style={[styles.boldText, styles.profileTextTopMargin]}>
            {`Attendance data successfully sent for your ${courseName} course!`}
          </Text>
          <Icon
            iconStyle={{ color: "#94DE45" }}
            size={96}
            name="check"
            type="material-community"
          />
        </View>
      ) : null}
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
