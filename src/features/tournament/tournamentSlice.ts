import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../reducers';

export type Tournament = {
  id: string;
  name: string;
  organizer: string;
  game: string;
  participants: {
    current: number;
    max: number;
  };
  startDate: Date;
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
      })
      .addCase(fetchTournaments.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const fetchTournaments = createAsyncThunk(
  'tournaments/fetch',
  async ({ pageNumber, query }: { pageNumber: number; query: string }) => {
    console.log('🟢 search', pageNumber, query);
    const response = await fetch(
      `http://localhost:4000/tournaments?_limit=10&_page=${pageNumber}&q=${query}`
    ).then((resp) => resp.json());
    return response;
  }
);

// export const { sampleAction } = tournamentSlice.actions;
export default tournamentSlice.reducer;

export const selectAllPosts = (state: RootState) => state.tournaments.list;
