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
import CovidStatusContext from "../context/CovidStatusContext";
import styles from "../styles/Style";
import { dummyStudentData } from "../dummies/dummyStudentData";

export default function TakeAttendanceScreen() {
  const [deviceNames, setDeviceNames] = useState([]);

  const {
    sendStudentList,
    courseName,
    addNewStudent,
    newStudents,
    registeredStudents,
  } = useContext(StudentListContext);

  const { addStudentCovidCode } = useContext(CovidStatusContext);

  const [spinnerShown, setSpinnerShown] = useState(true);

  useEffect(() => {
    //sendStudentList();
    const interval = setInterval(() => {
      setSpinnerShown(false);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  let startTime = new Date();
  useEffect(() => {
    manager.onStateChange((state) => {
      const subscription = manager.onStateChange((state) => {
        if (state === "PoweredOn") {
          scanAndConnect();
          subscription.remove();
          //scanAndConnect(counter);
          //console.log("scanAndConnect'ten çıktık");
          //alert("bişiler oluyo");
          //subscription.remove();
          //console.log("subscription altındayız");
        }
      }, true);

      return () => subscription.remove();
    });
  }, []);

  async function attendanceDataListener(error, device) {
    //console.log("startDeviceScan'in içindeyim");
    let endTime = new Date();
    var timeDiff = endTime - startTime;
    timeDiff /= 1000;
    var seconds = Math.round(timeDiff);
    if (error) {
      // Handle error (scanning will be stopped automatically)
      console.log("scanAndConnect'in içinde error veriyorum");
      console.log(error);
      return;
    }
    //setDeviceNames(device.name);
    console.log("device gördüm: " + device.name);
    if (device.name !== null && device.name.includes("KUvid")) {
      //alert(device.name);
      //setDeviceNames([...deviceNames, device.name]);
      //addAttendanceData(device.name);
      console.log("KUvid buldum: " + device.name);
      manager.stopDeviceScan();
      //console.log(device);

      // await device.connect();
      // await device.discoverAllServicesAndCharacteristics();
      // const services = await device.services();
      // const characteristicForOneService = await services[0].characteristics();
      // console.log(characteristicForOneService);
      device
        .connect()
        .then((device) => {
          return device.discoverAllServicesAndCharacteristics();
          //     // addStudentCovidCode(device.name, device.id)
        })
        .then((device) => {
          return device.services();
        })
        .then((services) => {
          services.forEach((element) => {
            console.log(element);
          });
        });
      //     //     console.log("anonymous device buldum contexte ekledim:")
      //     //   )
      //     //   .then(() => {
      //     //     return device.name;
      //     //   })
      //     //   .catch((error) => console.log(error));
      //     // return device.discoverAllServicesAndCharacteristics();
      //   })
      //   .then((device) => {
      //     // Do work on device with services and characteristics
      //     console.log("device discover ettik");
      //     const services = device.services();
      //     console.log(services);
      //   })
      //   .catch((error) => {
      //     // Handle errors
      //     console.log("hata veriyorum: " + error);
      //   });

      // addNewStudent(device.name, device.id)
      //   /*.then(() =>
      //     console.log("device buldum contexte ekledim: " + device.name)
      //   )*/
      //   .then(() => {
      //     return device.name;
      //   })
      //   .catch((error) => console.log(error));
    }
    //console.log("scanAndConnect içindeyiz");
    // Check if it is a device you are looking for based on advertisement data
    // or other criteria.
    // if (device.name === "Anonymous") {
    //   //   // Stop scanning as it's not necessary if you are scanning for one device.
    //   //manager.stopDeviceScan();
    //   console.log("anonymous device buldum");
    //   device
    //     .connect()
    //     .then((device) => {
    //       //console.log(device.discoverAllServicesAndCharacteristics());
    //       addStudentCovidCode(device.name, device.id)
    //         .then(() =>
    //           console.log("anonymous device buldum contexte ekledim:")
    //         )
    //         .then(() => {
    //           return device.name;
    //         })
    //         .catch((error) => console.log(error));
    //       return device.discoverAllServicesAndCharacteristics();
    //     })
    //     .then((device) => {
    //       // Do work on device with services and characteristics
    //     })
    //     .catch((error) => {
    //       // Handle errors
    //     });
    // }
    //console.log("stopDeviceScan dedik");
    else if (seconds > 30) {
      console.log("30 SANİYE GEÇTİİİİİİK");
      manager.stopDeviceScan();
    } else {
      console.log("unknown device found");
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
        data={registeredStudents}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={elementStyles.container}>
              <View style={{ flexDirection: "row", alignItems: "stretch" }}>
                <Text style={styles.boldText}>{item.student_name}</Text>

                <View style={{ paddingLeft: 18 }}>
                  <Text style={styles.boldText}>{item.student_id}</Text>
                </View>
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
            Student list successfully saved for this course!
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
