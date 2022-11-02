import { ChatService } from "services/chatService";
import { createAsyncThunk } from "@reduxjs/toolkit";
const getChatsData = createAsyncThunk(
  "Chat/all/data",
  async (args: { pageNumber: number }, { rejectWithValue }) => {
    const { pageNumber } = args;
    try {
      const res = await ChatService.getAll(pageNumber);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const getSingleChat = createAsyncThunk(
  "Chat/one/data",
  async (args: { id: number }, { rejectWithValue }) => {
    const { id } = args;
    try {
      const res = await ChatService.getOne(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const sendMessage = createAsyncThunk(
  "Chat/one/message/send",
  async (
    args: { id: number; body: any; headers: any },
    { rejectWithValue }
  ) => {
    const { id, body, headers } = args;
    try {
      const res = await ChatService.message(id, body, headers);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const ChatThunkFunctions = {
  getChatsData,
  getSingleChat,
  sendMessage,
};
