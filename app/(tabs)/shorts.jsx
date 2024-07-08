import React, { useRef, useState, useEffect } from 'react';
import { View, Button, StyleSheet, SafeAreaView } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';


const videoSource = 'https://vdbhuonzlrtwniochfsn.supabase.co/storage/v1/object/public/user-uploads/vivekjaglan34@gmail.com/1720438564712.mp4';


const shorts = () => {
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    const subscription = player.addListener('playingChange', (isPlaying) => {
      setIsPlaying(isPlaying);
    });
    return () => {
      subscription.remove();
    };
  }, [player]);

  return (
    <SafeAreaView className="flex-1 bg-dark-black-100 dark:bg-black h-full w-full items-center justify-center"> 
        <View className="flex-1 items-center justify-center">
           <VideoView
        ref={ref}
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
            setIsPlaying(!isPlaying);
          }}
        />
      </View>
        </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});

export default shorts;