import { useEffect, useState } from 'react';
// import EditRegisteredUserModal from '../../../components/Modals/EditRegisteredUserModal';
import { FiPlus } from "react-icons/fi";
import Header from '../../components/Header';
import SideNavBar from '../../components/SideNavBar';
import { EntriesPerPage, NoRecordFound, TableFetch, customId } from '../../components/TableOptions';
import Search from '../../components/Search';
import { NavLink } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import moment from 'moment';
import { user } from '../../components/data';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiPlusCircle } from "react-icons/fi";
import BottomNavigation from '../../components/BottomNavigation';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { toast } from 'react-toastify';
import { getallReguser, reset } from '../../features/Registration/registrationSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import TableLoader from '../../components/TableLoader';
import CreateNewUserModal from '../../components/Modal/CreateNewUserModal';
// import RegisterModal from '../../../components/Modals/RegisterModal';



const RegisteredUsers = ({ switchs }: any) => {
 const lob = useSelector((state: RootState) => state.lob.currentLob);
 const dispatch = useAppDispatch();
 const { isSuccess } = useAppSelector((state) => state.reg)
 const { edituserisSuccess } = useAppSelector((state: any) => state.reg);
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 const [data, setData] = useState([]);
 const [filtered, setFilterd] = useState<any>([]);
 const [result, setResult] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [displayUsers, setDisplayUsers] = useState([]);
 const [loadingdelete, setLoadingdelete] = useState(false);
 const [isDeleteContainerVisible, setIsDeleteContainerVisible] =
  useState(null);

 const handleDelete = (id: React.SetStateAction<null>) => {
  setIsDeleteContainerVisible(id);
 };
 const { dataAll, isErrorAll, messageAll, isLoadingAll } = useAppSelector((state: any) => state.reg);



 // Error Handling Effect
 useEffect(() => {
  if (isErrorAll) {
   // Display an error toast with the message and reset the state
   toast.dismiss(); // Dismiss any existing toasts
   toast.error(messageAll, {
    toastId: customId
   });
   setTimeout(() => {
    dispatch(reset());
   }, 6000);
  }
 }, [dispatch, isErrorAll, messageAll]);


 // Data Fetching (Conditional) Effect
 useEffect(() => {
  if (isSuccess || edituserisSuccess) {
   // If success is true, fetch data again
   dispatch(getallReguser());
  } else {
   // Fetch data when the component is mounted or dispatch changes
   dispatch(getallReguser());
  }
 }, [dispatch, edituserisSuccess, isSuccess]);


 const filteredlob = dataAll?.filter((item: any) => item?.lob === lob.name);
 const results = filteredlob.filter((data: { userId: string; }) => data.userId.toLowerCase().includes(result));




 return (
  <div id="screen-wrapper">
   <SideNavBar />
   <Header />
   <BottomNavigation />
   <main className="registered-users">
    <div className="page-title">
     <h5>Registered Users</h5>
    </div>

    <div className="page-features">
     <div className="search-entries">
      <Search
       placeHolder={"Search Agent ID"}
       value={result}
       onChange={""}
      />
     </div>
     <EntriesPerPage
      data={user}
     // entriesPerPage={entriesPerPage}
     // setEntriesPerPage={setEntriesPerPage}
     />
     <CreateNewUserModal />
    </div>

    <div className='table-container'>
     {isLoadingAll ? <TableLoader isLoading={isLoadingAll} /> : ""}
     <table>
      <thead>
       <tr>
        <th>Agent ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Supervisor</th>
        <th>LOB</th>
        <th>Date Registered</th>
        <th>Status</th>
        <th></th>
        <th></th>
       </tr>
      </thead>
      <tbody>
       {isLoadingAll ? (
        <TableFetch colSpan={18} />
       ) : results.length === 0 ? (
        <NoRecordFound colSpan={18} />
       ) : (
        results?.map((user: any) => (
         <tr key={user._id}>
          <td>{user?.userId}</td>
          <td> {user?.firstname} {user?.lastname} </td>
          <td>{user?.email}</td>
          <td>{user?.role?.roleName}</td>
          <td>  {user?.reportsTo?.firstname} {user?.reportsTo?.lastname}  </td>
          <td>{user?.lob}</td>
          <td>{moment(user?.createdAt).format("DD-MM-YYYY")}</td>
          <td>
           {user?.isActive ? (
            <i
             className="fas fa-check-circle"
             style={{ color: "green" }}
            />
           ) : (
            <i
             className="fas fa-times-circle"
             style={{ color: "#e2522e" }}
            />
           )}
          </td>
          <td>
           <NavLink
            to={`/user/${user?._id}/settings`}
            className="table-navlink">
            Edit
           </NavLink>
          </td>
          <td>
           <div>
            <div
             className="DeleteBin6Fill"
            // onClick={() => handleDelete(user?._id)}
            >
             <RiDeleteBin6Fill size={20} />
            </div>
            {isDeleteContainerVisible === user?._id && (
             <div className="DeleteBin_container">
              <div className="delete-content">
               <h3>Are you sure you want to delete?</h3>
               <div className="button-container">
                <button
                 className="cancel-button"
                // onClick={() =>
                //   setIsDeleteContainerVisible(false)
                // }
                >
                 Cancel
                </button>
                <button
                 className="delete-button"
                // onClick={handleDeleteByID}
                >
                 {loadingdelete ? (
                  <Spinner animation="border" size="sm" />
                 ) : (
                  "Yes, Delete"
                 )}
                </button>
               </div>
              </div>
             </div>
            )}
           </div>
          </td>
         </tr>
        )))}
      </tbody>
     </table>
    </div>
    <footer className="main-table-footer">
     {/* <Pagination
						setDisplayData={setDisplayData}
						data={realData}
						entriesPerPage={entriesPerPage}
						Total={"Registered User"}
					/> */}
    </footer>
   </main>
  </div>
 )
}

export default RegisteredUsers
