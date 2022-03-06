export const setStore = (key, value) => {
    sessionStorage.setItem(key, value);
}

export const getFromStore = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
}