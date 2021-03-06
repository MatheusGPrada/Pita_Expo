import { theme } from "@theme";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { getResponsiveSizeInPx } from "@features/Register/Utils/utils";

const { height } = Dimensions.get("window");

export const SnackBarContainer = styled.View`
  flex: 1;
  background-color: red;
  margin-top: ${theme.marginsPx.m60px};
`;

export const LoadingContainer = styled.View`
  align-items: center;
  margin-top: ${getResponsiveSizeInPx(height / 3)};
`;
