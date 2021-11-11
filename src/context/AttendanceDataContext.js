import React, { useState, useContext } from "react";
import moment from "moment";
import AuthContext from "./AuthContext";

const AttendanceDataContext = React.createContext();

export const AttendanceDataProvider = ({children}) => {

    const { token } = useContext(AuthContext);

    const [attendanceData, setAttendanceData] = useState([]);

    const addAttendanceData = () => {
        setAttendanceData([...attendanceData, 
            {key: `${attendanceData.length + 1}`,
            date: `${moment().format("DD MMM YYYY")}`,
            time: `${moment().format("HH.mm")}`,
            lectureName: "XXX123",
            classroom: "ABCD45"}]);
    }

    const pullData = async () => {
        await fetch('https://3mc5pe0gw4.execute-api.eu-central-1.amazonaws.com/Production/users', {
        method: 'GET',
        body: null,
        headers: {
          Authorization: 'Bearer ' + token, /* this is the JWT token from AWS Cognito. */
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
          console.log(JSON.stringify(response, null, 2))
      })
    }
    
    return <AttendanceDataContext.Provider value={{attendanceData, addAttendanceData, pullData}}>
        {children}
    </AttendanceDataContext.Provider>;
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
