import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import YoutubeLogo from '../assets/logos/yticontext.svg';
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isUsernameTyping, setIsUsernameTyping] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isemailtyping, setIsEmailTyping] = useState(false);
  const [password, setPassword] = useState("");
  const [isvalidPassword, setIsValidPassword] = useState(true);
  const [ispasswordtyping, setIsPasswordTyping] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSignup = async () => {
    if(!username || !email || !password){
      Alert.alert('Error', 'Please fill in all the fields')
    }
    setIsSubmitting(true)
    
    try {
      const result = await createUser(email, password, username)
      router.replace('LoginScreen')
    } catch (error) {
      Alert.alert('Error', error.message
      )
      setIsSubmitting(false)
    }
  };

  useEffect(() => {
    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    };

    setIsValidEmail(validateEmail(email));
  }, [email]);

  useEffect(() => {
    const validatePassword = (password) => {
      return password.length >= 8;
    };

    setIsValidPassword(validatePassword(password));
  }, [password]);

  useEffect(() => {
    const validateUsername = (username) => {
      return username.length >= 4;
    };

    setIsValidUsername(validateUsername(username));
  }, [username]);

  return (
    <SafeAreaView className="h-full bg-primary items-center justify-center">
      <StatusBar barStyle={"light-content"} />
      <View className="flex-1 items-center justify-center w-[90%] h-full">
        <YoutubeLogo height={50} width={100}/>
        <Text className=" font-pbold text-white text-xl self-start">
          Sign Up
        </Text>
        <Text className="text-gray-100 text-base my-3 self-start">
          Username
        </Text>
        <View className="rounded-2xl  border-2 border-black-100 bg-black-100 h-16 w-full items-center justify-center focus:border-secondary">
          <TextInput
            className="w-full h-full px-4 text-white text-base"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setIsUsernameTyping(true);
            }}
            keyboardType="default"
            cursorColor={"#FF8E01"}
          />
        </View>
        {!isValidUsername && isUsernameTyping ? (
          <Text className="text-red-600 m-2 self-start">
            Please enter valid username
          </Text>
        ) : null}
        <Text className="text-gray-100 text-base my-3 self-start">Email</Text>
        <View className="rounded-2xl  border-2 border-black-100 bg-black-100 h-16 w-full items-center justify-center focus:border-secondary">
          <TextInput
            className="w-full h-full text-base px-4 text-white"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setIsEmailTyping(true);
            }}
            keyboardType="email-address"
            cursorColor={"#FF8E01"}
          />
        </View>
        {!isValidEmail && isemailtyping ? (
          <Text className="text-red-600 m-2 self-start">
            Please enter Valid Email
          </Text>
        ) : null}
        <Text className="text-gray-100 text-base my-3 self-start">
          Password
        </Text>
        <View className="rounded-2xl border-2 border-black-100 bg-black-100 h-16 w-full items-center justify-center flex-row focus:border-secondary">
          <TextInput
            className="w-[90%] h-full text-base px-4 text-white"
            value={password}
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
                source={require("../../assets/svg/icons/eye.png")}
                className=" h-5 w-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsVisible(true)}>
              <Image
                source={require("../../assets/svg/icons/eye-hide.png")}
                className=" h-5 w-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
        {!isvalidPassword && ispasswordtyping ? (
          <Text className="text-red-600 m-2">Please enter Valid Password</Text>
        ) : null}
        <CustomButton
          name={"Sign Up"}
          textstyle={"font-pbold"}
          handlePress={handleSignup}
        />
        <View className="items-center justify-center flex-row">
          <Text className="font-pmedium text-[#CDCDE0]">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.navigate("LoginScreen")}>
            <Text className="text-secondary-200 font-pmedium"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
