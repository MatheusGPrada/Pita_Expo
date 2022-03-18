import { theme } from '@theme'
import styled from 'styled-components/native'

export const Image = styled.Image`
    flex: 1;
    width: 400px;
    height: 400px;
    align-self: center;
`

export const HeaderContainer = styled.View`
    flex: 1;
    flex-direction: row;
`

export const StyledText = styled.Text`
    color: ${theme.colors.white};
    text-align: center;
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.large};
    align-self: center;
    padding-bottom: ${theme.marginsPx.m20px};
`

export const LineSeparator = styled.View`
    align-self: center;
    background-color: ${theme.colors.grayscale50};
    height: ${theme.size.m1px};
    width: 80%;
`

export const StyledLabel = styled.Text`
    color: ${theme.colors.white};
    text-align: center;
    font-family: ${theme.fonts.montserratRegular};
    font-size: ${theme.fontSize.large};
    align-self: center;
`
export const FooterContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
`

export const FooterOption = styled.View`
    flex-direction: column;
    flex: 1;
    padding: ${theme.marginsPx.m40px} 0 ${theme.marginsPx.m20px} 0;
`
