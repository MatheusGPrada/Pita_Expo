import React, { useState, useEffect } from "react";
import {
  ContentContainer,
  HeaderContent,
  Subtitle,
  InputText,
  SnackBarContainer,
  Title,
} from "./styles";
import { TextInput } from "react-native-paper";
import { SnackBar } from "@components/atoms/SnackBar/SnackBar";
import { i18n } from "@i18n";
import { theme } from "@theme";
import {
  isValidPassword,
  savePasswordInCache,
} from "@features/Register/Utils/utils";
import { getAllData } from "@utils/asyncStorage";

export const Password = () => {
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onToggleSnackBar = () => setVisible(true);

  const validPassword = async () => {
    savePasswordInCache(password);
    if (!(await isValidPassword(password))) {
      setError(i18n.t("error.invalidPassword"));
      onToggleSnackBar();
    }
  };

  useEffect(() => {
    const getCache = async () => {
      const { Password } = await getAllData();
      Password ? setPassword(Password) : null;
      await isValidPassword(Password);
    };
    getCache();
  }, []);

  return (
    <>
      <HeaderContent>
        <Title>{i18n.t("title.password")}</Title>
        <Subtitle>{i18n.t("subtitle.insertPassword")}</Subtitle>
      </HeaderContent>
      <ContentContainer>
        <InputText>{i18n.t("labels.password")}</InputText>
        <TextInput
          onBlur={async () => {
            await validPassword();
          }}
          onChangeText={setPassword}
          style={{ backgroundColor: "white", height: 45 }}
          theme={{ colors: { primary: "black" } }}
          value={password}
        />
      </ContentContainer>
      <SnackBarContainer>
        {visible && (
          <SnackBar
            backgroundColor={theme.colors.danger50}
            message={error}
            setShowSnackBar={setVisible}
          />
        )}
      </SnackBarContainer>
    </>
  );
};
