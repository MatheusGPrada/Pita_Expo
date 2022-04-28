import React, { FC, useState, useCallback, useEffect } from 'react'
import {
    ServiceName,
    AttendanceContainer,
    AttendanceHeader,
    AttendanceDay,
    LottieContainer,
    Title,
    ButtonContainer,
    CardContent,
    ServicePrice,
    ServiceContainer,
    LoadingContainer,
    Image,
    ScheduleContent,
    FullColor,
    HeaderContainer,
    AttendancesCard,
    Subtitle,
    ScrollView,
    ButtonContent,
    ModalTitle,
    ModalSubtitle,
    ModalButtonContainer,
} from './styles'
import { i18n } from '@i18n'
import { Button } from '@components/atoms/Button/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import { isBefore } from 'date-fns'
import { ALL_ATTENDANCES, USER_ATTENDANCE } from 'src/api/endpoints'
import api from 'src/api/api'
import { Loading } from '@components/atoms/Loading/Loading'
import { formatedDateToSchedule, getActualDate, sortAttendances } from '@features/Home/Utils/utils'
import { Attendance, Service } from './typings'
import { Modal, Portal, Provider } from 'react-native-paper'
import { theme } from '@theme'
import LottieView from 'lottie-react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const Schedule: FC = () => {
    const { params } = useRoute()
    const {
        patientInfo: { token, id: userId, userName, nome },
    } = params
    const { navigate } = useNavigation()
    const [loading, setLoading] = useState(true)
    const [attendances, setAttendances] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedAttendace, setSelectedAttendace] = useState(0)

    const cancelAttendance = async () => {
        await api
            .delete(`${USER_ATTENDANCE}${selectedAttendace}`, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
        setShowModal(false)
    }

    useEffect(
        useCallback(() => {
            const getAttendance = async () => {
                // TO DO - ADD THE !ADMIN VALIDATION
                if (userId !== 2) {
                    await api
                        .get(`${USER_ATTENDANCE}${userId}`, {
                            headers: {
                                Authorization: token,
                                'Content-Type': 'application/json',
                            },
                        })
                        .then(response => {
                            const { data } = response
                            setLoading(false)
                            setAttendances(data)
                        })
                        .catch(requestError => {
                            setLoading(false)
                            setAttendances(requestError)
                        })
                } else {
                    await api
                        .get(ALL_ATTENDANCES, {
                            headers: {
                                Authorization: token,
                                'Content-Type': 'application/json',
                            },
                        })
                        .then(response => {
                            const { data } = response
                            setLoading(false)
                            setAttendances(data)
                        })
                        .catch(requestError => {
                            setLoading(false)
                            setAttendances(requestError)
                        })
                }
            }
            getAttendance()
        }, [userId, token]),
    )

    return (
        <FullColor>
            <Provider>
                {loading ? (
                    <LoadingContainer>
                        <Loading isBlue={false} size={80} />
                    </LoadingContainer>
                ) : (
                    <ScheduleContent>
                        <HeaderContainer>
                            <Title>{`${i18n.t('title.whatsUp')} ${nome}`}</Title>
                            <Image resizeMode="contain" source={require('../../../../assets/images/logo.png')} />
                        </HeaderContainer>
                        <AttendancesCard>
                            <ScrollView>
                                {attendances.length === 0 ? (
                                    <LottieContainer>
                                        <LottieView
                                            style={{
                                                width: 200,
                                                height: 350,
                                            }}
                                            loop
                                            autoPlay
                                            source={require('../../../../assets/lotties/sad.json')}
                                        />
                                        <Subtitle>{i18n.t('subtitle.didntHaveAnAppointment')}</Subtitle>
                                    </LottieContainer>
                                ) : (
                                    attendances
                                        .sort((a: string, b: string) => sortAttendances(a, b))
                                        .map(({ dataAgendamento, horario, servico, idAgendamento }: Attendance, index: number) => {
                                            const formatedDate = new Date(
                                                dataAgendamento
                                                    .split('T')[0]
                                                    .concat(
                                                        'T',
                                                        (parseInt(horario.substr(6, 2)) - 3).toString().length === 1
                                                            ? `0${(parseInt(horario.substr(6, 2)) - 3).toString()}`
                                                            : (parseInt(horario.substr(6, 2)) - 3).toString(),
                                                        ':',
                                                        horario.substr(9, 2),
                                                        ':',
                                                        '00',
                                                    ),
                                            )
                                            const attendanceIsAvailable = isBefore(getActualDate(), formatedDate)

                                            return (
                                                <AttendanceContainer key={index} isAvailable={attendanceIsAvailable}>
                                                    <CardContent>
                                                        <AttendanceHeader>
                                                            <AttendanceDay>
                                                                {formatedDateToSchedule(dataAgendamento, horario)}
                                                            </AttendanceDay>

                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setSelectedAttendace(idAgendamento)
                                                                    setShowModal(true)
                                                                }}
                                                            >
                                                                <LottieView
                                                                    style={{
                                                                        width: 30,
                                                                        height: 30,
                                                                    }}
                                                                    loop
                                                                    autoPlay
                                                                    source={require('../../../../assets/lotties/trash.json')}
                                                                />
                                                            </TouchableOpacity>
                                                        </AttendanceHeader>
                                                        {servico.map(({ nomeServico, precoServico, id }: Service) => (
                                                            <ServiceContainer key={id}>
                                                                <ServiceName>{nomeServico}</ServiceName>
                                                                <ServicePrice>{`R$ ${precoServico}.00`}</ServicePrice>
                                                            </ServiceContainer>
                                                        ))}
                                                    </CardContent>
                                                </AttendanceContainer>
                                            )
                                        })
                                )}
                            </ScrollView>
                        </AttendancesCard>
                        {/* TO DO - ADD THE !ADMIN VALIDATION */}
                        <ButtonContainer>
                            <Button
                                label={i18n.t('buttonLabels.addSchedule')}
                                labelSize="medium"
                                onPress={() =>
                                    navigate('SelectService', {
                                        token: token,
                                        userName: userName,
                                    })
                                }
                                useButtonContainer={true}
                            />
                        </ButtonContainer>
                    </ScheduleContent>
                )}

                {showModal && (
                    <Portal>
                        <Modal
                            contentContainerStyle={{
                                backgroundColor: theme.colors.black100,
                                alignContent: 'center',
                                padding: 20,
                            }}
                            onDismiss={() => setShowModal(false)}
                            visible={showModal}
                        >
                            <ModalTitle>{i18n.t('title.cancelAttendance')}</ModalTitle>
                            <ModalSubtitle>{i18n.t('subtitle.youWishToCancelTheAttendance')}</ModalSubtitle>
                            <ModalButtonContainer>
                                <ButtonContent>
                                    <Button label={i18n.t('labels.no')} onPress={() => setShowModal(false)} variant={'tertiary'} />
                                </ButtonContent>
                                <ButtonContent>
                                    <Button
                                        label={i18n.t('labels.yes')}
                                        onPress={async () => await cancelAttendance()}
                                        variant={'tertiary'}
                                    />
                                </ButtonContent>
                            </ModalButtonContainer>
                        </Modal>
                    </Portal>
                )}
            </Provider>
        </FullColor>
    )
}
