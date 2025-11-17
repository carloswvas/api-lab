#!/bin/bash
set -e

echo "Iniciando CI em todas as APIs..."

for api_dir in [0-9][0-9]-*/ ; do
    echo "--- Entrando em: ${api_dir} ---"
    
    cd "$api_dir"
    
    if [ -f "package.json" ]; then
        echo "Detectado Node.js/NestJS. Instalando e testando..."
        pnpm install
        pnpm run test
        
    elif [ -f "requirements.txt" ]; then
        echo "Detectado Python. Instalando e testando..."
        pip install -r requirements.txt
        python -m pytest
        
    elif [ -f "pom.xml" ]; then
        echo "Detectado Java/Maven. Testando..."
        mvn test
        
    else
        echo "AVISO: Linguagem da API em ${api_dir} não reconhecida ou sem arquivo de dependência."
    fi
    
    cd ..
    echo "--- Concluído ${api_dir} ---"
done

echo "CI concluída com sucesso em todas as APIs."