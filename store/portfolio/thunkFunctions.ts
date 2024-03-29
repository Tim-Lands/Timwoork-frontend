import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectsServices } from "@/services/projects";
import { SellersService } from "@/services/sellers";

const getUsersProjects = createAsyncThunk(
  "portfolio/users/projects/get",
  async (
    args: { current_page: number; category_id: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await ProjectsServices.getAllUsers(
        args.current_page,
        args.category_id
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const getUserProjects = createAsyncThunk(
  "portfolio/user/projects/get",
  async (args: { username: string }, { rejectWithValue }) => {
    try {
      const res = await ProjectsServices.getAll(args.username);
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const getUserProject = createAsyncThunk(
  "portfolio/user/project/get",
  async (args: { id: number }, { rejectWithValue }) => {
    try {
      const res = await ProjectsServices.getOne(args.id);
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const addProject = createAsyncThunk(
  "portfolio/project/add",
  async (
    args: {
      username: string;
      body: {
        title: string;
        content: string;
        tags: Array<any>;
        cover: any;
        images: Array<any>;
        completed_date: any;
        url: any;
        subcategory: number;
      };
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await ProjectsServices.addOne(args.body);
      dispatch(getUserProjects({ username: args.username }));
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const updateProduct = createAsyncThunk(
  "portfolio/update/one",
  async (
    args: {
      id: number;
      username: string;
      body: {
        title: string;
        content: string;
        tags: Array<any>;
        cover: any;
        images: Array<any>;
        completed_date: string;
        url: string;
      };
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await ProjectsServices.updateOne(args.id, args.body);
      dispatch(getUserProjects({ username: args.username }));
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const deleteProject = createAsyncThunk(
  "portfolio/delete/one",
  async (
    args: { id: number; username: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await ProjectsServices.deleteOne(args.id);
      dispatch(getUserProjects({ username: args.username }));
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const toggleLikeBack = createAsyncThunk(
  "portfolio/project/like",
  async (args: { id: number }, { rejectWithValue }) => {
    try {
      const res = await ProjectsServices.like(args.id);

      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const getTopSellers = createAsyncThunk('portfolio/topSellers',
  async (args: {}, { rejectWithValue }) => {
    try {
      const res = await SellersService.getTopSellers()
      return res?.data
    }
    catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  })

export const PortfolioThunkFunctions = {
  getUsersProjects,
  getUserProjects,
  addProject,
  updateProduct,
  deleteProject,
  getUserProject,
  toggleLikeBack,
  getTopSellers
};
