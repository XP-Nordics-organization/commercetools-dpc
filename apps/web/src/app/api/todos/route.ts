import { NextResponse } from 'next/server'

import { ITodo } from '@commercetools-dpc/types'

export async function GET() {
  const result = await fetch('https://dummyjson.com/todos', {
    cache: 'no-store',
  })
  const { todos: jsonTodos } = await result.json()
  const todos = transformTodos(jsonTodos)
  return NextResponse.json(todos)
}

const transformTodos = (rawTodos: any[]) => {
  return rawTodos.map((apiTodo) => jsonToTodo(apiTodo))
}

const jsonToTodo = (json): ITodo => {
  return {
    id: json.id,
    title: json.todo,
    userId: json.userId.toString(),
    done: json.completed,
  }
}
