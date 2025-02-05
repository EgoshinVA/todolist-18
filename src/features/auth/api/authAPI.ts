import { BaseResponse } from "common/types"
import { LoginArgs } from "./authAPI.types"
import { baseApi } from "../../../app/baseApi"

export const authAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => "auth/me",
    }),
    login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
      query: (payload) => ({
        url: "auth/login",
        body: payload,
        method: "POST",
      }),
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({
        url: "auth/login",
        method: "DELETE",
      }),
    }),
  }),
})

export const {useMeQuery, useLoginMutation, useLogoutMutation} = authAPI