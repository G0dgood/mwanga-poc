import React, { useEffect, useState } from "react";
import moment from "moment";
// import FairMoneyReportDownloader from "../components/FairMoneyReportDownloader";
import { useNavigate } from "react-router-dom";
import { EntriesPerPage, NoRecordFound, TableFetch, customId } from "../../../../components/TableOptions";
import Search from "../../../../components/Search";
import CustomFilter from "../../../../components/CustomFilter";
import { FaFilter } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import ReportHeader from "../../../../components/ReportHeader";
import TableLoader from "../../../../components/TableLoader";
import { useAppDispatch, useAppSelector } from "../../../../store/useStore";
import { toast } from "react-toastify";
import { getUserPrivileges } from "../../../../hooks/auth";
import { userInfo } from "../../../../hooks/config";
import { getAgentResponses, getAllResponses } from "../../../../features/Customer/customerSlice";
import Pagination from "../../../../components/Pagination";

const Report = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isSuperAdmin, isSupervisor, isMis, isAgent } = getUserPrivileges();
	const { alldata, allisError, allmessage, allisLoading } = useAppSelector((state: any) => state.customer);
	const { getAgentResponsesdata, getAgentResponsesisError, getAgentResponsesmessage, getAgentResponsesisLoading } = useAppSelector((state: any) => state.customer);

	const [dropFilter, setDropFilter] = useState(false);
	const [selectedRadio, setSelectedRadio] = useState("All-time");

	const [data, setData] = useState<any>([]);
	const [filtered, setFilterd] = useState([]);
	const [filter, setFilter] = useState<any>([]);
	const [result, setResult] = useState("");

	const [startDates, setStartDates] = useState("");
	const [endDates, setEndDates] = useState("");

	console.log('alldata', alldata)
	console.log('getAgentResponsesdata', getAgentResponsesdata)
	console.log('filter', filter)

	// Error Handling Effect
	useEffect(() => {
		if (allisError) {
			toast.error(allmessage, { toastId: customId });
		} if (getAgentResponsesisError) {
			toast.error(getAgentResponsesmessage, { toastId: customId });
		}
	}, [dispatch, allisError, allmessage, getAgentResponsesisError, getAgentResponsesmessage]);



	useEffect(() => {
		const datas = { startDates, endDates }

		if (isAgent) {
			dispatch(getAgentResponses());
		} else {
			// @ts-ignore
			dispatch(getAllResponses(datas));
		}


	}, [dispatch, endDates, isAgent, startDates]);


	const handleCustomFilters = () => {
		const datas = { startDates, endDates }
		// @ts-ignore
		dispatch(getAllResponses(datas))
		setDropFilter(false)
	}


	useEffect(() => {
		if (
			userInfo &&
			(isMis ||
				isSupervisor ||
				isSuperAdmin)
		) {
			setData(alldata?.responses);
			setFilterd(alldata?.responses);
			setFilter(alldata?.responses);
		} else if (isAgent) {
			setData(getAgentResponsesdata?.responses);
			setFilterd(getAgentResponsesdata?.responses);
			setFilter(getAgentResponsesdata?.responses);
		}
	}, [alldata?.responses, getAgentResponsesdata?.responses, isAgent, isMis, isSuperAdmin, isSupervisor]);

	useEffect(() => {
		const results = filter?.filter(
			(data: { user: { userId: string; }; customer: { loan_id: string; }; }) =>
				data?.user?.userId?.toLowerCase()?.includes(result) ||
				data?.customer?.loan_id?.toLowerCase()?.includes(result)
		);
		setData(results);
	}, [result, filter]);

	const handleChangeFilter = (e: { target: { value: React.SetStateAction<string>; }; }) => {
		setResult(e.target.value);
	};



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
							<  FaChevronDown />
						</div>

						<div className="Disposition-Search ">
							<Search
								value={result}
								onChange={handleChangeFilter}
								placeHolder={"Search Agent ID  OR  Loan ID"}
							/>
						</div>

						{/* <EntriesPerPage
							data={filter}
						   entriesPerPage={entriesPerPage}
						  setEntriesPerPage={setEntriesPerPage}
						/> */}

						{dropFilter && (
							<CustomFilter
								filtered={filtered}
								setData={setData}
								setDropFilter={setDropFilter}
								selectedRadio={selectedRadio}
								setSelectedRadio={setSelectedRadio}
								setStartDates={setStartDates}
								setEndDates={setEndDates}
								data={data}
								handleCustomFilters={handleCustomFilters}
							/>
						)}
					</div>
					<div className="download-filtered-report">
						{/* <FairMoneyReportDownloader data={filter} /> */}
					</div>
				</div>

				<div className="table-container">
					{allisLoading ? <TableLoader isLoading={allisLoading} /> : ""}
					{getAgentResponsesisLoading ? <TableLoader isLoading={getAgentResponsesisLoading} /> : ""}
					<table className="scrollable">
						<thead>
							<tr>
								<th>Agent ID</th>
								<th>Campaign</th>
								<th>Bucket</th>
								<th>Loan ID</th>
								<th>customer name</th>
								<th>Disbursed Date</th>
								<th>Amount Disbursed</th>
								<th>Amount Delinquent</th>
								<th>Amount Repaid</th>
								<th>Days Delinquent</th>
								<th>Bank Name</th>
								<th>Phone Number</th>
								<th>Alternate Number</th>
								<th>discount(%)</th>
								<th>Call Disposition Parameter</th>
								<th>Right Party Contacted</th>
								<th>Promise to Pay</th>
								<th>PTP Date</th>
								<th>Commitment Amount</th>
								<th>Callback Date</th>
								<th>Reason for Delinquency</th>
								<th>Preferred Method</th>
								<th>Auto comment</th>
								<th>Manual comment</th>
								<th>Disposition Date</th>
								<th>Agent</th>
								<th>Last Upload Date</th>
							</tr>
						</thead>
						<tbody>
							{false ? (
								<TableFetch colSpan={15} />
							) : data?.length === 0 || data == null ? (
								<NoRecordFound colSpan={19} />
							) : (
								data?.map((item: any) => (
									<tr key={item._id}>
										<td>{item?.user?.userId}</td>
										<td>{item?.customer?.campaign}</td>
										<td> </td>
										<td>{item?.customer?.loanId}</td>
										<td>{item?.customer?.customer_name}</td>
										<td>{moment(item?.customer?.disbursed_date).format("DD-MMM-YY")}</td>
										<td> {item?.customer?.amount_disbursed} </td>
										<td>{item?.customer?.amount_delinquent}</td>
										<td>{item?.customer?.amount_repaid}</td>
										<td>{item?.customer?.days_delinquent}</td>
										<td>{item?.customer?.bank_name}</td>
										<td>{item?.customer?.phone1}</td>
										<td>{item?.customer?.phone2}</td>
										<td>{item?.customer?.discount}</td>
										<td>{item?.disposition}</td>
										<td>{item?.rightPartyContacted}</td>
										<td>{item?.promiseToPay}</td>
										<td>{moment(item?.promiseToPayDate).format("DD-MMM-YY")}</td>
										<td> ,,</td>
										<td>{moment(item?.callBackDate).format("DD-MMM-YY")}</td>
										<td>{item?.reasonForDelinquency}</td>
										<td>{item?.prefferedMethods}</td>
										<td>{item?.autoComment}</td>
										<td>{item?.comment}</td>
										<td>,,</td>
										<td>{item?.user?.userId}</td>
										<td>{item?.customer?.extension_expiry_timestamp}</td>
									</tr>
								))
							)}
						</tbody>
					</table>
					<Pagination
						setDisplayData={setDisplayUsers}
						data={filter}
						// entriesPerPage={entriesPerPage}
						Total={"Reports"}
					/>
				</div>
			</div>
		</div>
	);
};

export default Report; 