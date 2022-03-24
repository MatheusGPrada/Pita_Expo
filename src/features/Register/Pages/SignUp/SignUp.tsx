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
import { LoadingContainer, SnackBarContainer } from "./styles";
import { cacheVars, getData } from "@utils/asyncStorage";
import { Loading } from "@components/atoms/Loading/Loading";

export const SignUp: FC = () => {
  const [disabled, setDisabled] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation();

  const onToggleSnackBar = () => setShowSnackBar(true);

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
              await setLoading(true);
              const result = await registerUser();
              if (JSON.stringify(result).includes('"name":"Error"')) {
                await setLoading(false);
                onToggleSnackBar();
              } else {
                await setLoading(false);
                navigate("Login");
              }
            }
          }}
          previousBtnStyle={buttonStyle}
          previousBtnText={i18n.t("buttonLabels.back")}
          previousBtnTextStyle={buttonTextStyle}
        >
          {loading ? (
            <LoadingContainer>
              <Loading size={70} />
            </LoadingContainer>
          ) : (
            <Password setDisabled={setDisabled} />
          )}

          <SnackBarContainer>
            {showSnackBar && (
              <SnackBar
                backgroundColor={theme.colors.danger50}
                message={i18n.t("error.userAlreadyExist")}
                setShowSnackBar={setShowSnackBar}
              />
            )}
          </SnackBarContainer>
        </ProgressStep>
      </ProgressSteps>
    </DarkTemplate>
  );
};
