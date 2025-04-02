import React, { memo, useCallback } from "react";
import {
  Modal,
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from "react-native";
import { Country } from "../types";
import { styles } from "../styles/styles";

interface CountryModalProps {
  visible: boolean;
  countries: Country[];
  onSelect: (code: string) => void;
  filterCountries: (value: string) => void;
  lang: string;
  modalContainer?: object;
  filterInputStyle?: object;
  modalFlagStyle?: object;
  modalCountryItemCountryNameStyle?: object;
  modalCountryItemCountryDialCodeStyle?: object;
  closeButtonStyle?: object;
  searchIconStyle?: object;
  filterText?: string;
  closeText?: string;
  placeholderTextColor?: string;
}

const CountryModal: React.FC<CountryModalProps> = memo(
  ({
    visible,
    countries,
    onSelect,
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
  }) => {
    const renderItem = useCallback(
      ({ item }: { item: Country }) => (
        <TouchableWithoutFeedback onPress={() => onSelect(item.code)}>
          <View style={[styles.countryModalStyle, modalContainer]}>
            <Text style={[styles.modalFlagStyle, modalFlagStyle]}>
              {item.flag}
            </Text>
            <View style={styles.modalCountryItemContainer}>
              <Text
                style={[
                  styles.modalCountryItemCountryNameStyle,
                  modalCountryItemCountryNameStyle,
                ]}
              >
                {item[lang.toLowerCase() as keyof Country] || item.en}
              </Text>
              <Text
                style={[
                  styles.modalCountryItemCountryDialCodeStyle,
                  modalCountryItemCountryDialCodeStyle,
                ]}
              >
                {`  ${item.dialCode}`}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ),
      [
        onSelect,
        lang,
        modalContainer,
        modalFlagStyle,
        modalCountryItemCountryNameStyle,
        modalCountryItemCountryDialCodeStyle,
      ]
    );

    return (
      <Modal animationType="slide" transparent={false} visible={visible}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={[styles.modalContainer, modalContainer]}>
            <View style={styles.filterInputStyleContainer}>
              <TextInput
                autoCapitalize="words"
                autoFocus
                onChangeText={filterCountries}
                placeholder={filterText || "Filter"}
                style={[styles.filterInputStyle, filterInputStyle]}
                placeholderTextColor={placeholderTextColor || "grey"}
              />
              <Text style={[styles.searchIconStyle, searchIconStyle]}>🔍</Text>
            </View>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={renderItem}
              initialNumToRender={10}
              maxToRenderPerBatch={20}
              windowSize={5}
            />
          </View>
          <TouchableOpacity
            onPress={() => onSelect("")}
            style={[styles.closeButtonStyle, closeButtonStyle]}
          >
            <Text style={styles.closeTextStyle}>{closeText || "CLOSE"}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  }
);

export default CountryModal;
