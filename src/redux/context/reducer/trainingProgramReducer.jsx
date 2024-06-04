import { SEARCH_TRAINING_PROGRAM } from "../action";
const initialState = {
  data: [], // here we will store our data array
};
const trainingProgramReducer = (state = initialState, action) => {
  switch (action.type) {
    // search case
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_DATA2":
      return { ...state, data2: action.payload };
    case SEARCH_TRAINING_PROGRAM:
      return {
        ...state,
        search: {
          ...state.search,
          [action.payload.name]: action.payload.value,
        },
      };
    //************/
    default:
      return state;
  }
};
export default trainingProgramReducer;
