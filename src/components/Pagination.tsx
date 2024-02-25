import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ data, setDisplayData, entriesPerPage, Total }: any) => {
  // --- Pagination --- //
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = parseInt(entriesPerPage);
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(data?.length / usersPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const displayData = data?.slice(pagesVisited, pagesVisited + usersPerPage);

  useEffect(() => {
    setDisplayData(displayData);
    localStorage.setItem("rowsPerPage", entriesPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDisplayData, entriesPerPage, pageNumber, data]);

  return (
    <div>
      <div className="table-footer">
        <p>
          Total of {data?.length} {Total}
        </p>
        {data?.length > 10 && (
          <div className="pagination-tab">
            <ReactPaginate
              previousLabel={
                <>
                  <i className="fas fa-chevron-left" /> Previous
                </>
              }
              nextLabel={
                <>
                  Next <i className="fas fa-chevron-right" />
                </>
              }
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
