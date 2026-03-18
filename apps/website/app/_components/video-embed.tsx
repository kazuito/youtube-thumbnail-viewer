interface VideoEmbedProps {
  videoId: string;
}

export function VideoEmbed({ videoId }: VideoEmbedProps) {
  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden bg-muted">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
