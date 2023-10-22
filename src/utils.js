const LOCAL_STORAGE_PREFIX = 'typingpro_'

export function getDataFromLocalStorage(key, defaultData = null) {
    const data = window.localStorage.getItem((LOCAL_STORAGE_PREFIX + key))
    if (data) {
        return JSON.parse(data).value;
    }
    return defaultData
}

export function setDataToLocalStorage(key, newData) {
    window.localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify({ value: newData }))
}

export function removeDataFromLocalStorage(key) {
    window.localStorage.removeItem(LOCAL_STORAGE_PREFIX + key)
}