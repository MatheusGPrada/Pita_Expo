import React, { useState, useEffect } from 'react'
import { InputContainer, ContentContainer, Title, Subtitle, InputText } from './styles'
import { TextInput } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import { isValidCPF } from '@brazilian-utils/brazilian-utils'
import { isEmpty, validDate } from '@utils/validations'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import { i18n } from '@i18n'
import { theme } from '@theme'
import { saveNameInCache, saveCPFInCache, saveBirthDateInCache } from '@features/Register/Utils/utils'
import { StepsProps } from '../typings'
import { getAllData } from '@utils/asyncStorage'
import { HeaderContent } from '../styles'
import DateTimePicker from '@react-native-community/datetimepicker'

export const UserInfo = ({ setDisabled }: StepsProps) => {
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [birthDate, setBirthDate] = useState(new Date())
    let userBithdate = new Date()

    const [showSnackBar, setShowSnackBar] = useState(false)
    const [snackBarMessageError, setSnackBarMessageError] = useState('')
    const onToggleSnackBar = () => setShowSnackBar(true)

    const checkInfoIsValid = (userCpf?: string, userName?: string) => {
        if (
            !isEmpty(userName ? userName : name) &&
            !isEmpty(userCpf ? userCpf : cpf) &&
            isValidCPF(userCpf ? userCpf : cpf) &&
            validDate(userBithdate)
        ) {
            setDisabled(false)
        }
    }

    const onChangeDate = async (selectedDate: Date) => {
        setBirthDate(selectedDate)
        userBithdate = selectedDate
        await saveBirthDateInCache(selectedDate)
    }

    const onChangeName = async () => {
        await saveNameInCache(name)
        checkInfoIsValid()
    }

    const onChangeCPF = async () => {
        await saveCPFInCache(cpf)
        checkInfoIsValid()
    }

    useEffect(() => {
        const getCache = async () => {
            const { BirthDate, CPF, Name } = await getAllData()
            setName(Name)
            setCpf(CPF)
            setBirthDate(BirthDate ? new Date(BirthDate) : new Date())
            checkInfoIsValid(CPF, Name)
        }
        getCache()
    }, [])

    return (
        <>
            <HeaderContent>
                <Title>{i18n.t('title.welcome')}</Title>
                <Subtitle>{i18n.t('subtitle.signUp')}</Subtitle>
            </HeaderContent>
            <ContentContainer>
                <InputContainer>
                    <InputText>{i18n.t('labels.name')}</InputText>
                    <TextInput
                        onBlur={async () => {
                            if (!isEmpty(name)) {
                                onChangeName()
                                return
                            }
                            setDisabled(true)
                            setSnackBarMessageError(i18n.t('error.emptyName'))
                            onToggleSnackBar()
                        }}
                        onChangeText={setName}
                        style={{ backgroundColor: 'white', height: 45, marginBottom: 20 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={name}
                    />
                    <InputText>{i18n.t('labels.cpf')}</InputText>
                    <TextInput
                        onBlur={async () => {
                            if (!isEmpty(cpf) && isValidCPF(cpf)) {
                                onChangeCPF()
                                return
                            }
                            setDisabled(true)
                            setSnackBarMessageError(i18n.t('error.invalidCPF'))
                            onToggleSnackBar()
                        }}
                        onChangeText={setCpf}
                        render={props => <TextInputMask {...props} keyboardType="numeric" type="cpf" />}
                        style={{ backgroundColor: 'white', height: 45, marginBottom: 20 }}
                        theme={{ colors: { primary: 'black' } }}
                        value={cpf}
                    />
                    <InputText>{i18n.t('labels.birthDate')}</InputText>
                    <DateTimePicker
                        display="default"
                        maximumDate={new Date()}
                        minimumDate={new Date(1950, 0, 1)}
                        mode={'date'}
                        onChange={async (event, value) => {
                            await onChangeDate(value)
                            checkInfoIsValid()
                        }}
                        themeVariant={'light'}
                        value={birthDate}
                        style={{ backgroundColor: 'white', height: 45, width: 80 }}
                    />
                </InputContainer>
            </ContentContainer>
            {showSnackBar && (
                <SnackBar backgroundColor={theme.colors.danger50} message={snackBarMessageError} setShowSnackBar={setShowSnackBar} />
            )}
        </>
    )
}
