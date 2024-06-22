import { OpenAIClient, AzureKeyCredential } from '@azure/openai';

const endpoint = process.env.REACT_APP_AZURE_IMAGE_GENERATION_ENDPOINT ?? '';
const azureApiKey = process.env.REACT_APP_AZURE_IMAGE_GENERATION_KEY ?? '';

export const generateImage = async (prompt) => {
    try {
        const n = 1;
        const size = "1024x1024";
        const deploymentName = "Dalle3";
        const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
        const results = await client.getImages(deploymentName, prompt, { n, size });
        return results.data[0].url;
    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
};

export const isGenerateImageConfigured = () => {
    return azureApiKey !== '';
};
