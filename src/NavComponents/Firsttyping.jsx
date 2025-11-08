import React, { useState, useEffect } from "react";

const TypingMaster = () => {
  const [promptText, setPromptText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [accuracy, setAccuracy] = useState(100);
  const [speed, setSpeed] = useState(0);
  const [progress, setProgress] = useState(0); 
  const [isCompleted, setIsCompleted] = useState(false);
  const [incorrectChars, setIncorrectChars] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [currentSessionIndex, setCurrentSessionIndexState] = useState(0); 

  const typingSessions = [
    [
      "The quick brown fox jumps over the lazy dog",
      "Typing fast is a skill that requires practice",
      "Practice is the key to becoming a faster typist",
      "Write clean code for others to read, not just for yourself"
    ],
    [
      "Developing with React is both fun and challenging for us",
      "Mastering JavaScript can open many doors in web development",
      "JavaScript is versatile and widely used",
      "Building dynamic UIs is a key skill for frontend developers",
      "Good software architecture is essential for scalable applications"
    ],
    [
      "Code is like humor. When you have to explain it, it’s not good (bad)",
      "Frontend development involves creativity and logic",
      "A programmer is just a tool to turn caffeine into code",
      "In programming, the only constant is change",
      "Debugging is like being the detective in a criminal movie's",
    ]
  ];

  useEffect(() => {
    setPromptText(typingSessions[currentSessionIndex][currentSentenceIndex]);
  }, [currentSessionIndex, currentSentenceIndex]);

  const handleChange = (e) => {
    const input = e.target.value;

    if (!startTime) setStartTime(new Date());

    if (input.length > typedText.length) {
      const newChar = input[typedText.length];
      setTypedText(input);

    
      const errors = [];
      for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] !== promptText[i]) {
          errors.push(i);
        }
      }
      if (newChar !== promptText[typedText.length]) {
        errors.push(typedText.length);
      }

      setIncorrectChars(errors);

   
      setAccuracy(
        Math.max(
          0,
          Math.round(((typedText.length - errors.length) / promptText.length) * 100)
        )
      );

    
      setProgress(Math.min(100, Math.round((typedText.length / promptText.length) * 100)));


      if (typedText.length === promptText.length) {

        if (currentSentenceIndex + 1 < typingSessions[currentSessionIndex].length) {
          setCurrentSentenceIndex(currentSentenceIndex + 1);
          setTypedText("");
        } else {
     
          const endTime = new Date();
          const timeTaken = (endTime - startTime) / 1000 / 60;
          setSpeed(Math.round((typedText.length / timeTaken) / 5)); 
          setIsCompleted(true);
          setShowResults(true);
        }
      }
    }
  };

  const handleNextSession = () => {
    setTypedText("");
    setCurrentSentenceIndex(0);
    setStartTime(null);
    setAccuracy(100);
    setSpeed(0);
    setProgress(0); 
    setIsCompleted(false);
    setIncorrectChars([]);
    setShowResults(false); 

    if (currentSessionIndex + 1 < typingSessions.length) {
      setCurrentSessionIndexState(currentSessionIndex + 1);
    } else {
    
      setCurrentSessionIndexState(0);
    }
  };

  const sessionProgress = Math.round(
    (currentSentenceIndex / typingSessions[currentSessionIndex].length) * 100
  );

  return (
    <div className="typing-master">
      <style>
        {`
        .typing-master {
          max-width: 1100px;
          margin: 60px 0px 0px 300px;
          padding: 50px;
          background: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          font-family: 'Arial', sans-serif;
          text-align: center;
        }

        h1 {
          color: #333;
          margin-bottom: 20px;
          font-size: 2.5em;
          font-weight: 600;
        }

        .prompt {
          font-size: 21px;
          line-height: 1.5;
          margin: 20px 0;
          padding: 10px;
          background: #ffffff;
          border: 1px solid #ddd;
          border-radius: 5px;
          min-height: 80px;
          text-align: left;
          white-space: pre-wrap;
          word-wrap: break-word;
          transition: all 0.3s ease;
        }

        .prompt span {
          padding: 0 0.5px;
        }

        .prompt span.correct {
          color: #28a745;
        }

        .prompt span.incorrect {
          color: #dc3545;
          text-decoration: underline;
          animation: shake 0.5s ease-in-out;
        }

        .prompt span.current {
          color: #007bff;
          font-weight: bold;
        }

        .typing-input {
          width: 100%;
          font-size: 16px;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin: 10px 0;
          outline: none;
          transition: border 0.3s;
        }

        .typing-input:focus {
          border-color: #007bff;
        }

        .stats {
          display: flex;
          justify-content: space-between;
          margin: 20px 0;
          font-size: 16px;
        }

        .completion-message {
          background: #d4edda;
          color:rgb(2, 2, 2);
          padding: 15px;
          border-radius: 5px;
          margin-top: 20px;
        }

        .progress-bar {
          background-color: #f3f3f3;
          border-radius: 10px;
          height: 20px;
          margin-top: 10px;
          overflow: hidden;
          width: 100%;
        }

        .progress-bar-inner {
          height: 100%;
          width: ${progress}%;  /* Dynamically change width based on progress */
          background-color: #28a745;
          transition: width 0.3s ease;
        }

       
        .next-session-btn {
          background-color: #ffc107;
        }

        .next-session-btn:hover {
          background-color: #e0a800;
        }

        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        `}
      </style>
      <h1>Typing Master</h1>

      {!showResults ? (
        <>
          <div className="prompt">
            {promptText.split("").map((char, index) => (
              <span
                key={index}
                className={
                  index < typedText.length
                    ? typedText[index] === char
                      ? "correct"
                      : "incorrect"
                    : index === typedText.length
                    ? "current"
                    : ""
                }
              >
                {char}
              </span>
            ))}
          </div>
          <input
            type="text"
            className="typing-input"
            value={typedText}
            onChange={handleChange}
            disabled={isCompleted}
            placeholder="Type the text here..."
          />
          <div className="stats">
         
            <div>
              <strong>Progress:</strong> {Math.round(progress)}%
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-inner"></div>
          </div>
        </>
      ) : (
        <div className="completion-message" style={{fontSize: "21px",marginBottom:"20px"}}>
          Congratulations! You've completed the test.
          <div  style={{margin:"5px"}}>
            <strong>Accuracy:</strong> {accuracy}%
          </div>
          <div  style={{margin:"5px"}}>
            <strong>Speed:</strong> {speed} WPM
          </div>
          <div  style={{margin:"5px"}}>
            <strong>Progress:</strong> 100%
          </div>
          <button onClick={handleNextSession} className="next-session-btn" style={{margin:"20px"}}>Next Session</button>
        </div>
      )}
    </div>
  );
};

export default TypingMaster;
