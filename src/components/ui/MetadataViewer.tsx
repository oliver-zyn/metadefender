import React from "react";
import { AlertTriangle, Shield } from "lucide-react";
import type { FileMetadata } from "../../types";

interface MetadataViewerProps {
  metadata: FileMetadata;
  sensitiveKeys: string[];
  hasSensitiveData: boolean;
  onSanitize: () => void;
  isSanitizing: boolean;
}

const MetadataViewer: React.FC<MetadataViewerProps> = ({
  metadata,
  sensitiveKeys,
  hasSensitiveData,
  onSanitize,
  isSanitizing,
}) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">
        Metadados Encontrados
      </h3>
      <div className="grid gap-3">
        {Object.entries(metadata).map(([key, value]) => {
          const isSensitive = sensitiveKeys.includes(key);
          return (
            <div
              key={key}
              className={`flex justify-between items-center p-3 rounded-lg ${
                isSensitive
                  ? "bg-red-900/30 border border-red-500/30"
                  : "bg-slate-700"
              }`}
            >
              <span className="text-gray-300 font-medium">{key}:</span>
              <div className="flex items-center gap-2">
                <span className="text-white">{value}</span>
                {isSensitive && (
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {hasSensitiveData && (
        <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-semibold">
              Metadados Sensíveis Detectados
            </span>
          </div>
          <p className="text-gray-300 text-sm">
            Foram encontrados metadados que podem comprometer sua privacidade.
            Recomendamos a sanitização antes de compartilhar este arquivo.
          </p>
        </div>
      )}

      <button
        onClick={onSanitize}
        disabled={isSanitizing}
        className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Shield className="w-5 h-5" />
        {isSanitizing ? "Sanitizando..." : "Sanitizar Arquivo"}
      </button>
    </div>
  );
};

export default MetadataViewer;