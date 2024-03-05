import React, { useState, useEffect } from "react";
import moment from "moment";
import { EntriesLimit, NoRecordFound, TableFetch, customId } from "../../../components/TableOptions";
import Search from "../../../components/Search";
import SideNavBar from "../../../components/SideNavBar";
import Header from "../../../components/Header";
import UploadCustomerBase from "./UploadCustomerBase";
import BottomNavigation from "../../../components/BottomNavigation";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import { getSetupBook } from "../../../features/Customer/customerSlice";
import TableLoader from '../../../components/TableLoader';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";
import RealPagination from "../../../components/RealPagination";



const SetupBook = () => {

  const dispatch = useAppDispatch();
  const { getSetupBookdata, getSetupBookisError, getSetupBookmessage, getSetupBookisLoading } = useAppSelector((state: any) => state.customer);
  const { isSuccess } = useAppSelector((state: any) => state.customer);
  const [data, setData] = useState([]);

  const [limit, setLimit] = useState<any>(10);
  const endDates = new Date();
  const formattedEndDate = endDates.toISOString().split('T')[0]; // Extracting date part and removing time


  const [startDate1] = useState(formattedEndDate);
  const [endDate1] = useState(formattedEndDate);


  const pagination = getSetupBookdata?.pagination


  useEffect(() => {
    const datas = { startDate: startDate1, endDate: endDate1 };
    // @ts-ignore
    dispatch(getSetupBook(datas));
    if (isSuccess) {
      // @ts-ignore
      dispatch(getSetupBook(datas));
    }

  }, [dispatch, endDate1, isSuccess, startDate1]);




  const handlePagination = (type: string, data?: React.ChangeEvent<HTMLSelectElement> | undefined) => {
    switch (type) {
      // @ts-ignore
      case 'prev': dispatch(getSetupBook({ page: pagination?.page - 1, limit: limit }));
        break;
      // @ts-ignore
      case 'next': dispatch(getSetupBook({ page: pagination?.page + 1, limit: limit }));
        break;
      case 'limit':
        if (data) {
          setLimit(data.target.value);
          // @ts-ignore
          dispatch(getSetupBook({ limit: data.target.value }));
        }
        break;
      default:
        // For page numbers or any other custom actions
        const pageNumber = parseInt(type);
        if (!isNaN(pageNumber)) {
          // @ts-ignore
          dispatch(getSetupBook({ page: pageNumber, limit: limit }));
        }
        break;
    }
  }




  // // Error Handling Effect
  // useEffect(() => {
  //   if (getSetupBookisError) {
  //     toast.error(getSetupBookmessage, { toastId: customId });
  //   }
  // }, [dispatch, getSetupBookisError, getSetupBookmessage]);


  const [searchQuery, setSearchQuery] = useState('');
  // Handler for search input changes
  const handleSearchInputChange = (e: { target: { value: React.SetStateAction<string> }; }) => {
    setSearchQuery(e.target.value);
  };



  useEffect(() => {
    const results = getSetupBookdata?.customers?.filter(
      (data: any) => data?.loanId?.toLowerCase()?.includes(searchQuery));
    setData(results);
  }, [getSetupBookdata?.customers, searchQuery]);


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
          <EntriesLimit
            limit={limit}
            data={data}
            handlePagination={handlePagination}
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
              ) : data?.length === 0 || data == null ? (
                <NoRecordFound colSpan={"10"} />
              ) : (
                data?.map((user: any) => (
                  <tr key={user._id}>
                    <td>{user?.loanId}</td>
                    <td>{moment(user?.disbursedDate).format("DD-MM-YYYY")}</td>
                    <td>{user?.customer_name}</td>
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
        {pagination?.totalCustomers > 1 && <div className="totalResponses">
          <h3>Total of {pagination?.totalCustomers} Customers - <span>Page {pagination?.page} of {pagination?.totalPages}</span></h3>
          <RealPagination handlePagination={handlePagination} pagination={pagination} />
        </div>}
      </main>
    </div>

  );
};
export default SetupBook;




