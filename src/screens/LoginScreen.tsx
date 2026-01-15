import React, { useEffect } from 'react';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useAuthStore } from '../store/useAuthStore';

export const LoginScreen = () => {
  const loginWithGoogle = useAuthStore(s => s.loginWithGoogle);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();

      if (accessToken && userInfo.data) {
        loginWithGoogle(
          userInfo.data.user.email ?? '-',
          userInfo.data.user.name ?? '-',
          accessToken,
        );
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled', 'Login Cancelled');
      } else {
        Alert.alert('Error', 'Cannot connect');
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MSBU FE Test</Text>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Sign in with Google 🇬</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  subtitle: { textAlign: 'center', color: '#666', marginBottom: 50 },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { fontWeight: 'bold', fontSize: 16 },
});
