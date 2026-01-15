import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Theme } from '../styles/theme';
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
        Alert.alert('Error', 'Connection failed.');
        console.error(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <View style={styles.headerArea}>
          <Text style={styles.logo}>MSBU Mobile</Text>
          <View style={styles.underline} />
          <Text style={styles.subtitle}>your app fe test app</Text>
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.googleIcon}>G</Text>
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.surface,
  },
  content: {
    flex: 1,
    padding: Theme.spacing.xl,
    justifyContent: 'center',
  },
  headerArea: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontSize: 40,
    fontWeight: '900',
    color: Theme.colors.primary,
    letterSpacing: -1,
  },
  underline: {
    height: 4,
    width: 40,
    backgroundColor: Theme.colors.secondary,
    borderRadius: Theme.radius.round,
    marginTop: 4,
  },
  subtitle: {
    textAlign: 'center',
    color: Theme.colors.textLight,
    marginTop: 15,
    fontSize: 14,
    fontWeight: '500',
  },
  googleButton: {
    backgroundColor: Theme.colors.surface,
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    marginRight: 12,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
    color: Theme.colors.text,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: Theme.colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
