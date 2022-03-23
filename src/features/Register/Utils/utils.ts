import { isValidCPF } from "@brazilian-utils/brazilian-utils";
import { cacheVars, getAllData, storeData } from "@utils/asyncStorage";
import { isEmpty } from "@utils/validations";
import { isValid } from "date-fns";
import api from "src/api/api";
import { REGISTER_USER } from "src/api/endpoints";

export const validEmailRegex = /\S+@\S+\.\S+/;

// USER INFO
export const isValidUserInfo = async (
  name: string,
  cpf: string,
  birthDate: string,
  setDisabled: Function
) => {
  const elements = birthDate?.split("/");
  if (
    !isEmpty(name) &&
    !isEmpty(cpf) &&
    elements.length === 3 &&
    birthDate.length === 10
  ) {
    if (
      isValidCPF(cpf) &&
      isValid(new Date(elements[2].concat("/", elements[1], "/", elements[0])))
    ) {
      await setDisabled(false);
      return true;
    }
  }
  await setDisabled(true);
  return false;
};

export const saveUserInfoInCache = async (
  name: string,
  cpf: string,
  birthDate: string
) => {
  await storeData(cacheVars.name, name);
  await storeData(cacheVars.CPF, cpf);
  await storeData(cacheVars.birthDate, birthDate);
};

// PHONE
export const isValidPhoneNumber = async (
  phoneNumber: string,
  setDisabled: Function
) => {
  if (phoneNumber.length === 15) {
    await setDisabled(false);
    return true;
  }
  await setDisabled(true);
  return false;
};

export const savePhoneNumberInCache = async (phoneNumber: string) => {
  await storeData(cacheVars.phoneNumber, phoneNumber);
};

// EMAIL
export const isValidEmail = async (email: string, setDisabled: Function) => {
  if (validEmailRegex.test(email)) {
    await setDisabled(false);
    return true;
  }
  await setDisabled(true);
  return false;
};

export const saveEmailInCache = async (email: string) => {
  await storeData(cacheVars.email, email);
};

// PASSWORD
export const isValidPassword = async (
  password: string,
  setDisabled: Function
) => {
  if (password.length > 0) {
    await setDisabled(false);
    return true;
  }
  await setDisabled(true);
  return false;
};

export const savePasswordInCache = async (password: string) => {
  await storeData(cacheVars.password, password);
};

export const registerUser = async () => {
  let result;

  const { BirthDate, CPF, Name, Email, PhoneNumber, Password } =
    await getAllData();

  const userInfo = {
    cpf: CPF.replaceAll(".", "").replaceAll("-", ""),
    dataNascimento: BirthDate,
    nome: Name,
    senha: Password,
    telefone: PhoneNumber,
    userName: Email,
  };

  await api
    .post(REGISTER_USER, userInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const { data } = response;
      result = data;
    })
    .catch((error) => {
      result = error;
    });

  return result;
};
