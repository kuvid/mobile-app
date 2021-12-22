import React, { useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import CovidStatusContext from "./CovidStatusContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import UUIDGenerator from "react-native-uuid-generator";

var _ = require("lodash");

const NotificationContext = React.createContext();

export const NotificationProvider = ({ children }) => {
  const { contacted } = useContext(CovidStatusContext);
  const [notifications, setNotifications] = useState([]);

  const COVID_STATUS = "@save_covid_status";
  const COVID_CODES = "@covid_codes";

  useEffect(() => {
    setTimeout(() => {
      if (contacted) {
        createWarningNotification();
      } else {
        createReliefNotification();
      }
    }, 1000);
  }, [contacted]);

  const createWarningNotification = async () => {
    const newNotification = {
      key: notifications.length,
      date: Date(),
      title: "You might want to get tested!",
      details: "One of your classmates is diagnosed with COVID-19.",
    };
    setNotifications((prev) => [newNotification, ...notifications]);
  };

  const createReliefNotification = async () => {
    const newNotification = {
      key: notifications.length,
      date: Date(),
      title: "You are no longer at COVID-19 risk!",
      details: "No one in your class is diagnosed COVID-19.",
    };
    setNotifications((prev) => [...notifications, newNotification]);
  };

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
