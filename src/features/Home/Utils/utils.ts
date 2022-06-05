import { getTimeZoneDate } from '@utils/date'

const pad = (value: number) => (value < 10 ? `0${value}` : value)
const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

export const formatedDateToSchedule = (data: string, horario: string) => {
    const dataAgendamento = new Date(data)
    return `${weekDays[dataAgendamento.getDay()]}, ${pad(dataAgendamento.getDate())} de ${
        months[dataAgendamento.getMonth()]
    } ${horario}`
}

export const SumHour = (startHour: string, valueToSum: number) => {
    const hour = parseInt(startHour.substr(0, 2), 10)
    const minutes = parseInt(startHour.substr(3, 2), 10)
    const startDate = new Date(Date.UTC(2000, 1, 1, hour, minutes))
    startDate.setMinutes(startDate.getMinutes() + valueToSum)

    return `${startDate.getUTCHours()}:${startDate.getMinutes().toString() === '0' ? '00' : startDate.getMinutes().toString()}`
}

export const getActualDate = () => {
    const actualDate = new Date()
    return new Date(
        Date.UTC(
            actualDate.getUTCFullYear(),
            actualDate.getUTCMonth(),
            actualDate.getUTCDate(),
            actualDate.getHours(),
            actualDate.getUTCMinutes(),
        ),
    )
}

export const sortAttendances = (a: Object, b: Object) => {
    const dateA = a.dataAgendamento.split('/')
    const dateB = b.dataAgendamento.split('/')
    const formatedDateA = getTimeZoneDate(
        new Date(dateA[2].concat('-', dateA[0], '-', dateA[1], 'T', a.horario.substr(0, 2), ':', a.horario.substr(3, 2))),
    )
    const formatedDateB = getTimeZoneDate(
        new Date(dateB[2].concat('-', dateB[0], '-', dateB[1], 'T', b.horario.substr(0, 2), ':', b.horario.substr(3, 2))),
    )

    return formatedDateA - formatedDateB
}
