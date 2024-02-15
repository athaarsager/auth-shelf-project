import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Fetch items saga
function* fetchItems() {
    try {
        const response = yield axios.get('/api/shelf');
        yield put({ type: 'SET_ITEMS', payload: response.data });
    } catch (error) {
        console.log('Fetch items request failed', error);
    }
}

// Add item saga
function* addItem(action) {
    try {
        yield axios.post('/api/shelf', action.payload);
        yield put({ type: 'FETCH_ITEMS' }); // Refresh items list
    } catch (error) {
        console.log('Add item request failed', error);
    }
}

// Update item saga
function* updateItem(action) {
    try {
        yield axios.put(`/api/shelf/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_ITEMS' }); // Refresh items list
    } catch (error) {
        console.log('Update item request failed', error);
    }
}

// Delete item saga
function* deleteItem(action) {
    try {
        yield axios.delete(`/api/shelf/${action.payload}`);
        yield put({ type: 'FETCH_ITEMS' }); // Refresh items list
    } catch (error) {
        console.log('Delete item request failed', error);
    }
}

// Watcher sagas
function* itemsSaga() {
    yield takeLatest('FETCH_ITEMS', fetchItems);
    yield takeLatest('ADD_ITEM', addItem);
    yield takeLatest('UPDATE_ITEM', updateItem);
    yield takeLatest('DELETE_ITEM', deleteItem);
}

export default itemsSaga;