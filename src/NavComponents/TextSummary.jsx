import React, { useState } from 'react';
import axios from 'axios';
import './TextSummary.css'
const TextSummary = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummarize = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const apiUrl = '';
      const response = await axios.post(apiUrl, {
        inputs: text,
      }, {
        headers: {
          'Authorization': ``,
        },
      });

      setSummary(response.data[0]?.summary_text || 'No summary available.');
    } catch (error) {
      setError('An error occurred while summarizing the text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="summarizer-container">
      <h1>Text Summarizer</h1>
      <textarea
        rows="10"
        cols="50"
        placeholder="Paste your text here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {summary && (
        <div>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default TextSummary;
