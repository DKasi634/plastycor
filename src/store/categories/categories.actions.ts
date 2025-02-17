import { Action, ActionWithPayload, createAction } from "@/utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import { Category } from "@/api/types";
import { CustomError, getCustomError } from "@/utils/errors.utils";

// Create Category Actions
type CategoryCreateStart = ActionWithPayload<CATEGORIES_ACTION_TYPES.CREATE_CATEGORY_START, Category>;
type CategoryCreateFailure = ActionWithPayload<CATEGORIES_ACTION_TYPES.CREATE_CATEGORY_FAILURE, CustomError>;
type CategoryCreateSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.CREATE_CATEGORY_SUCCESS, Category>;

// Update Category Actions
type CategoryUpdateStart = ActionWithPayload<CATEGORIES_ACTION_TYPES.UPDATE_CATEGORY_START, Category>;
type CategoryUpdateFailure = ActionWithPayload<CATEGORIES_ACTION_TYPES.UPDATE_CATEGORY_FAILURE, CustomError>;
type CategoryUpdateSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.UPDATE_CATEGORY_SUCCESS, Category>;

// Delete Category Actions
type CategoryDeleteStart = ActionWithPayload<CATEGORIES_ACTION_TYPES.DELETE_CATEGORY_START, Category>;
type CategoryDeleteFailure = ActionWithPayload<CATEGORIES_ACTION_TYPES.DELETE_CATEGORY_FAILURE, CustomError>;
type CategoryDeleteSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.DELETE_CATEGORY_SUCCESS, Category>;

// Fetch Categories Actions
type CategoriesFetchStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
type CategoriesFetchFailure = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, CustomError>;
type CategoriesFetchSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

// Combine all actions into a discriminated union
export type CategoryAction =
  | CategoryCreateStart
  | CategoryCreateFailure
  | CategoryCreateSuccess
  | CategoryUpdateStart
  | CategoryUpdateFailure
  | CategoryUpdateSuccess
  | CategoryDeleteStart
  | CategoryDeleteFailure
  | CategoryDeleteSuccess
  | CategoriesFetchStart
  | CategoriesFetchFailure
  | CategoriesFetchSuccess;

// Action creators for Create Category
export const createCategoryStart = (category: Category): CategoryCreateStart =>
  createAction(CATEGORIES_ACTION_TYPES.CREATE_CATEGORY_START, category);

export const createCategoryFailure = (error: unknown): CategoryCreateFailure =>
  createAction(CATEGORIES_ACTION_TYPES.CREATE_CATEGORY_FAILURE, getCustomError(error));

export const createCategorySuccess = (category: Category): CategoryCreateSuccess =>
  createAction(CATEGORIES_ACTION_TYPES.CREATE_CATEGORY_SUCCESS, category);

// Action creators for Update Category
export const updateCategoryStart = (category: Category): CategoryUpdateStart =>
  createAction(CATEGORIES_ACTION_TYPES.UPDATE_CATEGORY_START, category);

export const updateCategoryFailure = (error: unknown): CategoryUpdateFailure =>
  createAction(CATEGORIES_ACTION_TYPES.UPDATE_CATEGORY_FAILURE, getCustomError(error));

export const updateCategorySuccess = (category: Category): CategoryUpdateSuccess =>
  createAction(CATEGORIES_ACTION_TYPES.UPDATE_CATEGORY_SUCCESS, category);

// Action creators for Delete Category
export const deleteCategoryStart = (category: Category): CategoryDeleteStart =>
  createAction(CATEGORIES_ACTION_TYPES.DELETE_CATEGORY_START, category);

export const deleteCategoryFailure = (error: unknown): CategoryDeleteFailure =>
  createAction(CATEGORIES_ACTION_TYPES.DELETE_CATEGORY_FAILURE, getCustomError(error));

export const deleteCategorySuccess = (category: Category): CategoryDeleteSuccess =>
  createAction(CATEGORIES_ACTION_TYPES.DELETE_CATEGORY_SUCCESS, category);

// Action creators for Fetch Categories
export const fetchCategoriesStart = (): CategoriesFetchStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesFailure = (error: unknown): CategoriesFetchFailure =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, getCustomError(error));

export const fetchCategoriesSuccess = (categories: Category[]): CategoriesFetchSuccess =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);
