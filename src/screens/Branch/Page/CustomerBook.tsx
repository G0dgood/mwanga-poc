import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Toast } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import SideNavBar from "../../../components/SideNavBar";
import { FaSearch } from "react-icons/fa";
import { EntriesPerPage, NoRecordFound, TableFetch } from "../../../components/TableOptions";
import Search from "../../../components/Search";
import BottomNavigation from "../../../components/BottomNavigation";
// import FairMoneyDispositionModal from "../components/FairMoneyDispositionModal";


const CustomerBook = () => {
	const navigate = useNavigate();



	const [phone, setPhone] = useState("");
	const [customer, setCustomerDetails] = useState({});

	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
	const [showErrorToast, setShowErrorToast] = useState(false);





	// useEffect(() => {
	// 	if (baseData?.data?.length === undefined) {
	// 		dispatch(getFairMoneyLoanBookAction());
	// 	}
	// }, [dispatch, baseData]);

	// const handleSearch = async (e) => {
	// 	e.preventDefault();

	// 	if (baseData?.data?.length === undefined) {
	// 		try {
	// 			setIsLoading(true);
	// 			const request = await axios.get(
	// 				baseUrl + `/api/v1/fairmoney/customers/phonenumber/${phone}`,
	// 				{
	// 					headers: {
	// 						"Content-Type": "application/json",
	// 						Authorization: `Bearer ${userInfo.token}`,
	// 					},
	// 				}
	// 			);

	// 			// Customer found
	// 			setCustomerDetails(request?.data?.customer);
	// 			setIsLoading(false);
	// 			setPhone("");
	// 			console.log("From API");
	// 		} catch (error) {
	// 			setErrorMsg(
	// 				error.response && error.response.data.message
	// 					? error.response.data.message
	// 					: error.message
	// 			);
	// 			setShowErrorToast(true);
	// 			setIsLoading(false);
	// 		}
	// 	} else {
	// 		setIsLoading(true);
	// 		setTimeout(() => {
	// 			const result = baseData?.data?.filter((data) =>
	// 				data?.signup_phone_number?.toString()?.includes(phone)
	// 			);
	// 			setIsLoading(false);

	// 			if (result?.length > 0) {
	// 				// Customer found
	// 				setCustomerDetails(result);
	// 			} else {
	// 				// Customer not found, show alert
	// 				setErrorMsg("Customer not found");
	// 				setShowErrorToast(true);
	// 			}

	// 			setPhone("");
	// 			console.log("From APP");
	// 		}, 1000);
	// 	}
	// };


	return (
		<div id="screen-wrapper">
			<SideNavBar />
			<Header />
			<BottomNavigation />
			<main>
				{/* {loading ? (
          <div className="loading-view">
            <div className="loading-view-sup">
              <Spinner animation="border" size="lg" color="#E2522E" />
              <p>Loading please wait!</p>
            </div>
          </div>
        ) : ( */}
				<div>
					<div className="page-title">
						<h5>Customer Books - Loan</h5>
					</div>

					{errorMsg && (
						<Toast
							show={showErrorToast}
							onClose={() => setShowErrorToast(false)}
							delay={6000}
							autohide>
							<Toast.Body>
								<span>
									<i className="fas fa-exclamation-circle" />
								</span>
								<p>{errorMsg}!</p>
								<span onClick={() => setShowErrorToast(false)}>
									<i className="fas fa-times" />
								</span>
							</Toast.Body>
						</Toast>
					)}
					<div className="page-features">
						<Search
							placeHolder={"Search Loan ID"}
							value={phone}
						// onChange={handleChangeFilter}
						/>
						<EntriesPerPage
							data={phone}
						// entriesPerPage={entriesPerPage}
						// setEntriesPerPage={setEntriesPerPage}
						/>
					</div>
					{/* <XLoader isLoading={isLoading} /> */}
					<div className="table-container">
						<table>
							<thead>
								<tr>
									<th></th>
									<th>Full Name</th>
									<th>Account Number</th>
									<th>Bank Name</th>
									<th>Loan ID</th>
									<th>Phone No</th>
									<th>Amt. Disbursed</th>
									<th>Amt. Repaid</th>
									<th>Amt. To Repay Today</th>
									<th>Created Date</th>
								</tr>
							</thead>
							<tbody>
								{isLoading ? (
									<TableFetch colSpan={"10"} />
									// <tr>
									// 	<td colSpan={10} className="table-loader">
									// 		<i className="fas fa-paper-plane fa-3x" />
									// 		<p className="mt-3">Sending request...</p>
									// 	</td>
									// </tr>
								) : Object.keys(customer)?.length === 0 ? (
									<NoRecordFound colSpan={"10"} />
									// <tr>
									// 	<td colSpan={10} className="table-loader">
									// 		<i className="fas fa-search fa-3x" />
									// 		<p className="mt-3">
									// 			Search with Phone Number to get a response
									// 		</p>
									// 	</td>
									// </tr>
								) : (
									[]?.map(() => (
										<tr  >
											<td>
												{/* <FairMoneyDispositionModal
												id={user?._id}
												accountnumber={user?.account_number}
												amountdisbursed={user?.amount_disbursed}
												amountrepaid={user?.amount_repaid}
												amounttorepaytoday={user?.amount_to_repay_today}
												bankname={user?.bank_name}
												createdAt={user?.createdAt}
												createdBy={user?.createdBy}
												dayslate={user?.days_late}
												dayspastdue={user?.days_past_due}
												disbursementdate={user?.disbursement_date}
												dpdbucket={user?.dpd_bucket}
												duedate={user?.due_date}
												email={user?.email}
												enterdate={user?.enter_date}
												instalmentslate={user?.instalments_late}
												instalmentstotal={user?.instalments_total}
												loanid={user?.loan_id}
												loaninstalmentid={user?.loan_instalment_id}
												nameofborrower={user?.name_of_borrower}
												occupation={user?.occupation}
												riskscore={user?.risk_score}
												signupphonenumber={user?.signup_phone_number}
												state={user?.state}
												userid={user?.user_id}
												extensionOffer={user?.extension_offer}
												extensionExpiryTimestamp={
													user?.extension_expiry_timestamp
												}
											/> */}
											</td>
											{/* <td>{user?.name_of_borrower}</td>
										<td>{user?.account_number}</td>
										<td>{user?.bank_name}</td>
										<td>{user?.loan_id}</td>
										<td>{user?.signup_phone_number}</td>
										<td>{user?.amount_disbursed}</td>
										<td>{user?.amount_repaid}</td>
										<td>{user?.amount_to_repay_today}</td>
										<td>{moment(user.createdAt).format("DD-MM-YYYY")}</td> */}
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
				{/* )} */}
			</main >
		</div >
	);
};

export default CustomerBook;

