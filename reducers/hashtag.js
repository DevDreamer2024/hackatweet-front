import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    hashtag : [],
};

export const hashtagSlice = createSlice({
    name : 'hashtag',
    initialState,
    reducers : {
        addHashtag : (state, action) => {
            state.hashtag = action.payload;
        },
       
    }
});

export const { addHashtag } = hashtagSlice.actions;

export default hashtagSlice.reducer;
    