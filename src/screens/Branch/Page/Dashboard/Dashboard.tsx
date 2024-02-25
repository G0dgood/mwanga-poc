import React, { useState, useEffect } from "react";
import moment from "moment";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNavBar from "../../../../components/SideNavBar";
import Header from "../../../../components/Header";
import DoughnutChart from "../../../../components/DoughnutChart";
import { FaPhone } from "react-icons/fa";
import BottomNavigation from "../../../../components/BottomNavigation";
import { useAppDispatch, useAppSelector } from "../../../../store/useStore";
import { userprofile } from "../../../../features/Auth/authSlice";

interface DashboardProps {
  collapseNav: boolean;
}

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userprofiledata } = useAppSelector((state: any) => state.auth);



  useEffect(() => {
    dispatch(userprofile());
  }, [])



  const [selectedDate, setSelectedDate] = useState("Today");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const currentDate = moment().format("YYYY-MM-DD");
  const sevenDays = moment().subtract(7, "days").format("YYYY-MM-DD");
  const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

  const [data, setData] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");



  // useEffect(() => {
  //   const getResponsesAction = (lobKey, agentAction, allAction) => {
  //     if (userInfo?.role === "agent") {
  //       dispatch(agentAction());
  //     } else {
  //       dispatch(allAction(fromDate, toDate));
  //     }
  //   };



  useEffect(() => {
    if (selectedDate === "Today") {
      setStartDate(currentDate);
      setEndDate(currentDate);
      setToDate("");
      setFromDate("");
    } else if (selectedDate === "Yesterday") {
      setStartDate(yesterday);
      setEndDate(yesterday);
      setToDate(yesterday);
      setFromDate(yesterday);
    } else if (selectedDate === "7-Days") {
      setStartDate(sevenDays);
      setEndDate(currentDate);
      setToDate(sevenDays);
      setFromDate(currentDate);
    }
  }, [selectedDate, currentDate, sevenDays, yesterday]);

  //  useEffect(() => { 
  //        const filterAllData = allResponses?.data?.filter(
  //          (obj) =>
  //            moment(obj.createdAt).format("YYYY-MM-DD") >= startDate &&
  //            moment(obj.createdAt).format("YYYY-MM-DD") <= endDate
  //        );
  //        setData(filterAllData);
  //      } else if (userInfo.role === "agent") {
  //        const filterUserData = userResponses?.data?.filter(
  //          (obj) =>
  //            moment(obj.createdAt).format("YYYY-MM-DD") >= startDate &&
  //            moment(obj.createdAt).format("YYYY-MM-DD") <= endDate
  //        );
  //        setData(filterUserData);
  //      }

  // }, [   startDate,  endDate ]);

  // --- Setting Up Dashboard Overview --- //
  // const [succDisp, setSuccDisp] = useState([]);
  // const [failDisp, setFailDisp] = useState([]);

  //  useEffect(() => {

  //      setSuccDisp(
  //        data?.filter((obj) => {
  //          return obj?.callAnswered === "Yes";
  //        })
  //      );
  //      setFailDisp(
  //        data?.filter((obj) => {
  //          return obj?.callAnswered === "No";
  //        })
  //      );
  //    }  

  //   }, [   data]);






  return (
    <div id="screen-wrapper">
      <Header />
      <SideNavBar />
      <BottomNavigation />
      <main>
        <div className="call-section">
          <div className="call-cards">
            <div className="total-calls">
              < FaPhone className="ifa" />
            </div>
            <span className="call-score">0</span>
            <span className="call-text">Total calls</span>
          </div>
          <div className="call-cards">
            <div className="successful-calls">
              < FaPhone />
            </div>
            <span className="call-score">0</span>
            <span className="call-text">Succesful calls</span>
          </div>
          <div className="call-cards">
            <div className="failed-calls">
              < FaPhone className="ifa" />
            </div>
            <span className="call-score">0</span>
            <span className="call-text">Failed calls</span>
          </div>
        </div>
        <div className="chart-section">
          <div className="chart-card">
            <DoughnutChart
              chartData={data}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
