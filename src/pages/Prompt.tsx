import { useState, ChangeEvent, useRef, useEffect } from "react";
import { instructionService } from "../services/instructions";


const Prompt = () => {
  // const prompt =
  //   "Demand so what does that mean basically what that means is we spoke about product a man before so how many people are searching for a specific product online so like saunas or fireplaces for example Brendan is how many people are looking for a specific brand within that particular box product line right so for example 100,000 people might be searching for a laptop per month but how many people are searching for you know apple laptop or Samsung laptop ";
  
  const [instruction, setInstructions] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setInstructions(event.target.value);
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
    }
  };

  useEffect(() => {
    adjustHeight(); // Adjust height on load and when text changes
  }, [instruction]);

  useEffect(() => {
    loadInstructions();
  }, []);

  const loadInstructions = async () => {
    try {
      const currentInstructions = await instructionService.getInstructions();
      setInstructions(currentInstructions);
    } catch (error) {
      console.error('Error loading instruction:', error);
    }
  };

  const updateInstructions = async () => {
    try {
      const updateResult = await instructionService.updateInstructions(instruction)
      if (updateResult) {
        setDisable(true)
      }
    } catch (error) {
      console.error('Error loading instruction:', error);
    }
  }

  return (
    <>
      <div className="w-screen h-screen p-4 px-12 space-y-2 pt-20 text-black">
        <h1 className="flex w-3/4 justify-self-center text-4xl p-4 border-b-1 border-b">
          Prompt
        </h1>
        <textarea
          ref={textareaRef}
          className="flex w-2/3 justify-self-center border-2 border-black p-4 overflow-hidden"
          value={instruction}
          style={{resize: "none"}}
          onChange={handleChange}
        ></textarea>
        <div className="flex w-5/6 justify-end space-x-4">
          <button disabled={disable} onClick={updateInstructions} className=" disabled:cursor-not-allowed">Save</button>
          <button onClick={loadInstructions}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default Prompt;
