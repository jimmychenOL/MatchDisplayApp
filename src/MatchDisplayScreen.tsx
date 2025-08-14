import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
  Alert,
} from 'react-native';

const MatchDisplayScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [inputText, setInputText] = useState('');

  const handleButtonPress = () => {
    if (inputText.trim()) {
      Alert.alert('輸入內容', `你輸入了: ${inputText}`);
    } else {
      Alert.alert('提示', '請輸入一些文字');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
        Match Display 畫面
      </Text>
      
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
          請輸入文字：
        </Text>
        <TextInput
          style={[
            styles.textInput,
            {
              color: isDarkMode ? '#FFFFFF' : '#000000',
              borderColor: isDarkMode ? '#FFFFFF' : '#000000',
            }
          ]}
          placeholder="在這裡輸入..."
          placeholderTextColor={isDarkMode ? '#888888' : '#666666'}
          value={inputText}
          onChangeText={setInputText}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>按我</Text>
      </TouchableOpacity>

      {inputText ? (
        <View style={[
          styles.displayContainer,
          { backgroundColor: isDarkMode ? '#333333' : '#F0F0F0' }
        ]}>
          <Text style={[styles.displayText, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
            目前輸入：{inputText}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
  },
  textInput: {
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  displayContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
  },
  displayText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MatchDisplayScreen;