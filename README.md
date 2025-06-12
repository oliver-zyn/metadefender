# MetaDefender
<img src="https://github.com/user-attachments/assets/7f9023f9-9b58-4334-8c4a-9b9d23f4607d" width="600" />

## 📖 Sobre
O MetaDefender é uma aplicação web que permite analisar e remover metadados de arquivos de imagem (JPEG/PNG) e documentos PDF diretamente no navegador. Todo o processamento é realizado localmente, garantindo que nenhum conteúdo seja enviado para servidores externos, protegendo completamente a privacidade do usuário.

Aplicação em produção: https://data-defender.netlify.app

## 💻 Tecnologias utilizadas
- React.js 19
- TypeScript
- Vite
- Tailwind CSS 4
- ExifReader
- pdf-lib
- Lucide React

## ⚒️ Features
- Análise completa de metadados em imagens (JPEG/PNG) e PDFs
- Detecção automática de metadados sensíveis (GPS, dados pessoais, informações do dispositivo)
- Sanitização segura removendo metadados sem afetar a qualidade visual
- Processamento 100% local no navegador (sem uploads para servidores)
- Geração de hash SHA-256 para verificação de integridade
- Certificado digital de sanitização para comprovação do processo
- Interface intuitiva com visualização clara dos metadados encontrados
- Download do arquivo limpo e do certificado de sanitização
- Suporte completo offline após o primeiro carregamento

## ⚙️ Executando o projeto
Primeiramente, deve-se instalar todas as dependências:
```
npm install
```
Rodando o projeto:
```
npm run dev
```
Realizando build:
```
npm run build
```
Visualizando o build:
```
npm run preview
```
Verificando o código:
```
npm run lint
```

## 🔒 Privacidade e Segurança
- **Processamento Local**: Todos os arquivos são processados diretamente no seu navegador
- **Sem Upload**: Nenhum arquivo é enviado para servidores externos
- **Código Aberto**: Transparência total no processamento dos dados
- **Certificação**: Cada arquivo processado recebe um certificado de autenticidade

## 📝 Como Usar
1. **Upload**: Selecione uma imagem (JPEG/PNG) ou PDF
2. **Análise**: Visualize os metadados encontrados (sensíveis destacados em vermelho)
3. **Sanitização**: Clique em "Sanitizar Arquivo" para remover metadados sensíveis
4. **Download**: Baixe o arquivo limpo e o certificado de sanitização

## 🛡️ Metadados Detectados
### Imagens (JPEG/PNG)
- Coordenadas GPS (latitude, longitude, altitude)
- Informações da câmera (fabricante, modelo, configurações)
- Dados temporais (data/hora de criação)
- Informações técnicas (EXIF completo)

### PDFs
- Dados do autor e criador
- Software utilizado na criação
- Datas de criação e modificação
- Metadados de título, assunto e palavras-chave
