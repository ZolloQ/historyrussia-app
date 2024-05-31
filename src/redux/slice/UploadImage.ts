import { createSlice } from '@reduxjs/toolkit';


interface IImage {
	step1: string[];
	step2: string[];
}


const initialState: IImage = {
	step1: [],
	step2: [],
};

export const imageSlice = createSlice({
	name: 'Image',
	initialState,
	reducers: {
		saveImageName(state, action: {payload: {name: string, step: number}} ) {
			if (action.payload.step === 1) {
				state.step1.push(action.payload.name)
			} else {
				state.step2.push(action.payload.name)
			}
		}
	},
});

export const imageActions = imageSlice.actions;
