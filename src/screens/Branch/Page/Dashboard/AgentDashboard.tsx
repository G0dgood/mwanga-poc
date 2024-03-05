import { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import SideNavBar from "../../../../components/SideNavBar";
import Header from "../../../../components/Header";
import DoughnutChart from "../../../../components/DoughnutChart";
import { FaPhone } from "react-icons/fa";
import BottomNavigation from "../../../../components/BottomNavigation";
import { useAppDispatch, useAppSelector } from "../../../../store/useStore";
import { userprofile } from "../../../../features/Auth/authSlice";
import { toast } from "react-toastify";
import { customId } from "../../../../components/TableOptions";
import { getAgentResponses } from "../../../../features/Customer/customerSlice";


const AgentDashboard = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { getAgentResponsesdata, getAgentResponsesisError, getAgentResponsesmessage } = useAppSelector((state: any) => state.customer);

	const endDates = new Date();
	const formattedEndDate = endDates.toISOString().split('T')[0]; // Extracting date part and removing time
	const [startDate1] = useState(formattedEndDate);
	const [endDate1] = useState(formattedEndDate);




	const [selectedDate, setSelectedDate] = useState("Today");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const currentDate = moment().format("YYYY-MM-DD");
	const sevenDays = moment().subtract(7, "days").format("YYYY-MM-DD");
	const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

	const [data, setData] = useState<any>([]);
	const [fromDate, setFromDate] = useState("");
	const [toDate, setToDate] = useState("");




	useEffect(() => {
		if (selectedDate === "Today") {
			setStartDate(currentDate);
			setEndDate(currentDate);
			setToDate("");
			setFromDate("");
		} else if (selectedDate === "Yesterday") {
			setStartDate(yesterday);
			setEndDate(yesterday);
			setToDate(yesterday);
			setFromDate(yesterday);
		} else if (selectedDate === "7-Days") {
			setStartDate(sevenDays);
			setEndDate(currentDate);
			setToDate(sevenDays);
			setFromDate(currentDate);
		}
	}, [selectedDate, currentDate, sevenDays, yesterday]);

	useEffect(() => {
		const filterUserData = getAgentResponsesdata?.responses?.filter(
			(obj: { createdAt: moment.MomentInput; }) =>
				moment(obj.createdAt).format("YYYY-MM-DD") >= startDate &&
				moment(obj.createdAt).format("YYYY-MM-DD") <= endDate
		);
		setData(filterUserData);
	}, [endDate, getAgentResponsesdata?.responses, startDate]);



	// --- Setting Up Dashboard Overview-- - //
	const [succDisp, setSuccDisp] = useState([]);
	const [failDisp, setFailDisp] = useState([]);

	useEffect(() => {
		setSuccDisp(
			data?.filter((obj: { disposition: string; }) => {
				return obj?.disposition === "Connected";
			})
		);
		setFailDisp(
			data?.filter((obj: { disposition: string; }) => {
				return obj?.disposition === "Not answered" ||
					obj?.disposition === "Switched off" ||
					obj?.disposition === "Unreachable" ||
					obj?.disposition === "Hung up";
			}) || []
		);
	}, [data]);


	// useEffect(() => {
	// 	if (getAgentResponsesisError) {
	// 		toast.error(getAgentResponsesmessage, { toastId: customId });
	// 	}
	// }, [dispatch, getAgentResponsesisError, getAgentResponsesmessage]);


	useEffect(() => {
		dispatch(getAgentResponses());
	}, [dispatch]);



	return (
		<div id="screen-wrapper">
			<Header />
			<SideNavBar />
			<BottomNavigation />
			<main>
				<div className="call-section">
					<div className="call-cards">
						<div className="total-calls">
							< FaPhone className="ifa" />
						</div>
						<span className="call-score">{!data?.length ? 0 : data?.length}</span>
						<span className="call-text">Total calls</span>
					</div>
					<div className="call-cards">
						<div className="successful-calls">
							< FaPhone />
						</div>
						<span className="call-score">{!succDisp?.length ? 0 : succDisp?.length}</span>
						<span className="call-text">Succesful calls</span>
					</div>
					<div className="call-cards">
						<div className="failed-calls">
							< FaPhone className="ifa" />
						</div>
						<span className="call-score">{!failDisp?.length ? 0 : failDisp?.length}</span>
						<span className="call-text">Failed calls</span>
					</div>
				</div>
				<div className="chart-section">
					<div className="chart-card">
						<DoughnutChart
							chartData={data}
							selectedDate={selectedDate}
							setSelectedDate={setSelectedDate}
						/>
					</div>
				</div>
			</main>
		</div>
	);
};

export default AgentDashboard;
