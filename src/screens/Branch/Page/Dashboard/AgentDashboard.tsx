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
	const [selectedDate, setSelectedDate] = useState("");


	const currentDate = moment().format("YYYY-MM-DD");
	const sevenDays = moment().subtract(7, "days").format("YYYY-MM-DD");
	const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
	const [data, setData] = useState<any>([]);




	useEffect(() => {
		setData(getAgentResponsesdata?.responses);
	}, [getAgentResponsesdata?.responses]);



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


	useEffect(() => {
		if (getAgentResponsesisError) {
			toast.error(getAgentResponsesmessage, { toastId: customId });
		}
	}, [dispatch, getAgentResponsesisError, getAgentResponsesmessage]);


	useEffect(() => {
		const datas = { startDate: startDate1, endDate: endDate1, limit: 500 };
		// @ts-ignore
		dispatch(getAgentResponses(datas));
	}, [dispatch, endDate1, startDate1]);

	const handleChange = (e: any) => {
		setSelectedDate(e.target.value);

		if (e.target.value === "7-Days") {
			const datas = { startDate: sevenDays, endDate: currentDate, limit: 5000 };
			// @ts-ignore
			dispatch(getAgentResponses(datas));
		} else if (e.target.value === "Yesterday") {
			const datas = { startDate: yesterday, endDate: yesterday, limit: 1000 };
			// @ts-ignore
			dispatch(getAgentResponses(datas));
		} else if (e.target.value === "Today") {
			const datas = { startDate: currentDate, endDate: currentDate, limit: 500 };
			// @ts-ignore
			dispatch(getAgentResponses(datas));
		}
	};


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
							handleChange={handleChange}
						/>
					</div>
				</div>
			</main>
		</div>
	);
};

export default AgentDashboard;
