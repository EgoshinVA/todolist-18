import { BaseResponse } from "common/types"
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "../../../app/baseApi"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId) => `todo-lists/${todolistId}/tasks`,
      providesTags: ["Todolist"],
    }),
    createTask: build.mutation<BaseResponse<{ item: DomainTask }>, { title: string; todolistId: string }>({
      query: (payload) => ({
        url: `todo-lists/${payload.todolistId}/tasks`,
        method: "POST",
        body: { title: payload.title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: (payload) => ({
        url: `todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todolist"],
    }),
    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: (payload) => ({
        url: `todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
        method: "PUT",
        body: payload.model,
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi
