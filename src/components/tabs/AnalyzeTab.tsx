import React from "react";
import { FileImage, FileText, Eye, EyeOff } from "lucide-react";
import type { FileMetadata, ProcessingState } from "../../types";
import { isImageFile } from "../../utils/fileHelpers";
import LoadingSpinner from "../ui/LoadingSpinner";
import MetadataViewer from "../ui/MetadataViewer";

interface AnalyzeTabProps {
  file: File;
  originalMetadata: FileMetadata;
  processing: ProcessingState;
  showMetadata: boolean;
  setShowMetadata: (show: boolean) => void;
  sensitiveKeys: string[];
  hasSensitiveData: boolean;
  onSanitize: () => void;
}

const AnalyzeTab: React.FC<AnalyzeTabProps> = ({
  file,
  originalMetadata,
  processing,
  showMetadata,
  setShowMetadata,
  sensitiveKeys,
  hasSensitiveData,
  onSanitize,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-4 mb-4">
          {isImageFile(file) ? (
            <FileImage className="w-8 h-8 text-blue-400" />
          ) : (
            <FileText className="w-8 h-8 text-red-400" />
          )}
          <div>
            <h3 className="text-xl font-semibold text-white">{file.name}</h3>
            <p className="text-gray-400">
              {file.type} • {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowMetadata(!showMetadata)}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          disabled={processing.isAnalyzing}
        >
          {showMetadata ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
          {showMetadata ? "Ocultar Metadados" : "Mostrar Metadados"}
        </button>
      </div>

      {showMetadata && !processing.isAnalyzing && (
        <MetadataViewer
          metadata={originalMetadata}
          sensitiveKeys={sensitiveKeys}
          hasSensitiveData={hasSensitiveData}
          onSanitize={onSanitize}
          isSanitizing={processing.isSanitizing}
        />
      )}

      {processing.isAnalyzing && (
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          <LoadingSpinner message="Analisando metadados..." />
        </div>
      )}
    </div>
  );
};

export default AnalyzeTab;