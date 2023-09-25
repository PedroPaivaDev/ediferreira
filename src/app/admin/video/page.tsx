'use client'
import React from 'react';

import listAllFiles from '@/services/firebase';
import handleFileSubmit from '@/helpers/handleFileSubmit';

import Button from '@/components/Button';

const VideoHome = () => {
  const [videoPreviewUrl, setVideoPreviewUrl] = React.useState<string | null>(null);
  const [videoFile, setVideoFile] = React.useState<File | null>(null);
  const [videosDBFiles, setVideosDBFiles] = React.useState<string[]>([]);

  function onVideoSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files || !files[0]) {
      return;
    }
    setVideoFile(files[0]);
    setVideoPreviewUrl(URL.createObjectURL(files[0]));
  }

  React.useEffect(() => {
    listAllFiles('bgVideo', setVideosDBFiles);
  },[]);


  return (
    <form className='w-full flex flex-col justify-start items-start gap-3' onSubmit={handleFileSubmit}>
      <h3 className='text-mood-tertiary'>Vídeo da Página &quot;Home&quot;</h3>
      {videoFile && <Button label='Salvar Novo Vídeo'/>}
      <label htmlFor='home&bgVideo'>Escolha um novo vídeo vertical com no máximo 5 megabytes e que não possua áudio:</label>
      <input
        onChange={onVideoSelected}
        name="home&bgVideo"
        type="file"
        id="home&bgVideo"
        accept="video/*"
        className='text-xs overflow-hidden'
      />
      {videoPreviewUrl && (
        <video id="videoPreview" autoPlay={true} loop={true} muted={true} playsInline={true} preload="auto"
          className='max-w-lg' key={videoPreviewUrl}
        >
          <source src={videoPreviewUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className='flex flex-wrap gap-5'>
        {videosDBFiles.map(video =>
          <video id="videoPreview" autoPlay={true} loop={true} muted={true} playsInline={true} preload="auto"
            className='max-w-lg max-h-halfScreen' key={video}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </form>
  )
}

export default VideoHome;