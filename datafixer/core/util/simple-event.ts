export const SimpleEvent = <T extends Function>(context: any) => {
  let listeners: T[] = [];
  return {
    addListener: (listener: T) => {
      listeners.push(listener);
    },
    removeListener: (listener: T) => {
      let i = listeners.indexOf(listener);
      listeners.splice(i, Math.max(i, 0));
    },
    trigger: <T>(
      (((...args: any[]) =>
        listeners.forEach(listener => listener.apply(context, args))) as any)
    ),
  };
};
export type SimpleEvent = ReturnType<typeof SimpleEvent>;
