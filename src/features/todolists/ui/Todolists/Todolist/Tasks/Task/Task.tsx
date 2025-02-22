import { EditableSpan } from "common/components"
import { TaskStatus } from "common/enums"
import { DomainTask, UpdateTaskModel } from "../../../../../api/tasksApi.types"
import { getListItemSx } from "./Task.styles"
import { ChangeEvent } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "../../../../../api/tasksApi"
import { DomainTodolist } from "../../../../../libs/types/types"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTaskHandler = () => {
    removeTask({ taskId: task.id, todolistId: todolist.id })
  }

  const changeTaskHandler = (params: { title?: string; status?: number }) => {
    const { title = task.title, status = task.status } = params
    const model: UpdateTaskModel = {
      title,
      status,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }
    updateTask({ todolistId: todolist.id, taskId: task.id, model })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    changeTaskHandler({ status })
  }

  const changeTaskTitleHandler = (title: string) => {
    changeTaskHandler({ title })
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton onClick={removeTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
