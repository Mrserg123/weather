import { combineReducers } from 'redux';
import weatherSlice from '../slices/weatherSlice';

const reducers = combineReducers({
weather: weatherSlice
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;