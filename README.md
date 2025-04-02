# intl-phone-input

![npm](https://img.shields.io/npm/v/intl-phone-input) ![GitHub license](https://img.shields.io/github/license/muhammada86/intl-phone-input) ![Build Status](https://img.shields.io/github/actions/workflow/status/muhammada86/intl-phone-input/ci.yml)

A scalable, performant React Native component for international phone input with country selection, phone number formatting, and TypeScript support. Built with modern React hooks, this package offers a lightweight, customizable solution for mobile applications requiring phone number input with country code selection.

## Features

- **International Support**: Preloaded with country data (flags, dial codes, masks) for 200+ countries.
- **TypeScript Ready**: Fully typed for a robust development experience.
- **Performance Optimized**: Uses lazy loading, memoization, and efficient rendering.
- **Customizable**: Extensive props for styling and behavior customization.
- **Scalable**: Designed for enterprise-grade applications with modular architecture.

## Installation

Install the package via npm:

```bash
npm install intl-phone-input
```

Ensure you have `react` and `react-native` installed as dependencies in your project:

```bash
npm install react react-native
```

## Usage

Here’s a basic example to get you started:

```tsx
import React from "react";
import { IntlPhoneInput } from "intl-phone-input";
import { View } from "react-native";

const App = () => {
  const handlePhoneChange = (data) => {
    console.log("Phone Data:", data);
  };

  return (
    <View style={{ padding: 20 }}>
      <IntlPhoneInput defaultCountry="US" onChangeText={handlePhoneChange} />
    </View>
  );
};

export default App;
```

This renders a phone input with a country selector (defaulting to the US) and logs the formatted phone data on change.

## Props

The component accepts a variety of props to customize its behavior and appearance. Below is a comprehensive table of all props, including mandatory/optional status, types, defaults, and descriptions.

| Prop Name                              | Type                                                                                        | Mandatory | Default Value                                                                               | Description                                                                                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lang`                                 | `'ru' \| 'lt' \| 'tr' \| 'en'`                                                              | No        | `'en'`                                                                                      | Language for country names in the modal. Options: Russian (`ru`), Lithuanian (`lt`), Turkish (`tr`), English (`en`).                                  |
| `defaultCountry`                       | `string`                                                                                    | No        | `'TR'`                                                                                      | ISO country code (e.g., `'US'`, `'GB'`) to set the initial country. Falls back to Turkey (`TR`) if invalid.                                           |
| `mask`                                 | `string`                                                                                    | No        | Country-specific                                                                            | Custom phone number mask (e.g., `'999-999-9999'`). Overrides the default country mask if provided.                                                    |
| `onChangeText`                         | `(state: PhoneInputState) => void`                                                          | No        | `undefined`                                                                                 | Callback fired on phone number change. Receives an object with `dialCode`, `unmaskedPhoneNumber`, `phoneNumber`, `isVerified`, and `selectedCountry`. |
| `customModal`                          | `(visible: boolean, countries: Country[], onSelect: (code: string) => void) => JSX.Element` | No        | `undefined`                                                                                 | Custom modal component to replace the default country selector modal.                                                                                 |
| `containerStyle`                       | `object`                                                                                    | No        | `{}`                                                                                        | Style object for the main container.                                                                                                                  |
| `flagStyle`                            | `object`                                                                                    | No        | `{ fontSize: 35 }`                                                                          | Style object for the country flag emoji.                                                                                                              |
| `phoneInputStyle`                      | `object`                                                                                    | No        | `{ marginLeft: 5, flex: 1 }`                                                                | Style object for the phone number input field.                                                                                                        |
| `dialCodeTextStyle`                    | `object`                                                                                    | No        | `{}`                                                                                        | Style object for the dial code text next to the flag.                                                                                                 |
| `modalContainer`                       | `object`                                                                                    | No        | `{ paddingTop: 15, paddingLeft: 25, paddingRight: 25, flex: 10, backgroundColor: 'white' }` | Style object for the modal container.                                                                                                                 |
| `filterInputStyle`                     | `object`                                                                                    | No        | `{ flex: 1, paddingTop: 10, paddingBottom: 10, backgroundColor: '#fff', color: '#424242' }` | Style object for the filter input in the modal.                                                                                                       |
| `closeButtonStyle`                     | `object`                                                                                    | No        | `{ padding: 12, alignItems: 'center' }`                                                     | Style object for the modal close button.                                                                                                              |
| `modalCountryItemCountryNameStyle`     | `object`                                                                                    | No        | `{ flex: 1, fontSize: 15 }`                                                                 | Style object for country names in the modal list.                                                                                                     |
| `modalCountryItemCountryDialCodeStyle` | `object`                                                                                    | No        | `{ fontSize: 15 }`                                                                          | Style object for dial codes in the modal list.                                                                                                        |
| `filterText`                           | `string`                                                                                    | No        | `'Filter'`                                                                                  | Placeholder text for the filter input in the modal.                                                                                                   |
| `closeText`                            | `string`                                                                                    | No        | `'CLOSE'`                                                                                   | Text for the modal close button.                                                                                                                      |
| `searchIconStyle`                      | `object`                                                                                    | No        | `{ color: 'black', fontSize: 15, marginLeft: 15 }`                                          | Style object for the search icon in the modal filter.                                                                                                 |
| `disableCountryChange`                 | `boolean`                                                                                   | No        | `false`                                                                                     | Disables country selection if `true`.                                                                                                                 |
| `inputRef`                             | `React.RefObject<TextInput>`                                                                | No        | `undefined`                                                                                 | Ref to programmatically control the phone input (e.g., focus).                                                                                        |
| `placeholderTextColor`                 | `string`                                                                                    | No        | `'grey'`                                                                                    | Color of the placeholder text in the phone input and filter input.                                                                                    |
| `renderAction`                         | `() => JSX.Element`                                                                         | No        | `undefined`                                                                                 | Function to render a custom action element (e.g., a button) next to the input.                                                                        |

### `PhoneInputState` Type

The `onChangeText` callback receives an object with the following properties:

| Property              | Type      | Description                                                            |
| --------------------- | --------- | ---------------------------------------------------------------------- |
| `dialCode`            | `string`  | The selected country’s dial code (e.g., `'+1'`).                       |
| `unmaskedPhoneNumber` | `string`  | The phone number without formatting (e.g., `'1234567890'`).            |
| `phoneNumber`         | `string`  | The formatted phone number (e.g., `'123-456-7890'`).                   |
| `isVerified`          | `boolean` | `true` if the phone number matches the mask length, `false` otherwise. |
| `selectedCountry`     | `Country` | The currently selected country object (includes `flag`, `code`, etc.). |

### `Country` Type

Each country object in the modal has:

| Property   | Type     | Description                                 |
| ---------- | -------- | ------------------------------------------- |
| `ru`       | `string` | Country name in Russian.                    |
| `lt`       | `string` | Country name in Lithuanian.                 |
| `tr`       | `string` | Country name in Turkish.                    |
| `en`       | `string` | Country name in English.                    |
| `flag`     | `string` | Country flag emoji.                         |
| `code`     | `string` | ISO country code (e.g., `'US'`).            |
| `dialCode` | `string` | Country dial code (e.g., `'+1'`).           |
| `mask`     | `string` | Phone number mask (e.g., `'999-999-9999'`). |

## Advanced Example

Here’s an example with custom styling, a custom modal, and action button:

```tsx
import React from "react";
import { IntlPhoneInput } from "intl-phone-input";
import { View, Text, TouchableOpacity, Modal } from "react-native";

const App = () => {
  const customModal = (visible, countries, onSelect) => (
    <Modal visible={visible} animationType="fade">
      <View style={{ padding: 20 }}>
        {countries.map((country) => (
          <TouchableOpacity
            key={country.code}
            onPress={() => onSelect(country.code)}
          >
            <Text>{`${country.flag} ${country.en} (${country.dialCode})`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );

  const renderAction = () => (
    <TouchableOpacity style={{ padding: 10 }}>
      <Text>Verify</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ padding: 20 }}>
      <IntlPhoneInput
        defaultCountry="GB"
        lang="en"
        onChangeText={(data) => console.log(data)}
        containerStyle={{ borderWidth: 1, borderColor: "#ccc" }}
        phoneInputStyle={{ fontSize: 16 }}
        customModal={customModal}
        renderAction={renderAction}
      />
    </View>
  );
};

export default App;
```

## Styling Tips

- Use `containerStyle` to adjust the overall layout (e.g., borders, background).
- Customize the modal with `modalContainer` and related props for a branded look.
- Ensure styles are responsive using `react-native`’s `Dimensions` or percentage-based values.

## Performance Considerations

- The modal is lazy-loaded to reduce initial bundle size.
- `FlatList` in the modal uses optimizations like `initialNumToRender` for smooth scrolling.
- Memoization prevents unnecessary re-renders.

## TypeScript Support

The package is fully typed. Import types as needed:

```tsx
import { IntlPhoneInput, PhoneInputState, Country } from "intl-phone-input";

const handleChange = (data: PhoneInputState) => {
  const country: Country = data.selectedCountry;
  console.log(`${country.flag} ${data.phoneNumber}`);
};
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository: [github.com/muhammada86/intl-phone-input](https://github.com/muhammada86/intl-phone-input).
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## Issues

Found a bug? Report it at [github.com/muhammada86/intl-phone-input/issues](https://github.com/muhammada86/intl-phone-input/issues).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Created by [Muhammad Aqib](https://muhammadaqib.vercel.app/). Connect with me on [GitHub](https://github.com/muhammada86) or via email at [muhammadaqib86@gmail.com](mailto:muhammadaqib86@gmail.com).

---

### Notes

- **Badges**: The npm version, license, and build status badges assume you’ll set up GitHub Actions for CI. Update or remove them based on your setup.
- **Examples**: The basic and advanced examples cover common use cases, making it easy for users to adapt the component.
- **Props Table**: Detailed and structured for quick reference, with defaults and types clearly listed.
- **SEO**: Keywords like "React Native", "phone input", and "TypeScript" are woven into the text for better discoverability.

Save this as `README.md` in your project root, and it’ll be included in the npm package (as specified in `files`). Let me know if you’d like to tweak anything further!
