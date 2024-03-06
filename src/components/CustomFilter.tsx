import { useState, useEffect } from "react";
import moment from "moment";
import ModalHeader from "./Modal/ModalHeader";

const CustomFilter = ({
  setDropFilter,
  selectedRadio,
  setSelectedRadio,
  setEndDate,
  setStartDate,
  handleCustomFilters
}: any) => {



  const [dateRangeStart, setDateRangeStart] = useState("");
  const [dateRangeEnd, setDateRangeEnd] = useState("");

  const currentDate = moment().format("YYYY-MM-DD");
  const thirtyDays = moment().subtract(30, "days").format("YYYY-MM-DD");
  const sevenDays = moment().subtract(7, "days").format("YYYY-MM-DD");
  const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
  const allTime = "2024-01-30";

  useEffect(() => {
    if (selectedRadio === "All-time") {
      setStartDate(allTime);
      setEndDate(currentDate);
    } else if (selectedRadio === "30-Days") {
      setStartDate(thirtyDays);
      setEndDate(currentDate);
    } else if (selectedRadio === "7-Days") {
      setStartDate(sevenDays);
      setEndDate(currentDate);
    } else if (selectedRadio === "Yesterday") {
      setStartDate(yesterday);
      setEndDate(yesterday);
    } else if (selectedRadio === "Today") {
      setStartDate(currentDate);
      setEndDate(currentDate);
    } else if (selectedRadio === "DateRange") {
      setStartDate(moment(dateRangeStart)?.format("YYYY-MM-DD"));
      setEndDate(moment(dateRangeEnd)?.format("YYYY-MM-DD"));
    }
  }, [selectedRadio, dateRangeStart, dateRangeEnd, currentDate, yesterday, sevenDays, thirtyDays, setStartDate, setEndDate]);







  return (
    <div className="filter-dropdown">
      <ModalHeader headerTitle={"Filter options:"} setShow={setDropFilter} />
      <form className="checkbox-grp" onSubmit={handleCustomFilters} >
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
        <div className="submit-filter mt-4" >
          <button type="submit" className="btn"  >Filter</button>
        </div>
      </form>
    </div>
  );
};

export default CustomFilter;
