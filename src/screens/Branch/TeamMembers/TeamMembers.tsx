import React, { useState, useEffect } from "react";
import SideNavBar from "../../../components/SideNavBar";
import Header from "../../../components/Header";
import Search from "../../../components/Search";
import { baseUrl } from "../../../shared/baseUrl";
import axios from "axios";
import { Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import {
	TableFetch,
	EntriesPerPage,
	NoRecordFound,
} from "../../../components/TableOptions";
import BottomNavigation from "../../../components/BottomNavigation";
import { userInfo } from "../../../hooks/config";
import { getUserPrivileges } from "../../../hooks/auth";
import TableLoader from "../../../components/TableLoader";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import { getTeammembers } from "../../../features/Registration/registrationSlice";

const TeamMembers = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isSupervisor } = getUserPrivileges();
	const { getTeammembersdata, getTeammembersisError, getTeammembersmessage, getTeammembersisLoading } = useAppSelector((state: any) => state.reg);
	const [data, setData] = useState([]);
	const [filtered, setFilterd] = useState([]);
	const [result, setResult] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [getUsersErr, setGetUsersErr] = useState(null);
	const [showToast, setShowToast] = useState(false);
	// @ts-ignore
	const user = JSON.parse(localStorage.getItem("mwanga"));

	const [selectedSup, setSelectedSupervisor] = useState(user?.id);
	const [onlySupervisors, setOnlySupervisors] = useState<any>([]);

	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("rowsPerPage") || "10";
	});

	// console.log('getTeammembersdata', getTeammembersdata)


	useEffect(() => {
		// @ts-ignore
		dispatch(getTeammembers(user?.id));

	}, [dispatch, user?.id]);


	useEffect(() => {
		// --- Set state of collapseNav to localStorage on pageLoad --- //
		localStorage.setItem("rowsPerPage", entriesPerPage);
	}, [entriesPerPage]);

	useEffect(() => {
		if (isSupervisor) {
			// @ts-ignore  
			async function fetchData() {
				try {
					setIsLoading(true);
					const config = {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${userInfo.token}`,
						},
					};
					const res = await axios.post(
						baseUrl + "/api/v1/auth/getteam",
						{ id: !selectedSup ? user?.id : selectedSup },
						config
					);
					setData(res?.data?.users);
					setFilterd(res?.data?.users);
					setIsLoading(false);
					setShowToast(false);
				} catch (error: any) {
					setShowToast(true);
					setGetUsersErr(
						error.response && error.response.data.message
							? error.response.data.message
							: error.message
					);
					setIsLoading(false);
				}
			}
			fetchData();
		} else {
			navigate("/");
		}
	}, [isSupervisor, navigate, selectedSup, user?.id]);

	// const fetchData = async () => {
	// 	try {
	// 		setIsLoading(true);
	// 		const config = {
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${userInfo.token}`,
	// 			},
	// 		};
	// 		const res = await axios.post(
	// 			baseUrl + "/api/v1/auth/getteam",
	// 			{ id: selectedSup },
	// 			config
	// 		);
	// 		setData(res?.data?.users);
	// 		setFilterd(res?.data?.users);
	// 		setIsLoading(false);
	// 		setShowToast(false);
	// 	} catch (error: any) {
	// 		setShowToast(true);
	// 		setGetUsersErr(
	// 			error.response && error.response.data.message
	// 				? error.response.data.message
	// 				: error.message
	// 		);
	// 		setIsLoading(false);
	// 	}
	// };

	// useEffect(() => {
	// 	if (isSupervisor) {
	// 		fetchData();
	// 	} else {
	// 		navigate("/");
	// 	}
	// }, [isSupervisor, navigate, selectedSup]);


	useEffect(() => {
		async function fetchOnlySup() {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			const res = await axios.get(
				baseUrl + "/api/v1/auth/onlysupervisors",
				config
			);
			setOnlySupervisors(res?.data?.data);
			return res;
		}
		fetchOnlySup();
	}, []);

	useEffect(() => {
		const results = filtered?.filter((data: any) => data?.userId?.toLowerCase().includes(result));
		setData(results);
	}, [result, filtered]);

	const handleChangeFilter = (e: { target: { value: React.SetStateAction<string>; }; }) => {
		setResult(e.target.value);
	};



	const [displayUsers, setDisplayUsers] = useState([]);



	return (
		<div id="screen-wrapper">
			<SideNavBar />
			<Header />
			<BottomNavigation />

			<main>
				<div className="page-title">
					<h5>Team Members</h5>
				</div>

				{getUsersErr && (
					<Toast
						show={showToast}
						onClose={() => setShowToast(false)}
						delay={6000}
						autohide>
						<Toast.Body>
							<span>
								<i className="fas fa-exclamation-circle" />
							</span>
							<p>{getUsersErr}!</p>
							<span onClick={() => setShowToast(false)}>
								<i className="fas fa-times" />
							</span>
						</Toast.Body>
					</Toast>
				)}

				<div className="page-features">
					<div className="search-entries">
						<Search
							placeHolder={"Search Agent ID"}
							value={result}
							onChange={handleChangeFilter}
						/>
					</div>
					<EntriesPerPage
						data={data}
						entriesPerPage={entriesPerPage}
						setEntriesPerPage={setEntriesPerPage}
					/>

					<div className="btn-responsive">
						<div className="select-supervisor ">
							<p>Supervisor</p>
							<select
								value={selectedSup}
								onChange={(e) => setSelectedSupervisor(e.target.value)}>
								{onlySupervisors?.map((obj: any) => (
									<option key={obj?.id} value={obj?.id}>
										{obj?.firstname} {obj?.lastname}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
				<table>
					<thead>
						<tr>
							<th>Agent ID</th>
							<th>Full Name</th>
							<th>Email</th>
							<th>Phone No</th>
							<th>Role</th>
							<th>Supervisor</th>
							<th>Logged in Status</th>
						</tr>
					</thead>
					<tbody>
						{isLoading ? (
							<TableFetch colSpan={8} />
						) : displayUsers.length === 0 ? (
							<NoRecordFound colSpan={8} />
						) : (
							displayUsers?.map((user: any) => (
								<tr key={user?._id}>
									<td>{user?.userId}</td>
									<td>
										{user?.firstname} {user?.middlename}, {user?.lastname}
									</td>
									<td>{user?.email}</td>
									<td>{user?.contactNo}</td>
									<td>{user?.role.roleName}</td>
									<td>
										{user?.reportsTo.firstname} {user?.reportsTo.lastname}
									</td>
									<>
										{user.loginFlag ? (
											<td className="green">Logged In</td>
										) : (
											<td className="red">Logged Out</td>
										)}
									</>
								</tr>
							))
						)}
					</tbody>
				</table>
				<Pagination
					setDisplayData={setDisplayUsers}
					data={data}
					entriesPerPage={entriesPerPage}
					Total={"Team Members"}
				/>
			</main>
		</div>
	);
};

export default TeamMembers;

