import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { IUser } from '../../types/commonTypes';
import UsersList from '../UsersList/UsersList';

import './PaginatedList.scss';

interface IPaginatedListProps {
  itemsPerPage: number,
  fetchUrl: string,
}

const PaginatedList: React.FC<IPaginatedListProps> = props => {
  const { itemsPerPage, fetchUrl } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<IUser[]>();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [total, setTotal] = useState<number>(0);

  const fetchData = () => {
    setLoading(true);

    const qs = `?offset=${itemOffset}&count=${itemsPerPage}`;

    fetch(fetchUrl + qs)
      .then(data => data.json())
      .then(result => {
        if (result && result.data && (result.total || result.rowCount)) {
          setPageCount(Math.ceil((result.total) / itemsPerPage));
          setTotal(result.total || result.rowCount);
          setCurrentItems(result.data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [itemOffset, itemsPerPage])

  const handlePageClick = (event: { selected: number }) => {
    console.log(event.selected);
    const newOffset = (event.selected * itemsPerPage) % total;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);

    setItemOffset(newOffset);
  };

  return (
    <div className='root'>
      <ReactPaginate
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        nextLabel=">"
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={undefined}
      />

      {!loading ? <UsersList data={currentItems} /> : 'Loading...'}
    </div>
  );
}

export default PaginatedList;