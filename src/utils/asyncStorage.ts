import AsyncStorage from '@react-native-async-storage/async-storage'

type Cache = {
    BirthDate?: string
    CPF?: string
    Name?: string
    Email?: string
    PhoneNumber?: string
    Password?: string
}

const cacheNames = ['BirthDate', 'CPF', 'Name', 'Email', 'PhoneNumber', 'Password']

export const cacheVars = {
    phoneNumber: 'PhoneNumber',
    name: 'Name',
    CPF: 'CPF',
    birthDate: 'BirthDate',
    email: 'Email',
    password: 'Password',
}

export const storeData = async (cacheName: string, value: any) => {
    try {
        typeof value == 'string' ? AsyncStorage.setItem(cacheName, value) : AsyncStorage.setItem(cacheName, value.toString())
    } catch (e) {
        console.warn('Error on set cache: ', e)
    }
}

export const getData = async (cacheName: string) => await AsyncStorage.getItem(cacheName)

export const getAllData = async () => {
    try {
        const value = await AsyncStorage.multiGet(cacheNames)
        let cache: Cache = {}
        if (value) {
            value.map(value => {
                cache[`${value[0]}`] = value[1]
            })
            return cache
        }
    } catch (e) {
        console.warn('Error on get cache: ', e)
    }
}

export const clearCache = async () => {
    await AsyncStorage.multiRemove(cacheNames)
}
