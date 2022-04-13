import React, { useState, useEffect } from 'react'
import { ContentContainer, HeaderContent, Subtitle, InputText, SnackBarContainer, Title } from './styles'
import { TextInput } from 'react-native-paper'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import { i18n } from '@i18n'
import { theme } from '@theme'
import { isValidEmail, saveEmailInCache } from '@features/Register/Utils/utils'
import { StepsProps } from '../typings'
import { getAllData } from '@utils/asyncStorage'

export const Email = ({ setDisabled }: StepsProps) => {
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const onToggleSnackBar = () => setShowSnackBar(true)

    const validEmail = async () => {
        await saveEmailInCache(email)
        if (!(await isValidEmail(email, setDisabled))) {
            setError(i18n.t('error.invalidEmail'))
            onToggleSnackBar()
        }
    }

    useEffect(() => {
        const getCache = async () => {
            const { Email } = await getAllData()
            Email ? setEmail(Email) : null
            await isValidEmail(Email, setDisabled)
        }
        setDisabled(true)
        getCache()
    }, [])

    return (
        <>
            <HeaderContent>
                <Title>{i18n.t('title.email')}</Title>
                <Subtitle>{i18n.t('subtitle.insertEmail')}</Subtitle>
            </HeaderContent>
            <ContentContainer>
                <InputText>{i18n.t('labels.email')}</InputText>
                <TextInput
                    keyboardType="email-address"
                    onBlur={() => {
                        validEmail()
                    }}
                    onChangeText={setEmail}
                    style={{ backgroundColor: 'white', height: 45 }}
                    theme={{ colors: { primary: 'black' } }}
                    value={email}
                />
            </ContentContainer>
            <SnackBarContainer>
                {showSnackBar && (
                    <SnackBar backgroundColor={theme.colors.danger50} message={error} setShowSnackBar={setShowSnackBar} />
                )}
            </SnackBarContainer>
        </>
    )
}
