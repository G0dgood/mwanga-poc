import { useState, useEffect } from "react";
import { Modal, Toast } from "react-bootstrap";
import FillDisposition from "./FillDisposition";
import ModalHeader from "../../../components/Modal/ModalHeader";
import { FiPlusCircle } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import { createResponseID, reset } from "../../../features/Customer/customerSlice";
import SingleResponse from "./SingleResponse";
import { toast } from "react-toastify";
import { customId } from "../../../components/TableOptions";
import { getUserPrivileges } from "../../../hooks/auth";
import moment from "moment";

const CustomerDetails = ({ id,
  amount_delinquent,
  amount_disbursed,
  amount_repaid,
  bank_name,
  campaign,
  createdAt,
  createdBy,
  customer_name,
  days_delinquent,
  disbursed_date,
  discount,
  due_date,
  email,
  employer_name,
  employer_phone,
  guarantor_name,
  guarantor_phone,
  loanId,
  loan_installment_id,
  phone1,
  phone2,
  virtual_account,
  virtual_bank_name, }: any) => {
  const dispatch = useAppDispatch()
  const { isAgent } = getUserPrivileges();
  const { createResponseIDdata, createResponseIDisError, createResponseIDmessage } = useAppSelector((state) => state.customer)
  const { responses }: any = createResponseIDdata
  const { createResponseisSuccess } = useAppSelector((state) => state.customer)

  useEffect(() => {
    if (createResponseisSuccess) {
      // @ts-ignore
      dispatch(createResponseID(id))
    }
    // @ts-ignore
    dispatch(createResponseID(id))
  }, [createResponseisSuccess, dispatch, id])

  // --- Fill Disposition Modal --- //
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // --- Previous Disposition Modal --- //
  const [showPrevDisp, setShowPrevDisp] = useState(false);
  const handleClosePrevDisp = () => setShowPrevDisp(false);



  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [prevIndex, setPrevIndex] = useState(0);



  useEffect(() => {
    if (createResponseIDisError) {
      toast.error(createResponseIDmessage, { toastId: customId });
      setTimeout(() => {
        dispatch(reset())
      }, 6000);
    }
  }, [dispatch, createResponseIDisError, createResponseIDmessage]);


  // const smsCounts = async () => {
  //   try {
  //     const { data } = await axios.get(baseUrl + `/api/v1/sms/${loanId}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     });
  //     setSmsCount(data?.sms?.length);
  //   } catch (error) {
  //     setSmsCountErr(
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : error.message
  //     );
  //   }
  // };
  // smsCounts();




  return (
    <main>
      {showSuccessToast && (
        <Toast
          className="success-toast"
          onClose={() => setShowSuccessToast(false)}
          show={showSuccessToast}
          delay={5000}
          autohide>
          <Toast.Body>
            <span>
              <i className="fas fa-exclamation-circle" />
            </span>
            <p>Disposition saved successfuly!</p>
            <span onClick={() => setShowSuccessToast(false)}>
              <i className="fas fa-times" />
            </span>
          </Toast.Body>
        </Toast>
      )}
      <div className="customer-details">
        <div className="page-title">
          <h5>Loan Details - {loanId}</h5>
        </div>

        <div className="page-features">
          <div className="search-entries sms-fill-search">
            <form className="searchbox">
              <div className="search-form-ctrl">
                <input
                  type="search"
                  placeholder="Search Credit Number"
                  disabled
                />
                <button type="button" disabled>
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </form>
          </div>

          <div className="btn-responsive">

            {isAgent && (
              <div className="btn-side-container" onClick={handleShow}>
                <button className="btn-side">
                  Fill Disposition
                </button>
                <span className="btn-side-icon">
                  <  FiPlusCircle />
                </span>
              </div>
            )}

          </div>
        </div>
        <div className="customer-details-box">
          <div className="basic-info-wrap">
            <div className="basic-info-details">
              <p>Customer Name:</p>
              <p>{customer_name}</p>
              <p>virtual Account:</p>
              <p>{virtual_account}</p>
              <p>Mobile No 1:</p>
              <p>{phone1}</p>
              <p>Mobile No 2:</p>
              <p>{phone2}</p>
              <p>Amount Repaid:</p>
              <p>{amount_repaid}</p>
              <p>bank Name:</p>
              <p>{bank_name}</p>
            </div>
            <div className="sms-count">
              <div className="previous-interactions-title">
                <p>
                  Previous Dispositions
                  <span>{!responses ? 0 : responses?.length}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="general-info-wrap">
            <p>General Information</p>
            <div className="general-info-grid">
              <div className="general-info-details">
                {!amount_repaid ? "" : <p>Amount to repay today :</p>}
                {!amount_repaid ? "" : <p>{amount_repaid}</p>}
                {!virtual_bank_name ? "" : <p>virtual_bank_name :</p>}
                {!virtual_bank_name ? "" : <p>{virtual_bank_name}</p>}
                {!createdAt ? "" : <p>createdAt :</p>}
                {!createdAt ? (
                  ""
                ) : (
                  <p>{moment(createdAt).format("DD-MMM-YYYY")}</p>
                )}
                {!amount_delinquent ? "" : <p>amount_delinquent :</p>}
                {!amount_delinquent ? "" : <p>{amount_delinquent}</p>}
                {!amount_disbursed ? "" : <p> amount_disbursed :</p>}
                {!amount_disbursed ? "" : <p>{amount_disbursed}</p>}
                {!disbursed_date ? "" : <p>disbursed_date :</p>}
                {!disbursed_date ? "" : (<p>{moment(disbursed_date).format("DD-MMM-YYYY")}</p>)}
                {!campaign ? "" : <p> campaign:</p>}
                {!campaign ? "" : <p>{campaign}</p>}
                {!createdBy ? "" : <p> createdBy:</p>}
                {!createdBy ? "" : <p>{moment(createdBy).format("DD-MMM-YYYY")}</p>}

              </div>
              <div className="general-info-details">
                {!email ? "" : <p>Email :</p>}
                {!email ? "" : <p>{email}</p>}
                {!discount ? "" : <p>Discount :</p>}
                {!discount ? "" : <p>{discount}</p>}
                {!employer_name ? "" : <p>employer_name :</p>}
                {!employer_name ? "" : <p>{employer_name}</p>}
                {!employer_phone ? "" : <p>employer_phone :</p>}
                {!employer_phone ? "" : <p>{employer_phone}</p>}
                {!guarantor_name ? "" : <p>guarantor_name :</p>}
                {!guarantor_name ? "" : <p>{guarantor_name}</p>}
                {!guarantor_phone ? "" : <p>guarantor_phone :</p>}
                {!guarantor_phone ? "" : <p>{guarantor_phone}</p>}
                {!loan_installment_id ? "" : <p>loan_installment_id :</p>}
                {!loan_installment_id ? "" : <p>{loan_installment_id}</p>}
                {!due_date ? "" : (<p>due_date:</p>)}
                {!due_date ? "" : (<p> {moment(due_date).format("DD-MMM-YYYY")}  </p>)}
                {!days_delinquent ? "" : <p> days_delinquent:</p>}
                {!days_delinquent ? "" : <p>{days_delinquent}</p>}
              </div>
            </div>
          </div>
        </div>

        <ul className="previous-interactions">
          {responses?.slice(0, 3)?.map((item: any, index: any) => (
            <li
              key={item?._id}
              onClick={() => {
                setPrevIndex(index);
                setShowPrevDisp(true);
              }}>
              <p>
                {moment(item?.createdAt).format(
                  "dddd, MMMM Do, YYYY [[]h:mm A[]]"
                )}
              </p>
              <p>
                Call Type: <span>{item?.callAnswered}</span>
                Call Status: <span>{item?.callStatus}</span>
              </p>
            </li>
          ))}
        </ul>

        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="disposition-modal logic-modal"
        >


          <ModalHeader setShow={setShow} headerTitle={"Disposition Info - " + loanId} />
          <Modal.Body>
            <FillDisposition
              setShow={setShow}
              setShowSuccessToast={setShowSuccessToast}
              customerDetailsId={id}
            />
          </Modal.Body>
        </Modal>

        <Modal
          size="lg"
          show={showPrevDisp}
          onHide={handleClosePrevDisp}
          backdrop="static"
          keyboard={false}
          className="disposition-modal"
          centered>
          <ModalHeader setShow={setShowPrevDisp} headerTitle={"Previous Disposition Info - " + loanId} />
          <Modal.Body>
            <SingleResponse data={createResponseIDdata} prevIndex={prevIndex} />

            <div className="disposition-btn">
              <input
                className="btn"
                type="button"
                value="Close"
                onClick={() => setShowPrevDisp(false)}
              />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </main>
  );
};
export default CustomerDetails;
