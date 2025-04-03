import TextToSummary from "@/app/dashboard/document-summarization/TextToSummary";
import AudioToSummary from "@/app/dashboard/document-summarization/AudioToSummary";

const DocumentSummarization = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Document Summarization</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextToSummary />
        <AudioToSummary />
      </div>
    </div>
  );
};

export default DocumentSummarization;
