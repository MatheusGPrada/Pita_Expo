import { theme } from '@theme'
import styled from 'styled-components/native'

export const Title = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.xxxLarge};
    font-style: normal;
    font-weight: 300;
    margin-bottom: ${theme.marginsPx.m4px};
`

export const Subtitle = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.xLarge};
    font-style: normal;
    font-weight: 300;
`

export const InputText = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.large};
    font-style: normal;
    font-weight: 300;
    margin-bottom: ${theme.marginsPx.m4px};
`

export const InputContainer = styled.View`
    margin: ${theme.marginsPx.m8px} ${theme.marginsPx.m40px} 15%;
`

export const ContentContainer = styled.View`
    flex: 1;
`
