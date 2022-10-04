import Video from 'react-native-video';
import { Image } from 'react-native';

export const DisplayImageOrVideo = (fileType, src, style) => {
  if (fileType === 'video') {
    return (
    <Video
      style={style}
      controls={true}
      source={{uri: src}}
      resizeMode="cover"
    />
  )} else {
    return (
    <Image
      style={style}
      source={{uri: src}}
    />
  )}
}