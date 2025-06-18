import React from "react";
import { Check, Download, FileCheck, Hash, Award } from "lucide-react";
import type { ProcessingState, SanitizedFileResult } from "../../types";
import { downloadCertificate } from "../../utils/fileHelpers";
import LoadingSpinner from "../ui/LoadingSpinner";

interface SanitizeTabProps {
  processing: ProcessingState;
  sanitizedResult: SanitizedFileResult | null;
  onDownload: () => void;
  onReset: () => void;
}

const SanitizeTab: React.FC<SanitizeTabProps> = ({
  processing,
  sanitizedResult,
  onDownload,
  onReset,
}) => {
  return (
    <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
      {processing.isSanitizing ? (
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <h3 className="text-xl font-semibold text-white mb-2 mt-4">
            Sanitizando arquivo...
          </h3>
          <p className="text-gray-400">
            Removendo metadados sensíveis com segurança
          </p>
        </div>
      ) : sanitizedResult ? (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Arquivo Sanitizado com Sucesso!
          </h3>
          <p className="text-gray-400 mb-6">
            {sanitizedResult.removedMetadataCount} metadados sensíveis foram
            removidos
          </p>

          <div className="bg-slate-700 rounded-lg p-4 mb-6">
            <h4 className="text-white font-medium mb-3">
              📁 Arquivo Processado:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-300">
                  Nome: {sanitizedResult.file.name}
                </p>
                <p className="text-gray-400">
                  Tamanho: {(sanitizedResult.sanitizedSize / 1024).toFixed(2)}{" "}
                  KB
                </p>
              </div>
              <div>
                <p className="text-gray-300">
                  Metadados removidos: {sanitizedResult.removedMetadataCount}
                </p>
                <p className="text-gray-400">Status: ✅ Verificado</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-700 rounded-lg p-4 mb-6">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <Hash className="w-4 h-4" />
              🔐 Verificação de Integridade (SHA-256):
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div>
                <p className="text-gray-300 mb-1">Hash Original:</p>
                <p className="text-blue-400 bg-slate-800 p-2 rounded break-all">
                  {sanitizedResult.originalHash}
                </p>
              </div>
              <div>
                <p className="text-gray-300 mb-1">Hash Sanitizado:</p>
                <p className="text-green-400 bg-slate-800 p-2 rounded break-all">
                  {sanitizedResult.sanitizedHash}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-700 rounded-lg p-4 mb-6">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" />
              📜 Certificado de Sanitização:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-300">
                  ID: {sanitizedResult.certificate.id}
                </p>
                <p className="text-gray-400">
                  Data:{" "}
                  {new Date(
                    sanitizedResult.certificate.timestamp
                  ).toLocaleString("pt-BR")}
                </p>
              </div>
              <div>
                <p className="text-gray-300">
                  Operação: {sanitizedResult.certificate.operation}
                </p>
                <p className="text-green-400">
                  Status: {sanitizedResult.certificate.status} ✓
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onDownload}
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Baixar Arquivo Limpo
            </button>

            <button
              onClick={() => downloadCertificate(sanitizedResult.certificate)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FileCheck className="w-5 h-5" />
              Baixar Certificado
            </button>

            <button
              onClick={onReset}
              className="bg-slate-600 hover:bg-slate-700 text-white py-3 px-6 rounded-lg transition-colors"
            >
              Processar Outro Arquivo
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SanitizeTab;