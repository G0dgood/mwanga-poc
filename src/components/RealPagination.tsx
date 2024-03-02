function RealPagination({ pagination, handlePagination }: any) {

	const pageNumbers = [];
	for (let i = 1; i <= pagination?.totalPages; i++) {
		pageNumbers.push(i);
	}

	let visiblePageNumbers = [];
	if (pagination?.page <= 3) {
		visiblePageNumbers = pageNumbers.slice(0, 5);
	} else if (pagination?.page >= pagination?.totalPages - 2) {
		visiblePageNumbers = pageNumbers.slice(-5);
	} else {
		visiblePageNumbers = pageNumbers.slice(pagination?.page - 3, pagination?.page + 2);
	}

	return (
		<div id="notificationbtn">
			<button
				className="btn_pagination"
				disabled={pagination?.page === 1}
				onClick={() => handlePagination('prev')}
			>
				Previous
			</button>

			{pagination?.page > 3 && (
				<button
					className="inactive-p"
					key={1}
					onClick={() => handlePagination('1')}
				>
					1
				</button>
			)}

			{pagination?.page > 4 && (
				<span className="ellipsis">...</span>
			)}

			{visiblePageNumbers?.map((pageNumber) => (
				<button
					key={pageNumber}
					onClick={() => handlePagination(String(pageNumber))}
					className={pagination?.page === pageNumber ? 'active-p' : 'normal'}
				>
					{pageNumber}
				</button>
			))}

			{pagination?.page < pagination?.totalPages - 3 && (
				<span className="ellipsis">...</span>
			)}

			{pagination?.page < pagination?.totalPages - 2 && (
				<button
					key={pagination?.totalPages}
					onClick={() => handlePagination(String(pagination?.totalPages))}
				>
					{pagination?.totalPages}
				</button>
			)}

			<button
				className="btn_pagination"
				disabled={pagination?.page === pagination?.totalPages}
				onClick={() => handlePagination('next')}
			>
				Next
			</button>
		</div>
	);
}

export default RealPagination;
