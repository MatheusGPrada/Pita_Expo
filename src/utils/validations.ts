import { isValid } from 'date-fns'

export const isEmpty = (str?: string) => !str || 0 === str.length

export const isFilled = (str: string) => str && str.length > 0

export const validDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0].split('-')
    console.debug('date', dateString[0].concat('/', dateString[1], '/', dateString[2]))
    console.debug('date', isValid(new Date(dateString[0].concat('/', dateString[1], '/', dateString[2]))))
    return isValid(new Date(dateString[0].concat('/', dateString[1], '/', dateString[2])))
}
