import React from "react";
import { Upload } from "lucide-react";
import type { ProcessingState } from "../../types";

interface UploadTabProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  processing: ProcessingState;
}

const UploadTab: React.FC<UploadTabProps> = ({ onFileUpload, processing }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-8 mb-6 border border-slate-700">
      <div className="text-center">
        <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-white mb-4">
          Selecione um arquivo
        </h2>
        <p className="text-gray-400 mb-6">
          Suportamos imagens (JPEG, PNG) e documentos PDF
        </p>

        <label className="inline-block">
          <input
            type="file"
            onChange={onFileUpload}
            accept="image/*,.pdf"
            className="hidden"
            disabled={processing.isAnalyzing}
          />
          <div className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-8 py-4 rounded-lg cursor-pointer transition-colors inline-flex items-center gap-2">
            <Upload className="w-5 h-5" />
            {processing.isAnalyzing ? "Analisando..." : "Escolher Arquivo"}
          </div>
        </label>
      </div>
    </div>
  );
};

export default UploadTab;