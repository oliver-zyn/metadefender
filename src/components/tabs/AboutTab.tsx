import React from "react";
import {
  AlertTriangle,
  Info,
  Lock,
  MapPin,
  Camera,
  Clock,
  Smartphone,
  Users,
  Building,
  Globe,
  FileText,
  Shield,
  Upload,
  FileCheck,
  Hash,
} from "lucide-react";
import type { TabType } from "../../types";

type ExtendedTabType = TabType | "sobre";

interface AboutTabProps {
  setActiveTab: (tab: ExtendedTabType) => void;
}

const AboutTab: React.FC<AboutTabProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-8">
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
};

export default AboutTab;