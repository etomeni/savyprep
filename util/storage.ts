
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { MMKV } from 'react-native-mmkv';

// export const storage = new MMKV({
//     id: "TesaPayStore"
// });


export const customEncrypt = (value: string) => {
    let encryptedValue = btoa(value);
    for (let i = 0; i < 4; i++) {
        encryptedValue = btoa(encryptedValue);
    }

    return encryptedValue;
}

export const customDecrypt = (encrypted: string) => {
    let decryptedValue = atob(encrypted);
    for (let i = 0; i < 4; i++) {
        decryptedValue = atob(decryptedValue);
    }

    return decryptedValue;
}


// THE FOLLOWING FUNCTIONS ARE USED FOR LOCAL STORAGE
export async function setLocalStorage(storageKey: string, value: any) {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("AsyncStorage error:", error);
      return false;
    }
}

export async function getLocalStorage(storageKey: string) {
    try {
      const value = await AsyncStorage.getItem(storageKey);
      return value !== null ? JSON.parse(value) : null;
    } catch (error) {
      console.error("AsyncStorage error:", error);
      return null;
    }
}

export async function removeLocalStorageItem(storageKey: string) {
    await AsyncStorage.removeItem(storageKey);
}
  
export async function clearLocalStorage() {
    await AsyncStorage.clear();
}

  



// // THE FOLLOWING FUNCTIONS ARE USED FOR LOCAL STORAGE
// export function setLocalStorage(storageKey: string, value: any) {
//     const lowLevelEncryption = JSON.stringify(value);
//     storage.set(storageKey, lowLevelEncryption);
// }

// export function getLocalStorage(storageKey: string) {
//     const storedData = storage.getString(storageKey);
//     const storedValue = storedData ? JSON.parse(storedData) : null;
  
//     return storedValue;
// }

// export function removeLocalStorageItem(storageKey: string) {
//     storage.delete(storageKey);
// }
  
// export function clearLocalStorage() {
//     storage.clearAll()
// }
  