import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function ShelfPage() {
  const dispatch = useDispatch();
  const items = useSelector(store => store.items);


  useEffect(() => {
    dispatch({type: "FETCH_ITEMS"});
  }, []);
  

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <ul>
        {items.map(item => (
          <div key={item.id} class="shelf-item">
            <img src={item.url} alt={item.description} />
            <p>{item.description}</p>
          </div>
        ))}
      </ul>


    </div>
  );
}

export default ShelfPage;
