import React, { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { EntriesPerPage, NoRecordFound, TableFetch, customId } from "../../../components/TableOptions";
import Search from "../../../components/Search";
import Pagination from "../../../components/Pagination";
import SideNavBar from "../../../components/SideNavBar";
import Header from "../../../components/Header";
import UploadCustomerBase from "./UploadCustomerBase";
import BottomNavigation from "../../../components/BottomNavigation";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import { getSetupBook } from "../../../features/Customer/customerSlice";
import TableLoader from '../../../components/TableLoader';


const SetupBook = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getSetupBookdata, getSetupBookisError, getSetupBookmessage, getSetupBookisLoading } = useAppSelector((state: any) => state.customer);
  const { isSuccess } = useAppSelector((state: any) => state.customer);
  const [data, setData] = useState([]);
  const [filtered, setFilterd] = useState([]);
  const [result, setResult] = useState("");


  const [entriesPerPage, setEntriesPerPage] = useState(() => {
    return localStorage.getItem("rowsPerPage") || "10";
  });

  console.log('getSetupBookdata', getSetupBookdata)


  useEffect(() => {
    dispatch(getSetupBook());
    if (isSuccess) {
      dispatch(getSetupBook());
    }
  }, [dispatch, getSetupBookisError, getSetupBookmessage, isSuccess]);

  // Error Handling Effect
  useEffect(() => {
    if (getSetupBookisError) {
      toast.error(getSetupBookmessage, { toastId: customId });
    }
  }, [dispatch, getSetupBookisError, getSetupBookmessage]);

  // useEffect(() => {
  //   setData(baseData?.data);
  //   setFilterd(baseData?.data);

  //   // --- Set state of collapseNav to localStorage on pageLoad --- //
  //   localStorage.setItem("rowsPerPage", entriesPerPage);
  // }, [entriesPerPage, baseData]);


  const results = getSetupBookdata?.filter((obj: { loanId: string; }) => obj?.loanId?.toLowerCase().includes(result));


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
          <h5>Setup Book</h5>
        </div>

        <div className="page-features">
          <Search
            placeHolder={"Search Loan ID"}
            value={result}
            onChange={handleChangeFilter}
          />
          <EntriesPerPage
            data={data}
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
          />
          <UploadCustomerBase />
        </div>
        {getSetupBookisLoading ? <TableLoader isLoading={getSetupBookisLoading} /> : ""}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Disbured Date</th>
                <th>Full Name</th>
                <th>Phone No</th>
                <th>Email</th>
                <th>Bank Name</th>
                <th>Amount DisBursed</th>
                <th>Amount Repaid</th>
                <th>Amount Delinquent</th>
                <th>Days Delinqent</th>
              </tr>
            </thead>
            <tbody>
              {false ? (
                <TableFetch colSpan={"10"} />
              ) : results?.length === 0 || results == null ? (
                <NoRecordFound colSpan={"10"} />
              ) : (
                results?.map((user: any) => (
                  <tr key={user._id}>
                    <td>{user.loanId}</td>
                    <td>{moment(user.disbursedDate).format("DD-MM-YYYY")}</td>
                    <td>{user.fullname}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.email}</td>
                    <td>{user.bankName}</td>
                    <td>{user.amountDisbursed}</td>
                    <td>{user.amountRepaid}</td>
                    <td>{user.amountDelinquent}</td>
                    <td>{user.daysDelinquent}</td>
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
          Total={"Customers"}
        />
      </main>
    </div>

  );
};
export default SetupBook;
