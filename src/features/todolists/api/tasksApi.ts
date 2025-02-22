import { BaseResponse } from "common/types"
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "../../../app/baseApi"

export const PAGE_SIZE = 4

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; page: number }>({
      query: ({ todolistId, page }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        params: { count: PAGE_SIZE, page },
      }),
      providesTags: (result, error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    createTask: build.mutation<BaseResponse<{ item: DomainTask }>, { title: string; todolistId: string }>({
      query: (payload) => ({
        url: `todo-lists/${payload.todolistId}/tasks`,
        method: "POST",
        body: { title: payload.title },
      }),
      invalidatesTags: (result, error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: (payload) => ({
        url: `todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { todolistId }) => [{ type: "Task", id: todolistId }],
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
      async onQueryStarted({ taskId, todolistId, model }, { dispatch, queryFulfilled, getState }) {
        const cachedState = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks")

        let patchResults = [] as any[]

        cachedState.forEach(({todolistId, page}) => {
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData("getTasks", { todolistId, page }, (state) => {
                const task = state.items.find((task) => task.id === taskId)
                if (task) task.status = model.status
              }),
            ),
          )
        })
        try{
          await queryFulfilled
        }
        catch{
          patchResults.forEach((patchResult) => {
            patchResult.undo()
          })
        }
      },
      invalidatesTags: (result, error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi
