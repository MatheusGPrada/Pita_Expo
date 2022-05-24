import React, { useState, useEffect } from 'react'
import { ContentContainer, Subtitle, InputText, SnackBarContainer, Title } from './styles'
import { TextInput } from 'react-native-paper'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import { i18n } from '@i18n'
import { theme } from '@theme'
import { isValidEmail, isValidPhoneNumber, saveEmailInCache, savePhoneNumberInCache } from '@features/Register/Utils/utils'
import { StepsProps } from '../typings'
import { getAllData } from '@utils/asyncStorage'
import { HeaderContent } from '../styles'
import { TextInputMask } from 'react-native-masked-text'

export const Contact = ({ setDisabled }: StepsProps) => {
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')

    const onToggleSnackBar = () => setShowSnackBar(true)

    const validEmail = async () => {
        await saveEmailInCache(email)
        if (!(await isValidEmail(email))) {
            setError(i18n.t('error.invalidEmail'))
            onToggleSnackBar()
            return false
        }
        return true
    }

    const validPhone = async () => {
        await savePhoneNumberInCache(phoneNumber)
        if (!(await isValidPhoneNumber(phoneNumber))) {
            setError(i18n.t('error.invalidPhoneNumber'))
            onToggleSnackBar()
            return false
        }
        return true
    }

    const isValidInfo = async (userPhone?: string, userEmail?: string) => {
        if ((await isValidEmail(userEmail ? userEmail : email)) && (await isValidPhoneNumber(userPhone ? userPhone : phoneNumber))) {
            setDisabled(false)
            return
        }
        setDisabled(true)
    }

    useEffect(() => {
        setDisabled(true)
        const getCache = async () => {
            const { Email, PhoneNumber } = await getAllData()
            setPhoneNumber(PhoneNumber)
            setEmail(Email)
            await isValidInfo(PhoneNumber, Email)
        }
        getCache()
    }, [])

    return (
        <>
            <HeaderContent>
                <Title>{i18n.t('title.contact')}</Title>
                <Subtitle>{i18n.t('subtitle.insertContacts')}</Subtitle>
            </HeaderContent>
            <ContentContainer>
                <InputText>{i18n.t('labels.cellphone')}</InputText>
                <TextInput
                    onBlur={() => {
                        validPhone()
                        isValidInfo()
                    }}
                    onChangeText={setPhoneNumber}
                    render={props => (
                        <TextInputMask
                            {...props}
                            keyboardType="numeric"
                            options={{
                                dddMask: '(99) ',
                                maskType: 'BRL',
                                withDDD: true,
                            }}
                            type={'cel-phone'}
                        />
                    )}
                    style={{ backgroundColor: 'white', height: 45, marginBottom: 20 }}
                    theme={{ colors: { primary: 'black' } }}
                    value={phoneNumber}
                />
                <InputText>{i18n.t('labels.email')}</InputText>
                <TextInput
                    keyboardType="email-address"
                    onBlur={() => {
                        validEmail()
                        isValidInfo()
                    }}
                    onChangeText={setEmail}
                    style={{ backgroundColor: 'white', height: 45 }}
                    theme={{ colors: { primary: 'black' } }}
                    value={email}
                />
            </ContentContainer>
            {showSnackBar && <SnackBar backgroundColor={theme.colors.danger50} message={error} setShowSnackBar={setShowSnackBar} />}
        </>
    )
}
