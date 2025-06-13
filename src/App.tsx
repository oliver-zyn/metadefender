import React, { useState, useCallback } from "react";
import {
  Upload,
  Shield,
  Download,
  Eye,
  EyeOff,
  FileImage,
  FileText,
  AlertTriangle,
  Check,
  Hash,
  FileCheck,
  Award,
  Info,
  MapPin,
  Camera,
  Clock,
  Lock,
  Globe,
  Smartphone,
  Users,
  Building,
} from "lucide-react";
import type {
  FileMetadata,
  TabType,
  SanitizedFileResult,
  ProcessingState,
} from "./types";
import {
  extractImageMetadata,
  extractPdfMetadata,
  extractGenericMetadata,
} from "./utils/metadataExtractor";
import { sanitizeImageFile, sanitizePdfFile } from "./utils/fileSanitizer";
import {
  getSensitiveMetadataKeys,
  downloadFile,
  downloadCertificate,
  isImageFile,
  isPdfFile,
  isSupportedFile,
} from "./utils/fileHelpers";

// Expandindo o tipo TabType para incluir a nova aba
type ExtendedTabType = TabType | "sobre";

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [originalMetadata, setOriginalMetadata] = useState<FileMetadata>({});
  const [sanitizedResult, setSanitizedResult] =
    useState<SanitizedFileResult | null>(null);
  const [processing, setProcessing] = useState<ProcessingState>({
    isUploading: false,
    isAnalyzing: false,
    isSanitizing: false,
    isComplete: false,
  });
  const [showMetadata, setShowMetadata] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ExtendedTabType>("upload");
  const [error, setError] = useState<string | null>(null);

  const sensitiveKeys = getSensitiveMetadataKeys();

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const uploadedFile = event.target.files?.[0];
      if (!uploadedFile) return;

      setError(null);

      if (!isSupportedFile(uploadedFile)) {
        setError(
          "Tipo de arquivo não suportado. Use imagens (JPEG, PNG) ou PDF."
        );
        return;
      }

      setFile(uploadedFile);
      setActiveTab("analyze");
      setProcessing((prev) => ({ ...prev, isAnalyzing: true }));

      try {
        let metadata: FileMetadata;

        if (isImageFile(uploadedFile)) {
          metadata = await extractImageMetadata(uploadedFile);
        } else if (isPdfFile(uploadedFile)) {
          metadata = await extractPdfMetadata(uploadedFile);
        } else {
          metadata = await extractGenericMetadata(uploadedFile);
        }

        setOriginalMetadata(metadata);
      } catch (error) {
        console.error("Erro ao extrair metadados:", error);
        setError("Erro ao analisar o arquivo. Tente novamente.");
      } finally {
        setProcessing((prev) => ({ ...prev, isAnalyzing: false }));
      }
    },
    []
  );

  const sanitizeFile = useCallback(async () => {
    if (!file) return;

    setError(null);
    setProcessing((prev) => ({ ...prev, isSanitizing: true }));
    setActiveTab("sanitize");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      let result: SanitizedFileResult;

      if (isImageFile(file)) {
        result = await sanitizeImageFile(file, originalMetadata);
      } else if (isPdfFile(file)) {
        result = await sanitizePdfFile(file, originalMetadata);
      } else {
        throw new Error("Tipo de arquivo não suportado para sanitização");
      }

      setSanitizedResult(result);
      setProcessing((prev) => ({
        ...prev,
        isSanitizing: false,
        isComplete: true,
      }));
    } catch (error) {
      console.error("Erro ao sanitizar arquivo:", error);
      setError("Erro ao sanitizar o arquivo. Tente novamente.");
      setProcessing((prev) => ({ ...prev, isSanitizing: false }));
    }
  }, [file, originalMetadata]);

  const handleDownload = useCallback(() => {
    if (sanitizedResult) {
      downloadFile(sanitizedResult.file);
    }
  }, [sanitizedResult]);

  const resetApp = useCallback(() => {
    setFile(null);
    setOriginalMetadata({});
    setSanitizedResult(null);
    setProcessing({
      isUploading: false,
      isAnalyzing: false,
      isSanitizing: false,
      isComplete: false,
    });
    setShowMetadata(false);
    setActiveTab("upload");
    setError(null);
  }, []);

  const hasSensitiveData = Object.keys(originalMetadata).some((key) =>
    sensitiveKeys.includes(key)
  );

  // Componente da nova aba "Sobre"
  const SobreContent = () => (
    <div className="space-y-8">
      {/* Seção sobre Metadados */}
      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
        <div className="text-center mb-8">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            O Problema dos Metadados Ocultos
          </h2>
          <p className="text-gray-300 text-lg">
            Seus arquivos podem estar revelando mais do que você imagina
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-700 rounded-lg p-6">
            <Info className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              O que são Metadados?
            </h3>
            <p className="text-gray-300">
              Dados invisíveis armazenados dentro de arquivos digitais, contendo
              informações sobre quando, onde e como o arquivo foi criado.
            </p>
          </div>

          <div className="bg-slate-700 rounded-lg p-6">
            <Lock className="w-8 h-8 text-red-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              Informações Sensíveis
            </h3>
            <p className="text-gray-300">
              Localização GPS, autor, histórico de edição, dispositivo usado e
              outras informações pessoais são exemplos comuns.
            </p>
          </div>

          <div className="bg-slate-700 rounded-lg p-6">
            <MapPin className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              Exemplo Real
            </h3>
            <p className="text-gray-300">
              Fotos tiradas com smartphone podem expor sua localização exata,
              comprometendo sua privacidade e segurança.
            </p>
          </div>
        </div>

        {/* Riscos à Privacidade */}
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Riscos à Privacidade
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-medium">
                  Exposição de Identidade
                </h4>
                <p className="text-gray-300 text-sm">
                  Metadados revelam informações pessoais sem seu consentimento
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-medium">
                  Violação de Regulamentos
                </h4>
                <p className="text-gray-300 text-sm">
                  Riscos legais pela não conformidade com a LGPD
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-medium">Impacto em Empresas</h4>
                <p className="text-gray-300 text-sm">
                  Vazamento de dados pode comprometer reputação e segurança
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exemplos de Metadados */}
        <div className="bg-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Exemplos de Metadados Encontrados em Arquivos:
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-purple-400 font-medium mb-3 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Imagens (JPEG/PNG)
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-400" />
                  Coordenadas GPS (latitude, longitude)
                </li>
                <li className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-red-400" />
                  Informações da câmera (marca, modelo)
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-400" />
                  Data e hora exata da foto
                </li>
                <li className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-red-400" />
                  Configurações técnicas do dispositivo
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-purple-400 font-medium mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documentos PDF
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-red-400" />
                  Nome do autor e criador
                </li>
                <li className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-red-400" />
                  Software utilizado na criação
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-400" />
                  Datas de criação e modificação
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-400" />
                  Título, assunto e palavras-chave
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Seção sobre o MetaDefender */}
      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            MetaDefender: Sua Proteção Digital
          </h2>
          <p className="text-gray-300 text-lg">
            Sanitize seus arquivos de forma segura e privada
          </p>
        </div>

        {/* Como Funciona */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-700 rounded-lg p-6">
            <Upload className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              Tipos de Arquivos
            </h3>
            <p className="text-gray-300">
              Imagens JPEG, PNG, PDFs e documentos são processados com segurança
              e precisão.
            </p>
          </div>

          <div className="bg-slate-700 rounded-lg p-6">
            <Lock className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              Processamento Local
            </h3>
            <p className="text-gray-300">
              Trabalha 100% no seu navegador, garantindo total privacidade.
              Nenhum arquivo sai do seu dispositivo.
            </p>
          </div>

          <div className="bg-slate-700 rounded-lg p-6">
            <FileCheck className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              Resultado Seguro
            </h3>
            <p className="text-gray-300">
              Arquivos "limpos" + certificado de verificação para
              compartilhamento seguro e auditável.
            </p>
          </div>
        </div>

        {/* Tecnologias e Segurança */}
        <div className="bg-slate-700 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Hash className="w-6 h-6" />
            Segurança e Verificação
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-purple-400 font-medium mb-2">
                Hash de Integridade (SHA-256)
              </h4>
              <p className="text-gray-300 text-sm">
                Gera "impressão digital" única do arquivo para auditoria
                completa
              </p>
            </div>

            <div>
              <h4 className="text-purple-400 font-medium mb-2">
                Certificado de Sanitização
              </h4>
              <p className="text-gray-300 text-sm">
                Comprova que apenas metadados sensíveis foram removidos
              </p>
            </div>

            <div>
              <h4 className="text-purple-400 font-medium mb-2">
                Conformidade Legal
              </h4>
              <p className="text-gray-300 text-sm">
                Rastro auditável para compliance com LGPD e outras
                regulamentações
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-white mb-3">
            Pronto para Proteger sua Privacidade?
          </h3>
          <p className="text-purple-100 mb-4">
            Comece agora mesmo a sanitizar seus arquivos de forma segura e
            gratuita
          </p>
          <button
            onClick={() => setActiveTab("upload")}
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold 
                     hover:bg-purple-50 transition-colors inline-flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Começar Agora
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4 mt-10">
            <Shield className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">
              Sanitizador de Metadados
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Proteja sua privacidade removendo metadados ocultos dos seus
            arquivos
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-300">{error}</p>
            </div>
          </div>
        )}

        <div className="flex justify-center mb-8">
          <div className="flex bg-slate-800 rounded-lg p-1">
            <button
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === "upload"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("upload")}
            >
              Upload
            </button>
            <button
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === "analyze"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              disabled={!file}
            >
              Analisar
            </button>
            <button
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === "sanitize"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              disabled={!file}
            >
              Sanitizar
            </button>
            <button
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === "sobre"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("sobre")}
            >
              <Info className="w-4 h-4 inline mr-2" />
              Sobre
            </button>
          </div>
        </div>

        {/* Nova aba "Sobre" */}
        {activeTab === "sobre" && <SobreContent />}

        {activeTab === "upload" && (
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
                  onChange={handleFileUpload}
                  accept="image/*,.pdf"
                  className="hidden"
                  disabled={processing.isAnalyzing}
                />
                <div className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-8 py-4 rounded-lg cursor-pointer transition-colors inline-flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  {processing.isAnalyzing
                    ? "Analisando..."
                    : "Escolher Arquivo"}
                </div>
              </label>
            </div>
          </div>
        )}

        {file && activeTab === "analyze" && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-4 mb-4">
                {isImageFile(file) ? (
                  <FileImage className="w-8 h-8 text-blue-400" />
                ) : (
                  <FileText className="w-8 h-8 text-red-400" />
                )}
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {file.name}
                  </h3>
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
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Metadados Encontrados
                </h3>
                <div className="grid gap-3">
                  {Object.entries(originalMetadata).map(([key, value]) => {
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
                        <span className="text-gray-300 font-medium">
                          {key}:
                        </span>
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
                      Foram encontrados metadados que podem comprometer sua
                      privacidade. Recomendamos a sanitização antes de
                      compartilhar este arquivo.
                    </p>
                  </div>
                )}

                <button
                  onClick={sanitizeFile}
                  disabled={processing.isSanitizing}
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Shield className="w-5 h-5" />
                  {processing.isSanitizing
                    ? "Sanitizando..."
                    : "Sanitizar Arquivo"}
                </button>
              </div>
            )}

            {processing.isAnalyzing && (
              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <div className="text-center">
                  <div className="animate-spin w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-300">Analisando metadados...</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "sanitize" && (
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            {processing.isSanitizing ? (
              <div className="text-center">
                <div className="animate-spin w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-white mb-2">
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
                  {sanitizedResult.removedMetadataCount} metadados sensíveis
                  foram removidos
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
                        Tamanho:{" "}
                        {(sanitizedResult.sanitizedSize / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-300">
                        Metadados removidos:{" "}
                        {sanitizedResult.removedMetadataCount}
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
                    onClick={handleDownload}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Baixar Arquivo Limpo
                  </button>

                  <button
                    onClick={() =>
                      downloadCertificate(sanitizedResult.certificate)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <FileCheck className="w-5 h-5" />
                    Baixar Certificado
                  </button>

                  <button
                    onClick={resetApp}
                    className="bg-slate-600 hover:bg-slate-700 text-white py-3 px-6 rounded-lg transition-colors"
                  >
                    Processar Outro Arquivo
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}

        <div className="mt-8 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            🔒 Processamento 100% Local
          </h3>
          <p className="text-gray-400">
            Seus arquivos são processados inteiramente no seu navegador. Nenhum
            dado é enviado para servidores externos, garantindo total
            privacidade e segurança dos seus documentos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
