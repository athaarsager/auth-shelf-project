import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function ShelfPage() {
  const dispatch = useDispatch();
  const items = useSelector(store => store.itemsReducer);
  const user = useSelector(store => store.user);
  const [newItem, setNewItem] = useState({ user_id: user.id });

  const handleChange = (e) => {
    // create variable to hold key that is being changed in input. (name = input's name = key, value=value)
    const { name, value } = e.target;

    setNewItem((currentInfo) => ({ ...currentInfo, [name]: value }));

  }

  const addItem = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_ITEM", payload: newItem });
    setNewItem({ description: "", image_url: "" });
  }

  const removeItem = (e) => {
    alert(e.target.dataset.itemid);
    dispatch({ type: "DELETE_ITEM", payload: e.target.dataset.itemid });
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
          <div key={item.id} className="shelf-item">
            <img src={item.url} alt={item.description} />
            <p>{item.description}</p>
            {user.id === item.user_id &&
              <button onClick={removeItem} data-itemid={item.id}>Delete Item</button>
            }
          </div>
        ))}
      </ul>
      <h2>Add an Item to the Shelf!</h2>
      <form onSubmit={addItem}>
        <label htmlFor="description">Description</label><br />
        <input id="description" name="description" placeholder="Cool Description Here!" value={newItem.description} onChange={(handleChange)} /><br />
        <label htmlFor="image_url">Image Url</label><br />
        <input id="image_url" name="image_url" placeholder="www.coolimage.com" value={newItem.image_url} onChange={(handleChange)} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default ShelfPage;
