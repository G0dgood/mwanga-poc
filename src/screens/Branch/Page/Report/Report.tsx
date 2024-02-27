import React, { useEffect, useState } from "react";
import moment from "moment";
import { NoRecordFound, TableFetch, customId } from "../../../../components/TableOptions";
import Search from "../../../../components/Search";
import CustomFilter from "../../../../components/CustomFilter";
import { FaFilter } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import ReportHeader from "../../../../components/ReportHeader";
import TableLoader from "../../../../components/TableLoader";
import { useAppDispatch, useAppSelector } from "../../../../store/useStore";
import { toast } from "react-toastify";
import { getAllResponses } from "../../../../features/Customer/customerSlice";

import ReportDownloader from "../../components/ReportDownloader";


const Report = () => {
	const dispatch = useAppDispatch();
	const { alldata, allisError, allmessage, allisLoading } = useAppSelector((state: any) => state.customer);
	const [dropFilter, setDropFilter] = useState(false);
	const [selectedRadio, setSelectedRadio] = useState("Today");
	const [data, setData] = useState<any>([]);
	const [limit, setLimit] = useState<any>(10);
	const [filtered, setFilterd] = useState([]);
	const [filter, setFilter] = useState<any>([]);
	const [result, setResult] = useState("");
	const endDates = new Date();
	const formattedEndDate = endDates.toISOString().split('T')[0]; // Extracting date part and removing time



	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [startDate1] = useState(formattedEndDate);
	const [endDate1] = useState(formattedEndDate);



	// Error Handling Effect
	useEffect(() => {
		if (allisError) {
			toast.error(allmessage, { toastId: customId });
		}
	}, [allisError, allmessage]);




	useEffect(() => {
		const datas = { startDate: startDate1, endDate: endDate1 };
		// @ts-ignore
		dispatch(getAllResponses(datas));

	}, [dispatch, endDate1, startDate1]);

	const pagination = alldata?.pagination


	const handleCustomFilters = () => {
		const datas = { startDate, endDate }
		// @ts-ignore
		dispatch(getAllResponses(datas))
		setDropFilter(false)
	}
	const handlePrev = () => {
		const datas = { page: pagination.page - 1 }
		// @ts-ignore
		dispatch(getAllResponses(datas))
	}

	const handleNext = () => {
		const datas = { page: pagination.page + 1 }
		// @ts-ignore
		dispatch(getAllResponses(datas))
	}

	const handleLmit = (e: { target: { value: any; }; }) => {
		const newLimit = e.target.value;
		setLimit(newLimit); // Update the limit state
		const datas = { limit: newLimit };
		// @ts-ignore
		dispatch(getAllResponses(datas));
	}


	useEffect(() => {
		setData(alldata?.responses);
		setFilterd(alldata?.responses);
		setFilter(alldata?.responses);

	}, [alldata?.responses]);

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

						<div className="entries-perpage">
							{filter?.length > 1 && (
								<>
									<select
										value={limit}
										onChange={handleLmit}  >
										<option value="5">5</option>
										<option value="8">8</option>
										<option value="10">10</option>
										<option value="25">25</option>
										<option value="50">50</option>
										<option value="100">100</option>
									</select>
								</>
							)}
						</div>



						{dropFilter && (
							<CustomFilter
								filtered={filtered}
								setData={setData}
								setDropFilter={setDropFilter}
								selectedRadio={selectedRadio}
								setSelectedRadio={setSelectedRadio}
								setStartDate={setStartDate}
								setEndDate={setEndDate}
								data={data}
								handleCustomFilters={handleCustomFilters}
							/>
						)}
					</div>

					<div className="download-filtered-report">
						<ReportDownloader data={filter} />
					</div>
				</div>

				<div className="table-container">
					{allisLoading ? <TableLoader isLoading={allisLoading} /> : ""}
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
							{allisLoading ? (
								<TableFetch colSpan={15} />
							) : filter?.length === 0 || filter == null ? (
								<NoRecordFound colSpan={19} />
							) : (
								filter?.map((item: any) => (
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

				<div id={"notificationbtn"}>
					<button className="btn" disabled={pagination?.page === pagination?.totalPages} onClick={handlePrev}>Previous</button>
					<div id="notispan-container">  <span>page</span> <span>{pagination?.page}</span> <span>of</span> <span>{pagination?.totalPages}</span></div>
					<button className="btn" disabled={pagination?.page === pagination?.totalPages} onClick={handleNext} >Next</button>
				</div>

			</div>
		</div>
	);
};

export default Report; 