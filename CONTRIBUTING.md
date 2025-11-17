# Como contribuir

Obrigado por querer contribuir para este projeto!
Toda ajuda é bem-vinda: código, documentação, correções, ideias, relato de bugs — tudo faz diferença.

Para manter o projeto organizado e de alta qualidade, pedimos que siga o fluxo abaixo ao contribuir com código.

---

## Passos para contribuir com código

1. **Faça um fork do repositório**  
   Clique no botão **Fork** no canto superior direito da página do repositório.

2. **Clone seu fork localmente**
   ```bash
   git clone https://github.com/SEU_USUARIO/nome-do-repositorio.git
   cd nome-do-repositorio
   ```

3. **(Opcional) Configure o repositório original como `upstream`**  
   Isso facilita manter seu fork atualizado:
   ```bash
   git remote add upstream https://github.com/ORIGINAL/nome-do-repositorio.git
   ```

4. **Crie uma branch para sua alteração**  
   Use um nome descritivo e siga um dos padrões abaixo:
   ```bash
   git checkout -b feature/nova-api
   # Outros exemplos:
   # git checkout -b fix/corrigir-login
   # git checkout -b docs/atualizar-readme
   # git checkout -b chore/adicionar-github-actions
   ```

5. **Faça suas alterações**
   - Siga o estilo de código do projeto
   - Adicione testes, se aplicável
   - Atualize a documentação (`README.md`, comentários, etc.)

6. **Commite suas mudanças**
   ```bash
   git add .
   git commit -m "feat: adicionar endpoint /api/v1/users"
   ```
   >  Usamos [Conventional Commits](https://www.conventionalcommits.org/) para mensagens de commit (opcional, mas recomendado).

7. **Envie sua branch para o seu fork**
   ```bash
   git push origin feature/nova-api
   ```

8. **Abra um Pull Request (PR)**
   - Acesse seu fork no GitHub
   - Clique em **Compare & pull request**
   - Preencha o título e a descrição (o template de PR será carregado automaticamente, se houver)
   - Clique em **Create pull request**

Seu PR será revisado pela equipe. Pode levar algum tempo — agradecemos sua paciência!

---

## 🧪 Requisitos mínimos para um PR ser aceito

- ✅ As alterações resolvem um problema ou adicionam valor claro  
- ✅ O código segue o estilo já adotado no projeto  
- ✅ Testes foram adicionados ou atualizados (se aplicável)  
- ✅ A documentação foi atualizada  
- ✅ Todos os *checks* de CI (testes, lint, build) estão passando  
- ✅ Os comentários da revisão foram resolvidos

> **Importante**: a branch `main` está protegida. **Não é possível fazer push direto nela** — todas as alterações devem passar por PR.

---

## Dúvidas ou precisa de ajuda?

- Abra uma [**Issue**](https://github.com/ORIGINAL/nome-do-repositorio/issues) com a tag `question` ou `help wanted`  
- Comente em uma issue existente se quiser trabalhar nela  
- Se for sua primeira contribuição, procure por issues com a label `good first issue`

---

**Mais uma vez, obrigado por contribuir!**  
Seu esforço ajuda a tornar este projeto melhor para todos.
```

---

### Personalização rápida (antes de salvar):

Substitua esses trechos pelo seu projeto real:
- `SEU_USUARIO` → seu username no GitHub  
- `ORIGINAL/nome-do-repositorio` → ex: `joaopedro/projeto-open`  
- `feature/nova-api` → mantenha como exemplo ou adapte ao seu domínio  
- Link de Issues: certifique-se de que o link aponta pro seu repo
