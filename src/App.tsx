
import React from 'react';
import './App.css';
import KeenASR from 'keenasr-web';
await KeenASR.prepare(); // this method is async, so make sure to await it


export default function App() {
  // Define the function that will be called when the button is clicked
  const handleButtonClick = async () => {
    const apiUrl = 'https://api.cartesia.ai/tts/bytes';
    const apiKey = '6622b0e2-7f46-448f-8c1e-13ba27abc5cf';  // Replace with your actual API key

    const payload = {
      transcript: "Welcome to your first lesson - Multiplication as Equal Groups",
      model_id: "sonic-english",
      voice: {
        mode: "id",
        id: "a0e99841-438c-4a64-b679-ae501e7d6091",
      },
      output_format: {
        container: "raw",
        encoding: "pcm_f32le",
        sample_rate: 44100,
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Cartesia-Version': '2024-06-10',
          'X-API-Key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the audio data as ArrayBuffer
      const audioData = await response.arrayBuffer();
      // Processing the PCM data manually
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const numberOfChannels = 1;
      const sampleRate = 44100; // Ensure this matches the sample_rate in the payload
      // Create a Float32Array from the ArrayBuffer
      const audioBuffer = new Float32Array(audioData);
      // Create an empty AudioBuffer
      const myAudioBuffer = audioCtx.createBuffer(numberOfChannels, audioBuffer.length / numberOfChannels, sampleRate);
      // Copy the PCM data into the AudioBuffer's channel data
      myAudioBuffer.copyToChannel(audioBuffer, 0);
      // Create a buffer source node from the AudioBuffer
      const source = audioCtx.createBufferSource();
      source.buffer = myAudioBuffer;
      source.connect(audioCtx.destination);
      source.start(0);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main>
      SIMILI
      <br />
      <button onClick={handleButtonClick}>Voice Sample</button>
    </main>
  );
}