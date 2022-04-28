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
    const [stringBirthDate, setStringBirthDate] = useState('')

    const [showSnackBar, setShowSnackBar] = useState(false)
    const [snackBarMessageError, setSnackBarMessageError] = useState('')
    const onToggleSnackBar = () => setShowSnackBar(true)

    const checkInfoIsValid = (birthDate?: string) => {
        if (!isEmpty(name) && !isEmpty(cpf) && isValidCPF(cpf) && validDate(birthDate ? birthDate : stringBirthDate)) {
            setDisabled(false)
        }
    }

    const onChangeDate = async (event: object, selectedDate: Date) => {
        setBirthDate(selectedDate)
        const stringDate = selectedDate.toISOString().split('T')[0].split('-')
        const year = stringDate[0]
        const month = stringDate[1]
        const day = stringDate[2]
        const date = day.concat('/', month, '/', year)
        setStringBirthDate(date)
        await saveBirthDateInCache(selectedDate)
        checkInfoIsValid(date)
    }

    useEffect(() => {
        const getCache = async () => {
            const { BirthDate, CPF, Name } = await getAllData()
            BirthDate ? setBirthDate(new Date(BirthDate)) : null
            CPF ? setCpf(CPF) : null
            Name ? setName(Name) : null
            checkInfoIsValid()
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
                                await saveNameInCache(name)
                                checkInfoIsValid()
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
                                await saveCPFInCache(cpf)
                                checkInfoIsValid()
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
                        onChange={onChangeDate}
                        themeVariant={'light'}
                        value={birthDate}
                        style={{ marginRight: '59%', marginTop: '2%', backgroundColor: 'white' }}
                    />
                </InputContainer>
            </ContentContainer>
            {showSnackBar && (
                <SnackBar backgroundColor={theme.colors.danger50} message={snackBarMessageError} setShowSnackBar={setShowSnackBar} />
            )}
        </>
    )
}
