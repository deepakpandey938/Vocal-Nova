
import "./voicetyper.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";

function Voicetyper() {
    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });


    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

  return (
    <div className="outer-speech-box">
        <h2 className="header-text">Speech to Text Converter</h2>
        <br/>
        <p>A Reacthook that converts speech from the microphone to text and makes it available to your React
            components.</p>
        <div className="btn-style-speech">

    <div className="container-box-speech">
        <div className="main-content-speech" onClick={() =>  setTextToCopy(transcript)}>
            {transcript}
        </div>


            <button onClick={setCopied} className="btn-box-box">
                {isCopied ? 'Copied!' : 'Copy to clipboard'}
            </button>
            <button onClick={startListening} className="btn-box-box">Start Listening</button>
            <button onClick={SpeechRecognition.stopListening} className="btn-box-box">Stop Listening</button>

        </div>

    </div>

</div>
  )
}

export default Voicetyper
