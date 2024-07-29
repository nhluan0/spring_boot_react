import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import PaginationItems from './PaginationItems';

const PaginationCommon = ({ itemsPerPage, items, isTour, itemOffset, setItemOffset, currentPage, setCurrentPage }) => {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.


    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    let currentItems = items.slice(itemOffset, endOffset);
    // console.log(currentItems)
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;

        setItemOffset(newOffset);
        setCurrentPage(event.selected); // Đặt lại currentPage
    };

    return (
        <>

            {isTour && <PaginationItems currentItems={currentItems} />}

            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLinkClassName="page-link"
                activeClassName="active"
                forcePage={currentPage}

            />
        </>
    );
}

export default PaginationCommon


