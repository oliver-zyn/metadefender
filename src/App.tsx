import React, { useState, useCallback } from "react";
import type {
  FileMetadata,
  TabType,
  SanitizedFileResult,
  ProcessingState,
} from "./types";
import Header from "./components/ui/Header";
import ErrorAlert from "./components/ui/ErrorAlert";
import TabNavigation from "./components/ui/TabNavigation";
import Footer from "./components/ui/Footer";
import AboutTab from "./components/tabs/AboutTab";
import UploadTab from "./components/tabs/UploadTab";
import AnalyzeTab from "./components/tabs/AnalyzeTab";
import SanitizeTab from "./components/tabs/SanitizeTab";
import {
  extractImageMetadata,
  extractPdfMetadata,
  extractGenericMetadata,
} from "./utils/metadataExtractor";
import { sanitizeImageFile, sanitizePdfFile } from "./utils/fileSanitizer";
import {
  getSensitiveMetadataKeys,
  downloadFile,
  isImageFile,
  isPdfFile,
  isSupportedFile,
} from "./utils/fileHelpers";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Header />

        {error && <ErrorAlert error={error} />}

        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          file={file}
        />

        {activeTab === "sobre" && <AboutTab setActiveTab={setActiveTab} />}

        {activeTab === "upload" && (
          <UploadTab
            onFileUpload={handleFileUpload}
            processing={processing}
          />
        )}

        {file && activeTab === "analyze" && (
          <AnalyzeTab
            file={file}
            originalMetadata={originalMetadata}
            processing={processing}
            showMetadata={showMetadata}
            setShowMetadata={setShowMetadata}
            sensitiveKeys={sensitiveKeys}
            hasSensitiveData={hasSensitiveData}
            onSanitize={sanitizeFile}
          />
        )}

        {activeTab === "sanitize" && (
          <SanitizeTab
            processing={processing}
            sanitizedResult={sanitizedResult}
            onDownload={handleDownload}
            onReset={resetApp}
          />
        )}

        <Footer />
      </div>
    </div>
  );
};

export default App;