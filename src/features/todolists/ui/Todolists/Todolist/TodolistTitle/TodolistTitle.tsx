import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components"
import s from "./TodolistTitle.module.css"
import { useRemoveTodolistMutation, useUpdateTodolistMutation } from "../../../../api/todolistsApi"
import { DomainTodolist } from "../../../../libs/types/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id } = todolist

  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistMutation()

  const removeTodolistHandler = () => {
    removeTodolist(id)
  }
  const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} />
      </h3>
      <IconButton onClick={removeTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
