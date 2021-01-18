import React, { useState, useCallback, useEffect } from "react";
import { Button, View, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import axios from "axios";

export default function Video(props) {
  const malId = props.route.params.malId
  const [playing, setPlaying] = useState(false);
  const [videoId, setVideoId] = useState('');

  const fetchData = async (malId) => {
    const result = await axios.get(`https://api.jikan.moe/v3/anime/${malId}`)
    .then(res => {
        const trailerUrl = res.data.trailer_url
        setVideoId(trailerUrl.slice(30, 41))
    })
    .catch(err => console.log('ini error ', err))
}

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    fetchData(malId)
  }, [])

  return (
    <View>
      <YoutubePlayer
        height={250}
        play={playing}
        videoId={videoId}
      />
    </View>
  );
}