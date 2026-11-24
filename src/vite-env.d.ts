/// <reference types="vite/client" />

import type { ThreeElements } from "@react-three/fiber";

declare module "react" {
  namespace JSX {
    // Declaration merging bridges Fiber 8's global JSX types to React 19 types.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends ThreeElements {}
  }
}
