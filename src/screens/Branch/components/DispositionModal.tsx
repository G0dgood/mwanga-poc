import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaLongArrowAltRight } from "react-icons/fa";
import ModalHeader from "../../../components/Modal/ModalHeader";
import CustomerDetails from "./CustomerDetails";

const DispositionModal = ({
  id,
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
  virtual_bank_name,
}: any) => {
  const [fullscreen, setFullscreen] = useState<any>(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint: boolean | ((prevState: boolean) => boolean)) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  const remove = () => {
    sessionStorage.removeItem("CreateUser");
  };

  return (
    <div>
      <>
        <button
          className="me-2 table-navlink btn btn-flex"
          onClick={() => handleShow(true)}>
          <FaLongArrowAltRight size={30} />
        </button>
        <Modal
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}>
          <ModalHeader setShow={setShow} headerTitle={"Customer Details"} />
          <Modal.Body>
            <CustomerDetails id={id}
              amount_delinquent={amount_delinquent}
              amount_disbursed={amount_disbursed}
              amount_repaid={amount_repaid}
              bank_name={bank_name}
              campaign={campaign}
              createdAt={createdAt}
              createdBy={createdBy}
              customer_name={customer_name}
              days_delinquent={days_delinquent}
              disbursed_date={disbursed_date}
              discount={discount}
              due_date={due_date}
              email={email}
              employer_name={employer_name}
              employer_phone={employer_phone}
              guarantor_name={guarantor_name}
              guarantor_phone={guarantor_phone}
              loanId={loanId}
              loan_installment_id={loan_installment_id}
              phone1={phone1}
              phone2={phone2}
              virtual_account={virtual_account}
              virtual_bank_name={virtual_bank_name} />
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default DispositionModal;
