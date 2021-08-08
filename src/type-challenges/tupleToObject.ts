import { Equal, Expect, NotAny } from '../..'

/* _____________ Your Code Here _____________ */

type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}


/* _____________ Test Cases _____________ */
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type ddd = typeof tuple[number]
// type eee =

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { 'tesla': 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>