export const combineHandlers = (handlers) => {
    return handlers.reduce((l, r) => ({...l, ...{[r.$type]: r.handle}}), {});
};