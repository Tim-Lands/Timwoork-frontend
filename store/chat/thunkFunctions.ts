import { ChatService } from "services/chatService";
import { createAsyncThunk } from "@reduxjs/toolkit";
const getChatData = createAsyncThunk("Chat/data", async () => {});
export const ChatThunkFunctions = {
  getChatData,
};
