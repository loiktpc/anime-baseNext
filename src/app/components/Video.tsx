

const YouTubeVideo = ({ videoId } : any) => {
  return (
    <div className="youtube-video">
      <iframe
        width="1030"
        height="579"
        src={videoId}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeVideo;
