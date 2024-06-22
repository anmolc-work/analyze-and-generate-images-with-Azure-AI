import React, { useState } from 'react';
import { analyzeImage, isImageAnalysisConfigured } from './azure-image-analysis';
import { generateImage, isGenerateImageConfigured } from './azure-image-generation';

function App() {

  const [prompt, setPrompt] = useState('');
  const [imageAltText, setImageAltText] = useState('');
  const [title, setTitle] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const checkAzureConfig = () => {
    const imageGenerationConfigured = isGenerateImageConfigured();
    const imageAnalysisConfigured = isImageAnalysisConfigured();
    return imageGenerationConfigured && imageAnalysisConfigured;
  };

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleAnalyzeClick = async () => {
    try {
      const result = await analyzeImage(prompt);
      setAnalysisResult(result);
      setPrompt('');
      setImageAltText('Analyzed Image');
      setTitle('Computer Vision Analysis');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGenerateClick = async () => {
    try {
      const generatedImageUrl = await generateImage(prompt);
      const result = {
        'prompt': prompt,
        'URL': generatedImageUrl
      }
      setAnalysisResult(result);
      setPrompt('');
      setImageAltText('Generated Image');
      setTitle('Image Generation');
    } catch (error) {
      setError(error.message);
    }
  };

  return <>
    {!checkAzureConfig() && (
      <p>Key and/or endpoint not configured for congnitive services.</p>
    )}
    {checkAzureConfig() && (
      <>
        <h2>Computer Vision</h2>
        <div>
          <label>Insert URL or type prompt:</label>
          <br />
          <input
            type='text'
            placeholder='Enter URL to analyze or textual prompt to generate an image'
            value={prompt}
            onChange={(e) => handleInputChange(e)}
            style={{ display: 'inline-block', width: '50%' }}
          />
        </div>
        <div>
          <button type='button' onClick={() => handleAnalyzeClick()}>Analyze</button>&nbsp;
          <button type='button' onClick={() => handleGenerateClick()}>Generate</button>
        </div>
        <hr />
        {error && <p>Error: {error}</p>}
        {analysisResult && (
          <div>
            <h3>{title}</h3>
            <img
              src={analysisResult?.URL}
              alt={imageAltText}
              width='300px'
              height='300px'
            />
            <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
          </div>
        )}
      </>
    )}
  </>;
}

export default App;
