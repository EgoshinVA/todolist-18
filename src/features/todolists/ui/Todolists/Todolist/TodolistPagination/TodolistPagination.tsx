import React, { ChangeEvent } from "react"
import s from "./TodolistPagination.module.css"
import { Pagination } from "@mui/material"
import { PAGE_SIZE } from "../../../../api/tasksApi"

type Props = {
  page: number
  count: number
  setPage: (page: number) => void
}

export const TodolistPagination: React.FC<Props> = ({ setPage, page, count }) => {
  const setPageHandler = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <div className={s.pagination}>
      <Pagination page={page} count={Math.ceil(count / PAGE_SIZE)} onChange={setPageHandler} />
    </div>
  )
}
