import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const MusicSplitter = () => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ddd",
      progressColor: "#2196f3",
      height: 200,
      responsive: true,
    });

    const handleSpacebarPress = (e) => {
      if (e.code === "Space") {
        togglePlayPause();
      }
    };

    document.addEventListener("keydown", handleSpacebarPress);

    return () => {
      document.removeEventListener("keydown", handleSpacebarPress);
      if (wavesurfer.current) wavesurfer.current.destroy();
    };
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      wavesurfer.current.load(objectUrl);
    } else {
      console.error("No file selected or unsupported format.");
    }
  };

  const togglePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying((prev) => !prev);
    }
  };

  return (
    <div>
      <h1>Music Splitter</h1>
      <p>Upload an MP3 file to get started.</p>
      <input type="file" accept="audio/*" onChange={handleFileUpload} />
      <div
        ref={waveformRef}
        style={{
          width: "100%",
          height: "200px",
          margin: "20px 0",
          backgroundColor: "#f4f4f4",
        }}
      ></div>
      <button onClick={togglePlayPause}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default MusicSplitter;
