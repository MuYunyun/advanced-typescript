import { Equal, Expect, NotAny } from '../../../index.d'

type myExclude<T, K> = T extends K ? never : T
// type MyOmit<T, K> =

type ccc = myExclude<'a' | 'b' | 'c', 'a'>

type ddd = 'a' extends 'a' | 'b' | 'c' ? true : false

/* _____________ Test Cases _____________ */
type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
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