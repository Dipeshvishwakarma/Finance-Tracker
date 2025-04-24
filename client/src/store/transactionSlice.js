import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../components/Auth/Api';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async ({ page = 1, filters = {} }) => {
    const response = await api.get('/transactions', {
      params: { page, ...filters }, 
    });
    return response.data;
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transactionData) => {
    const response = await api.post('/transactions', transactionData);
    return response.data;
  }
);

export const editTransaction = createAsyncThunk(
  'transactions/editTransaction',
  async (formData) => {
    const response = await api.put(`/transactions/${formData._id}`, formData);
    return response.data;
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id) => {
    await api.delete(`/transactions/${id}`);
    return id;
  }
);
export const transactionSummary = createAsyncThunk(
  'transactions/transactionSummary',
  async () => {
    const response = await api.get('/transactions/summary');
    console.log("response",response);
    
    return response.data;
  }
);

const initialState = {
  transactions : [],
  loading: false,
  error: null,
  filters: {
    type: '',
    category: '',
    dateRange: { start: null, end: null },
  },
  pagination: {
    currentPage: 1,
    totalTransactions: 0,
  },
  totalIncome:0,
  totalExpense:0
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = {...state.filters,...action.payload};
    },
    setCurrentPage(state, action) {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.pagination.totalTransactions = action.payload.total;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        console.log(state.pagination.totalTransactions);
        
        if(state.transactions.length<10){
          state.transactions.push(action.payload);
        }else{
          state.pagination.totalTransactions = state.transactions.length + 1;
        }
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter((t) => t._id !== action.payload);
      })
      .addCase(transactionSummary.fulfilled, (state, action) => {
        state.totalIncome = action.payload.totalIncome;
        state.totalExpense= action.payload.totalExpense;
      });
  },
});

export const { setFilters, setCurrentPage } = transactionSlice.actions;

export default transactionSlice.reducer;
