import styled from 'styled-components/native'
import { theme } from '../../../../styles/theme'
import { AttendanceProps } from './typings'

export const AttendanceHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: ${theme.marginsPx.m12px};
`

export const ServiceContainer = styled.View`
    flex-direction: row;
    padding: 0 ${theme.marginsPx.m16px} ${theme.marginsPx.m4px};
    justify-content: space-between;
`

export const ServiceName = styled.Text`
    color: ${theme.colors.black100};
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.large};
    align-self: flex-start;
`

export const ServicePrice = styled.Text`
    color: ${theme.colors.black100};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.medium};
    align-self: flex-start;
`

export const AttendanceDay = styled.Text`
    color: ${theme.colors.black100};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.large};
    padding: ${theme.marginsPx.m12px} ${theme.marginsPx.m16px} 0;
`

export const IconContainer = styled.View`
    align-items: center;
    justify-content: center;
`

export const AttendanceContainer = styled.View<AttendanceProps>`
    background-color: ${({ isAvailable }) => (isAvailable ? `#ffffff` : `#bca5ad`)};
    border-radius: 10px;
    margin: ${theme.marginsPx.m20px} ${theme.marginsPx.m16px} 0;
    flex-direction: row;
    padding: ${theme.marginsPx.m8px};
    min-height: 150px;
`

export const Title = styled.Text`
    color: #fff;
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
`

export const LottieContainer = styled.View`
    align-self: center;
    justify-content: flex-start;
    flex: 1;
`

export const ModalButtonContainer = styled.View`
    margin: ${theme.marginsPx.m20px} ${theme.marginsPx.m20px} ${theme.marginsPx.m4px};
    flex-direction: row;
`

export const ButtonContainer = styled.View`
    margin: ${theme.marginsPx.m20px} ${theme.marginsPx.m40px} ${theme.marginsPx.m4px} ${theme.marginsPx.m40px};
`

export const ButtonContent = styled.View`
    flex: 1;
    margin: ${theme.marginsPx.m40px} ${theme.marginsPx.m20px} 0;
`

export const CardContent = styled.View`
    flex: 1;
`

export const ScrollView = styled.ScrollView`
    flex: 1;
`

export const LoadingContainer = styled.View`
    align-items: center;
    flex: 1;
    justify-content: center;
`

export const Image = styled.Image`
    max-height: 80px;
    max-width: 80px;
`

export const ScheduleContent = styled.View`
    margin-top: ${theme.marginsPx.m16px};
    flex: 1;
    justify-content: center;
`

export const FullColor = styled.View`
    flex: 1;
    background-color: #000;
`

export const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.marginsPx.m60px} ${theme.marginsPx.m16px} ${theme.marginsPx.m16px} ${theme.marginsPx.m16px};
`

export const AttendancesCard = styled.View`
    flex: 1;
    background-color: #003049;
    border-radius: 10px;
    margin: ${theme.marginsPx.m16px} ${theme.marginsPx.m16px};
`

export const Subtitle = styled.Text`
    color: #fff;
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.xLarge};
    align-self: center;
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
