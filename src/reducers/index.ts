import { combineReducers } from 'redux';
import tournamentsReducer from '../features/tournament/tournamentSlice';

const rootReducer = combineReducers({
  tournaments: tournamentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
