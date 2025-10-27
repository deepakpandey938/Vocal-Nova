
import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist'; // Import pdfjs-dist package
import { saveAs } from 'file-saver'; // Import file-saver
import 'pdfjs-dist/build/pdf.worker.entry'; // Import the worker entry point for PDF.js

// Set the workerSrc for pdfjsLib
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function Pdftototex() {
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfText, setPdfText] = useState('');
    const [audioFileName, setAudioFileName] = useState('');
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setPdfFile(file);
      }
    };
  
    const extractTextFromPDF = async () => {
      if (!pdfFile) return;
  
      const reader = new FileReader();
      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        let text = '';
  
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const content = await page.getTextContent();
          const strings = content.items.map((item) => item.str);
          text += strings.join(' ') + '\n';
        }
  
        setPdfText(text);
        convertTextToAudio(text);
      };
  
      reader.readAsArrayBuffer(pdfFile);
    };
  
    const convertTextToAudio = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      const synth = window.speechSynthesis;
  
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const destination = audioContext.createMediaStreamDestination();
      const mediaRecorder = new MediaRecorder(destination.stream);
      const chunks = [];
  
      utterance.onstart = () => {
        mediaRecorder.start();
      };
  
      utterance.onend = () => {
        mediaRecorder.stop();
      };
  
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
  
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mp3' });
        const fileName = audioFileName || 'output.mp3';
        saveAs(blob, fileName);
      };
  
      synth.speak(utterance);
    };
    return (
        <div>
        <h1>PDF to Audio Converter</h1>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Enter audio file name (optional)"
          value={audioFileName}
          onChange={(e) => setAudioFileName(e.target.value)}
        />
        <button onClick={extractTextFromPDF}>Convert to Audio</button>
        {pdfText && (
          <div>
            <h2>Extracted Text</h2>
            <textarea value={pdfText} readOnly rows="10" cols="50"></textarea>
          </div>
        )}
      </div>
  )
}

export default Pdftototex
