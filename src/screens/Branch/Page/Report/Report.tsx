import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import FairMoneyReportDownloader from "../components/FairMoneyReportDownloader";

import { useNavigate } from "react-router-dom";
import { EntriesPerPage, NoRecordFound, TableFetch } from "../../../../components/TableOptions";
import Search from "../../../../components/Search";
import CustomFilter from "../../../../components/CustomFilter";
import { FaFilter } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import ReportHeader from "../../../../components/ReportHeader";

const Report = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [dropFilter, setDropFilter] = useState(false);
	const [selectedRadio, setSelectedRadio] = useState("All-time");

	const [data, setData] = useState<any>([]);
	const [filtered, setFilterd] = useState([]);
	const [filter, setFilter] = useState([]);
	const [result, setResult] = useState("");

	const [startDates, setStartDates] = useState("");
	const [endDates, setEndDates] = useState("");






	// useEffect(() => {
	// 	if (userInfo) {
	// 		userInfo?.role === "agent"
	// 			? dispatch(getFairMoneyAgentResponsesAction())
	// 			: dispatch(getAllFairMoneyResponsesAction(startDates, endDates));
	// 	} else {
	// 		navigate("/");
	// 	}
	// }, [dispatch, endDates, navigate, startDates, userInfo]);

	// useEffect(() => {
	// 	if (
	// 		userInfo &&
	// 		(userInfo?.role === "admin" ||
	// 			userInfo?.role === "supervisor" ||
	// 			userInfo?.role === "mis")
	// 	) {
	// 		setData(allRespData?.data);
	// 		setFilterd(allRespData?.data);
	// 		setFilter(allRespData?.data);
	// 	} else if (userInfo && userInfo.role === "agent") {
	// 		setData(agentRespData?.data);
	// 		setFilterd(agentRespData?.data);
	// 		setFilter(agentRespData?.data);
	// 	}
	// }, [userInfo, allRespData, agentRespData]);

	// useEffect(() => {
	// 	const results = filter?.filter(
	// 		(data) =>
	// 			data?.user?.userId?.toLowerCase()?.includes(result) ||
	// 			data?.customer?.loan_id?.toLowerCase()?.includes(result)
	// 	);
	// 	setData(results);
	// }, [result, filter]);

	// const handleChangeFilter = (e) => {
	// 	setResult(e.target.value);
	// };

	const [displayUsers, setDisplayUsers] = useState([]);

	return (
		<div id="reports-screen-wrapper">
			<ReportHeader title={"Disposition Report"} />
			<div className="report-body">
				<div className="report-features-area">
					<div className="filter-area">
						<div className="filter-btn"
						>
							<div className="btn-side-container" onClick={() => setDropFilter(!dropFilter)}>
								<button className="btn-side">
									<  FaFilter />
									Custom Filter
								</button>
								<span className="btn-side-icon">
									<  FaChevronDown />
								</span>
							</div>
							{/* <  FaFilter />
						<p>Custom Filter</p> */}
							<i className="fas fa-chevron-down" />
						</div>

						<div className="Disposition-Search ">
							<Search
								value={result}
								// onChange={handleChangeFilter}
								placeHolder={"Search Agent ID  OR  Loan ID"}
							/>
						</div>

						<EntriesPerPage
							data={filter}
						// entriesPerPage={entriesPerPage}
						// setEntriesPerPage={setEntriesPerPage}
						/>

						{dropFilter && (
							<CustomFilter
								filtered={filtered}
								setData={setData}
								setDropFilter={setDropFilter}
								selectedRadio={selectedRadio}
								setSelectedRadio={setSelectedRadio}
								setStartDates={setStartDates}
								setEndDates={setEndDates}
								datad={data}
							/>
						)}
					</div>
					<div className="download-filtered-report">
						{/* <FairMoneyReportDownloader data={filter} /> */}
					</div>
				</div>

				<div className="table-container">
					{/* <XLoader isLoading={isLoading} /> */}
					<table className="scrollable">
						<thead>
							<tr>
								<th>Call Date</th>
								<th>Agent ID</th>
								<th>Enter Date</th>
								<th>Loan ID</th>
								<th>Disbursement Date</th>
								<th>Name of Borrower</th>
								<th>Email</th>
								<th>Signup Phone Number</th>
								<th>Reason For Non Payment</th>
								<th>Promise To Pay</th>
								<th>Comment</th>
								<th>Commitment Date</th>
								<th>Bank Name</th>
								<th>Account Number</th>
								<th>Amount Repaid</th>
								<th>Amount Disbursed</th>
								<th>Amount to Repay Today</th>
								<th>Days Late</th>
								<th>Call Status</th>
								<th>Extension Offer</th>
								<th>Extension Expiry Timestamp</th>
							</tr>
						</thead>
						<tbody>
							{false ? (
								<TableFetch colSpan={15} />
							) : displayUsers?.length === 0 || displayUsers == null ? (
								<NoRecordFound colSpan={19} />
							) : (
								data?.map((item: any) => (
									<tr key={item._id}>
										<td>{moment(item?.createdAt).format("DD-MMM-YY")}</td>
										<td>{item?.user?.userId}</td>
										<td>
											{moment(item?.customer?.enter_date).format("DD-MMM-YY")}
										</td>
										<td>{item?.customer?.loan_id}</td>
										<td>
											{moment(item?.customer?.disbursement_date).format(
												"DD-MMM-YY"
											)}
										</td>
										<td>{item?.customer?.name_of_borrower}</td>
										<td>{item?.customer?.email}</td>
										<td>{item?.customer?.signup_phone_number}</td>
										<td>{item?.reasonForNonPayment}</td>
										<td>{item?.promiseToPay}</td>
										<td>{item?.comment}</td>
										<td>{moment(item?.commitmentDate).format("DD-MMM-YY")}</td>
										<td>{item?.customer?.bank_name}</td>
										<td>{item?.customer?.account_number}</td>
										<td>{item?.customer?.amount_repaid}</td>
										<td>{item?.customer?.amount_disbursed}</td>
										<td>{item?.amountToBeRecieved}</td>
										<td>{item?.customer?.days_late}</td>
										<td>{item?.callStatus}</td>
										<td>{item?.customer?.extension_offer}</td>
										<td>{item?.customer?.extension_expiry_timestamp}</td>
									</tr>
								))
							)}
						</tbody>
					</table>
					{/* <Pagination
					setDisplayData={setDisplayUsers}
					data={filter}
					// entriesPerPage={entriesPerPage}
					Total={"Reports"}
				/> */}
				</div>
			</div>
		</div>
	);
};

export default Report;
