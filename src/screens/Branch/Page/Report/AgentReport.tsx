import React, { useEffect, useState } from "react";
import moment from "moment";
import { EntriesPerPage, NoRecordFound, TableFetch, customId } from "../../../../components/TableOptions";
import Search from "../../../../components/Search";
import CustomFilter from "../../../../components/CustomFilter";
import { FaFilter } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import ReportHeader from "../../../../components/ReportHeader";
import TableLoader from "../../../../components/TableLoader";
import { useAppDispatch, useAppSelector } from "../../../../store/useStore";
import { toast } from "react-toastify";
import { getAgentResponses } from "../../../../features/Customer/customerSlice";
import Pagination from "../../../../components/Pagination";
import ReportDownloader from "../../components/ReportDownloader";


const AgentReport = () => {
	const dispatch = useAppDispatch();

	const { getAgentResponsesdata, getAgentResponsesisError, getAgentResponsesmessage, getAgentResponsesisLoading } = useAppSelector((state: any) => state.customer);

	const [dropFilter, setDropFilter] = useState(false);
	const [selectedRadio, setSelectedRadio] = useState("All-time");

	const [data, setData] = useState<any>([]);
	const [filtered, setFilterd] = useState([]);
	const [filter, setFilter] = useState<any>([]);
	const [result, setResult] = useState("");



	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");




	// Error Handling Effect
	useEffect(() => {
		dispatch(getAgentResponses());
		if (getAgentResponsesisError) {
			toast.error(getAgentResponsesmessage, { toastId: customId });
		}
	}, [dispatch, getAgentResponsesisError, getAgentResponsesmessage]);



	const handleCustomFilters = () => {
		dispatch(getAgentResponses())
		setDropFilter(false)
	}



	useEffect(() => {
		setFilterd(getAgentResponsesdata?.responses);
		setFilter(getAgentResponsesdata?.responses);

	}, [getAgentResponsesdata?.responses]);

	useEffect(() => {
		const results = filter?.filter(
			(data: { user: { userId: string; }; customer: { loan_id: string; }; }) =>
				data?.user?.userId?.toLowerCase()?.includes(result) ||
				data?.customer?.loan_id?.toLowerCase()?.includes(result)
		);
		console.log('results', results)
		setData(results);
	}, [result, filter]);

	const handleChangeFilter = (e: { target: { value: React.SetStateAction<string>; }; }) => {
		setResult(e.target.value);
	};

	// --- Pagination --- //

	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});

	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);


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
							<div />
						</div>

						<div className="Disposition-Search">
							<Search
								value={result}
								onChange={handleChangeFilter}
								placeHolder={"Search Agent ID  OR  Loan ID"}
							/>
						</div>
						<EntriesPerPage
							data={filter}
							entriesPerPage={entriesPerPage}
							setEntriesPerPage={setEntriesPerPage}
						/>
						{dropFilter && (
							<CustomFilter
								filtered={filtered}
								setData={setData}
								setDropFilter={setDropFilter}
								selectedRadio={selectedRadio}
								setSelectedRadio={setSelectedRadio}
								setStartDate={setStartDate}
								setEndDate={setEndDate}
								startDate={startDate}
								endDate={endDate}
								data={data}
								filter={filter}
								handleCustomFilters={handleCustomFilters}
							/>
						)}
					</div>

					<div className="download-filtered-report">
						<ReportDownloader data={filter} />
					</div>
				</div>

				<div className="table-container">
					{getAgentResponsesisLoading ? <TableLoader isLoading={getAgentResponsesisLoading} /> : ""}
					<table  >
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
							{getAgentResponsesisLoading ? (
								<TableFetch colSpan={15} />
							) : displayUsers?.length === 0 || displayUsers == null ? (
								<NoRecordFound colSpan={19} />
							) : (
								displayUsers?.map((item: any) => (
									<tr key={item._id}>
										<td>{item?.user?.userId}</td>
										<td>{item?.customer?.campaign}</td>
										<td> ,,</td>
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
										<td>{item?.promiseToPayAmount}  </td>
										<td>{moment(item?.callBackDate).format("DD-MMM-YY")}</td>
										<td>{item?.reasonForDelinquency}</td>
										<td>{item?.prefferedMethods}</td>
										<td>{item?.autoComment}</td>
										<td>{item?.comment}</td>
										<td>{moment(item?.createdAt).format("DD-MMM-YY")}</td>
										<td>{item?.user?.userId}</td>
										<td>{item?.customer?.extension_expiry_timestamp}</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				<Pagination
					setDisplayData={setDisplayUsers}
					data={data}
					entriesPerPage={entriesPerPage}
					Total={"Reports"}
				/>

			</div>
		</div>
	);
};

export default AgentReport; 
