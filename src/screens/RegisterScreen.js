import React, { useState, useEffect, useContext } from "react";
import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import styles from "../styles/Style";
import CovidStatusContext from "../context/CovidStatusContext";
import AuthContext from "../context/AuthContext";

import Peripheral, { Service, Characteristic } from "react-native-peripheral";
import { Platform } from "react-native";

import UUIDGenerator from "react-native-uuid-generator";

import BLEAdvertiser from "react-native-ble-advertiser";

export default function RegisterScreen({ navigation }) {
  const [spinnerShown, setSpinnerShown] = useState(true);
  const [message, setMessage] = useState("");

  const { currentCovidCode, charUuid } = useContext(CovidStatusContext);

  const { name, familyName, idNumber } = useContext(AuthContext);

  useEffect(() => {
    if (Platform.OS === "ios") {
      Peripheral.onStateChanged((state) => {
        // wait until Bluetooth is ready

        var ch1, service1;
        console.log("currentCovidCode: " + currentCovidCode);
        var serviceUuid;
        if (state === "poweredOn") {
          // first, define a characteristic with a value
          Peripheral.removeAllServices()
            .then(() => {
              //serviceUuid = UUIDGenerator.getRandomUUID();
            })
            .then(() => {
              ch1 = new Characteristic({
                uuid: "AAAAAAAA-7c43-4f66-b921-4d77bf7a3aba",
                value: "c2VsaW4=", // Base64-encoded string
                properties: ["read", "write"],
                permissions: ["readable", "writeable"],
              });
            })
            .then(() => {
              service1 = new Service({
                uuid: `${charUuid}`,
                characteristics: [ch1],
              });
            })
            .then(() => {
              Peripheral.addService(service1)
                .then(() =>
                  // start advertising to make your device discoverable
                  Peripheral.startAdvertising({
                    name: `KU ${name} ${familyName} ${idNumber}`,
                    //name: "KUvid",
                    serviceUuids: [charUuid],
                  })
                )
                .then(() => {
                  //console.log("started advertising...");
                  setMessage("Self-Registering...");
                })
                .then(() => {
                  setTimeout(() => {
                    Peripheral.stopAdvertising();
                    //console.log("Done!");
                    setMessage("Done!");
                    setSpinnerShown(false);
                  }, 10000);
                });
            });
        }
      });
    } else if (Platform.OS === "android") {
      BLEAdvertiser.setCompanyId(0x00);
      BLEAdvertiser.broadcast([currentCovidCode], [[1, 0]], {})
        .then((success) => {
          console.log("Broadcasting Sucessful", success);
          setTimeout(() => {
            BLEAdvertiser.stopBroadcast()
              .then((success) =>
                console.log("Stop Broadcast Successful", success)
              )
              .catch((error) => console.log("Stop Broadcast Error", error));
          }, 15000);
        })
        .catch((error) => console.log("Broadcasting Error", error));
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <View>
        <Text style={[styles.boldText, styles.profileTextTopMargin]}>
          {message}
        </Text>
      </View>
      {spinnerShown ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      ) : null}
      {!spinnerShown ? (
        <View style={styles.container}>
          <Text style={[styles.boldText, styles.profileTextTopMargin]}>
            Attendance data successfully sent for this course!
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
