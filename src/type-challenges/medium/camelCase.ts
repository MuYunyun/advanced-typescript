import { Equal, Expect, Alike, NotAny } from '../../..'

/*
  610 - CamelCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal

  ### Question

  `for-bar-baz` -> `forBarBaz`

  > View on GitHub: https://tsch.js.org/610
*/

/* _____________ Your Code Here _____________ */
type CamelCase<S extends String> = S extends `${infer First}-${infer Right}`
  ? Capitalize<Right> extends Right
    ? `${First}-${CamelCase<Capitalize<Right>>}`
    : `${First}${CamelCase<Capitalize<Right>>}`
  : S

type abcde = CamelCase<'foo--bar----baz'>

/* _____________ Test Cases _____________ */
type cases = [
  Expect<Equal<CamelCase<'foo-bar-baz'>, 'fooBarBaz'>>,
  Expect<Equal<CamelCase<'foo-Bar-Baz'>, 'foo-Bar-Baz'>>,
  Expect<Equal<CamelCase<'foo-bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<CamelCase<'foo--bar----baz'>, 'foo-Bar---Baz'>>,
  Expect<Equal<CamelCase<'a-b-c'>, 'aBC'>>,
  Expect<Equal<CamelCase<'a-b-c-'>, 'aBC-'>>,
  Expect<Equal<CamelCase<'ABC'>, 'ABC'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/610/answer
  > View solutions: https://tsch.js.org/610/solutions
  > More Challenges: https://tsch.js.org
*/
