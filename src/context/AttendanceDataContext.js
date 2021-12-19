import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import AuthContext from "./AuthContext";

const AttendanceDataContext = React.createContext();

export const AttendanceDataProvider = ({ children }) => {
  const { idToken, name, familyName, idNumber } = useContext(AuthContext);

  //const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  /*   useEffect(() => {
    pullData();
  }, [idToken]); */

  /* const addAttendanceData = () => {
    setAttendanceData([
      ...attendanceData,
      {
        instructor_name: "New Instructor",
        lecture_name: `New Lecture ${attendanceData.length + 1}`,
      },
    ]);
  }; */

  /*   async function addAttendanceData(deviceName) {
    return new Promise((resolve, reject) => {
      //here our function should be implemented
      console.log("attendance data eklicem");
      setAttendanceData((attendanceData) => [
        ...attendanceData,
        {
          deviceName: deviceName,
          deviceId: `${attendanceData.length + 1}`,
        },
      ]);
      console.log("attendance data added");
      resolve();
    });
  } */

  /*async function addAttendanceData(deviceName) {
    return new Promise((resolve, reject) => {
      //here our function should be implemented
      console.log("attendance data eklicem");
      setAttendanceData([attendanceData.add(deviceName)]);
      console.log("attendance data added");
      resolve();
    });
  }*/

  const cleanData = () => {
    setAttendanceData([]);
  };

  /*const addAttendanceData = () => {
        setAttendanceData([...attendanceData, 
            {key: `${attendanceData.length + 1}`,
            date: `${moment().format("DD MMM YYYY")}`,
            time: `${moment().format("HH.mm")}`,
            lectureName: "XXX123",
            classroom: "ABCD45"}]);
    }*/

  const pullData = async () => {
    await axios
      .post(
        "https://3mc5pe0gw4.execute-api.eu-central-1.amazonaws.com/Production/attendance_records",
        {
          student: {
            student_name: `${name} ${familyName}`,
            student_id: `${idNumber}`,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}` /* this is the JWT token from AWS Cognito. */,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        //setUsername(response.data[0].Username);
        //console.log("username:"+response.data[0].Username);
        //console.log("getting data from axios", response.data);
        var tempResponse = eval(response.data.body);
        setAttendanceData(tempResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const pullData = async () => {
  //     await fetch('https://3mc5pe0gw4.execute-api.eu-central-1.amazonaws.com/Production/attendance_records', {
  //     method: 'GET',
  //     body: null,
  //     headers: {
  //       Authorization: 'Bearer ' + token, /* this is the JWT token from AWS Cognito. */
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   .then((response) => {
  //       console.log(JSON.stringify(response, null, 2))
  //   })
  // }

  return (
    <AttendanceDataContext.Provider
      value={{
        attendanceData,
        pullData,
        cleanData,
      }}
    >
      {children}
    </AttendanceDataContext.Provider>
  );
};

export default AttendanceDataContext;

/**
 * const attendanceData = [{
        key: 1,
        date: "20 Oct 2021",
        time: "13.01",
        lectureName: "COMP491",
        classroom: "SNAA21"
    },
    {
        key: 2,
        date: "18 Oct 2021",
        time: "13.00",
        lectureName: "ECON201",
        classroom: "CASEB21"
    },
    {
        key: 3,
        date: "13 Oct 2021",
        time: "12.47",
        lectureName: "COMP491",
        classroom: "SOSB21"
    },
    {
        key: 4,
        date: "11 Oct 2021",
        time: "13.01",
        lectureName: "ECON201",
        classroom: "SOSB21"
    },
    {
        key: 5,
        date: "10 Oct 2021",
        time: "13.01",
        lectureName: "MAVA205",
        classroom: "SNAA21"
    },
    {
        key: 6,
        date: "9 Oct 2021",
        time: "13.06",
        lectureName: "COMP491",
        classroom: "SOSB21"
    },
    {
        key: 7,
        date: "7 Oct 2021",
        time: "13.10",
        lectureName: "COMP491",
        classroom: "CASEB07"
    },
    {
        key: 8,
        date: "6 Oct 2021",
        time: "13.01",
        lectureName: "COMP491",
        classroom: "SOSB21"
    }];
 */
