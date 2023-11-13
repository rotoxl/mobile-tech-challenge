import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../reducers';

const API_ROOT = 'http://localhost:4000';

export type Tournament = {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
  startDate: string;
};

type TournamentState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  list: Tournament[];
  page: number;
  hasMoreResults: boolean;
};

const initialState: TournamentState = {
  status: 'idle',
  list: [],
  page: 1,
  hasMoreResults: false,
};

const tournamentSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTournaments.pending, (state) => {
        state.status = 'loading';

        console.log('fetchTournaments.pending');
      })
      .addCase(fetchTournaments.fulfilled, (state, action) => {
        const pageNumber = action.meta.arg.pageNumber;
        if (pageNumber <= 1) {
          state.list = action.payload;
        } else {
          state.list.push(...action.payload);
        }

        state.status = 'succeeded';
        state.page = pageNumber;
        state.hasMoreResults = action.payload.length > 0;

        console.log('fetchTournaments.fulfilled');
      })
      .addCase(fetchTournaments.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createTournament.pending, (state, action) => {
        console.log('createTournament.pending');
        console.log('action', action);
        console.log('state', state);

        const newTournament = {
          game: action.meta.arg,
          name: action.meta.arg,
          id: action.meta.requestId,
          organizer: '',
          startDate: new Date().toISOString(),
          participants: {
            current: 0,
            max: 256,
          },
        } satisfies Tournament;

        state.list.splice(0, 0, newTournament);
      })
      .addCase(createTournament.rejected, (state) => {
        state.list.splice(0, 1);
      });
  },
});

export const fetchTournaments = createAsyncThunk(
  'tournaments/fetch',
  async ({ pageNumber, query }: { pageNumber: number; query: string }) => {
    const response = await fetch(
      `${API_ROOT}/tournaments?_limit=10&_page=${pageNumber}&q=${query}`
    ).then((resp) => resp.json());
    return response;
  }
);

export const createTournament = createAsyncThunk(
  'tournaments/create',
  async (name: string) => {
    const response = await fetch(`${API_ROOT}/tournaments`, {
      method: 'POST',
      body: JSON.stringify({ name }),
    }).then((resp) => resp.json());
    return response;
  }
);

export default tournamentSlice.reducer;

export const selectAllPosts = (state: RootState) => state.tournaments.list;
