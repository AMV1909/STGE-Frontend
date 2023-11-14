import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Worker } from '../../Types/types.d';

const initialState: Worker[] = [{
    _id: '',
    role: 'Worker',
    name: '',
    email: '',
    picture: '',
    
},

];

export const workersSlice = createSlice({
    name: 'workers',
    initialState,
    reducers: {
        setWorkersInfo: (state, action: PayloadAction<Worker[]>) => {
            localStorage.setItem('workers', JSON.stringify(state));

            return [...action.payload];
        },
        

        resetWorkersInfo: () => {
            return JSON.parse(localStorage.getItem('workers')!) as Worker[];
        },
    },
});

export default workersSlice.reducer;
export const { setWorkersInfo, resetWorkersInfo } = workersSlice.actions;


