import React, { useState, useEffect, useContext } from "react";
import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import styles from "../styles/Style";
import CovidStatusContext from "../context/CovidStatusContext";

import Peripheral, { Service, Characteristic } from "react-native-peripheral";
import { Platform } from "react-native";

import BLEAdvertiser from "react-native-ble-advertiser";

export default function SubmitCovidCodeScreen() {
  const [spinnerShown, setSpinnerShown] = useState(true);
  const [message, setMessage] = useState("");

  const { serviceUuid2, charUuid2 } = useContext(CovidStatusContext);

  useEffect(() => {
    if (Platform.OS === "ios") {
      // wait until Bluetooth is ready
      var ch2, service2;
      // first, define a characteristic with a value
      Peripheral.removeAllServices()
        .then(() => {
          ch2 = new Characteristic({
            uuid: charUuid2,
            value: "c2VsaW4=", // Base64-encoded string
            properties: ["read", "write"],
            permissions: ["readable", "writeable"],
          });
        })
        .then(() => {
          service2 = new Service({
            uuid: serviceUuid2,
            characteristics: [ch2],
          });
        })
        .then(() => {
          Peripheral.addService(service2)
            .then(() =>
              // start advertising to make your device discoverable
              Peripheral.startAdvertising({
                name: "Anonymous",
                serviceUuids: [serviceUuid2],
              })
            )
            .then(() => {
              console.log("started advertising...");
              setMessage("started advertising...");
            })
            .then(() => {
              setTimeout(() => {
                Peripheral.stopAdvertising();
                console.log("stopped advertising...");
                setMessage("stopped advertising...");
              }, 10000);
            })
            .then(() => {
              setTimeout(() => {
                Peripheral.removeAllServices();
                console.log("removed all services...");
                setMessage("removed all services...");
              }, 11000);
            });
        });
    } else if (Platform.OS === "android") {
      BLEAdvertiser.setCompanyId(0x00); // Your Company's Code
      BLEAdvertiser.broadcast(
        ["ebed0e09-033a-4bfe-8dcc-20a04fad944e"],
        [[1, 0]],
        {}
      ) // The service UUID and additional manufacturer data.
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
        backgroundColor: "white",
      }}
    >
      <View>
        <Text>{message}</Text>
      </View>
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
