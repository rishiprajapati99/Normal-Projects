import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { TextInput } from 'react-native-paper';
import * as yup from 'yup';
import { Formik } from 'formik';

export default function PasswordGenerator() {
  const generatePassword = (
    passwordLength: number,
    isOnlyLowerCase: boolean,
    isOnlyUpperCase: boolean,
    isNumbers: boolean,
    isSymbols: boolean,
  ) => {
    //the red underLine doesn't cause any issue it is showing because it needs the fixed dataType of the variable(passwordength) as it is a typeScript file(tsx)
    let password = '',
      temp;
    let startNumber = isNumbers ? 48 : 65;
    for (let index = 0; index < passwordLength; index++) {
      temp = String.fromCharCode(
        Math.floor(Math.random() * (122 - startNumber + 1)) + startNumber,
      );
      if (!isSymbols) {
        if (
          temp == '[' ||
          temp == ']' ||
          temp == '\\' ||
          temp == '^' ||
          temp == '_' ||
          temp == '`' ||
          temp == ':' ||
          temp == ';' ||
          temp == '<' ||
          temp == '>' ||
          temp == '=' ||
          temp == '?' ||
          temp == '@'
        ) {
        } else {
          password += temp;
        }
      } else {
        password += temp;
      }
    }
    if (isOnlyLowerCase) password = password.toLowerCase();
    else if (isOnlyUpperCase) password = password.toUpperCase();
    return password;
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.mainSafeAreaView]}>
        <Formik
          initialValues={{
            //all the initial state of the values needs to be written inside initialvalues just like in the useState()
            passwordLength: '',
            isOnlyLowerCase: false,
            isOnlyUpperCase: false,
            isOnlyNumbers: false,
            isSymbols: false,
          }}
          validationSchema={yup.object({
            //all the yup validations are needs to be written inside the validationSchema
            passwordLength: yup
              .number()
              .min(6, 'minimum 6 characters are required')
              .max(16, 'maximum 16 characters are allowded')
              .required('Password length is required'),
          })}
          onSubmit={values => {
            let Generatedpassword = generatePassword(
              Number(values.passwordLength),
              values.isOnlyLowerCase,
              values.isOnlyUpperCase,
              values.isOnlyNumbers,
              values.isSymbols,
            );
            Alert.alert('Password', Generatedpassword);
          }}
        >
          {({ values, setFieldValue, handleSubmit, errors, handleReset }) => {
            //setFieldValue function set the current state of the value just like setValue in useState() . here errors captures the yup validations and display them where we want. and handleReset handle to reset the form value in the UI base.
            return (
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
                      label="Length"
                      style={{ width: '20%' }}
                      keyboardType={'numeric'}
                      value={values.passwordLength}
                      onChangeText={txt => {
                        setFieldValue('passwordLength', txt); //setFieldValue requires atLeast 2 arguments . 1)key(the most imp , it must be exactly same as the initialName we have given in the initalValues . this function recognise by this key that  which state has to be updated by this value) 2)value
                      }}
                    />
                  </View>
                  <View
                    style={[
                      // styles.border,
                      styles.errorMessageContainer,
                    ]}
                  >
                    {errors.passwordLength && (
                      <Text style={{ color: 'red' }}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <View style={[styles.inputContainer]}>
                    <Text style={[styles.inputHeading]}>
                      Only Lowercase Letters
                    </Text>
                    <BouncyCheckbox
                      size={29}
                      isChecked={values.isOnlyLowerCase}
                      style={[styles.radioButton]}
                      fillColor="#2ecc71"
                      onPress={txt => {
                        setFieldValue('isOnlyLowerCase', txt);
                        if (txt) setFieldValue('isOnlyUpperCase', false);
                      }}
                    />
                  </View>

                  <View style={[styles.inputContainer]}>
                    <Text style={[styles.inputHeading]}>
                      Only Upperrcase Letters
                    </Text>
                    <BouncyCheckbox
                      size={29}
                      isChecked={values.isOnlyUpperCase}
                      style={[styles.radioButton]}
                      fillColor="#2ecc71"
                      onPress={txt => {
                        setFieldValue('isOnlyUpperCase', txt);
                        if (txt) setFieldValue('isOnlyLowerCase', false);
                      }}
                    />
                  </View>

                  <View style={[styles.inputContainer]}>
                    <Text style={[styles.inputHeading]}>Include Numbers</Text>
                    <BouncyCheckbox
                      size={29}
                      isChecked={values.isOnlyNumbers} //it takes values as boolean means true or false . as setFieldValue reset the values.isOnlyNumbers = false it gets updateds here so here it becomes false which reset the checckedButton from the UI
                      style={[styles.radioButton]}
                      fillColor="#2ecc71"
                      onPress={txt => setFieldValue('isOnlyNumbers', txt)}
                    />
                  </View>
                  <View style={[styles.inputContainer]}>
                    <Text style={[styles.inputHeading]}>Include Symbols</Text>
                    <BouncyCheckbox
                      size={29}
                      isChecked={values.isSymbols}
                      style={[styles.radioButton]}
                      fillColor="#2ce278ff"
                      onPress={txt => setFieldValue('isSymbols', txt)}
                    />
                  </View>
                  <View style={[styles.buttonsContainer]}>
                    <TouchableOpacity
                      style={[styles.buttons, { backgroundColor: '#164b86ff' }]}
                      onPress={() => {
                        handleSubmit();
                      }}
                    >
                      <Text
                        style={[styles.inputHeading, styles.buttonHeadings]}
                      >
                        Generate
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.buttons, { backgroundColor: '#e3ecf1e7' }]}
                      onPress={handleReset}
                    >
                      <Text
                        style={[styles.inputHeading, styles.buttonHeadings]}
                      >
                        Reset
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>
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
    margin: 7,
  },
  inputHeading: { color: '#fff', fontSize: 16 },
  radioButton: {
    marginRight: 8,
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
  errorMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 9,
  },
});
