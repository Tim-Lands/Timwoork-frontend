import { ChatThunkFunctions } from "./thunkFunctions";
import { chatSlice } from "./chatSlice";
export const ChatActions = { ...ChatThunkFunctions, ...chatSlice.actions };
