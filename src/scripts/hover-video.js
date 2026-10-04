document.querySelectorAll("[data-hover-video]").forEach((card) => {
  const video = card.querySelector("video");
  const link = card.querySelector(".media-link");
  if (!video) return;

  video.muted = true;
  video.playsInline = true;

  const setPlaying = (playing) => {
    card.classList.toggle("is-playing", playing);
  };

  const play = async () => {
    if (!video.paused) {
      setPlaying(true);
      return;
    }
    try {
      await video.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const pause = (rewind = false) => {
    video.pause();
    if (rewind && video.readyState) video.currentTime = 0;
    setPlaying(false);
  };

  const playOnHover = () => {
    play();
  };

  card.addEventListener("mouseenter", playOnHover);
  card.addEventListener("mouseover", playOnHover);
  card.addEventListener("pointerenter", playOnHover);
  card.addEventListener("mouseleave", () => pause(true));
  card.addEventListener("pointerleave", () => pause(true));
  link?.addEventListener("focus", play);
  link?.addEventListener("blur", () => pause(true));
});
