import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { sendCustomerMessageAction } from "../LOB/Branch/store/actions/customerActions";
import { Modal, Toast } from "react-bootstrap";
// import { SEND_CUSTOMER_SMS_RESET } from "../LOB/Branch/store/constants/customerConstants";

const CustomerSMS = ({
  // phoneNumber,
  // message,
  // loanId,

}) => {
  const dispatch = useDispatch();

  const [SMS, setSMS] = useState(false);
  const handleCloseSMS = () => setSMS(false);
  const [showToast, setShowToast] = useState(false);

  // const [phoneNumbers, setPhoneNumbers] = useState(phoneNumber);
  // const [messages, setMessages] = useState(message);



  // const submitHandler = (e: { preventDefault: () => void; }) => {
  //   e.preventDefault();
  //   dispatch(sendCustomerMessageAction(phoneNumbers, messages));
  // };

  // useEffect(() => {
  //   if (successSMS) {
  //     setSMS(false);
  //     handleCloseSMS(true);
  //     dispatch({
  //       type: SEND_CUSTOMER_SMS_RESET,
  //     });
  //   } else if (errorSMS) {
  //     setShowToast(true);
  //   }
  // }, [dispatch, successSMS, errorSMS]);

  return (
    <div>
      <button className="sms__btn" onClick={() => setSMS(true)}>
        + SMS
      </button>

      <Modal
        size="lg"
        show={SMS}
        onHide={handleCloseSMS}
        backdrop="static"
        keyboard={false}
        className="disposition-modal logic-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            {/* <i className="far fa-envelope"></i> Send SMS - <span>{loanId}</span> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form onSubmit={submitHandler}>
            {errorSMS && (
              <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                delay={6000}
                autohide>
                <Toast.Body>
                  <span>
                    <i className="fas fa-exclamation-circle" />
                  </span>
                  <p>{errorSMS}</p>
                  <span onClick={() => setShowToast(false)}>
                    <i className="fas fa-times" />
                  </span>
                </Toast.Body>
              </Toast>
            )}
            <div>
              <div>
                <label>Phone Number</label>
                <input
                  required
                  className="sms-font"
                  type="text"
                  disabled
                  value={phoneNumbers}
                  onChange={(e) => setPhoneNumbers(e.target.value)}
                />
              </div>

              <div className="form-ctrl " style={{}}>
                <label>Message</label>
                <textarea
                  required
                  className="form-ctrl-textarea sms-font"
                  name="w3review"
                  rows="1"
                  value={messages}
                  onChange={(e) => setMessages(e.target.value)}></textarea>
              </div>
            </div>
            <div className="disposition-btn">
              <input
                type="submit"
                value={loadingSMS ? "Sending..." : "Send "}
                disabled={loadingSMS && true}
              />
            </div>
          </form> */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomerSMS;
