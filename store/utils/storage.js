import store from "store2";

let storage = store;

export let getStorage = key => {
  return storage.get(key);
};

export let setStorage = (key, value) => {
  return storage.set(key, value);
};

export let removeStorage = key => {
  return storage.remove(key);
};
