import { Equal, Expect, Alike, NotAny } from '../../..'

/*
  2759 - RequiredByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement a generic `RequiredByKeys<T,  K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to be required. When `K` is not provided, it should make all properties required just like the normal `Required<T>`.

  For example

  ```typescript
  interface User {
    name?: string
    age?: number
    address?: string
  }

  type UserPartialName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }

  ```

  > View on GitHub: https://tsch.js.org/2759
*/


/* _____________ Your Code Here _____________ */
type Result<T> = {
  [P in keyof T]: T[P]
}
type RequiredByKeys<T, K = keyof T> = Result<{
  [P in keyof T as P extends K ? P : never]-?: T[P]
} & {
  [P in Exclude<keyof T, K>]?: T[P]
}>

/* _____________ Test Cases _____________ */
interface User {
  name?: string
  age?: number
  address?: string
}

interface UserRequiredName {
  name: string
  age?: number
  address?: string
}

interface UserRequiredNameAndAge {
  name: string
  age: number
  address?: string
}

type cases = [
  Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2759/answer
  > View solutions: https://tsch.js.org/2759/solutions
  > More Challenges: https://tsch.js.org
*/
