import { Todolist } from "../../api/todolistsApi.types"
import { RequestStatus } from "../../../../app/appSlice"

export type FilterValuesType = "all" | "active" | "completed"
export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}