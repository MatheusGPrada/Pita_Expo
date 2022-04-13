import React, { useState, useEffect } from 'react'
import { ContentContainer, HeaderContent, Subtitle, InputText, SnackBarContainer, Title } from './styles'
import { TextInput } from 'react-native-paper'
import { SnackBar } from '@components/atoms/SnackBar/SnackBar'
import { i18n } from '@i18n'
import { theme } from '@theme'
import { TextInputMask } from 'react-native-masked-text'
import { isValidPhoneNumber, savePhoneNumberInCache } from '@features/Register/Utils/utils'
import { StepsProps } from '../typings'
import { getAllData } from '@utils/asyncStorage'

export const PhoneNumber = ({ setDisabled }: StepsProps) => {
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState('')

    const onToggleSnackBar = () => setShowSnackBar(true)

    const validPhone = async () => {
        await savePhoneNumberInCache(phoneNumber)
        if (!(await isValidPhoneNumber(phoneNumber, setDisabled))) {
            setError(i18n.t('error.invalidPhoneNumber'))
            onToggleSnackBar()
        }
    }

    useEffect(() => {
        const getCache = async () => {
            const { PhoneNumber } = await getAllData()
            PhoneNumber ? setPhoneNumber(PhoneNumber) : null
            await isValidPhoneNumber(PhoneNumber, setDisabled)
        }
        setDisabled(true)
        getCache()
    }, [])

    return (
        <>
            <HeaderContent>
                <Title>{i18n.t('title.cellphone')}</Title>
                <Subtitle>{i18n.t('subtitle.insertPhoneNumber')}</Subtitle>
            </HeaderContent>
            <ContentContainer>
                <InputText>{i18n.t('labels.cellphone')}</InputText>
                <TextInput
                    onBlur={() => validPhone()}
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
                    style={{ backgroundColor: 'white', height: 45 }}
                    theme={{ colors: { primary: 'black' } }}
                    value={phoneNumber}
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
