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
import YoutubeLogo from '../../assets/logos/yticontext.svg';
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from '../../utils/supabase';

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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const [isConfirmPassTyping, setIsConfirmPassTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
  useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ avatar, setAvatar ] = useState(null);


  const handleSignup = async () => {
    if(!username || !email || !password){
      Alert.alert('Error', 'Please fill in all the fields');
    }
    setIsSubmitting(true);
    
    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            fullName: username,
          },
        },
      });

      if (signupError) {
        Alert.alert('Error: ', signupError)
      } else {
        const {data: userData,  error: userUploadError } = await supabase
          .from("users")
          .insert(
            { id: data.user.id, email, username: username},
          )
          .select();

        if (userUploadError) {
          Alert.alert('Error Creating User: ', userUploadError);
        } else {

          const {error: profileUploadError} = await supabase
            .from("profiles")
            .insert([
              { user_id: userData[0].id, name: username, email: email }
            ]);

            if (profileUploadError) {
              Alert.alert('Error Creating Profile:', profileUploadError)
            } else {
              Alert.alert("Success", "Signed up Successfully!!");
              router.navigate("LoginScreen");
            }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    setIsValidEmail(validateEmail(email));
  }, [email]);

  useEffect(() => {
    setIsValidPassword(password.length >= 8)
  }, [password]);

  useEffect(() => {
    setIsValidUsername( username.length >= 4)
  }, [username]);

  useEffect(() => {
    setIsValidConfirmPassword( confirmPassword === password )
  }, [confirmPassword, password])

  return (
    <SafeAreaView className="h-full bg-dark-black-100 dark:bg-dark-black-600 items-center justify-center">
      <StatusBar barStyle={"light-content"} />
      <View className="flex-1 items-center justify-center w-[90%] h-full">
        <YoutubeLogo height={125} width={175}/>
        <Text className=" font-Rbold text-dark-black-600 dark:text-dark-black-100 text-xl text-center">
          Sign Up
        </Text>
        <Text className="text-dark-black-200 text-base my-3 self-start font-Rmedium">
          Username
        </Text>
        <View className="rounded-2xl  border-2 border-dark-black-500 bg-dark-black-500 h-16 w-full items-center justify-center focus:border-dark-black-300">
          <TextInput
            className="w-full h-full px-4 text-white text-base font-Rmedium"
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
          <Text className="text-red-600 m-2 self-start font-Rregular text-xs">
            Please enter valid username
          </Text>
        ) : null}
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
        <Text className="text-dark-black-200 text-base my-3 self-start font-Rmedium">
          Confirm Password
        </Text>
        <View className="rounded-2xl  border-2 border-dark-black-500 bg-dark-black-500 h-16 w-full items-center flex-row justify-center focus:border-dark-black-300">
          <TextInput
            className="w-[90%] h-full text-base px-4 text-white font-Rmedium"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setIsConfirmPassTyping(true);
            }}
            keyboardType="default"
            secureTextEntry={!isConfirmPasswordVisible}
            cursorColor={"#FF8E01"}
          />
          {isConfirmPasswordVisible ? (
            <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(false)}>
              <Image
                source={require("../../assets/icons/eye.png")}
                className=" h-5 w-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(true)}>
              <Image
                source={require("../../assets/icons/eye-hide.png")}
                className=" h-5 w-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
        {!isValidConfirmPassword && isConfirmPassTyping ? (
              <Text className="text-red-600 m-2 self-start text-xs font-Rregular">
                Please match password
              </Text>
            ) : null}
        <CustomButton
          name={"Register"}
          textstyle={"font-Rbold text-lg"}
          handlePress={handleSignup}
          submittingStatus={isSubmitting}
        />
        <View className="items-center justify-center flex-row">
          <Text className="font-Rmedium text-[#CDCDE0]">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.navigate("LoginScreen")}>
            <Text className="text-dark-black-400 font-Rmedium"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
