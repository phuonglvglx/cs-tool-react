export function getLocalStorageValue(key: string) {
    const value = localStorage.getItem(key);
    if (!value) return null;
    try {
      return value;
    } catch (error) {
      return null;
    }
  }
  
  export function setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }