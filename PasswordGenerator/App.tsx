import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import * as yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function PasswordGenerator() {
  const PasswordSchema = yup.object().shape({
    passwordLength: yup
      .number()
      .min(6, 'minimum 6 characters are required')
      .max(16, 'maximum 16 characters are allowded')
      .required('length is required'),
  });
  const [passwordLength, setPasswordLength] = useState();
  const [lowercase, isLowercase] = useState(false);
  const [uppercase, isUppercase] = useState(false);
  const [numbers, isNumbers] = useState(false);
  const [symbols, isSymbols] = useState(false);
  const generatePassword = (passwordLength: number) => {};
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.mainSafeAreaView]}>
        <View style={[styles.mainView]}>
          <View style={[styles.headingTextContainer]}>
            <Text style={[styles.headingText]}>Password Generator</Text>
          </View>
          <View
            style={[
              styles.InputContainerBox,
              // styles.border
            ]}
          >
            <View
              style={[
                styles.inputContainer,
                // styles.border
              ]}
            >
              <Text style={styles.inputHeading}>Password Length</Text>
              <TextInput
                placeholder="Ex. 8"
                style={{ borderWidth: 2, width: '20%' }}
                keyboardType={'numeric'}
                value={passwordLength}
                onChangeText={() => setPasswordLength}
              />
            </View>
            <View style={[styles.inputContainer]}>
              <Text style={[styles.inputHeading]}>
                Include Lowercase Letters
              </Text>
              <BouncyCheckbox
                style={[styles.radioButton]}
                fillColor="#2ecc71"
                onPress={() => {
                  isLowercase(!lowercase);
                }}
              />
            </View>
            <View style={[styles.inputContainer]}>
              <Text style={[styles.inputHeading]}>
                Include Upperrcase Letters
              </Text>
              <BouncyCheckbox
                style={[styles.radioButton]}
                fillColor="#2ecc71"
                onPress={() => isUppercase(!uppercase)}
              />
            </View>
            <View style={[styles.inputContainer]}>
              <Text style={[styles.inputHeading]}>Include Numbers</Text>
              <BouncyCheckbox
                style={[styles.radioButton]}
                fillColor="#2ecc71"
                onPress={() => isNumbers(!numbers)}
              />
            </View>
            <View style={[styles.inputContainer]}>
              <Text style={[styles.inputHeading]}>Include Symbols</Text>
              <BouncyCheckbox
                style={[styles.radioButton]}
                fillColor="#2ecc71"
                onPress={() => isSymbols(!symbols)}
              />
            </View>
            <View style={[styles.buttonsContainer]}>
              <TouchableOpacity
                style={[styles.buttons, { backgroundColor: '#4885caff' }]}
              >
                <Text style={[styles.inputHeading, styles.buttonHeadings]}>
                  Generate
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttons, { backgroundColor: '#e3ecf1e7' }]}
              >
                <Text style={[styles.inputHeading, styles.buttonHeadings]}>
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  border: {
    borderWidth: 2,
    borderColor: 'red',
  },
  mainSafeAreaView: { flex: 1, backgroundColor: '#000000c1' },
  mainView: { padding: 5, flex: 1 },
  headingTextContainer: { margin: 6 },
  headingText: { color: '#fff', fontSize: 38, fontWeight: '500' },
  InputContainerBox: { flex: 1, marginTop: 8 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 9,
  },
  inputHeading: { color: '#fff', fontSize: 16 },
  radioButton: {
    height: 34,
    width: 34,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 12,
  },
  buttons: {
    borderRadius: 10,
    marginHorizontal: 8,
    height: 50,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonHeadings: {},
});
