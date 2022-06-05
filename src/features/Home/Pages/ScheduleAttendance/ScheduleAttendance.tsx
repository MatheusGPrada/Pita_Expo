import React, { FC, useCallback, useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { DarkTemplate } from '@components/templates/DarkTemplate/DarkTemplate'
import api from 'src/api/api'
import { USER_ATTENDANCE, ALL_ATTENDANCES } from 'src/api/endpoints'
import { Attendance, ScheduleCards, Service } from '../Schedule/typings'
import DatePicker from 'react-native-datepicker'
import {
    ContentContainer,
    Schedule,
    Time,
    Title,
    ScrollView,
    InitialDefaultTime,
    EndDefaultTime,
    LineSeparator,
    EndTimeContainer,
    InitialTimeContainer,
    Subtitle,
    AllAvalibleContainer,
    ConfirmButtonContainer,
    Card,
    SnackBarContainer,
} from './styles'
import { Loading } from '@components/atoms/Loading/Loading'
import { LoadingContainer, ModalButtonContainer } from '../Schedule/styles'
import { Button } from '@components/atoms/Button/Button'
import { i18n } from '@i18n'
import { getTimeZoneDate } from '@utils/date'
import LottieView from 'lottie-react-native'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import { theme } from '@theme'

export const ScheduleAttendance: FC = () => {
    const {
        params: { services, token, userName },
    } = useRoute()
    const { goBack } = useNavigation()
    const [loading, setLoading] = useState(false)
    const [attedanceAlreadyScheduled, setAttedanceAlreadyScheduled] = useState([])
    const [selectedServiceTime, setSelectedServiceTime] = useState('')
    const [cardToRender, setCardToRender] = useState<ScheduleCards[]>()

    const ONE_HOUR = 60

    const maximumTime = new Date(new Date().toISOString().split('T')[0].concat('T', '21:00:00.000Z'))
    const minimumTime = new Date(new Date().toISOString().split('T')[0].concat('T', '13:00:00.000Z'))

    let [selectedDate, setSelectedDate] = useState(new Date())
    let [selectedHour, setSelectedHour] = useState(new Date())
    let attedanceScheduled: Array<Object> = []

    const [showSnackBar, setShowSnackBar] = useState(false)
    const [disableButton, setDisableButton] = useState(true)

    const getAllAttendances = async () => {
        await api
            .get(ALL_ATTENDANCES, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                const { data } = response
                attedanceScheduled = data
                setAttedanceAlreadyScheduled(data)
            })
    }

    const getDateAfterAMonth = () => {
        const today = new Date()
        today.setMonth(today.getMonth() + 1)
        return today
    }

    const mountCardToRender = (filteredData: Array<Attendance>) => {
        const cards: ScheduleCards[] = []
        filteredData?.map(({ horario, idAgendamento }: Attendance, index: number) => {
            cards.push({
                enable: false,
                key: idAgendamento,
                time: horario,
            })
        })
        setCardToRender(cards)
        setLoading(false)
    }

    const getAttendancesFromDate = (selectedDate: Date) => {
        if (attedanceAlreadyScheduled.length > 0) {
            attedanceScheduled = attedanceAlreadyScheduled
        }
        const filteredData = attedanceScheduled
            ?.filter(({ dataAgendamento }: Attendance) => {
                const data = dataAgendamento.split('/')
                return data[2].concat('-', data[0], '-', data[1]) === selectedDate.toISOString().split('T')[0]
            })
            .sort(
                (a: Attendance, b: Attendance) =>
                    parseInt(a.horario.substr(0, 2).concat(a.horario.substr(3, 2)), 10) -
                    parseInt(b.horario.substr(0, 2).concat(b.horario.substr(3, 2)), 10),
            )
        mountCardToRender(filteredData)
    }

    const onChangeDate = (changeDate: Date) => {
        setLoading(true)
        setSelectedDate(getTimeZoneDate(changeDate))
        getAttendancesFromDate(getTimeZoneDate(changeDate))
    }

    const onChangeHour = (changeHour: Date) => {
        setSelectedHour(changeHour)
        onValidHour(changeHour)
    }

    const onValidHour = (hour: Date) => {
        setDisableButton(false)
        console.debug('0')
        if (cardToRender?.length === 0) {
            return
        }

        cardToRender?.map(({ time }) => {
            const rightHour = getTimeZoneDate(hour).getUTCHours()
            const rightMinute = getTimeZoneDate(hour).getUTCMinutes()

            if (
                `${rightHour}:${rightMinute > 10 ? rightMinute : '0'.concat(rightMinute.toString())}` >= time.substr(0, 5) &&
                `${rightHour}:${rightMinute > 10 ? rightMinute : '0'.concat(rightMinute.toString())}` <= time.substr(6, 5)
            ) {
                setShowSnackBar(true)
                setDisableButton(true)
            }
        })
    }

    const getSelectedServicesTime = useCallback(() => {
        let hours = 0
        let minutes = 0

        services.map(({ time }: Service) => {
            hours += parseInt(time.substr(0, 2), 10)
            minutes += parseInt(time.substr(3, 2), 10)
            if (minutes >= ONE_HOUR) {
                minutes -= ONE_HOUR
                hours++
            }
            return 0
        })

        setSelectedServiceTime(`${hours.toString()}:${minutes > 10 ? minutes.toString() : '0'.concat(minutes.toString())}`)
    }, [services])

    const createAttendance = async () => {
        const servicesName: Array<string> = []

        services.map(({ title }: Service) => servicesName.push(title))

        const date = selectedDate.toISOString().split('T')[0].split('-')
        const inicialHour = selectedHour.getHours()
        const inicialMinute = selectedHour.getMinutes()

        await api
            .post(
                USER_ATTENDANCE,
                {
                    dataAgendamento: date[1].concat('/', date[2], '/', date[0]),
                    horario: `${inicialHour}:${inicialMinute > 10 ? inicialMinute : '0'.concat(inicialMinute.toString())}/${
                        inicialHour + parseInt(selectedServiceTime.split(':')[0], 10)
                    }:${inicialMinute + parseInt(selectedServiceTime.split(':')[1], 10)}`,
                    servico: servicesName,
                    statusAgendamento: 'Aguardando',
                    usuario: userName,
                },
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(response => {
                setLoading(false)
            })
            .catch(requestError => {
                setLoading(false)
            })

        goBack()
        goBack()
    }

    const loadScreen = async () => {
        await setLoading(true)
        await getAllAttendances()
        await getSelectedServicesTime()
        await getAttendancesFromDate(selectedDate)
    }

    useFocusEffect(
        useCallback(() => {
            loadScreen()
        }, []),
    )

    return (
        <DarkTemplate hasMargin={false}>
            {loading ? (
                <LoadingContainer>
                    <Loading isBlue={false} size={60} />
                </LoadingContainer>
            ) : (
                <ContentContainer>
                    <Title>{i18n.t('title.selectTheDateAndHour')}</Title>
                    <DatePicker
                        maxDate={getDateAfterAMonth()}
                        minDate={new Date()}
                        style={{ width: 200, alignSelf: 'center', marginTop: 20, marginRight: '10%' }}
                        date={selectedDate}
                        mode="date"
                        format="DD/MM/YY"
                        confirmBtnText="Confirmar"
                        cancelBtnText="Cancelar"
                        customStyles={{
                            btnTextCancel: {
                                color: 'black',
                            },
                            btnTextConfirm: {
                                color: 'black',
                            },
                            dateIcon: {
                                display: 'none',
                            },
                            dateInput: {
                                backgroundColor: 'white',
                                marginLeft: 36,
                            },
                            dateText: {
                                fontSize: 18,
                            },
                        }}
                        onDateChange={(str, date) => {
                            onChangeDate(date)
                            onValidHour(selectedHour)
                        }}
                    />
                    {cardToRender && cardToRender?.length > 0 ? (
                        <Schedule>
                            <ScrollView>
                                <InitialTimeContainer>
                                    <InitialDefaultTime>{i18n.t('labels.initialDefaultTime')}</InitialDefaultTime>
                                    <LineSeparator />
                                </InitialTimeContainer>
                                {cardToRender.map(({ time, key }) => (
                                    <Card key={key}>
                                        <Time>{time}</Time>
                                    </Card>
                                ))}
                                <EndTimeContainer>
                                    <EndDefaultTime>{i18n.t('labels.endDefaultTime')}</EndDefaultTime>
                                    <LineSeparator />
                                </EndTimeContainer>
                            </ScrollView>
                        </Schedule>
                    ) : (
                        <AllAvalibleContainer>
                            <LottieView
                                style={{
                                    height: 200,
                                    alignSelf: 'center',
                                }}
                                loop
                                autoPlay
                                source={require('../../../../assets/lotties/happy.json')}
                            />
                            <Subtitle>{i18n.t('subtitle.allIsAvailable')}</Subtitle>
                        </AllAvalibleContainer>
                    )}
                    <DatePicker
                        style={{ width: 200, alignSelf: 'center', marginTop: 20, marginRight: '10%' }}
                        date={selectedHour}
                        mode="time"
                        format="HH:mm"
                        minDate={minimumTime}
                        maxDate={maximumTime}
                        confirmBtnText="Confirmar"
                        cancelBtnText="Cancelar"
                        customStyles={{
                            btnTextCancel: {
                                color: 'black',
                            },
                            btnTextConfirm: {
                                color: 'black',
                            },
                            dateIcon: {
                                display: 'none',
                            },
                            dateInput: {
                                backgroundColor: 'white',
                                marginLeft: 36,
                            },
                            dateText: {
                                fontSize: 22,
                            },
                        }}
                        onDateChange={(str, date) => onChangeHour(date)}
                    />
                    {showSnackBar && (
                        <SnackBarContainer>
                            <SnackBar
                                backgroundColor={theme.colors.danger50}
                                message={i18n.t('error.invalidTime')}
                                setShowSnackBar={setShowSnackBar}
                            />
                        </SnackBarContainer>
                    )}
                    <ConfirmButtonContainer>
                        <Button
                            disabled={disableButton}
                            label={i18n.t('buttonLabels.doSchedule')}
                            labelSize="large"
                            onPress={() => createAttendance()}
                            useButtonContainer={true}
                        />
                    </ConfirmButtonContainer>
                </ContentContainer>
            )}
        </DarkTemplate>
    )
}
