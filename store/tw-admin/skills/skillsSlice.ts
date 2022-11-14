import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { SkillsThunkFunctions } from "./thunkFunctions";
import { ISkill } from "@/services/tw-admin/skillsService";
//import { CustomMatchers } from "./matchers";

const { getAll, getOne } =
SkillsThunkFunctions;

export interface SkillsState {
    page: number,
    to: number,
    total: number,
    per_page: number,
    loading: boolean,
    current_skill: {
        loading: boolean,
        data?: SkillState,
        error?: string,

    },
    data: SkillState[],
    error?: string,

}

export type SkillState = ISkill & {
    id: number
}
const initialState: SkillsState = {
    page: 1,
    to: 1,
    total: 0,
    per_page: 0,
    loading: true,
    current_skill: {
        loading: true,
        data: null
    },
    data: [],

};

export const dashboardSkillsSlice = createSlice({
    name: "dashboard_skills",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(getAll.fulfilled, (state, action: any) => {
            const payload: any = action.payload
            state.data = payload
            state.loading = false
        })

        builder.addCase(getAll.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getAll.rejected, (state) => {
            state.loading = false
        })

        builder.addCase(getOne.fulfilled, (state, action: any) => {
            state.current_skill.data = action.payload
        })

        builder.addMatcher(isAnyOf(getOne.fulfilled, getOne.rejected), (state) => {
            state.current_skill.loading = false
        })

        builder.addMatcher(isAnyOf(getOne.pending), (state) => {
            state.current_skill.loading = true
        })

    },
});
export default dashboardSkillsSlice.reducer;
