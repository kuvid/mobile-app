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
import AttendanceDataContext from "../context/AttendanceDataContext";
import styles from "../styles/Style";
import { dummyStudentData } from "../dummies/dummyStudentData";

export default function TakeAttendanceScreen() {
  const [deviceNames, setDeviceNames] = useState([]);

  const { sendStudentList, courseName } = useContext(StudentListContext);
  const { addAttendanceData, attendanceData, printBluetoothData } = useContext(
    AttendanceDataContext
  );
  const [spinnerShown, setSpinnerShown] = useState(true);
  useEffect(() => {
    //sendStudentList();
    const interval = setInterval(() => {
      setSpinnerShown(false);
    }, 15000);

    return () => clearInterval(interval);
  }, []);
  let startTime = new Date();
  useEffect(() => {
    manager.onStateChange((state) => {
      const subscription = manager.onStateChange((state) => {
        if (state === "PoweredOn") {
          scanAndConnect();

          //scanAndConnect(counter);
          //console.log("scanAndConnect'ten çıktık");
          //alert("bişiler oluyo");
          //subscription.remove();
          //console.log("subscription altındayız");
        }
      }, true);

      return () => subscription.remove();
    });
  }, [manager]);

  async function attendanceDataListener(error, device) {
    //console.log("startDeviceScan'in içindeyim");
    let endTime = new Date();
    var timeDiff = endTime - startTime;
    timeDiff /= 1000;
    var seconds = Math.round(timeDiff);
    if (error) {
      // Handle error (scanning will be stopped automatically)
      console.log("scanAndConnect'in içinde error veriyorum");
      return;
    }
    //setDeviceNames(device.name);
    //console.log("device gördüm: " + device.name);
    if (device.name !== null) {
      //alert(device.name);
      //setDeviceNames([...deviceNames, device.name]);
      //addAttendanceData(device.name);
      console.log("device buldum: " + device.name);

      addAttendanceData(device.name)
        .then(() =>
          console.log("device buldum contexte ekledim: " + device.name)
        )
        .then(() => {
          return device.name;
        })
        .catch((error) => console.log(error));
    }
    console.log("scanAndConnect içindeyiz");
    // Check if it is a device you are looking for based on advertisement data
    // or other criteria.
    // if (device.name === "TI BLE Sensor Tag" || device.name === "SensorTag") {
    //   // Stop scanning as it's not necessary if you are scanning for one device.
    //manager.stopDeviceScan();
    //console.log("stopDeviceScan dedik");
    if (seconds > 15) {
      console.log("15 SANİYE GEÇTİİİİİİK");
      manager.stopDeviceScan();
    }
    //console.log("5 saniye geçmemiş");
    //   // Proceed with connection.
    // }
  }

  function scanAndConnect() {
    //console.log("scanAndConnect'e başladım");
    manager.startDeviceScan(null, null, attendanceDataListener);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {/* <Text style={[styles.boldPurpleText, styles.profileTextTopMargin]}>
        {deviceNames}
      </Text> */}
      <FlatList
        data={attendanceData}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={elementStyles.container}>
              <View style={{ flexDirection: "row", alignItems: "stretch" }}>
                <Text style={styles.boldText}>{item.deviceName}</Text>

                {/* <View style={{ paddingLeft: 18 }}>
                  <Text style={styles.boldText}>{item.student_id}</Text>
                </View> */}
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.deviceId}
      />

      {spinnerShown ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      ) : null}
      {!spinnerShown ? (
        <View>
          <Text style={[styles.boldText, styles.profileTextTopMargin]}>
            Attendance data successfully saved for this course!
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
