import React from "react";
import { Shield } from "lucide-react";

const Header: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center items-center gap-3 mb-4 mt-10">
        <Shield className="w-12 h-12 text-purple-400" />
        <h1 className="text-4xl font-bold text-white">
          Sanitizador de Metadados
        </h1>
      </div>
      <p className="text-gray-300 text-lg">
        Proteja sua privacidade removendo metadados ocultos dos seus arquivos
      </p>
    </div>
  );
};

export default Header;