import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import YoutubeLogo from "../../assets/logos/yticontext.svg";
import InputField from "../../components/InputField";
import UploadSvg from "../../assets/icons/Upload.svg";
import { VideoView, useVideoPlayer } from "expo-video";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from 'expo-image-picker';
import {supabase} from '../../utils/supabase';
import { router } from "expo-router";

const upload = () => {
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    video_url: "",
    thumbnail_url: "",
    public: true,
  });

  const ref = useRef(null);
  const [playing, setIsPlaying] = useState(false);
  const player = useVideoPlayer(form.video_url, (player) => {
    player.loop = true;
  });

  useEffect(() => {
    const subscription = player.addListener("playingChange", (isPlaying) => {
      setIsPlaying(isPlaying);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'video' ?
        ImagePicker.MediaTypeOptions.Videos : 
        ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if(!result.canceled){
      if (selectType === 'image'){
        setForm({ ...form, thumbnail_url: result.assets[0].uri});
      }

      if (selectType === 'video'){
        setForm({ ...form, video_url: result.assets[0].uri});
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2))
      }, 100)
    }
  };

  const uploadToStorage = async(fileUri, bucketName, folderName) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob(); // Await the blob creation
      const filename = fileUri.split('/').pop();
      const filePath = `${folderName}/${filename}`;

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, blob, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        Alert.alert('Error Uploading to Storage', error.message);
      } else {
        return supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath).data.publicUrl;
      }
    } catch (error) {
      console.error('Error uploading to storage:', error);
      Alert.alert('Error', 'An error occurred while uploading the file.');
    }
  }

  const uploadVideo = async() => {
    setSubmitting(true);
    try {
      if(!form.thumbnail_url || !form.video_url){
        setSubmitting(false);
        return Alert.alert('Please select both video and thumbnail');
      }

      const { data, error } = await supabase.auth.getSession();

      if (error) {
        Alert.alert('Error fetching Session', error.message);
        setSubmitting(false);
      } else {
        console.log('User session fetched!', data.session.user.id);

        const userFolder = data.session.user.email;

        const videoUrl = await uploadToStorage(form.video_url, 'user-uploads', userFolder);
        const thumbnailUrl = await uploadToStorage(form.thumbnail_url, 'user-uploads', userFolder);

        setForm({...form, video_url: videoUrl, thumbnail_url: thumbnailUrl});

        Alert.alert('Success', 'Files uploaded successfully');
        console.log('Video URL:', videoUrl);
        console.log('Thumbnail URL:', thumbnailUrl);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const Upload = async() => {
    setSubmitting(true);
    try {
      if(!form.title || !form.description || !form.thumbnail_url || !form.video_url){
        setSubmitting(false);
        return Alert.alert('Please fill all the fields');
      }

      const { data, error } = await supabase.auth.getSession();

      if (error) {
        Alert.alert('Error fetching Session', error.message);
        setSubmitting(false);
      } else {
        console.log('User session fetched!', data.session.user.id);

        const { data: uploadedData, error: uploadingError } = await supabase
          .from('videos')
          .insert([
            {
              user_id: data.session.user.id,
              title: form.title,
              description: form.description,
              video_url: form.video_url,
              thumbnail_url: form.thumbnail_url,
              creator: data.session.user.user_metadata.fullName
            }
          ]);

        if (uploadingError) {
          Alert.alert('Error uploading the video publicly!', uploadingError.message)
        } else {
          Alert.alert('Success!', 'Video is posted on Youtube');
          router.navigate('profile');
        }
      }

    } catch (error) {
      console.log('Unknown caught error: ', error)
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-dark-black-100 dark:bg-black h-full w-full items-center justify-center">
      <ScrollView className="flex-1 h-full w-full">
        <View className="flex-1 items-center self-center justify-start h-full w-[90%]">
          <YoutubeLogo height={100} width={150} />
          <View className="h-full w-full items-start justify-start space-y-4">
            <Text className="font-Rbold text-2xl self-center mb-10 text-dark-black-100">
              Upload Video
            </Text>

            <Text className="text-dark-black-200 text-base my-3 self-start font-Rmedium">
              Video Title
            </Text>
            <InputField
              placedHolder={"Give your video a catchy title..."}
              fieldTitle={"Video Title"}
              value={form.title}
              setValue={(text) => setForm({ ...form, title: text })}
              type={"default"}
              multiline={false}
              scrollEnabled={false}
            />
            
            <View className="w-full flex-row space-x-2">
              <Text className="text-dark-black-200 text-base my-3 self-start font-Rmedium">
                Description
              </Text>
            </View>
            <InputField
              placedHolder={"Add Description (type @ for tags)"}
              fieldTitle={"Description"}
              value={form.description}
              setValue={(text) => setForm({ ...form, description: text })}
              type={"default"}
              styles={'h-[100]'}
              multiline={true}
              scrollEnabled={true}
            />

            <View className="w-full space-y-2">
              <Text className="text-dark-black-200 text-base my-3 self-start font-Rmedium">
                Upload Video
              </Text>
              <TouchableOpacity className="w-full" activeOpacity={"0.7"} onPress={() => openPicker('video')}>
                {form.video_url ? (
                  <VideoView
                    ref={ref}
                    className="w-full h-64 rounded-2xl"
                    player={player}
                    allowsFullscreen
                    allowsPictureInPicture
                    nativeControls
                    showsTimecodes
                    contentFit="cover"
                  />
                ) : (
                  <View className="w-full h-40 px-4 bg-dark-black-500 rounded-2xl items-center justify-center">
                    <View className="w-14 h-14 border border-dashed border-dark-black-200 items-center justify-center">
                      <UploadSvg height={28} width={28} />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View className="w-full space-y-2">
              <Text className="text-dark-black-200 text-base my-3 self-start font-Rmedium">
                Thumbnail Image
              </Text>
              <TouchableOpacity className="w-full" activeOpacity={"0.7"} onPress={() => openPicker('image')}>
                {form.thumbnail_url ? (
                  <Image
                    source={{ uri: form.thumbnail_url }}
                    className="w-full h-64 rounded-2xl"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-16 px-4 bg-dark-black-500 border-2 border-dark-black-400 flex-row rounded-2xl items-center justify-center space-x-1">
                    <UploadSvg height={20} width={20} />
                    <Text className="text-dark-black-200 text-base my-3 self-center font-Rmedium">
                      Choose a file
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <CustomButton name={'Upload To Storage'} handlePress={uploadVideo} textstyle={'font-Rmedium text-lg text-black'} buttonStyles={'bg-[#5CA4F8]'}/>
            <CustomButton name={'Upload Video'} handlePress={Upload} textstyle={'font-Rmedium text-lg text-black'} buttonStyles={'bg-[#5CA4F8]'}/>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default upload;
