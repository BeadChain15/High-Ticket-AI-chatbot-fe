import Table from "./components/Table";

const Train = () => {
  return (
    <>
      <div className="flex flex-col w-screen h-screen p-4 px-12 space-y-8 pt-20">
        <h1 className="w-full text-4xl p-4 border-b-1 border-b">
          Training Data
        </h1>
        <label className="mt-2 cursor-pointer">
          <span className="block w-fit text-white bg-blue-500 rounded px-4 py-2 mb-1 text-center hover:bg-blue-600 transition duration-200">
            Upload New File
          </span>
          <input
            className="hidden" // Hide the default input element
            type="file"
            accept=".dot,.doc,.docx,.pdf"
          />
        </label>

        <Table />
      </div>
    </>
  );
};

export default Train;
