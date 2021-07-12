import React from 'react'
import BoardCell from '../BoardCell'

export default function BoardRow(props) {
  return (
    <>
      {
        props.row.map((col, j) => {
          return (
            <BoardCell key={j} col={col} indexRow={props.indexRow} indexCol={j} />
          )
        })
      }
    </>

  )
}