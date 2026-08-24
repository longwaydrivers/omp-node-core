import type { IOMP } from "./globals";

declare global {
  /** Globals injected by the native omp-node host at resource startup. */
  const __omp: IOMP;

  function __internal_setOmpNodeLibraryFunction(
    initialize: (error: boolean) => Promise<void>
  ): void;
}
