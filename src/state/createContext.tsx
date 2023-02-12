import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

export function createCtx<A>(defaultValue: A) {
  type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = createContext(defaultValue);
  const updateCtx = createContext(defaultUpdate);

  function Provider({ children, defaultValue: providedDefault }: PropsWithChildren<{ defaultValue?: A }>) {
    const [state, update] = useState({ ...providedDefault, ...defaultValue });
    return (
      <ctx.Provider value={state}>
        <updateCtx.Provider value={update}>
          {children}
        </updateCtx.Provider>
      </ctx.Provider>)
      ;
  }

  return [ctx, updateCtx, Provider] as const;
}