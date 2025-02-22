import List from "@mui/material/List"
import { TaskStatus } from "common/enums"
import { Task } from "./Task/Task"
import { PAGE_SIZE, useGetTasksQuery } from "../../../../api/tasksApi"
import { TasksSkeleton } from "../../Skeletons/TasksSkeleton"
import { DomainTodolist } from "../../../../libs/types/types"
import { TodolistPagination } from "../TodolistPagination/TodolistPagination"
import { useState } from "react"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const [page, setPage] = useState<number>(1)
  const { data, isLoading } = useGetTasksQuery({ todolistId: todolist.id, page })

  if (isLoading) {
    return <TasksSkeleton />
  }

  let tasksForTodolist = data?.items
  const totalCount = data?.totalCount || 0

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List>
            {tasksForTodolist?.map((task) => {
              return <Task key={task.id} task={task} todolist={todolist} />
            })}
          </List>
          {totalCount > PAGE_SIZE && <TodolistPagination page={page} count={data?.totalCount || 0} setPage={setPage} />}
        </>
      )}
    </>
  )
}
