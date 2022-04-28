import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { theme } from '../../../../styles/theme'

const { width, height } = Dimensions.get('window')
const imageHeight = `${height * 0.2}px`
const imageWidth = `${width * 0.2}px`

export const Image = styled.Image`
    align-self: center;
    flex: 1;
    justify-content: center;
    max-height: 230px;
    max-width: 230px;
`
export const ImageContainer = styled.View`
    align-self: center;
    width: ${imageWidth};
    height: ${imageHeight};
    max-width: 280px;
    max-height: 280px;
    margin-bottom: ${theme.marginsPx.m20px};
    margin-top: ${theme.marginsPx.m100px};
`

export const ContentContainer = styled.View`
    margin-top: ${theme.marginsPx.m100px};
`

export const SnackBarContainer = styled.View`
    margin-top: ${theme.marginsPx.m40px};
`
