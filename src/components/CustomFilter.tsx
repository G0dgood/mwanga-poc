import React, { useState, useEffect } from "react";
import moment from "moment";


const CustomFilter = ({
  filtered,
  setData,
  setDropFilter,
  selectedRadio,
  setSelectedRadio,
  setEndDates,
  setStartDates,
}: any) => {


  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateRangeStart, setDateRangeStart] = useState("");
  const [dateRangeEnd, setDateRangeEnd] = useState("");

  const currentDate = moment().format("YYYY-MM-DD");
  const thirtyDays = moment().subtract(30, "days").format("YYYY-MM-DD");
  const sevenDays = moment().subtract(7, "days").format("YYYY-MM-DD");
  const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
  const allTime = "2022-02-30";

  // useEffect(() => {
  //   if (selectedRadio === "All-time") {
  //     setStartDate(allTime);
  //     setEndDate(currentDate);
  //   } else if (selectedRadio === "30-Days") {
  //     setStartDate(thirtyDays);
  //     setEndDate(currentDate);
  //   } else if (selectedRadio === "7-Days") {
  //     setStartDate(sevenDays);
  //     setEndDate(currentDate);
  //   } else if (selectedRadio === "Yesterday") {
  //     setStartDate(yesterday);
  //     setEndDate(yesterday);
  //   } else if (selectedRadio === "Today") {
  //     setStartDate(currentDate);
  //     setEndDate(currentDate);
  //   } else if (selectedRadio === "DateRange") {
  //     setStartDate(moment(dateRangeStart)?.format("YYYY-MM-DD"));
  //     setEndDate(moment(dateRangeEnd)?.format("YYYY-MM-DD"));
  //   }
  // }, [
  //   selectedRadio,
  //   dateRangeStart,
  //   dateRangeEnd,
  //   currentDate,
  //   yesterday,
  //   sevenDays,
  //   thirtyDays,
  // ]);

  // const handleCustomFilter = (e) => {
  //   e.preventDefault();
  //   setDropFilter(false);
  //   setEndDates(endDate);
  //   setStartDates(startDate);
  // };

  // const handleCustomFilters = (e) => {
  //   e.preventDefault();
  //   const filteredData = filtered?.filter(
  //     (item) =>
  //       moment(item.createdAt)?.format("YYYY-MM-DD") >= startDate &&
  //       moment(item.createdAt)?.format("YYYY-MM-DD") <= endDate
  //   );
  //   setData(filteredData);
  //   setDropFilter(false);
  // };

  return (
    <div className="filter-dropdown">
      <form
        className="checkbox-grp"
      // onSubmit={
      //   userInfo?.role === "agent" ? handleCustomFilters : handleCustomFilter
      // }
      >
        <i className="fas fa-times" onClick={() => setDropFilter(false)} />
        <p>Filter options:</p>
        <div className="checkbox-ctrl">
          <input
            type="radio"
            name="filter"
            id="filter-all-time"
            value="All-time"
            checked={selectedRadio === "All-time" && true}
            onChange={(e) => setSelectedRadio(e.target.value)}
          />
          <label htmlFor="filter-all-time">All Time Record</label>
        </div>
        <div className="checkbox-ctrl">
          <input
            type="radio"
            name="filter"
            id="filter-30-days"
            value="30-Days"
            checked={selectedRadio === "30-Days" && true}
            onChange={(e) => setSelectedRadio(e.target.value)}
          />
          <label htmlFor="filter-30-days">Last 30 Days</label>
        </div>
        <div className="checkbox-ctrl">
          <input
            type="radio"
            name="filter"
            id="filter-7-Days"
            value="7-Days"
            checked={selectedRadio === "7-Days" && true}
            onChange={(e) => setSelectedRadio(e.target.value)}
          />
          <label htmlFor="filter-7-Days">Last 7 Days</label>
        </div>
        <div className="checkbox-ctrl">
          <input
            type="radio"
            name="filter"
            id="filter-yesterday"
            value="Yesterday"
            checked={selectedRadio === "Yesterday" && true}
            onChange={(e) => setSelectedRadio(e.target.value)}
          />
          <label htmlFor="filter-yesterday">Yesterday</label>
        </div>
        <div className="checkbox-ctrl">
          <input
            type="radio"
            name="filter"
            id="filter-today"
            value="Today"
            checked={selectedRadio === "Today" && true}
            onChange={(e) => setSelectedRadio(e.target.value)}
          />
          <label htmlFor="filter-today">Today</label>
        </div>
        <div className="checkbox-ctrl">
          <input
            type="radio"
            name="filter"
            id="filter-dateRange"
            value="DateRange"
            checked={selectedRadio === "DateRange" && true}
            onChange={(e) => setSelectedRadio(e.target.value)}
          />
          <label htmlFor="filter-dateRange">Date Range</label>
        </div>
        <div className="filter-date-range">
          <input
            type="text"
            disabled={selectedRadio !== "DateRange" && true}
            onFocus={(e) => (e.currentTarget.type = "date")}
            onBlur={(e) => (e.currentTarget.type = "text")}
            placeholder="From..."
            value={selectedRadio !== "DateRange" ? "" : dateRangeStart}
            onChange={(e) => setDateRangeStart(e.target.value)}
          />
          <input
            type="text"
            disabled={selectedRadio !== "DateRange" && true}
            onFocus={(e) => (e.currentTarget.type = "date")}
            onBlur={(e) => (e.currentTarget.type = "text")}
            placeholder="To..."
            value={selectedRadio !== "DateRange" ? "" : dateRangeEnd}
            onChange={(e) => setDateRangeEnd(e.target.value)}
          />
        </div>
        <div className="submit-filter">
          <input type="submit" value="Filter" />
        </div>
      </form>
    </div>
  );
};

export default CustomFilter;
