import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import secure from "../secure.json";
import { Alert } from "react-native";
import { router } from "expo-router";

const supabaseUrl = secure.SUPABASE_URL;
const supabaseAnonKey = secure.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const SignIn = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.name, error.message);
    } else {
      Alert.alert('Success', 'You are Logged In');
    }
  } catch (error) {
    Alert.alert(error)
  }
};

export const SignUp = async (username, email, password) => {
  try {
    const {data, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName: username
        }
      }
    });

    if(error) {
      Alert.alert(error.name, error.message)
    } else {
      Alert.alert('Success', 'You are Registered!');
      router.navigate('/LoginScreen');
    }
  } catch (error) {
    
  }
} 
