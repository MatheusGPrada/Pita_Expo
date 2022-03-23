import React, { useState, useEffect } from "react";
import {
  InputContainer,
  ContentContainer,
  HeaderContent,
  Title,
  Subtitle,
  InputText,
} from "./styles";
import { TextInput } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";
import { isEmpty, validDate } from "@utils/validations";
import { SnackBar } from "@components/atoms/SnackBar/SnackBar";
import { i18n } from "@i18n";
import { theme } from "@theme";
import {
  saveUserInfoInCache,
  isValidUserInfo,
} from "@features/Register/Utils/utils";
import { StepsProps } from "../typings";
import { getAllData } from "@utils/asyncStorage";

export const UserInfo = ({ setDisabled }: StepsProps) => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarMessageError, setSnackBarMessageError] = useState("");
  const onToggleSnackBar = () => setShowSnackBar(true);

  const validData = async (
    validFunction: Function,
    value: string,
    errorMessage: string
  ) => {
    await saveUserInfoInCache(name, cpf, birthDate);
    await isValidUserInfo(name, cpf, birthDate, setDisabled);
    if (validFunction(value)) {
      setSnackBarMessageError(errorMessage);
      onToggleSnackBar();
    }
  };

  useEffect(() => {
    const getCache = async () => {
      const { BirthDate, CPF, Name } = await getAllData();
      BirthDate ? setBirthDate(BirthDate) : null;
      CPF ? setCpf(CPF) : null;
      Name ? setName(Name) : null;
      await isValidUserInfo(Name, CPF, BirthDate, setDisabled);
    };
    getCache();
  }, []);

  return (
    <>
      <HeaderContent>
        <Title>{i18n.t("title.welcome")}</Title>
        <Subtitle>{i18n.t("subtitle.signUp")}</Subtitle>
      </HeaderContent>
      <ContentContainer>
        <InputContainer>
          <InputText>{i18n.t("labels.name")}</InputText>
          <TextInput
            onBlur={async () => {
              await validData(
                (value: string) => {
                  !isEmpty(value);
                },
                name,
                i18n.t("error.emptyName")
              );
            }}
            onChangeText={setName}
            style={{ backgroundColor: "white", height: 45, marginBottom: 20 }}
            theme={{ colors: { primary: "black" } }}
            value={name}
          />
          <InputText>{i18n.t("labels.cpf")}</InputText>
          <TextInput
            onBlur={async () => {
              await validData(
                (value: string) => {
                  !isEmpty(value) && !isValidCPF(value);
                },
                cpf,
                i18n.t("error.invalidCPF")
              );
            }}
            onChangeText={setCpf}
            render={(props) => (
              <TextInputMask {...props} keyboardType="numeric" type="cpf" />
            )}
            style={{ backgroundColor: "white", height: 45, marginBottom: 20 }}
            theme={{ colors: { primary: "black" } }}
            value={cpf}
          />
          <InputText>{i18n.t("labels.birthDate")}</InputText>
          <TextInput
            onBlur={async () => {
              await validData(
                (value: string) => {
                  !validDate(value);
                },
                birthDate,
                i18n.t("error.invalidDate")
              );
            }}
            onChangeText={setBirthDate}
            render={(props) => (
              <TextInputMask
                {...props}
                keyboardType="numeric"
                options={{
                  format: "DD/MM/YYYY",
                }}
                type={"datetime"}
              />
            )}
            style={{ backgroundColor: "white", height: 45, marginBottom: 20 }}
            theme={{ colors: { primary: "black" } }}
            value={birthDate}
          />
        </InputContainer>
      </ContentContainer>
      {showSnackBar && (
        <SnackBar
          backgroundColor={theme.colors.danger50}
          message={snackBarMessageError}
          setShowSnackBar={setShowSnackBar}
        />
      )}
    </>
  );
};
