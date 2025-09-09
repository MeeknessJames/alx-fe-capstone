import { Text, TextInput, View, TouchableOpacity, Image } from "react-native";
import { styles } from "../styles/_join";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { FACEBOOKLOGO, GOOGLELOGO, HEROLOGOGREEN } from "../constants";

export default function SignIn() { 
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.iconsection}>
          <Ionicons name="arrow-back" size={25} />
          <Image source={HEROLOGOGREEN} />
        </View>

        <View style={styles.titleTextGroup}>
          <Text style={styles.titleText}>Sign in to your</Text>
          <Text style={styles.titleText}>Account</Text>
          <Text style={styles.subText}>
            Enter your email and password to sign in.
          </Text>
        </View>

        <View style={styles.formGroup}>
          <View>
            <Text style={styles.formLabel}>Email</Text>
            <TextInput
              keyboardType="email-address"
              style={styles.formControl}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.formLabel}>Password</Text>
            <View style={styles.formPasswordControl}>
              <TextInput style={{ flex: 1 }} secureTextEntry />
              <FontAwesome name="eye-slash" size={24} color="#7E7B7B" />
            </View>
          </View>

          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.dividerGroup}>
          <View style={styles.divider}></View>
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider}></View>
        </View>

        <View style={styles.secondaryButtonGroup}>
          <TouchableOpacity style={styles.secondaryButton}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <Image source={GOOGLELOGO} />
              <Text style={styles.secondaryButtonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <Image source={FACEBOOKLOGO} />
              <Text style={styles.secondaryButtonText}>Continue with Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.signupgroup}>
          <Text style={styles.signupTitleText}>Don’t have an account?</Text>
          <Text style={styles.signupSubTitleText}>Join now</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}