import { Innovation } from "@/api/types";
import { CustomError, getCustomError } from "@/utils/errors.utils";
import { ActionWithPayload, createAction } from "@/utils/reducer/reducer.utils";
import { INNOVATIONS_ACTION_TYPES } from "./innovations.types";

type ReadInnovationStart = ActionWithPayload<
  INNOVATIONS_ACTION_TYPES.READ_INNOVATION_START,
  Innovation
>;
type ReadInnovationFailure = ActionWithPayload<
  INNOVATIONS_ACTION_TYPES.READ_INNOVATION_FAILURE,
  CustomError
>;
type ReadInnovationSuccess = ActionWithPayload<
  INNOVATIONS_ACTION_TYPES.READ_INNOVATION_SUCCESS,
  Innovation
>;

type LikeInnovationStart = ActionWithPayload<
  INNOVATIONS_ACTION_TYPES.LIKE_INNOVATION_START,
  Innovation
>;
type LikeInnovationFailure = ActionWithPayload<
  INNOVATIONS_ACTION_TYPES.LIKE_INNOVATION_FAILURE,
  CustomError
>;
type LikeInnovationSuccess = ActionWithPayload<
  INNOVATIONS_ACTION_TYPES.LIKE_INNOVATION_SUCCESS,
  Innovation
>;

type UnlikeInnovationStart = ActionWithPayload<
  INNOVATIONS_ACTION_TYPES.UNLIKE_INNOVATION_START,
  Innovation
>;
type UnlikeInnovationFailure = ActionWithPayload<
  INNOVATIONS_ACTION_TYPES.UNLIKE_INNOVATION_FAILURE,
  CustomError
>;
type UnlikeInnovationSuccess = ActionWithPayload<
  INNOVATIONS_ACTION_TYPES.UNLIKE_INNOVATION_SUCCESS,
  Innovation
>;

export type InnovationAction =
  | ReadInnovationStart
  | ReadInnovationFailure
  | ReadInnovationSuccess
  | LikeInnovationStart
  | LikeInnovationFailure
  | LikeInnovationSuccess;

export const readInnovationStart = (
  innovation: Innovation
): ReadInnovationStart =>
  createAction(INNOVATIONS_ACTION_TYPES.READ_INNOVATION_START, innovation);
export const readInnovationFailure = (error: unknown): ReadInnovationFailure =>
  createAction(
    INNOVATIONS_ACTION_TYPES.READ_INNOVATION_FAILURE,
    getCustomError(error)
  );
export const readInnovationSuccess = (
  innovation: Innovation
): ReadInnovationSuccess =>
  createAction(INNOVATIONS_ACTION_TYPES.READ_INNOVATION_SUCCESS, innovation);

export const likeInnovationStart = (
  innovation: Innovation
): LikeInnovationStart =>
  createAction(INNOVATIONS_ACTION_TYPES.LIKE_INNOVATION_START, innovation);


export const likeInnovationFailure = (error: unknown): LikeInnovationFailure =>
  createAction(
    INNOVATIONS_ACTION_TYPES.LIKE_INNOVATION_FAILURE,
    getCustomError(error)
  );
export const likeInnovationSuccess = (
  innovation: Innovation
): LikeInnovationSuccess =>
  createAction(INNOVATIONS_ACTION_TYPES.LIKE_INNOVATION_SUCCESS, innovation);


  export const unlikeInnovationStart = (
    innovation: Innovation
  ): UnlikeInnovationStart =>
    createAction(INNOVATIONS_ACTION_TYPES.UNLIKE_INNOVATION_START, innovation);
  
export const unlikeInnovationFailure = (error: unknown): UnlikeInnovationFailure =>
  createAction(
    INNOVATIONS_ACTION_TYPES.UNLIKE_INNOVATION_FAILURE,
    getCustomError(error)
  );

export const unlikeInnovationSuccess = (
  innovation: Innovation
): UnlikeInnovationSuccess =>
  createAction(INNOVATIONS_ACTION_TYPES.UNLIKE_INNOVATION_SUCCESS, innovation);
