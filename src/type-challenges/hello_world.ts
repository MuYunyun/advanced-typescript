import { Equal, Expect, NotAny } from '../../index.d'

// expected to be string
/**-------------- hello world --------------*/
type HelloWorld = string

type cases = [
  Expect<NotAny<HelloWorld>>,
  Expect<Equal<HelloWorld, string>>
]
