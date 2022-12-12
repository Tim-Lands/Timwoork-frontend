import {
  isAllOf,
  isAsyncThunkAction,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";
import { PortfolioThunkFunctions } from "./thunkFunctions";
const {
  addProject,
  deleteProject,
  getUserProjects,
  updateProduct,
  getUserProject,
} = PortfolioThunkFunctions;

const isUserProjectsActions = isAsyncThunkAction(
  getUserProjects,
  deleteProject,
  addProject,
  updateProduct
);
const isUserProjectsPending = isAllOf(isUserProjectsActions, isPending);
const isUserProjectsFulfilled = isAllOf(isUserProjectsActions, isFulfilled);
const isUserProjectsRejected = isAllOf(isUserProjectsActions, isRejected);

const isUserProjectActions = isAsyncThunkAction(getUserProjects);

const isUserProjectPending = isAllOf(isUserProjectActions, isPending);
const isUserProjectFulfilled = isAllOf(isUserProjectActions, isFulfilled);
const isUserProjectRejected = isAllOf(isUserProjectActions, isRejected);

export const PortfolioMatchers = {
  isUserProjectsPending,
  isUserProjectsFulfilled,
  isUserProjectsRejected,
  isUserProjectPending,
  isUserProjectFulfilled,
  isUserProjectRejected,
};
