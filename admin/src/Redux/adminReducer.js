import {createSlice} from '@reduxjs/toolkit'


const adminSlice=createSlice({
    name:'admin',
    initialState:'',
    reducers:{
        changeAdmin:(state,action)=>{
            return action.payload

        }
    }
})

export const {changeAdmin}=adminSlice.actions

export default adminSlice.reducer;