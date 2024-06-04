import { createSlice } from "@reduxjs/toolkit";
import { program } from "../Program";
export const programSlice = createSlice({
    name: 'program',
    initialState: { value: program },
    reducers: {
        updateProgramName: (state, action) => {
            state.value.programName = action.payload.programName;
            state.value.dateCreated = action.payload.dateCreated;
            state.value.creatorName = action.payload.creatorName;
        },
        createNewProgramContent: (state, action) => {
            var count = 0;
            if (state.value.content.length === 0) {
                state.value.content.push(action.payload);
                state.value.programDay += action.payload.day;
                state.value.programHour += action.payload.hour;
            } else {
                for (var i = 0; i < state.value.content.length; i++) {
                    if (action.payload.id !== state.value.content[i].id) {
                        count += 1;
                    } else {
                        count = -1;
                        break;
                    }
                }
                if (count === -1) {
                    alert('You cannot create the same program content!')
                }
            }
            if (count > 0) {
                state.value.content.push(action.payload);
                state.value.programDay += action.payload.day;
                state.value.programHour += action.payload.hour;
            }
        },
        deleteProgramContent: (state, action) => {
            state.value.content = state.value.content.filter((content) => content.id !== action.payload.id)
            state.value.programDay -= action.payload.day;
            state.value.programHour -= action.payload.hour;
        },
        reInitialState: (state) => {
            state.value = program;
        }
    }
})

export default programSlice.reducer;
export const { updateProgramName, createNewProgramContent, deleteProgramContent, reInitialState } = programSlice.actions;