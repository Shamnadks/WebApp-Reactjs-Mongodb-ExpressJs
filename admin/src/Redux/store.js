import {configureStore} from '@reduxjs/toolkit'
import adminReducer from './adminReducer'; 


const store=configureStore({
    reducer:{
        username:adminReducer

    }    
})

export default store;



