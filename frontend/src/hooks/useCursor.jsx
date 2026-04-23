// Reverted to the OS default cursor per client request.
// CursorProvider is now a pass-through; useCursorHover returns no-op handlers
// so existing call sites keep working without code changes.

import { createContext, useContext } from "react";

const CursorCtx = createContext({
  setVariant: () => {},
  setLabel: () => {},
});

export function CursorProvider({ children }) {
  return <CursorCtx.Provider value={{ setVariant: () => {}, setLabel: () => {} }}>{children}</CursorCtx.Provider>;
}

export function useCursor() {
  return useContext(CursorCtx);
}

// Kept as a no-op so components that spread `{...useCursorHover(...)}` still
// compile. Returns empty object (nothing to merge) — safer than returning
// handler stubs that would overwrite real onMouseEnter/Leave on the target.
export function useCursorHover(_variant = "hover", _label = "") {
  return {};
}
