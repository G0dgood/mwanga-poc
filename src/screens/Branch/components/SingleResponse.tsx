import { useState, useEffect } from "react";
import moment from "moment";

const SingleResponse = ({ data, prevIndex }: any) => {
  const responses = data?.responses;

  const [resIndex, setResIndex] = useState(0);

  useEffect(() => {
    setResIndex(prevIndex);
  }, [prevIndex]);

  const singleResponse = responses[resIndex];

  return (
    <div className="previous-disposition-modal">
      <div className="prev-disp-agent-details">
        <div>
          <p>Agent ID</p>
          <p>{singleResponse.user.userId}</p>
          <p>Agent Name</p>
          <p>
            {singleResponse.user.firstname} {singleResponse.user.lastname}
          </p>
          <p>Date Contacted</p>
          <p>
            {moment(singleResponse.createdAt).format("MMMM Do, YYYY [[]h:mm A[]]")}
          </p>
        </div>
      </div>
      <div className="previous-disp-grid">
        <div>
          <p>Call Disposition</p>
          <p>{singleResponse.disposition}</p>
        </div>
        <div>
          <p>Right Party Contacted</p>
          <p>{singleResponse.rightPartyContacted}</p>
        </div>
        <div>
          <p>Promised to Pay</p>
          <p>{singleResponse.promiseToPay}</p>
        </div>
        <div>
          <p>Commitment Date</p>
          <p>{moment(singleResponse.commitmentDate).format("DD-MM-YYYY")}</p>
        </div>
        <div>
          <p>Commitment Amount</p>
          <p>{singleResponse.promiseToPayAmount}</p>
        </div>
        <div>
          <p>Reason For Delinquency</p>
          <p>{singleResponse.reasonForDelinquency}</p>
        </div>
        {singleResponse.reasonForDelinquency === "Call Back" && (
          <div>
            <p>Call Back Date</p>
            <p>{moment(singleResponse.callBackDate).format("DD-MM-YYYY")}</p>
          </div>
        )}
        <div>
          <p>Comment</p>
          <p>{singleResponse.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleResponse;
