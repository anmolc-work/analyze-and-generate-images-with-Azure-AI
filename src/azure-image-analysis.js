import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';

const endpoint = process.env.REACT_APP_AZURE_IMAGE_ANALYSIS_ENDPOINT ?? '';
const azureApiKey = process.env.REACT_APP_AZURE_IMAGE_ANALYSIS_KEY ?? '';

const image = 'https://moderatorsampleimages.blob.core.windows.net/samples/sample16.png';
// Function to analyze an image
export async function analyzeImage(imageUrl = image) {
    try {
        const credentials = new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': azureApiKey } });
        const client = new ComputerVisionClient(credentials, endpoint);
        const result = await client.describeImage(imageUrl);
        return { "URL": imageUrl, ...result };
    } catch (error) {
        console.error('Error analyzing image:', error);
        throw error;
    }
}

export const isImageAnalysisConfigured = () => {
    return azureApiKey !== '';
};
