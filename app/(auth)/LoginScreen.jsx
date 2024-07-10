import {
  SafeAreaView,
  Image,
  StatusBar,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import YoutubeLogo from "../../assets/logos/yticontext.svg";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { supabase } from "../../utils/supabase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isemailtyping, setIsEmailTyping] = useState(false);
  const [password, setPassword] = useState("");
  const [isvalidPassword, setIsValidPassword] = useState(true);
  const [ispasswordtyping, setIsPasswordTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);



  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        Alert.alert(error.name, error.message);
      } else {
        Alert.alert('Success', 'You are Logged In');
        router.replace('/(tabs)');
        router.canGoBack(false);
      }
    } catch (error) {
      Alert.alert(error)
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    setIsValidEmail(validateEmail(email));
  }, [email]);

  useEffect(() => {
    setIsValidPassword(password.length >= 8)
  }, [password]);

  return (
    <SafeAreaView className="h-full bg-dark-black-100 dark:bg-dark-black-600 items-center justify-center">
      <StatusBar barStyle={"light-content"} />
      <View className="justify-center items-center flex-1 w-[90%] h-full">
        <KeyboardAvoidingView
          className="w-full flex-1 h-full items-center justify-center"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <YoutubeLogo height={125} width={175} />
          <Text className=" font-Rbold text-dark-black-600 dark:text-dark-black-100 text-xl text-center">
            Sign in
          </Text>

          <View className="w-full items-center justify-center my-6">
          <Text className="text-dark-black-200 text-base my-3 self-start font-Rmedium">Email</Text>
        <View className="rounded-2xl  border-2 border-dark-black-500 bg-dark-black-500 h-16 w-full items-center justify-center focus:border-secondary">
          <TextInput
            className="w-full h-full text-base px-4 text-white font-Rmedium"
            value={email}
            autoCapitalize="none"
            onChangeText={(text) => {
              setEmail(text);
              setIsEmailTyping(true);
            }}
            keyboardType="email-address"
            cursorColor={"#FF8E01"}
          />
        </View>
        {!isValidEmail && isemailtyping ? (
          <Text className="text-red-600 m-2 self-start font-Rregular text-xs">
            Please enter Valid Email
          </Text>
        ) : null}
        <Text className="text-dark-black-200 text-base my-3 self-start font-Rmedium">
          Password
        </Text>
        <View className="rounded-2xl  border-2 border-dark-black-500 bg-dark-black-500 h-16 w-full items-center flex-row justify-center focus:border-dark-black-300">
          <TextInput
            className="w-[90%] h-full text-base px-4 text-white font-Rmedium"
            value={password}
            autoCapitalize="none"
            onChangeText={(text) => {
              setPassword(text);
              setIsPasswordTyping(true);
            }}
            keyboardType="default"
            secureTextEntry={!isVisible}
            cursorColor={"#FF8E01"}
          />
          {isVisible ? (
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Image
                source={require("../../assets/icons/eye.png")}
                className=" h-5 w-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Image
                source={require("../../assets/icons/eye-hide.png")}
                className=" h-5 w-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
        {!isvalidPassword && ispasswordtyping ? (
              <Text className="text-red-600 m-2 self-start text-xs font-Rregular">
                Please enter Valid Password
              </Text>
            ) : null}
        
            <CustomButton
              name={"Sign In"}
              handlePress={handleLogin}
              textstyle={"font-Rbold text-lg"}
              submittingStatus={isSubmitting}
            />
            <View className="items-center justify-center flex-row">
              <Text className="font-Rmedium text-[#CDCDE0]">
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => router.navigate("RegisterScreen")}
              >
                <Text className="text-dark-black-400 font-Rmedium">
                  {" "}
                  Signup
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
