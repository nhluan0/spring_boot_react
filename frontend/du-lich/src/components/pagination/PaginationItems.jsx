import React from 'react'

const PaginationItems = ({ currentItems }) => {
    return (
        <>

            {currentItems &&
                currentItems.map((item, index) => (
                    <div key={index + 1}>
                        <h3>Item #{item}</h3>
                    </div>
                ))}
        </>
    );
}

export default PaginationItems
