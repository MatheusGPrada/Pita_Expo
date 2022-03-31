import { theme } from "@theme";
import styled from "styled-components/native";

export const HeaderContent = styled.View`
  margin: ${theme.marginsPx.m40px} ${theme.marginsPx.m32px};
`;

export const Title = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.fonts.montserratRegular};
  font-size: ${theme.fontSize.xxxLarge};
  font-style: normal;
  font-weight: 300;
  margin-bottom: ${theme.marginsPx.m4px};
`;

export const Subtitle = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.fonts.montserratRegular};
  font-size: ${theme.fontSize.large};
  font-style: normal;
  font-weight: 300;
`;

export const InputText = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.fonts.montserratRegular};
  font-size: ${theme.fontSize.large};
  font-style: normal;
  font-weight: 300;
  margin-bottom: ${theme.marginsPx.m4px};
`;

export const InputContainer = styled.View`
  margin: ${theme.marginsPx.m20px} ${theme.marginsPx.m40px}
    ${theme.marginsPx.m100px};
`;

export const ContentContainer = styled.View`
  flex: 1;
`;
