import {
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import Logo from "../../assets/svg/images/logo.png";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { signIn } from "../../lib/appwrite";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isemailtyping, setIsEmailTyping] = useState(false);
  const [password, setPassword] = useState("");
  const [isvalidPassword, setIsValidPassword] = useState(true);
  const [ispasswordtyping, setIsPasswordTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleLogin = async () => {
    if(!email || !password){
      Alert.alert('Error', 'Please fill in all the fields')
    }
    setIsSubmitting(true)
    
    try {
      await signIn(email, password)
      router.replace('/HomeScreen')
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

  return (
    <SafeAreaView className=" bg-primary h-full items-center justify-center">
      <StatusBar barStyle={"light-content"}/>
        <View className="justify-center items-center flex-1 w-[90%] h-full">
          
          <KeyboardAvoidingView
            className="w-full flex-1 h-full items-center justify-center"
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <Image
            source={Logo}
            className=" h-[34px] w-[115px] self-start my-10"
          />
            <Text className=" font-pbold text-start self-start text-white text-2xl">
              Sign in
            </Text>

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
                cursorColor={'#FF8E01'}
              />

            </View>
            {!isValidEmail && isemailtyping ? (
              <Text className="text-red-600 m-2 self-start">Please enter Valid Email</Text>
            ) : null}
            <Text className="text-gray-100 self-start text-base my-3">Password</Text>
            <View className="rounded-2xl border-2 flex-row border-black-100 bg-black-100 h-16 w-full items-center justify-evenly focus:border-secondary">
              <TextInput
                className="w-[90%] h-full text-base px-4 text-white"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setIsPasswordTyping(true);
                }}
                keyboardType="default"
                cursorColor={'#FF8E01'}
                secureTextEntry={!isVisible}
              />
              {
                isVisible? (<TouchableOpacity
                  onPress={()=> setIsVisible(false)}
                >
                  <Image source={require('../../assets/svg/icons/eye.png')} className=" h-5 w-5"/>
                </TouchableOpacity>) : (<TouchableOpacity onPress={() => setIsVisible(true)}>
                  <Image source={require('../../assets/svg/icons/eye-hide.png')} className=" h-5 w-5"/>
                </TouchableOpacity>)
              }
            </View>
            {!isvalidPassword && ispasswordtyping ? (
              <Text className="text-red-600 m-2 self-start">
                Please enter Valid Password
              </Text>
            ) : null}
              <CustomButton
                name={"Log In"}
                handlePress={handleLogin}
                textstyle={"font-pbold"}
              />
            <View className="items-center justify-center flex-row">
              <Text className="font-pmedium text-[#CDCDE0]">
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => router.navigate("RegisterScreen")}>
                <Text className="text-secondary-200 font-pmedium"> Signup</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
