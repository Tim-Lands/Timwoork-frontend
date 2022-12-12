import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectsServices } from "@/services/projects";

const getAllProjects = createAsyncThunk(
  "portfolio/projects/get",
  async (args, { rejectWithValue }) => {
    try {
      const res = await ProjectsServices.getAll();
      return res;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const addProject = createAsyncThunk(
  "portfolio/project/add",
  async (
    args: {
      body: {
        title: string;
        content: string;
        tags: Array<any>;
        cover: any;
        images: Array<any>;
        completed_date: any;
        url: any;
      };
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await ProjectsServices.addOne(args.body);
      dispatch(getAllProjects());
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
      body: {
        title: string;
        content: string;
        tags: Array<any>;
        cover: any;
        images: Array<any>;
      };
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await ProjectsServices.updateOne(args.id, args.body);
      dispatch(getAllProjects());
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
const deleteProject = createAsyncThunk(
  "portfolio/delete/one",
  async (args: { id: number }, { rejectWithValue, dispatch }) => {
    try {
      const res = await ProjectsServices.deleteOne(args.id);
      dispatch(getAllProjects());
      return res;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const PortfolioThunkFunctions = {
  getAllProjects,
  addProject,
  updateProduct,
  deleteProject,
};
