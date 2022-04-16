import styled from 'styled-components/native'
import { theme } from '../../../../styles/theme'
import { TimeContainerProps } from './typings'

export const ContentContainer = styled.View`
    padding: ${theme.marginsPx.m16px};
    flex: 1;
`

export const Title = styled.Text`
    color: #fff;
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
    margin-bottom: ${theme.marginsPx.m40px};
`

export const TimeContainer = styled.View<TimeContainerProps>`
    margin: ${theme.marginsPx.m8px} ${theme.marginsPx.m40px};
    background-color: ${({ enable }) => (enable ? theme.colors.primary50 : theme.colors.grayscale80)};
    border-radius: 20px;
`

export const Time = styled.Text`
    color: #fff;
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
    padding: ${theme.marginsPx.m8px};
    text-align: center;
`

export const ButtonContent = styled.View`
    flex: 1;
    margin: ${theme.marginsPx.m40px} ${theme.marginsPx.m20px};
`

export const ModalTitle = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xLarge};
    letter-spacing: ${theme.letterSpacing.ls08};
    align-self: center;
`

export const ModalSubtitle = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.large};
    letter-spacing: ${theme.letterSpacing.ls08};
    align-self: center;
    margin-top: ${theme.marginsPx.m8px};
`
