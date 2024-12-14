import axios from "axios";
export const instructionService = {
  
  // Fetch instructions from the API
  async getInstructions():Promise<string> {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/instructions`,{
        headers: {
        //   Authorization: "Bearer your_token_here",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "rio",
        },
      });
      const instructions = response.data;
    //   console.log("Instructions:",response, instructions);
      return instructions;
    } catch (error) {
      console.error("Error fetching instructions:", error);
      throw new Error("Failed to retrieve instructions"); // Re-throw or handle as needed
    }
  },

  // Update instructions in the API
  async updateInstructions (newInstruction: string):Promise<boolean> {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/instructions`,{
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "rio",
        },
        data: newInstruction
      });
      const updateResult = response.data;
    //   console.log("Update Result:", updateResult);
      return updateResult;
    } catch (error) {
      console.error("Error updating instructions:", error);
      throw new Error("Failed to update instructions"); // Re-throw or handle as needed
    }
  },
}
