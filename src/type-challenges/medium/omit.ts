import { Equal, Expect, NotAny } from '../../../index.d'

type myExclude<T, K> = T extends K ? never : T
type MyOmit<T, K> = {
  [P in myExclude<keyof T, K>]: T[P]
}

/* _____________ Test Cases _____________ */
type cases = [
  Expect<Equal<Expected1, Omit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}