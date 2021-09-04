import { Equal, Expect, Alike, NotAny } from '../../..'

/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #medium

  ### Question

  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

  For example:

  ```
  type Foo = {
    [key: string]: any;
    foo(): void;
  }

  type A = RemoveIndexSignature<Foo>  // expected { foo(): void }

  ```

  > View on GitHub: https://tsch.js.org/1367
*/


/* _____________ Your Code Here _____________ */

// type RemoveIndexSignature<T> = {
//   [P in keyof T]: string extends P
//     ? never
//   : number extends P
//       ? never
//       : T[P]
// }
type RemoveIndexSignature<T> = {
  [P in keyof T as string extends P
    ? never
    : number extends P
      ? never
      : P
  ]: T[P]
}

/* _____________ Test Cases _____________ */
type Foo = {
  // 1: number
  [key: string]: any
  foo(): void
}


type Bar = {
  [key: number]: any;
  bar(): void;
}

type Baz = {
  bar(): void;
  baz: string
}


type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void, baz: string }>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1367/answer
  > View solutions: https://tsch.js.org/1367/solutions
  > More Challenges: https://tsch.js.org
*/
