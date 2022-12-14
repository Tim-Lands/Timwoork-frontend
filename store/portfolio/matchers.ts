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
  getUsersProjects,
} = PortfolioThunkFunctions;

const isUsersProjectsActions = isAsyncThunkAction(getUsersProjects);

const isUsersProjectsPending = isAllOf(isUsersProjectsActions, isPending);
const isUsersProjectsFulfilled = isAllOf(isUsersProjectsActions, isFulfilled);
const isUsersProjectsRejected = isAllOf(isUsersProjectsActions, isRejected);

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
  isUsersProjectsPending,
  isUsersProjectsFulfilled,
  isUsersProjectsRejected,
  isUserProjectsPending,
  isUserProjectsFulfilled,
  isUserProjectsRejected,
  isUserProjectPending,
  isUserProjectFulfilled,
  isUserProjectRejected,
};
