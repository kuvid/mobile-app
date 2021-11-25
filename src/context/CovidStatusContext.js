import React, { useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CovidStatusContext = React.createContext();

export const CovidStatusProvider = ({ children }) => {
  const STORAGE_KEY = "@save_covid_status";

  const { idToken } = useContext(AuthContext);
  const [covidStatus, setCovidStatus] = useState("");

  async function storeCovidStatusPositiveLocally() {
    const jsonValue = JSON.stringify({
      covid_code: "123",
      covid_status: "Positive",
      update_date: Date(),
    });
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
      .then(() => getCovidStatus())
      //.then(()=>sendCovidStatusPositive) //bu kodu ekleyeceğiz
      .catch((error) => {
        console.log(error);
      });
  }

  async function getCovidStatus() {
    try {
      const storedCovidStatus = await AsyncStorage.getItem(STORAGE_KEY);
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
          covid_code: "123",
          covid_status: "Negative",
          update_date: Date(),
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
        sendCovidStatusPositive,
        getCovidStatus,
        storeCovidStatusPositiveLocally,
      }}
    >
      {children}
    </CovidStatusContext.Provider>
  );
};

export default CovidStatusContext;
