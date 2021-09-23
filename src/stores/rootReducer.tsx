import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user.store';

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;