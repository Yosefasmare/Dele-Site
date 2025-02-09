import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Create a noop storage for server-side rendering
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storageFallback =
  typeof window !== "undefined" ? storage : createNoopStorage();

export const persistConfig = {
  key: "root",
  storage: storageFallback,
};
