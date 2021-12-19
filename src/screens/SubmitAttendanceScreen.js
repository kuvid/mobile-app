import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import styles from "../styles/Style";

import Peripheral, { Service, Characteristic } from "react-native-peripheral";

export default function SubmitAttendanceScreen() {
  const [spinnerShown, setSpinnerShown] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Peripheral.onStateChanged((state) => {
      // wait until Bluetooth is ready
      if (state === "poweredOn") {
        // first, define a characteristic with a value
        const ch = new Characteristic({
          uuid: "c36e1c5a-fc6e-48c8-9a8e-d0b350399d0e",
          value: "c2VsaW4=", // Base64-encoded string
          properties: ["read", "write"],
          permissions: ["readable", "writeable"],
        });

        // add the characteristic to a service
        const serviceUuid = "ebed0e09-033a-4bfe-8dcc-20a04fad944e";
        const service1 = new Service({
          uuid: serviceUuid,
          characteristics: [ch],
        });
        const service2 = new Service({
          uuid: serviceUuid,
          characteristics: [ch],
        });

        // register GATT services that your device provides
        Peripheral.addService(service1)
          .then(() => {
            // start advertising to make your device discoverable
            console.log("starting advertising...");
            setMessage("starting advertising...");
            Peripheral.startAdvertising({
              name: "My BLE device SELİN",
              serviceUuids: [serviceUuid],
            });
          })
          .then(() => {
            setTimeout(() => {
              Peripheral.stopAdvertising();
              console.log("stopping advertising...");
              setMessage("stopping advertising...");
            }, 15000);
          });

        setTimeout(() => {
          Peripheral.addService(service2)
            .then(() => {
              // start advertising to make your device discoverable
              console.log("starting advertising second time...");
              setMessage("starting advertising second time...");
              Peripheral.startAdvertising({
                name: "anonymous",
                serviceUuids: [serviceUuid],
              });
            })
            .then(() => {
              setTimeout(() => {
                Peripheral.stopAdvertising();
                console.log("stopping advertising second time...");
                setMessage("stopping advertising second time...");
              }, 15000);
            });
        }, 16000);
      }
    });
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
