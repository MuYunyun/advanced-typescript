/** --------- Array ---------- */
type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never
// type test1 = Head<[number, string, boolean]> // number

type Tail<T extends any[]> = T extends [any, ...(infer O)] ? O : never
// type test2 = Tail<[number, string, boolean]> // [string, boolean]

type HasTail<T extends any[]> = T extends ([] | [any]) ? false : true
// type test3 = HasTail<[number]>

/** --------- usage of infer ---------- */
type ObjectInfer<O> = O extends { a: infer T } ? T : never
// type test4 = ObjectInfer<{ a: number }> // number

type FunctionInfer<F> = F extends (...args: infer A) => infer R ? [A, R] : never
// const fn01 = (a: number, b: any) => true
// type test5 = FunctionInfer<typeof fn01> // [[number, any], boolean]

type PromiseInfer<P> = P extends Promise<infer T> ? T: never
// const promise = new Promise<string>(() => {})
// type test6 = PromiseInfer<typeof promise> // string

type ArrayInfer<A> = A extends (infer T)[] ? T: never
// const array = [0, 'data', 1]
// type test7 = ArrayInfer<typeof array> // string | number

type TupleInfer<T> = T extends [infer A, ...(infer B)[]] ? [A, B] : never
// type test8 = TupleInfer<[string, number, boolean]> // [string, number | boolean]

/** ---------- curryV0 ---------- */
type CurryV0<P extends any[], R> =
  HasTail<P> extends true ? CurryV0<Tail<P>, R> : R
declare function curryV0<P extends any[], R>(f: (...args: P) => R): CurryV0<P, R>
const toCurry02 = (name: string, age: number, single: boolean) => true
const curried02 = curryV0(toCurry02)
