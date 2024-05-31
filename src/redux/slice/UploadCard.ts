import { createSlice } from '@reduxjs/toolkit';

interface IDetailEntity {
	step1: Record<string, any>;
	step2: Record<string, any>;
	quiz: any[];
}

interface ICardsState {
	detailEntity: Record<number, IDetailEntity>;
}

const initialState: ICardsState = {
	detailEntity: {},
};

export const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		updateDetailEntity(state, action: { payload: { id: number, data: IDetailEntity } }) {
			state.detailEntity[action.payload.id] = action.payload.data;
		},
		Step1Data(state, action: { payload: { id: number, key: string, value: any } }) {
			if (!state.detailEntity[action.payload.id]) {
				state.detailEntity[action.payload.id] = { step1: {}, step2: {}, quiz: [] };
			}
			state.detailEntity[action.payload.id].step1[action.payload.key] = action.payload.value;
		},
		Step2Data(state, action: { payload: { id: number, key: string, value: any } }) {
			if (!state.detailEntity[action.payload.id]) {
				state.detailEntity[action.payload.id] = { step1: {}, step2: {}, quiz: [] };
			}
			state.detailEntity[action.payload.id].step2[action.payload.key] = action.payload.value;
		},
		QuizData(state, action: { payload: { id: number, quizItem: any } }) {
			if (!state.detailEntity[action.payload.id]) {
				state.detailEntity[action.payload.id] = { step1: {}, step2: {}, quiz: [] };
			}
			state.detailEntity[action.payload.id].quiz.push(action.payload.quizItem);
		},
	},
});

export const cardsActions = cardsSlice.actions;
