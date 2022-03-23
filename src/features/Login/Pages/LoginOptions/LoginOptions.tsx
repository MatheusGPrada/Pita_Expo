import { DarkTemplate } from "@components/templates/DarkTemplate/DarkTemplate";
import { i18n } from "@i18n";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { clearCache } from "@utils/asyncStorage";
import React, { FC } from "react";
import {
  Image,
  StyledText,
  LineSeparator,
  StyledLabel,
  FooterContainer,
  FooterOption,
} from "./styles";

export const LoginOptions: FC = () => {
  const { navigate } = useNavigation();

  useFocusEffect(() => {
    const resetCache = async () => {
      await clearCache();
    };
    resetCache();
  });

  return (
    <DarkTemplate>
      <Image
        resizeMode="contain"
        source={require("../../../../assets/images/pita.png")}
      />
      <FooterContainer>
        <FooterOption>
          <StyledText
            onPress={() => navigate("RegisterStack", { screen: "SignUp" })}
          >
            {i18n.t("labels.register")}
          </StyledText>
          <LineSeparator />
        </FooterOption>
        <StyledLabel>{i18n.t("labels.or")}</StyledLabel>
        <FooterOption>
          <StyledText onPress={() => navigate("Login")}>
            {i18n.t("labels.login")}
          </StyledText>
          <LineSeparator />
        </FooterOption>
      </FooterContainer>
    </DarkTemplate>
  );
};
