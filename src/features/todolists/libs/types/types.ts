import { Todolist } from "../../api/todolistsApi.types"

export type FilterValuesType = "all" | "active" | "completed"
export type DomainTodolist = Todolist & {
  filter: FilterValuesType
}