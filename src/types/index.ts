import { TextInput } from "react-native";

export interface Country {
  ru: string;
  lt: string;
  tr: string;
  en: string;
  flag: string;
  code: string;
  dialCode: string;
  mask: string;
}

export interface PhoneInputState {
  dialCode: string;
  unmaskedPhoneNumber: string;
  phoneNumber: string;
  isVerified: boolean;
  selectedCountry: Country;
}

export interface IntlPhoneInputProps {
  lang?: "ru" | "lt" | "tr" | "en";
  defaultCountry?: string;
  mask?: string;
  onChangeText?: (state: PhoneInputState) => void;
  customModal?: (
    visible: boolean,
    countries: Country[],
    onSelect: (code: string) => void
  ) => JSX.Element;
  containerStyle?: object;
  flagStyle?: object;
  phoneInputStyle?: object;
  dialCodeTextStyle?: object;
  modalContainer?: object;
  filterInputStyle?: object;
  closeButtonStyle?: object;
  modalCountryItemCountryNameStyle?: object;
  modalCountryItemCountryDialCodeStyle?: object;
  modalFlagStyle?: object;
  filterText?: string;
  closeText?: string;
  searchIconStyle?: object;
  disableCountryChange?: boolean;
  inputRef?: React.RefObject<TextInput>;
  placeholderTextColor?: string;
  renderAction?: () => JSX.Element;
}
