import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './consts';

export const { reducer, actions: webhooksActions, name: storeName } = createSlice({
  name: 'webhooks',
  initialState,
  reducers: {
    loadDataAction: (state) => ({ ...state, isLoading: true }),
    loadDataSuccess: (state, { payload }) => ({ ...state, isLoading: false }),
  },
});
