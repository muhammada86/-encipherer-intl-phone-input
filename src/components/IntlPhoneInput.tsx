import React, { useState, useCallback, useMemo, lazy, Suspense } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { COUNTRIES } from "../data/countries";
import { formatPhoneNumber, getDefaultCountry } from "../utils/phoneUtils";
import { styles } from "../styles/styles";
import { IntlPhoneInputProps, PhoneInputState } from "../types";

const CountryModal = lazy(() => import("./CountryModal"));

const IntlPhoneInput: React.FC<IntlPhoneInputProps> = ({
  lang = "en",
  defaultCountry = "TR",
  mask: propMask,
  onChangeText,
  customModal,
  containerStyle,
  flagStyle,
  phoneInputStyle,
  dialCodeTextStyle,
  modalContainer,
  filterInputStyle,
  modalFlagStyle,
  modalCountryItemCountryNameStyle,
  modalCountryItemCountryDialCodeStyle,
  closeButtonStyle,
  searchIconStyle,
  filterText,
  closeText,
  disableCountryChange,
  inputRef,
  placeholderTextColor = "grey",
  renderAction,
}) => {
  const defaultCountryData = useMemo(
    () => getDefaultCountry(defaultCountry, COUNTRIES),
    [defaultCountry]
  );
  const [selectedCountry, setSelectedCountry] = useState(defaultCountryData);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [countryData, setCountryData] = useState(COUNTRIES);
  const mask = propMask || selectedCountry.mask;

  const handleChangeText = useCallback(
    (value: string) => {
      const { phoneNumber: formatted, unmasked } = formatPhoneNumber(
        value,
        mask,
        selectedCountry.code
      ); // Pass country code
      setPhoneNumber(formatted);
      const countOfNumber = mask.match(/9/g)?.length || 0;
      const isVerified =
        countOfNumber === unmasked.length && formatted.length > 0;
      onChangeText?.({
        dialCode: selectedCountry.dialCode,
        unmaskedPhoneNumber: unmasked,
        phoneNumber: formatted,
        isVerified,
        selectedCountry,
      });
    },
    [mask, onChangeText, selectedCountry]
  );

  const handleCountryChange = useCallback(
    (code: string) => {
      if (!code) {
        setModalVisible(false);
        return;
      }
      const country =
        COUNTRIES.find((c) => c.code === code) || defaultCountryData;
      setSelectedCountry(country);
      setPhoneNumber("");
      setModalVisible(false);
    },
    [defaultCountryData]
  );

  const filterCountries = useCallback(
    (value: string) => {
      const filtered = COUNTRIES.filter(
        (c) =>
          c[lang.toLowerCase() as keyof typeof c]
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase()) || c.dialCode.includes(value)
      );
      setCountryData(filtered);
    },
    [lang]
  );

  const renderModal = useMemo(
    () =>
      customModal ? (
        customModal(modalVisible, countryData, handleCountryChange)
      ) : (
        <Suspense fallback={<Text>Loading...</Text>}>
          <CountryModal
            visible={modalVisible}
            countries={countryData}
            onSelect={handleCountryChange}
            filterCountries={filterCountries}
            lang={lang}
            modalContainer={modalContainer}
            filterInputStyle={filterInputStyle}
            modalFlagStyle={modalFlagStyle}
            modalCountryItemCountryNameStyle={modalCountryItemCountryNameStyle}
            modalCountryItemCountryDialCodeStyle={
              modalCountryItemCountryDialCodeStyle
            }
            closeButtonStyle={closeButtonStyle}
            searchIconStyle={searchIconStyle}
            filterText={filterText}
            closeText={closeText}
            placeholderTextColor={placeholderTextColor}
          />
        </Suspense>
      ),
    [
      customModal,
      modalVisible,
      countryData,
      handleCountryChange,
      filterCountries,
      lang,
      modalContainer,
      filterInputStyle,
      modalFlagStyle,
      modalCountryItemCountryNameStyle,
      modalCountryItemCountryDialCodeStyle,
      closeButtonStyle,
      searchIconStyle,
      filterText,
      closeText,
      placeholderTextColor,
    ]
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={() => !disableCountryChange && setModalVisible(true)}
      >
        <View style={styles.openDialogView}>
          <Text style={[styles.flagStyle, flagStyle]}>
            {selectedCountry.flag}
          </Text>
          <Text style={[styles.dialCodeTextStyle, dialCodeTextStyle]}>
            {selectedCountry.dialCode}
          </Text>
        </View>
      </TouchableOpacity>
      {renderModal}
      <TextInput
        ref={inputRef}
        style={[styles.phoneInputStyle, phoneInputStyle]}
        placeholder={mask.replace(/9/g, "_")}
        autoCorrect={false}
        keyboardType="number-pad"
        secureTextEntry={false}
        value={phoneNumber}
        onChangeText={handleChangeText}
        placeholderTextColor={placeholderTextColor}
      />
      {renderAction?.()}
    </View>
  );
};

export default IntlPhoneInput;
