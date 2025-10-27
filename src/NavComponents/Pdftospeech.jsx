import React, { useState, useEffect } from "react";
import "./Pdftospeech.css";

import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const Pdftospeech = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfText, setPdfText] = useState("");
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        const fetchVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0) {
                setSelectedVoice(availableVoices[0].name);
            }
        };

        fetchVoices();
        window.speechSynthesis.onvoiceschanged = fetchVoices;
    }, []);

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
            let text = "";

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const content = await page.getTextContent();
                const strings = content.items.map((item) => item.str);
                text += strings.join(" ") + "\n";
            }

            setPdfText(text);
        };

        reader.readAsArrayBuffer(pdfFile);
    };

    const handleSpeak = () => {
        if (pdfText.trim() === "") {
            alert("Please extract text from the PDF before speaking.");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(pdfText);
        const voice = voices.find((v) => v.name === selectedVoice);

        if (voice) {
            utterance.voice = voice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }} className="outer-layer-of-pdftoaudio">
            <h1>PDF to Audio</h1>

            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                style={{ marginBottom: "10px" }}
            />

            <button
                onClick={extractTextFromPDF}
                style={{
                    padding: "10px 15px",
                    marginBottom: "10px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Extract Text from PDF
            </button>

            {pdfText && (
                <div style={{ marginBottom: "20px" }}>
                    <h2>Extracted Text</h2>
                    <textarea
                        value={pdfText}
                        readOnly
                        rows={10}
                        style={{ width: "100%" }}
                    />
                </div>
            )}

            {voices.length > 0 && (
                <select
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px" }}
                >
                    {voices.map((voice) => (
                        <option key={voice.name} value={voice.name}>
                            {voice.name} {voice.lang && `(${voice.lang})`}
                        </option>
                    ))}
                </select>
            )}

            <button
                onClick={handleSpeak}
                disabled={isSpeaking}
                style={{
                    marginRight: "10px",
                    padding: "10px 15px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Speak
            </button>

            <button
                onClick={handleStop}
                disabled={!isSpeaking}
                style={{
                    padding: "10px 15px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Stop
            </button>
        </div>
    );
};

export default Pdftospeech;
