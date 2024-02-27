import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Spinner, Toast } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import SideNavBar from "../../../components/SideNavBar";
import { FaExclamationCircle, FaSearch, FaTimes } from "react-icons/fa";
import { EntriesPerPage, NoRecordFound, TableFetch } from "../../../components/TableOptions";
import Search from "../../../components/Search";
import BottomNavigation from "../../../components/BottomNavigation";
import DispositionModal from "../components/DispositionModal";
import { baseUrl } from "../../../shared/baseUrl";
import { userInfo } from "../../../hooks/config";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import TableLoader from "../../../components/TableLoader";
import { getASingleResponse, reset } from "../../../features/Customer/customerSlice";


const CustomerBook = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { singledata, singleisError, singlemessage, singleisLoading } = useAppSelector((state: any) => state.customer);
	// Initialize customers as an empty array if singledata is null
	const customers = singledata ? singledata?.customers : undefined;



	const [phone, setPhone] = useState("");
	// const [customer, setCustomerDetails] = useState<any>({});
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
	const [showErrorToast, setShowErrorToast] = useState(false);

	// useEffect(() => {
	// 	setCustomerDetails(singledata?.customers)
	// }, [singledata?.customers])


	const customer = singledata?.customer || {};
	const arrayOfObject = [customer];





	useEffect(() => {
		if (singleisError) {
			setTimeout(() => {
				dispatch(reset());
			}, 5000)
		}
		dispatch(reset());
	}, [dispatch, singleisError]);


	const handleSearch = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		// @ts-ignore
		dispatch(getASingleResponse(phone));
	}

	// const handleSearch = async (e: { preventDefault: () => void; }) => {
	// 	e.preventDefault();

	// 	try {
	// 		setIsLoading(true);
	// 		const request = await axios.get(
	// 			baseUrl + `/api/v1/fairmoney/customers/phonenumber/${phone}`,
	// 			{
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 					Authorization: `Bearer ${userInfo.token}`,
	// 				},
	// 			}
	// 		);

	// 		// Customer found
	// 		setCustomerDetails(request?.data?.customer);
	// 		setIsLoading(false);
	// 		setPhone("");
	// 	} catch (error: any) {
	// 		setErrorMsg(
	// 			error.response && error.response.data.message
	// 				? error.response.data.message
	// 				: error.message
	// 		);
	// 		setShowErrorToast(true);
	// 		setIsLoading(false);
	// 	}
	// };


	return (
		<div id="screen-wrapper">
			<SideNavBar />
			<Header />
			<BottomNavigation />
			<main>

				<div>
					<div className="page-title">
						<h5>Customer Books - Loan</h5>
					</div>

					{singleisError && (
						<Toast
							show={singleisError}
							onClose={() => setShowErrorToast(false)}
							delay={6000}
							autohide>
							<Toast.Body>
								<div className="toast-crm-container">
									<span className="toast-crm-container-sub">
										<FaExclamationCircle />
										<p>{singlemessage}!</p>
									</span>
									<span onClick={() => setShowErrorToast(false)}>
										<FaTimes />
									</span>
								</div>
							</Toast.Body>
						</Toast>
					)}
					<div className="page-features">
						<Search
							placeHolder={"Search Loan ID"}
							value={phone}
							onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPhone(e.target.value)}
							handleSearch={handleSearch}
						/>

					</div>
					{singleisLoading ? <TableLoader isLoading={singleisLoading} /> : ""}
					<div className="table-container">
						<table>
							<thead>
								<tr>
									<th></th>
									<th>Full Name</th>
									<th>Virtual Account</th>
									<th>Bank Name</th>
									<th>Loan ID</th>
									<th>Phone No</th>
									<th>Amt. Disbursed</th>
									<th>Amt. Repaid</th>
									<th>Created Date</th>
								</tr>
							</thead>
							<tbody>
								{isLoading ? (
									<TableFetch colSpan={"10"} />
								) : Object.keys(customer)?.length === 0 ? (
									<NoRecordFound colSpan={"10"} />
								) : (
									arrayOfObject?.map((customer: any, i: any) => (
										<tr key={i}>
											<td>
												<DispositionModal
													id={customer?.id}
													amount_delinquent={customer?.amount_delinquent}
													amount_disbursed={customer?.amount_disbursed}
													amount_repaid={customer?.amount_repaid}
													bank_name={customer?.bank_name}
													campaign={customer?.campaign}
													createdAt={customer?.createdAt}
													createdBy={customer?.createdBy}
													customer_name={customer?.customer_name}
													days_delinquent={customer?.days_delinquent}
													disbursed_date={customer?.disbursed_date}
													discount={customer?.discount}
													due_date={customer?.due_date}
													email={customer?.email}
													employer_name={customer?.employer_name}
													employer_phone={customer?.employer_phone}
													guarantor_name={customer?.guarantor_name}
													guarantor_phone={customer?.guarantor_phone}
													loanId={customer?.loanId} l
													oan_installment_id={customer?.loan_installment_id}
													phone1={customer?.phone1}
													phone2={customer?.phone2}
													virtual_account={customer?.virtual_account}
													virtual_bank_name={customer?.virtual_bank_name} />
											</td>
											<td>{customer?.customer_name}</td>
											<td>{customer?.virtual_account}</td>
											<td>{customer?.bank_name}</td>
											<td>{customer?.loanId}</td>
											<td>{customer?.phone1}</td>
											<td>{customer?.amount_disbursed}</td>
											<td>{customer?.amount_repaid}</td>
											<td>{moment(customer?.createdAt).format("DD-MM-YYYY")}</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</main >
		</div >
	);
};

export default CustomerBook;



