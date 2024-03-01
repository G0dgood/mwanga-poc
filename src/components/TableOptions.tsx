import React from "react";
import { FaCloudDownloadAlt, FaRegMeh } from "react-icons/fa";

const EntriesPerPage = ({ data, entriesPerPage, setEntriesPerPage }: any) => (
  <div className="entries-perpage">
    {data?.length > 1 && (
      <>
        <select
          value={entriesPerPage}
          onChange={(e) => setEntriesPerPage(e.target.value)}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </>
    )}
  </div>
);
const TableFetch = ({ colSpan }: any) => (
  <tr>
    <td colSpan={colSpan} className="table-loader">
      <FaCloudDownloadAlt size={60} />
      <p className="mt-3">Fetching request...</p>
    </td>
  </tr>
);
const NoRecordFound = ({ colSpan, not }: any) => (
  <tr>
    <td colSpan={colSpan} className="table-loader">
      <FaRegMeh size={60} />
      <p className="mt-6">{not ? "Search with Phone Number to get a response" : "No record found"}</p>
    </td>
  </tr>
);

const customId = "custom-id-yes";

export { TableFetch, EntriesPerPage, NoRecordFound, customId };
