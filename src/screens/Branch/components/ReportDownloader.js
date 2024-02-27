import { CSVLink } from "react-csv";
import moment from "moment";

const ReportDownloader = ({ data }) => {
  const headers = [
    { label: "Agent ID", key: "agentId" },
    { label: "Campaign", key: "campaign" },
    { label: "Bucket", key: "bucket" },
    { label: "Loan ID", key: "loanid" },
    { label: "customer name", key: "customer_name" },
    { label: "Disbursed Date", key: "disbursed_date" },
    { label: "Amount Disbursed", key: "amount_disbursed" },
    { label: "Amount Delinquent", key: "amount_delinquent" },
    { label: "Amount Repaid", key: "amountRepaid" },
    { label: "Days Delinquent", key: "days_delinquent" },
    { label: "Bank Name", key: "bankname" },
    { label: "Phone Number", key: "phonenumber" },
    { label: "Alternate Number", key: "alternatenumber" },
    { label: "Discount(%)", key: "discount" },
    { label: "Call Disposition Parameter", key: "call_disposition_parameter" },
    { label: "Right Party Contacted", key: "right_party_contacted" },
    { label: "Promise to Pay", key: "promise_to_pay" },
    { label: "PTP Date", key: "ptp_date" },
    { label: "Commitment Amount", key: "commitmentamount" },
    { label: "Callback Date", key: "callback_date" },
    { label: "Reason for Delinquency", key: "reason_for_delinquency" },
    { label: "Preferred Method", key: "preferred_method" },
    { label: "Auto comment", key: "auto_comment" },
    { label: "Manual comment", key: "manual_comment" },
    { label: "Disposition Date", key: "disposition_date" },
    { label: "Last Upload Date", key: "last_Upload_date" },
  ];

  const loopData = (data) => {
    const newData = [];
    data?.forEach((item) => {
      newData.push({
        agentId: item.user?.userId,
        campaign: item.customer?.campaign,
        bucket: moment(item.customer?.disbursedDate).format("DD-MMM-YY"),
        loanid: item.customer?.loanId,
        customer_name: item.customer?.customer_name,
        phoneNo: item.customer?.phone1,
        disbursed_date: moment(item.customer?.disbursed_date).format(
          "DD-MMM-YY"
        ),
        amount_disbursed: item.customer?.amount_disbursed,
        amount_delinquent: item.customer?.amount_delinquent,
        amountRepaid: item.customer?.amount_repaid,
        days_delinquent: item.customer?.days_delinquent,
        daysDelinquent: item.customer?.daysDelinquent,
        bankname: item.customer?.bank_name,
        phonenumber: item.customer?.phone1,
        alternatenumber: item.customer?.phone2,
        discount: item.customer?.discount,
        call_disposition_parameter: item.disposition,
        right_party_contacted: item.rightPartyContacted,
        promise_to_pay: item.promiseToPay,
        ptp_date: moment(item?.promiseToPayDate).format("DD-MMM-YY"),
        commitmentamount: item?.commitmentamount,
        callback_date: moment(item?.callback_date).format("DD-MMM-YY"),
        reason_for_delinquency: item?.reasonForDelinquency,
        preferred_method: item?.prefferedMethods,
        auto_comment: item?.autoComment,
        manual_comment: item?.comment,
        disposition_date: moment(item?.disposition_date).format("DD-MMM-YY"),
        last_Upload_date: item?.last_Upload_date,
      });
    });
    return newData;
  };
  const exportData = loopData(data);

  return (
    <CSVLink
      className={"btn"}
      data={exportData}
      headers={headers}
      filename={"Disposition Report.csv"}>
      Download
      {/* <FiArrowDownCircle /> */}
    </CSVLink>
  );
};

export default ReportDownloader;
