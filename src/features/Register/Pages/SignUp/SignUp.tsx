import { DarkTemplate } from "@components/templates/DarkTemplate/DarkTemplate";
import React, { useState, FC } from "react";
import { PhoneNumber } from "../PhoneNumber/PhoneNumber";
import { UserInfo } from "../UserInfo/UserInfo";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { i18n } from "@i18n";
import { theme } from "@theme";
import { Email } from "../Email/Email";
import { isValidPassword, registerUser } from "@features/Register/Utils/utils";
import { Password } from "../Password/Password";
import { useNavigation } from "@react-navigation/native";
import { SnackBar } from "@components/atoms/SnackBar/SnackBar";
import { SnackBarContainer } from "./styles";
import { cacheVars, getData } from "@utils/asyncStorage";

export const SignUp: FC = () => {
  const [disabled, setDisabled] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);

  const { navigate } = useNavigation();

  const onToggleSnackBar = () => setSnackBarVisible(true);

  const buttonStyle = {
    backgroundColor: theme.colors.primary50,
    borderRadius: 10,
    padding: 8,
    textAlign: "center",
  };

  const buttonTextStyle = { color: theme.colors.white, fontSize: 18 };

  return (
    <DarkTemplate hasMargin={false}>
      <ProgressSteps
        activeLabelColor={theme.colors.white}
        activeStepIconBorderColor={theme.colors.white}
        borderWidth={3}
        completedLabelColor={theme.colors.primary50}
        completedProgressBarColor={theme.colors.primary50}
        completedStepIconColor={theme.colors.primary50}
        labelColor={theme.colors.white}
        labelFontFamily={theme.fonts.montserratRegular}
        progressBarColor={theme.colors.white}
      >
        <ProgressStep
          label={i18n.t("steps.personalData")}
          nextBtnDisabled={disabled}
          nextBtnStyle={buttonStyle}
          nextBtnText={i18n.t("buttonLabels.next")}
          nextBtnTextStyle={buttonTextStyle}
        >
          <UserInfo setDisabled={setDisabled} />
        </ProgressStep>
        <ProgressStep
          label={i18n.t("steps.phoneNumber")}
          nextBtnDisabled={disabled}
          nextBtnStyle={buttonStyle}
          nextBtnText={i18n.t("buttonLabels.next")}
          nextBtnTextStyle={buttonTextStyle}
          previousBtnStyle={buttonStyle}
          previousBtnText={i18n.t("buttonLabels.back")}
          previousBtnTextStyle={buttonTextStyle}
        >
          <PhoneNumber setDisabled={setDisabled} />
        </ProgressStep>
        <ProgressStep
          finishBtnText={i18n.t("buttonLabels.finish")}
          label={i18n.t("steps.email")}
          nextBtnStyle={buttonStyle}
          nextBtnText={i18n.t("buttonLabels.next")}
          nextBtnTextStyle={buttonTextStyle}
          previousBtnStyle={buttonStyle}
          previousBtnText={i18n.t("buttonLabels.back")}
          previousBtnTextStyle={buttonTextStyle}
        >
          <Email setDisabled={setDisabled} />
        </ProgressStep>
        <ProgressStep
          finishBtnText={i18n.t("buttonLabels.finish")}
          label={i18n.t("steps.password")}
          nextBtnStyle={buttonStyle}
          nextBtnTextStyle={buttonTextStyle}
          onSubmit={async () => {
            if (
              await isValidPassword(
                await getData(cacheVars.password),
                setDisabled
              )
            ) {
              const result = await registerUser();
              if (JSON.stringify(result).includes('"name":"Error"')) {
                onToggleSnackBar();
              } else {
                navigate("Login");
              }
            }
          }}
          previousBtnStyle={buttonStyle}
          previousBtnText={i18n.t("buttonLabels.back")}
          previousBtnTextStyle={buttonTextStyle}
        >
          <Password setDisabled={setDisabled} />
          <SnackBarContainer>
            {snackBarVisible && (
              <SnackBar
                backgroundColor={theme.colors.danger50}
                message={i18n.t("error.userAlreadyExist")}
                setVisible={setSnackBarVisible}
              />
            )}
          </SnackBarContainer>
        </ProgressStep>
      </ProgressSteps>
    </DarkTemplate>
  );
};
