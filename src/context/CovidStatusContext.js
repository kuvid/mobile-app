import React, { useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import UUIDGenerator from "react-native-uuid-generator";

var _ = require("lodash");

const CovidStatusContext = React.createContext();

export const CovidStatusProvider = ({ children }) => {
  const COVID_STATUS = "@save_covid_status";
  const COVID_CODES = "@covid_codes";

  const { idToken } = useContext(AuthContext);
  const [covidStatus, setCovidStatus] = useState("");
  const [currentCovidCode, setCurrentCovidCode] = useState("");

  const [contacted, setContacted] = useState(false);

  const [studentCovidCodes, setStudentCovidCodes] = useState([]);

  const [serviceUuid1, setServiceUuid1] = useState("");
  const [serviceUuid2, setServiceUuid2] = useState("");
  const [charUuid1, setCharUuid1] = useState("");
  const [charUuid2, setCharUuid2] = useState("");

  const [charUuid, setCharUuid] = useState("");
  // const [serviceUuid, setServiceUuid] = useState("");

  useEffect(() => {
    // UUIDGenerator.getRandomUUID().then((uuid) => {
    //   setServiceUuid1(uuid);
    // });
    // UUIDGenerator.getRandomUUID().then((uuid) => {
    //   setServiceUuid2(uuid);
    // });
    // UUIDGenerator.getRandomUUID().then((uuid) => {
    //   setCharUuid1(uuid);
    // });
    // UUIDGenerator.getRandomUUID().then((uuid) => {
    //   setCharUuid2(uuid);
    // });
    //cleanAsyncStorages();
    produceCharUuid();
    getCurrentCovidCode();

    //storeCovidStatusNegativeLocally();
  }, []);

  async function cleanAsyncStorages() {
    try {
      await AsyncStorage.multiRemove(["@save_covid_status", "@covid_codes"]);
    } catch (e) {
      // clear error
    }
  }

  async function checkIfContacted() {
    const contactsArray = []; // axios'tan array çekicezz

    await axios
      .get(
        "https://3mc5pe0gw4.execute-api.eu-central-1.amazonaws.com/Production/kuvid_get_positive_codes",

        {
          headers: {
            Authorization: `Bearer ${idToken}` /* this is the JWT token from AWS Cognito. */,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        //console.log(response.data);
        response.data.forEach((element) => {
          contactsArray.push(element);
        });
        //console.log(covidStatus + ": covid status updated");
      })
      .then(() => {
        //console.log("contacts array" + contactsArray);
      })
      .catch((error) => {
        //console.log("axios hatası");
        console.log(error);
      });

    const storedCovidCodes = await AsyncStorage.getItem(COVID_CODES);
    const localCovidCodesArray = JSON.parse(storedCovidCodes);

    const found = localCovidCodesArray.some((r) => contactsArray.includes(r)); // boolean
    //if (found) console.log("MATCH BULDUM!");
    setContacted(found);
  }

  async function addStudentCovidCode(covidCode, deviceId) {
    return new Promise((resolve, reject) => {
      //here our function should be implemented

      setStudentCovidCodes((prev) =>
        _.uniqBy(
          [...prev, { covidCode: covidCode, deviceId: deviceId }],
          "deviceId"
        )
      );
      resolve();
    });
  }

  async function storeCovidStatusNegativeLocally() {
    const jsonValue = JSON.stringify({
      covid_code: `${currentCovidCode}`,
      covid_status: "Negative",
      update_date: Date.now(),
    });
    await AsyncStorage.setItem(COVID_STATUS, jsonValue)
      .then(() => getCovidStatus())
      //.then(()=>sendCovidStatusPositive) //bu kodu ekleyeceğiz
      .catch((error) => {
        console.log(error);
      });
  }

  async function storeCovidStatusPositiveLocally() {
    const jsonValue = JSON.stringify({
      covid_code: `${currentCovidCode}`,
      covid_status: "Positive",
      update_date: Date.now(),
    });
    await AsyncStorage.setItem(COVID_STATUS, jsonValue)
      .then(() => getCovidStatus())
      //.then(()=>sendCovidStatusPositive) //bu kodu ekleyeceğiz
      .catch((error) => {
        console.log(error);
      });
  }

  async function produceCovidCode() {
    const uuid = await UUIDGenerator.getRandomUUID();
    let reg = /.{1,8}/;
    const covidCode = uuid.replace(reg, (m) => "A".repeat(m.length));
    //console.log(covidCode);
    return covidCode;
  }

  async function produceCharUuid() {
    const uuid = await UUIDGenerator.getRandomUUID();
    setCharUuid(uuid);
  }

  async function getCurrentCovidCode() {
    try {
      const storedCovidStatus = await AsyncStorage.getItem(COVID_STATUS);

      if (storedCovidStatus === null) {
        // which means first time for the user, initializing all local storages

        // initialize COVID_STATUS
        const newCovidCode = await produceCovidCode();
        const jsonValue = JSON.stringify({
          covid_code: `${newCovidCode}`,
          covid_status: "Negative",
          update_date: Date.now(),
        });
        await AsyncStorage.setItem(COVID_STATUS, jsonValue).catch((error) => {
          console.log(error);
        });

        // initialize COVID_CODES
        const covidCodes = [newCovidCode];
        const arrayJson = JSON.stringify(covidCodes);
        await AsyncStorage.setItem(COVID_CODES, arrayJson).catch((error) => {
          console.log(error);
        });

        // set covid code and return it
        console.log(
          "first time in KUvid! initialized all local storages and produced your first unique covid code: " +
            newCovidCode
        );
        setCurrentCovidCode(newCovidCode);
      } else if (covidStatus === "Negative") {
        // not first time, there is data in local storage

        const covidCodeProductionDate =
          JSON.parse(storedCovidStatus)["update_date"];
        const daysPassed = Math.round(
          //(Date.now() - covidCodeProductionDate) / (1000 * 3600 * 24) // days
          (((Date.now() - covidCodeProductionDate) % 86400000) % 3600000) /
            60000 // minutes
        );

        // generating new code every day

        if (daysPassed < 1) {
          // code generated on that day already, no need to produce new code

          const covidCode = JSON.parse(storedCovidStatus)["covid_code"];
          setCurrentCovidCode(covidCode);

          console.log(
            "less than one minute has passed... your unique covid code is " +
              covidCode
          );
        } else {
          // code needs to be updated

          const newCovidCode = await produceCovidCode();
          const jsonValue = JSON.stringify({
            covid_code: newCovidCode,
            covid_status: "Negative",
            update_date: Date.now(),
          });
          await AsyncStorage.setItem(COVID_STATUS, jsonValue).catch((error) => {
            console.log(error);
          });

          setCurrentCovidCode(newCovidCode);

          // the newly generated code needs to be pushed in COVID_CODES array

          try {
            const storedCovidCodes = await AsyncStorage.getItem(COVID_CODES);

            const covidCodesArray = JSON.parse(storedCovidCodes);
            covidCodesArray.push(newCovidCode);
            if (covidCodesArray.length >= 15) covidCodesArray.shift();
            const arrayJson = JSON.stringify(covidCodesArray);
            await AsyncStorage.setItem(COVID_CODES, arrayJson).catch(
              (error) => {
                console.log(error);
              }
            );
            //console.log("your previous codes: " + covidCodesArray.toString());
          } catch (e) {
            console.log(e);
          }
          console.log(
            "more than one minute has passed.... your new unique covid code is " +
              newCovidCode
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getCovidStatus() {
    try {
      const storedCovidStatus = await AsyncStorage.getItem(COVID_STATUS);
      if (storedCovidStatus !== null)
        setCovidStatus(JSON.parse(storedCovidStatus)["covid_status"]);
    } catch (e) {
      console.log(e);
    }
  }
  //   async function getCovidStatus() {
  //     await axios
  //       .get(
  //         "https://3mc5pe0gw4.execute-api.eu-central-1.amazonaws.com/Production/covid_status",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${idToken}` /* this is the JWT token from AWS Cognito. */,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         //console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }

  async function sendCovidStatusPositive() {
    await axios
      .post(
        "https://3mc5pe0gw4.execute-api.eu-central-1.amazonaws.com/Production/covid_status",
        {
          covid_code: `${currentCovidCode}`,
          covid_status: "Positive",
          update_date: Date.now(),
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}` /* this is the JWT token from AWS Cognito. */,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setCovidStatus("Positive");
        //console.log(covidStatus + ": covid status updated");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <CovidStatusContext.Provider
      value={{
        covidStatus,
        serviceUuid1,
        serviceUuid2,
        charUuid1,
        charUuid2,
        charUuid,
        currentCovidCode,
        sendCovidStatusPositive,
        getCovidStatus,
        storeCovidStatusPositiveLocally,
        storeCovidStatusNegativeLocally,
        studentCovidCodes,
        addStudentCovidCode,
        checkIfContacted,
        contacted,
      }}
    >
      {children}
    </CovidStatusContext.Provider>
  );
};

export default CovidStatusContext;
