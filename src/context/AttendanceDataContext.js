import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import AuthContext from "./AuthContext";

const AttendanceDataContext = React.createContext();

export const AttendanceDataProvider = ({ children }) => {
  const { idToken, name, familyName, idNumber } = useContext(AuthContext);

  const [attendanceData, setAttendanceData] = useState([]);

  /*useEffect(() => {
    pullData();
  }, [idToken]);*/

  const addAttendanceData = () => {
    setAttendanceData([
      ...attendanceData,
      {
        instructor_name: "New Instructor",
        lecture_name: `New Lecture ${attendanceData.length + 1}`,
      },
    ]);
  };

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

  // BU KOD INSTRUCTOR TARAFINDA ÇALIŞACAK, STUDENT LIST CONTEXT GİBİ BİR ŞEY GEREKEBİLİR
  const sendAttendanceData = async () => {
    await axios
      .post(
        "https://3mc5pe0gw4.execute-api.eu-central-1.amazonaws.com/Production/kuvid_take_attendance",
        {
          operation: "create",
          payload: {
            TableName: "attendance",
            Item: {
              lecture_name: "comp319",
              timestamp: "2021-11-12T16:30:00",
              instructor_id: 2,
              instructor_name: "Barış Akgün",
              instructor_email: "bakgun@ku.edu.tr",
              students: [
                {
                  student_name: "Selin Öztürk",
                  student_id: "60160",
                },
              ],
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}` /* this is the JWT token from AWS Cognito. */,
            "Content-Type": "application/json",
          },
        }
      )
      .catch((error) => {
        console.log(error);
      });
  };

  //BU KOD INSTRUCTOR TARAFINDA ÇALIŞACAK
  const getInstructorAttendanceData = async () => {
    await axios
      .post(
        "https://3mc5pe0gw4.execute-api.eu-central-1.amazonaws.com/Production/kuvid_get_students_list",
        {
          instructor_id: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}` /* this is the JWT token from AWS Cognito. */,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        console.log("getting data from axios", response.data);
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
        addAttendanceData,
        pullData,
        cleanData,
        sendAttendanceData,
        getInstructorAttendanceData,
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
