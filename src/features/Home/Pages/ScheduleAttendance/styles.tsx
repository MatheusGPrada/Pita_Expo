import styled from 'styled-components/native'
import { theme } from '../../../../styles/theme'
import { TimeContainerProps } from './typings'

export const ContentContainer = styled.View`
    flex: 1;
    align-content: center;
    margin: ${theme.marginsPx.m100px} ${theme.marginsPx.m16px} ${theme.marginsPx.m32px};
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

export const Title = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
    letter-spacing: ${theme.letterSpacing.ls08};
    margin: ${theme.marginsPx.m16px};
`

export const Subtitle = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.xLarge};
    letter-spacing: ${theme.letterSpacing.ls08};
    text-align: center;
    margin: 0 ${theme.marginsPx.m16px} ${theme.marginsPx.m16px};
`

export const Schedule = styled.View`
    background-color: ${theme.colors.white};
    padding: ${theme.marginsPx.m20px} ${theme.marginsPx.m16px};
    min-height: 300px;
    min-width: 200px;
    margin-top: ${theme.marginsPx.m40px};
    border-radius: 15;
`

export const InitialDefaultTime = styled.Text`
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
`

export const EndDefaultTime = styled.Text`
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
`

export const ScrollView = styled.ScrollView`
    flex: 1;
`

export const InitialTimeContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: ${theme.marginsPx.m4px};
`

export const EndTimeContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin: ${theme.marginsPx.m12px} 0;
`

export const LineSeparator = styled.View`
    background-color: ${theme.colors.black100};
    height: ${theme.size.m2px};
    width: 75%;
    margin-left: ${theme.marginsPx.m12px};
`

export const AllAvalibleContainer = styled.View`
    margin-top: ${theme.marginsPx.m32px};
`

export const ConfirmButtonContainer = styled.View`
    justify-content: flex-end;
    margin: ${theme.marginsPx.m20px} ${theme.marginsPx.m40px} 0;
    flex: 1;
`

export const Card = styled.View`
    height: 70;
    width: 180;
    padding: ${theme.marginsPx.m12px};
    background-color: red;
    align-self: center;
    border-radius: 10;
    margin-top: ${theme.marginsPx.m16px};
`

export const SnackBarContainer = styled.View`
    flex: 1;
    margin-top: ${theme.marginsPx.m20px};
`
