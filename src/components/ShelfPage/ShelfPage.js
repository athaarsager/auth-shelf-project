import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function ShelfPage() {
  const dispatch = useDispatch();
  const items = useSelector(store => store.items);
  const [newItem, setNewItem] = useState({});

  const handleChange = (e) => {

    // create variable to hold key that is being changed in input. (name = input's name = key, value=value)
    const { name, value } = e.target;

    setNewItem((currentInfo) => ({ ...currentInfo, [name]: value }));

  }

  useEffect(() => {
    dispatch({ type: "FETCH_ITEMS" });
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
            <button>Delete Item</button>
          </div>
        ))}
      </ul>
      <h2>Add an Item to the Shelf!</h2>
      <form>
          <label for="description">Description</label><br/>
          <input id="description" name="description" placeholder="Cool Description Here!" value={newItem.description} onChange={(handleChange)}/><br/>
          <label for="image_url">Image Url</label><br/>
          <input id="image_url" name="image_url" placeholder="www.coolimage.com" value={newItem.image_url} onChange={(handleChange)}/>
          <input type="submit">Submit!</input>
      </form>
    </div>
  );
}

export default ShelfPage;
