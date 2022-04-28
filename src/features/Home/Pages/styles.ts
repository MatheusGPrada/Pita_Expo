import styled from 'styled-components/native'
import { theme } from '../../../styles/theme'

export const FullColor = styled.View`
    flex: 1;
    background-color: #000;
`

export const ProfileHeader = styled.View`
    align-self: flex-start;
    flex-direction: row;
    margin-top: 25%;
    margin-left: ${theme.marginsPx.m16px};
`

export const UserName = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
    letter-spacing: ${theme.letterSpacing.ls08};
    align-self: center;
    left: ${theme.marginsPx.m20px};
`

export const ProfileContent = styled.View`
    flex: 1;
    margin-horizontal: ${theme.marginsPx.m12px};
    margin-top: ${theme.marginsPx.m60px};
`

export const ButtonContainer = styled.View`
    margin-top: ${theme.marginsPx.m32px};
`

export const LogOutButtonContainer = styled.View`
    margin: ${theme.marginsPx.m20px} ${theme.marginsPx.m40px} ${theme.marginsPx.m4px} ${theme.marginsPx.m40px};
`

export const PasswordTitle = styled.Text`
    color: ${theme.colors.white};
    padding: ${theme.marginsPx.m40px} 0;
    font-size: ${theme.fontSize.xxLarge};
`

export const HeaderContainer = styled.View`
    flex-direction: row;
    background-color: red;
    justify-content: center;
    align-items: center;
`

export const Title = styled.Text`
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
    color: ${theme.colors.white};
`
