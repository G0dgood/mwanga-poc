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





  const [searchQuery, setSearchQuery] = useState('');

  // Handler for search input changes
  const handleSearchInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchQuery(e.target.value);
  };

  // Apply search filter to the customer list
  const filteredCustomers = getSetupBookdata?.customers?.filter((customer: { loanId: any; email: any; phone1: any; phone2: any; guarantor_name: any; }) => {
    const searchTerms = [
      customer?.loanId,
      customer?.email,
      customer?.phone1,
      customer?.phone2,
      customer?.guarantor_name
    ];
    const lowerCaseQuery = searchQuery.toLowerCase();
    return searchTerms.some(term => term?.toLowerCase().includes(lowerCaseQuery));
  });
  const results = getSetupBookdata?.customers?.filter((obj: { loanId: string; }) => obj?.loanId?.toLowerCase().includes(result));



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
            value={searchQuery} onChange={handleSearchInputChange}
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
              {getSetupBookisLoading ? (
                <TableFetch colSpan={"10"} />
              ) : filteredCustomers?.length === 0 || filteredCustomers == null ? (
                <NoRecordFound colSpan={"10"} />
              ) : (
                filteredCustomers?.map((user: any) => (
                  <tr key={user._id}>
                    <td>{!user?.loanId ? "n/a" : user?.loanId}</td>
                    <td>{moment(user?.disbursedDate).format("DD-MM-YYYY")}</td>
                    <td>{!user?.customer_name ? "n/a" : user?.customer_name}</td>
                    <td>{user?.phone1}</td>
                    <td>{user?.email}</td>
                    <td>{user?.bank_name}</td>
                    <td>{user?.amount_disbursed}</td>
                    <td>{user?.amount_repaid}</td>
                    <td>{user?.amount_delinquent}</td>
                    <td>{user?.days_delinquent}</td>
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




