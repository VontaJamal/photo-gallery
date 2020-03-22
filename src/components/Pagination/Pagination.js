import React from 'react'
import './Pagination.css'

export default function Pagination({
  photosPerPage,
  totalPhotos,
  paginate,
  currentPage
}) {
  const pageNumbers = []

  if (totalPhotos === 0) {
    return <div />
  }

  for (let i = 1; i <= Math.ceil(totalPhotos / photosPerPage); i += 1) {
    pageNumbers.push(i)
  }

  return (
    <nav className="pagination">
      <ul className="paginationList">
        {pageNumbers.map(number => {
          return (
            <li
              key={number}
              className={number === currentPage ? 'active' : undefined}
            >
              <a
                onClick={() => paginate(number)}
                href="!#"
                className="page-link"
              >
                {number}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
