import { Equal, Expect, NotAny } from '../../../index.d'
/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #easy #promise

  ### Question

  If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type? For example if we have `Promise<ExampleType>` how to get ExampleType?

  > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

  > View on GitHub: https://tsch.js.org/189
*/


/* _____________ Your Code Here _____________ */
type Awaited<T> = T extends Promise<infer U> ? U : never

/* _____________ Test Cases _____________ */
type X = Promise<string>
type Y = Promise<{ field: number }>

type cases = [
  Expect<Equal<Awaited<X>, string>>,
  Expect<Equal<Awaited<Y>, { field: number }>>,
]

// @ts-expect-error
type error = Awaited<number>