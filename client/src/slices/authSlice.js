import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    userData: null,
    loading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, value){
            state.token = value.payload;
        },
        setUserData(state, value){
            state.userData = value.payload;
        },
        setLoading(state, value){
            state.userData = value.payload;
        }
    }
});

export const {setToken, setUserData, setLoading} = authSlice.actions;
export default authSlice.reducer;