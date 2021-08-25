import { Equal, Expect, Alike, NotAny } from '../../..'

/*
  110 - Capitalize
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `Capitalize<T>` which converts the first letter of a string to uppercase and leave the rest as-is.

  For example

  ```ts
  type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
  ```

  > View on GitHub: https://tsch.js.org/110
*/


/* _____________ Your Code Here _____________ */

type Capitalize<S extends string> = intrinsic

/* _____________ Test Cases _____________ */
type cases = [
  Expect<Equal<Capitalize<'foobar'>, 'Foobar'>>,
  Expect<Equal<Capitalize<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<Capitalize<'foo bar'>, 'Foo bar'>>,
  Expect<Equal<Capitalize<''>, ''>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/110/answer
  > View solutions: https://tsch.js.org/110/solutions
  > More Challenges: https://tsch.js.org
*/

