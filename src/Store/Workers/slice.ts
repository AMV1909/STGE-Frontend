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
        setWorkersInfo: (_, action: PayloadAction<Worker[]>) => {
            localStorage.setItem('workers', JSON.stringify(action.payload));
            return action.payload;
        },
        resetWorkersInfo: () => {
            const storedWorkers = JSON.parse(localStorage.getItem('workers')!) as Worker[];
            return storedWorkers || initialState;
        },
    },
});

 


export default workersSlice.reducer;
export const { setWorkersInfo, resetWorkersInfo } = workersSlice.actions;


