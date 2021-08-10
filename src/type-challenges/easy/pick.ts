import { Equal, Expect, NotAny } from '../../../index.d'

/**-------------- pick --------------*/
interface Todo {
  title: string
  description: string
  completed: boolean
}

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const test: TodoPreview = {
  title: 'Clean room',
  completed: false,
}
