import { Equal, Expect, Alike, NotAny } from '../../..'

/*
  599 - Merge
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Merge two types into a new type. Keys of the second type overrides keys of the first type.

  > View on GitHub: https://tsch.js.org/599
*/

/* _____________ Your Code Here _____________ */

type totalTuple<F extends object, S extends object> = [keyof F, keyof S]

type Merge<F extends object, S extends object> = {
  [P in totalTuple<F, S>[number]]:
    P extends keyof S
      ? S[P]
      : P extends keyof F
        ? F[P]
        : never
}

/* _____________ Test Cases _____________ */
type Foo = {
  a: number;
  b: string;
};
type Bar = {
  b: number;
  c: boolean;
};

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number;
    b: number;
    c: boolean;
  }>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/599/answer
  > View solutions: https://tsch.js.org/599/solutions
  > More Challenges: https://tsch.js.org
*/
