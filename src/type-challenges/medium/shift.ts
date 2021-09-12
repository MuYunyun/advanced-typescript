import { Equal, Expect, Alike, NotAny } from '../../..'

/*
  3062 - Shift
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Implement the type version of ```Array.shift```

  For example

  ```typescript
  type Result = Shift<[3, 2, 1]> // [2, 1]
  ```

  > View on GitHub: https://tsch.js.org/3062
*/


/* _____________ Your Code Here _____________ */
type Shift<T extends any[]> = T extends [infer _, ...infer O] ? O : never

/* _____________ Test Cases _____________ */
type cases = [
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd',]>, ['b', 'c', 'd']>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3062/answer
  > View solutions: https://tsch.js.org/3062/solutions
  > More Challenges: https://tsch.js.org
*/
