import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../store/actions/userActions";
import {
  getAllResponsesAction,
  getUserResponsesAction,
} from "../LOB/Branch/store/actions/customerActions";
import {
  getAllAccessResponsesAction,
  getAccessAgentResponsesAction,
} from "../store/actions/accessActions";
import moment from "moment";
import BarChart from "../../../../components/BarChart";
import { useNavigate } from "react-router-dom";

const DispositionTrend = ({
  selectedDate,
  startDate,
  yesterday,
  endDate,
  currentDate,
  sevenDays,
  setStartDate,
  setEndDate,
  allTime,
  dateRangeStart,
  dateRangeEnd,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lob = JSON.parse(localStorage.getItem("currentLob"));

  const [data, setData] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // --- Branch --- //
  const getAllResponses = useSelector((state) => state.getAllResponses);
  const { data: allResponses } = getAllResponses;

  const getUserResponses = useSelector((state) => state.getUserResponses);
  const { data: userResponses } = getUserResponses;

  // --- Access --- //
  const getAllAccessResponses = useSelector(
    (state) => state.getAllAccessResponses
  );
  const { data: allAccessData } = getAllAccessResponses;

  const getAccessAgentResponses = useSelector(
    (state) => state.getAccessAgentResponses
  );
  const { data: accessAgentData } = getAccessAgentResponses;

  useEffect(() => {
    if (userInfo && lob === "Branch") {
      dispatch(getUserProfileAction());
      dispatch(getAllResponsesAction());
      dispatch(getUserResponsesAction());
    } else if (userInfo && lob === "Access") {
      dispatch(getUserProfileAction());
      dispatch(getAllAccessResponsesAction());
      dispatch(getAccessAgentResponsesAction());
    } else {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo, lob]);

  useEffect(() => {
    if (selectedDate === "Today") {
      setStartDate(currentDate);
      setEndDate(currentDate);
    } else if (selectedDate === "Yesterday") {
      setStartDate(yesterday);
      setEndDate(yesterday);
    } else if (selectedDate === "7-Days") {
      setStartDate(sevenDays);
      setEndDate(currentDate);
    } else if (selectedDate === "Last-Month") {
      setStartDate(sevenDays);
      setEndDate(currentDate);
    } else if (selectedDate === "allTime") {
      setStartDate(allTime);
      setEndDate(currentDate);
    } else if (selectedDate === "DateRange") {
      setStartDate(moment(dateRangeStart)?.format("YYYY-MM-DD"));
      setEndDate(moment(dateRangeEnd)?.format("YYYY-MM-DD"));
    }
  }, [
    selectedDate,
    currentDate,
    sevenDays,
    yesterday,
    setStartDate,
    setEndDate,
    allTime,
    dateRangeStart,
    dateRangeEnd,
  ]);

  useEffect(() => {
    if (userInfo && lob === "Access") {
      if (
        userInfo.role === "admin" ||
        userInfo.role === "supervisor" ||
        userInfo.role === "mis"
      ) {
        const filterAllAccessData = allAccessData?.data?.filter(
          (obj) =>
            moment(obj.createdAt).format("YYYY-MM-DD") >= startDate &&
            moment(obj.createdAt).format("YYYY-MM-DD") <= endDate
        );
        setData(filterAllAccessData);
      } else if (userInfo.role === "agent") {
        const filterAccessAgentData = accessAgentData?.data?.filter(
          (obj) =>
            moment(obj.createdAt).format("YYYY-MM-DD") >= startDate &&
            moment(obj.createdAt).format("YYYY-MM-DD") <= endDate
        );
        setData(filterAccessAgentData);
      }
    }
  }, [
    lob,
    userInfo,
    allResponses,
    userResponses,
    allAccessData,
    accessAgentData,
    startDate,
    endDate,
  ]);

  // --- Setting Up Dashboard Overview --- //
  const [succDisp, setSuccDisp] = useState([]);
  const [failDisp, setFailDisp] = useState([]);
  const [notPicked, setNotPicked] = useState([]);
  const [switchedOff, setSwitchedOff] = useState([]);
  const [Unsuccessful, setUnsuccessful] = useState([]);

  useEffect(() => {
    if (lob === "Access") {
      setSuccDisp(
        data?.filter((obj) => {
          return obj.callAnswered === "Successful";
        })
      );
      setUnsuccessful(
        data?.filter((obj) => {
          return obj.callAnswered === "Unsuccessful";
        })
      );
      setFailDisp(
        data?.filter((obj) => {
          return obj.callAnswered === "Not Reached";
        })
      );
      setNotPicked(
        data?.filter((obj) => {
          return obj.callAnswered === "Not Picked";
        })
      );
      setSwitchedOff(
        data?.filter((obj) => {
          return obj.callAnswered === "Switched Off";
        })
      );
    } else {
      return () => data;
    }
  }, [lob, data]);

  return (
    <div className="barchart-grid">
      <div id="chart-display">
        <div className="chart-wrap" style={{ width: "100%" }}>
          <BarChart
            succDisp={succDisp}
            failDisp={failDisp}
            notPicked={notPicked}
            switchedOff={switchedOff}
            Unsuccessful={Unsuccessful}
          />
        </div>

        <div className="cumulative-figures">
          <div>
            <p>Total Call</p>
            <h5>{data?.length === undefined ? 0 : data?.length}</h5>
          </div>
          <div>
            <p>Successful</p>
            <h5>{succDisp?.length === undefined ? 0 : succDisp?.length}</h5>
          </div>
          <div>
            <p>Not Reached</p>
            <h5>{failDisp?.length === undefined ? 0 : failDisp?.length}</h5>
          </div>
          <div>
            <p>Not Picked</p>
            <h5>{notPicked?.length === undefined ? 0 : notPicked?.length}</h5>
          </div>
          <div>
            <p>Switched Off</p>
            <h5>
              {switchedOff?.length === undefined ? 0 : switchedOff?.length}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispositionTrend;
