import { mockResponse1} from "./mockresponse";
//mock API URL for the AI extraction endpoint
const mockAPIURL = 'https://b9ab968a-378b-4c50-b3c7-821be60e6c43.mock.pstmn.io/ai-extraction';
//function to get the AI extraction data from the mock API
async function getAIExtraction() {
    try {

        const response = await fetch(mockAPIURL);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}


export default async function AIExtractionMock(){
    // TODO: add the logic that simulates the API call to the AI extraction endpoint
    await new Promise(resolve => setTimeout(resolve, 3000));
    // return the response from the API endpoint
    console.log("AI extraction mock called");
    // call the mock API to get the AI extraction data
    const response = await getAIExtraction();
    return {
        success: true,
        message: "AI extraction mock successful",
        data: {
           ...response.data
        }
    }
}