import {
  isAllOf,
  isAsyncThunkAction,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";
import { PortfolioThunkFunctions } from "./thunkFunctions";
const { addProject, deleteProject, getUserProjects, updateProduct } =
  PortfolioThunkFunctions;

const isUserProjectsActions = isAsyncThunkAction(
  getUserProjects,
  deleteProject,
  addProject,
  updateProduct
);
const isUserProjectsPending = isAllOf(isUserProjectsActions, isPending);
const isUserProjectsFulfilled = isAllOf(isUserProjectsActions, isFulfilled);
const isUserProjectsRejected = isAllOf(isUserProjectsActions, isRejected);

export const PortfolioMatchers = {
  isUserProjectsPending,
  isUserProjectsFulfilled,
  isUserProjectsRejected,
};
