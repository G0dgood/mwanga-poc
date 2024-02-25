import React, { useEffect, useState } from "react";
import ReportHeader from "../../../../components/ReportHeader";
import Report from "../LOB/Branch/pages/BranchReport";

const DispositionReport = () => {
  const [LOB, setLOB] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentLob"));
    setLOB(user);
  }, [LOB]);

  return (
    <div id="reports-screen-wrapper">
      <ReportHeader title={"Disposition Report"} />
      <Report />
    </div>
  );
};

export default DispositionReport;
