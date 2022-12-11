import { ChatService } from "@/services/chat";
import { createAsyncThunk } from "@reduxjs/toolkit";

const createChat = createAsyncThunk(
  "Chat/create",
  async (
    args: {
      id: number;
      body: { receiver_id: number; initial_message: string; title: string };
    },
    { dispatch, rejectWithValue }
  ) => {
    const { id, body } = args;
    try {
      const res = await ChatService.create(id, body);
      dispatch(getChatsData({ pageNumber: 1 }));
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
const unreadMessagesCount = createAsyncThunk(
  "chat/all/messages/count",
  async (args, { rejectWithValue }) => {
    try {
      const res = await ChatService.unreaded();
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const getSingleChat = createAsyncThunk(
  "Chat/one/data",
  async (args: { id: number }, { rejectWithValue, dispatch }) => {
    const { id } = args;
    try {
      const res = await ChatService.getOne(id);
      dispatch(unreadMessagesCount());
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
    { rejectWithValue, dispatch }
  ) => {
    const { id, body, headers } = args;
    try {
      const res = await ChatService.message(id, body, headers);
      dispatch(getSingleChat({ id }));
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const ChatThunkFunctions = {
  createChat,
  getChatsData,
  unreadMessagesCount,
  getSingleChat,
  sendMessage,
};
