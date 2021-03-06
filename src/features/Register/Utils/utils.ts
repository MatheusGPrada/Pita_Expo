import { cacheVars, getAllData, storeData } from "@utils/asyncStorage";
import api from "src/api/api";
import { REGISTER_USER } from "src/api/endpoints";

export const validEmailRegex = /\S+@\S+\.\S+/;

// NAME
export const saveNameInCache = async (name: string) => {
  await storeData(cacheVars.name, name);
};

// CPF
export const saveCPFInCache = async (cpf: string) => {
  await storeData(cacheVars.CPF, cpf);
};

// BIRTHDATE
export const saveBirthDateInCache = async (birthDate: string) => {
  await storeData(cacheVars.birthDate, birthDate);
};

// PHONE
export const isValidPhoneNumber = async (
  phoneNumber: string,
  setDisabled: Function
) => {
  if (phoneNumber && phoneNumber.length === 15) {
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
export const isValidPassword = async (password: string | number) => {
  const isValid =
    typeof password === "number"
      ? password.toString().length > 0
      : password?.length > 0;
  if (Boolean(password) && isValid) {
    return true;
  }
  return false;
};

export const savePasswordInCache = async (password: string) => {
  await storeData(cacheVars.password, password);
};

// REGISTER USER
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

export const getResponsiveSizeInPx = (value: number) =>
  value.toString().concat("px");
