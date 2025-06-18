import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="mt-8 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">
        🔒 Processamento 100% Local
      </h3>
      <p className="text-gray-400">
        Seus arquivos são processados inteiramente no seu navegador. Nenhum
        dado é enviado para servidores externos, garantindo total privacidade e
        segurança dos seus documentos.
      </p>
    </div>
  );
};

export default Footer;