import { mockResponse1} from "./mockresponse";
export default async function AIExtractionMock(){
    // TODO: add the logic that simulates the API call to the AI extraction endpoint
    await new Promise(resolve => setTimeout(resolve, 3000));
    // return the response from the API endpoint
    console.log("AI extraction mock called");
    return {
        success: true,
        message: "AI extraction mock successful",
        data: {
           ...mockResponse1.data
        }
    }
}