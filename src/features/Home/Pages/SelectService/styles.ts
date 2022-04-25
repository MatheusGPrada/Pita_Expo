import { theme } from '@theme'
import styled from 'styled-components/native'

export const Title = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.xxLarge};
    text-align: center;
`
export const Content = styled.View`
    flex: 1;
    padding: ${theme.marginsPx.m16px} ${theme.marginsPx.m8px} 0;
`

export const LoadingContainer = styled.View`
    align-items: center;
    flex: 1;
    justify-content: center;
`

export const CardService = styled.View`
    margin: 0 ${theme.marginsPx.m16px};
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
    align-items: center;
`

export const ButtonContainer = styled.View`
    margin-horizontal: ${theme.marginsPx.m20px};
    margin-top: ${theme.marginsPx.m20px};
`

export const Card = styled.View<CardProps>`
    background-color: ${({ isSelected }) => (isSelected ? `#758bfd` : theme.colors.grayscale40)};
    border-radius: 20px;
    margin-top: ${theme.marginsPx.m20px};
    padding: ${theme.marginsPx.m20px} 0;
`

export const ServiceName = styled.Text`
    color: ${theme.colors.black100};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.medium};
    text-align: center;
`

export const ServiceNameContainer = styled.View`
    min-width: 150px;
    background-color: ${theme.colors.white};
    padding: ${theme.marginsPx.m4px};
    border-radius: 20px;
`

export const ServiceInfo = styled.Text`
    color: ${theme.colors.white};
    font-family: ${theme.fonts.montserratSemiBold};
    font-size: ${theme.fontSize.medium};
    text-align: center;
`
