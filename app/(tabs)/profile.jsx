import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { supabase } from "../../utils/supabase";
import { useGlobalContext } from "../../provider/GlobalProvider";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import MenuButton from "../../components/MenuButton";
import { decode } from "base64-arraybuffer";
import { UserSignOut } from "../../utils/useSupabase";
import { fetchProfile } from '../../utils/useSupabase';

const profile = () => {
  const { profileData, isLoggedIn, isLoading, fetchProfile } = useGlobalContext();

  const [avatarUri, setAvatarUri] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [videoNo, setVideoNo] = useState(0);

  const timestamp = profileData?.created_at;
  const year = timestamp ? new Date(timestamp).getFullYear() : null;

  const handleLogout = async () => {
    await UserSignOut();
    router.push("LoginScreen");
    router.canGoBack(false);
  };


  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      
      const fetchVideoNumber = async () => {
        try {
          const { count, error } = await supabase
            .from("videos")
            .select("*", { head: true, count: "exact" })
            .eq("user_id", profileData.user_id);

          if (error) {
            Alert.alert(error.message);
          } else {
            setVideoNo(count);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchVideoNumber();
    }
  }, [isLoggedIn, isLoading, profileData?.user_id]);

  const openPicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0];
        setAvatarUri(selectedImage.uri);
        setAvatar(selectedImage);

        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          throw sessionError;
        }

        const userFolder = data.session.user.email;
        await uploadToStorage(selectedImage, "avatars", userFolder);
      } else {
        setTimeout(() => {
          Alert.alert("Image picked", JSON.stringify(result, null, 2));
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadToStorage = async (file, bucketName, folderName) => {
    setUploading(true);
    try {
      const contentType = "image/png";
      const filePath = `${folderName}/${new Date().getTime()}.png`;
      const base64 = await FileSystem.readAsStringAsync(file.uri, {
        encoding: "base64",
      });

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, decode(base64), {
          contentType,
        });

      if (error) {
        Alert.alert("Error Uploading to Storage", error.message);
        throw error;
      } else {
        const avatarPublicUrl = supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath).data.publicUrl;

        setAvatarUri(avatarPublicUrl);

        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();
        if (sessionError) {
          throw sessionError;
        }

        const userId = sessionData.session.user.id;

        const { error: updateToVideoTableError } = await supabase
          .from("videos")
          .update({ avatar: avatarPublicUrl })
          .eq("user_id", userId);

        const { error: uploadToProfileTableError } = await supabase
          .from("profiles")
          .update({ avatar: avatarPublicUrl })
          .eq("user_id", userId);

        if (updateToVideoTableError) {
          throw updateToVideoTableError;
        }

        if (uploadToProfileTableError) {
          throw uploadToProfileTableError;
        }

        Alert.alert("Avatar Updated!");
        await fetchProfile(userId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-dark-black-100 dark:bg-dark-black-600">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }



  return (
    <SafeAreaView className="h-full w-full flex-1 bg-dark-black-100 dark:bg-dark-black-600 items-center justify-center">
      {isLoggedIn? (
        <ScrollView className="flex-1 h-full w-[95%]">
          <View className="h-full w-full flex-1 p-2 items-center justify-center space-y-4">
            <View className="h-full w-full flex-1 p-5 items-start justify-center mt-3 bg-dark-black-500 rounded-2xl">
              <View className="w-full items-center justify-between flex-row space-x-3 flex-1">
                {profileData?.avatar ? (
                  <View className="h-24 w-24 rounded-full border-2 p-2 border-dark-black-100 items-center justify-center">
                    <Image
                      source={{ uri: profileData?.avatar }}
                      resizeMode="contain"
                      className="h-full w-full rounded-full"
                    />
                    {uploading ? (
                      <ActivityIndicator
                        className="absolute right-13 bottom-2"
                        size={30}
                        color={"yellow"}
                      />
                    ) : (
                      <TouchableOpacity
                        className="absolute right-13 bottom-2"
                        onPress={openPicker}
                      >
                        <MaterialIcons
                          name="add-a-photo"
                          size={26}
                          color={"#ffffff"}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <View className="h-24 w-24 rounded-full border-2 p-2 border-dark-black-100 items-center justify-center">
                    <Image
                      source={{
                        uri: "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1720326349~exp=1720329949~hmac=ce9bdf5474aa1c797ca7f6f9cbfdd3980482279e9a7b6f1c442d74e36a00deb3&w=740",
                      }}
                      resizeMode="contain"
                      className="h-full w-full rounded-full"
                    />

                    {uploading ? (
                      <ActivityIndicator
                        className="absolute right-13 bottom-2"
                        size={30}
                        color={"yellow"}
                      />
                    ) : (
                      <TouchableOpacity
                        className="absolute right-13 bottom-2"
                        onPress={openPicker}
                      >
                        <MaterialIcons
                          name="add-a-photo"
                          size={26}
                          color={"#ffffff"}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                <View className="w-full items-start justify-center">
                  <Text className="text-center text-3xl text-white">
                    {profileData?.name}
                  </Text>
                  <Text className="text-center text-sm text-dark-black-100">
                    User Since:
                    <Text className="text-center text-sm font-medium text-dark-black-300">
                      {year}
                    </Text>
                  </Text>
                  <Text className="text-center text-sm font-medium text-dark-black-100">
                    Videos:{" "}
                    <Text className="text-center text-sm font-bold text-dark-black-300">
                      {videoNo}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
            <View className="h-10 w-full rounded-2xl border-2 p-2 bg-dark-black-500 items-center justify-center">
              <TouchableOpacity
                className="w-full h-full rounded-2xl items-center flex-row justify-center space-x-2 my-2"
              >
                <Image source={require("../../assets/icons/PNG/User_Shield.png")} className="h-5 w-5" />
                <Text className="font-Rmedium text-base text-dark-black-100">
                  {profileData?.email}
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView className="w-full h-full flex-1">
              <MenuButton
                name={"Your Channel"}
                icon={require("../../assets/icons/PNG/User.png")}
              />
              <MenuButton
                name={"Your Videos"}
                icon={require("../../assets/icons/PNG/Play.png")}
              />
              <MenuButton
                name={"Downloads"}
                icon={require("../../assets/icons/PNG/Download.png")}
              />
              <MenuButton
                name={"Your Movies"}
                icon={require("../../assets/icons/PNG/Movie.png")}
              />
              <MenuButton
                name={"Get Youtube Premium"}
                icon={require("../../assets/icons/PNG/Youtube.png")}
              />

              <MenuButton
                name={"Use YouTube signed out"}
                icon={require("../../assets/icons/PNG/Login.png")}
                handlePress={() => handleLogout()}
              />
              <MenuButton
                name={"Settings"}
                icon={require("../../assets/icons/PNG/Settings.png")}
              />
            </ScrollView>
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 h-full w-full items-center justify-center space-y-5">
          <View className="h-40 w-40 items-center justify-center">
            <Octicons name="file-directory" size={100} color={"grey"} />
          </View>
          <Text className="font-Rbold text-dark-black-100 text-xl">
            Enjoy Your favourite videos
          </Text>
          <Text className="font-Rmedium text-dark-black-300 text-sm">
            Sign in to access videos that you've liked or saved
          </Text>
          <CustomButton
            name={"Sign in"}
            textstyle={"font-Rbold text-lg text-dark-black-600"}
            buttonStyles={"bg-[#5CA4F8] w-[50%] rounded-3xl"}
            handlePress={() => {
              router.replace("LoginScreen");
              router.canGoBack(false);
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default profile;
