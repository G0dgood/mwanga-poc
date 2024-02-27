import React, { useState, useEffect } from "react";
import AutoComplete from "../../../components/Autocomplete";
import { createResponse, reset } from "../../../features/Customer/customerSlice";
import { toast } from "react-toastify";
import { customId } from "../../../components/TableOptions";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import { Toast } from "react-bootstrap";


const FillDisposition = ({
  customerDetailsId,
  setShowSuccessToast,
  setShow
}: any) => {
  const dispatch = useAppDispatch()
  const [autoComment, setautoComment] = useState("");
  const { createResponseisError, createResponseisSuccess, createResponsemessage, createResponseisLoading } = useAppSelector((state) => state.customer)

  const [input, setInput] = useState<any>({
    disposition: "",
    rightPartyContacted: "",
    promiseToPay: "",
    callBackDate: "",
    promiseToPayDate: "",
    promiseToPayAmount: "",
    reasonForDelinquency: "",
    prefferedMethods: "",
    autoComment: "",
    comment: "",
  })



  const handleOnChange = (input: any, value: any) => {
    setInput((prevState: any) => ({
      ...prevState,
      [input]: value,
    }));
  };


  useEffect(() => {
    setInput((prevState: any) => {
      return ({
        ...prevState,
        autoComment: autoComment,
      });
    });
  }, [autoComment]);

  const value = { input, customerDetailsId }

  const createResponseHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // @ts-ignore 
    dispatch(createResponse(value))
  }

  useEffect(() => {
    if (createResponseisError) {
      setTimeout(() => {
        dispatch(reset())
      }, 6000);
    } else if (createResponseisSuccess) {
      setShow(false)
      setShowSuccessToast(true)
      dispatch(reset())
    }

  }, [dispatch, createResponseisError,
    createResponseisSuccess, createResponsemessage,
    setShowSuccessToast, setShow]);





  return (
    <div>
      <form onSubmit={createResponseHandler}>
        {createResponseisError && (
          <Toast
            show={createResponseisError}
            delay={6000}
            autohide>
            <Toast.Body>
              <span>
                <i className="fas fa-exclamation-circle" />
              </span>
              <p>{createResponsemessage}</p>
              <span onClick={() => dispatch(reset())}>
                <i className="fas fa-times" />
              </span>
            </Toast.Body>
          </Toast>
        )}
        <div className="create-user-form-grid">
          <div className="form-ctrl">
            <label>Disposition</label>
            <select
              value={input?.disposition}
              onChange={(e) => handleOnChange("disposition", e.target.value)}>
              <option>Please select...</option>
              <option value="Not answered">Connected</option>
              <option value="Not answered">Not answered</option>
              <option value="Switched off">Switched off</option>
              <option value="Unreachable">Unreachable</option>
              <option value="Hung up">Hung up</option>
            </select>
          </div>
          <div className="form-ctrl">
            <label>Right Party Contacted</label>
            <select
              value={input?.rightPartyContacted}
              onChange={(e) => handleOnChange("rightPartyContacted", e.target.value)}>
              <option>Please select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-ctrl">
            <label>Promise To Pay</label>
            <select
              value={input?.promiseToPay}
              onChange={(e) => handleOnChange("promiseToPay", e.target.value)}>
              <option>Please select...</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-ctrl">
            <label>Call Back Date</label>
            <input
              type="date"
              value={input?.callBackDate}
              onChange={(e) => handleOnChange("callBackDate", e.target.value)}
            />
          </div>
          <div className="form-ctrl">
            <label>Promise To Pay Date</label>
            <input
              type="date"
              required={input?.promiseToPay === "true"}
              value={input?.promiseToPayDate}
              onChange={(e) => handleOnChange("promiseToPayDate", e.target.value)}
            />
          </div>
          <div className="form-ctrl">
            <label>Promise To Pay Amount</label>
            <input
              type="number"
              required={input?.promiseToPay === "true"}
              value={input?.promiseToPayAmount}
              onChange={(e) => handleOnChange("promiseToPayAmount", e.target.value)}
            />
          </div>
          <div className="form-ctrl">
            <label>Delinquent Reasons</label>
            <select
              value={input?.reasonForDelinquency}
              onChange={(e) => handleOnChange("reasonForDelinquency", e.target.value)}
            >
              <option>Please select...</option>
              {[
                "Incovenient mode of payment",
                "Financial issues",
                "Sick/Hospitalized",
                "Faulty/Lost Mobile Device",
                "Does not know how to pay (Customer comprehension)",
                "Bank/card issues",
                "Waiting for salary",
                "Unable to make payment (Payment issues)",
                "Currently unemployed",
                "Travelled to a remote area",
                "Others",
              ].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="form-ctrl">
            <label>preffered methods</label>
            <select
              value={input?.prefferedMethods}
              onChange={(e) => handleOnChange("prefferedMethods", e.target.value)}>
              {[
                "Please select...",
                "Bank Transfer",
                "Auto debit",
                "In-App",
                "USSD",
              ].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div  >
            <div className="form-ctrl">
              <label>Auto Comment</label>
              <AutoComplete setautoComment={setautoComment} />

            </div>
            <div className="form-ctrl">
              <label>Comment</label>
              <input
                type="text"
                placeholder="Enter additional comment"
                value={input?.comment}
                onChange={(e) => handleOnChange("comment", e.target.value)}
              />
            </div>
          </div>

        </div>

        <div className="disposition-btn mt-5" >
          <button
            className="btn-upload"
            disabled={createResponseisLoading && true}>
            {createResponseisLoading ? "Saving..." : "Save & Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FillDisposition;
