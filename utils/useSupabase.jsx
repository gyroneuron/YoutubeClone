import { supabase } from "./supabase";
import { Alert } from "react-native";


export const fetchVideos = async ({tableName}) => {
    try {

      const { data, error } = await supabase
        .from(tableName)
        .select();

      if (error) {
        Alert.alert('Error fetching Videos', error.message);
      } else {
        console.log('Success', 'Videos fetched successfully');
        return data;
      }
    } catch (error) {
      console.log(error);
    }
};


export const fetchUserVideos = async({userId, tableName}) => {
    try {
        const { data, error } = await supabase
        .from(tableName)
        .select()
        .eq('user_id', userId);

        if (error) {
            Alert.alert('Error fetching Videos of:', error.message);
          } else {
            console.log('Success', 'Videos fetched successfully');
            return data;
          }
    } catch (error) {
        console.log(error)
    }
};

export const UserSignOut = async() => {
  try {
    const { error } = await supabase.auth.signOut()

    if(error){
      Alert.alert('Logout Error', error.message);
    }
  } catch (error) {
    console.log(error);
  }
};
