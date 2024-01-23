import { create, StateCreator, StoreApi, UseBoundStore } from "zustand";
import { devtools, persist, PersistOptions } from "zustand/middleware";
import { Drivers, Storage } from "@ionic/storage";

interface ICreateStoreOptions<T, U> {
  persistOptions?: PersistOptions<T, U>;
  devtoolsEnabled?: boolean;
}

type StateStorage = {
  getItem: (name: string) => Promise<string | null> | string;
  setItem: (name: string, value: string) => Promise<void> | void;
  removeItem: (name: string) => Promise<void> | void;
};

export function createStore<T extends object>(
  createState: StateCreator<T>,
  options?: ICreateStoreOptions<T, any>
): UseBoundStore<StoreApi<T>> {
  let store = create(createState);

  if (options?.persistOptions) {
    store = create(persist(createState, options.persistOptions));
  }

  if (options?.devtoolsEnabled) {
    store = create(devtools(createState));
  }

  if (options?.devtoolsEnabled && options?.persistOptions) {
    store = create(devtools(persist(createState, options.persistOptions)));
  }

  return store;
}

export const localPersistStorage: StateStorage = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return JSON.parse(str);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

const ionicIndexDBStorage: (storage: Storage) => StateStorage = (storage) => ({
  getItem: async (name: string): Promise<any | null> => {
    const value = await storage.get(name);
    // console.log(name, "===> has been retrieved", JSON.parse(value));

    return value || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    // console.log(name, "with value", value, "has been saved");
    await storage.set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    // console.log(name, "has been deleted");
    await storage.remove(name);
  },
});

export const ionicIdbStorage = (dbName: string) => {
  // Initialize Ionic Storage
  const storage = new Storage({
    driverOrder: [Drivers.IndexedDB],
    name: dbName,
    version: 1,
  });
  (async () => await storage.create())();
  return ionicIndexDBStorage(storage);
};
