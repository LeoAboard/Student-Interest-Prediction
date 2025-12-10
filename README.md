# 📊 Sistema de Apoio à Decisão - Engenharia de Computação (IFMS-TL)

> Sistema desenvolvido para auxiliar nas estratégias de divulgação e captação de alunos para o curso de Engenharia de Computação do IFMS - Campus Três Lagoas.

## 👥 Participantes

* **Leonardo Armelin**
* **Cleiton Guilhermite**
* **Stefany Figueiredo**
* **Luiz F Miranda**

---

## 📝 Sobre o Projeto

Este projeto consiste em uma aplicação web voltada para a coleta e análise de dados de potenciais candidatos e alunos. O sistema possui duas frentes principais:

1.  **Área Pública (Candidato):** Formulários de interesse e páginas informativas sobre o curso.
2.  **Área Administrativa (Gestão):** Dashboard restrito para visualização de métricas, gráficos de engajamento e relatórios processados, permitindo tomadas de decisão baseadas em dados (Data-Driven).

A aplicação utiliza um script em **Python** para realizar o tratamento estatístico dos dados brutos, integrando o poder de análise de dados com uma interface web amigável.

---

## 🛠 Tecnologias Utilizadas

### Front-end
* **HTML5 & CSS3:** Estruturação e estilização das páginas (Home, Login, Formulários, Dashboards).
* **JavaScript:** Manipulação do DOM e requisições assíncronas.

### Back-end
* **Node.js:** Ambiente de execução.
* **Express:** Framework web (Escolhido pela estrutura de rotas/middlewares).
* **Auth (Middleware):** Sistema de autenticação e proteção de rotas administrativas.

### Dados & Processamento
* **SQL:** Banco de dados relacional (arquivo `students.sql`).
* **Python:** Script `tratamento.py` utilizado para limpeza e análise avançada dos dados coletados.

### Arquitetura
* **MVC:** O projeto segue o padrão Model-View-Controller, separando a lógica de negócios (`controllers`), a interface (`Frontend`) e o acesso a dados (`models`).

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

### Pré-requisitos
* [Node.js](https://nodejs.org/) instalado.
* [Python](https://www.python.org/) instalado (para o script de tratamento).
* [Postgres](https://www.postgresql.org/) intalado e configurado.

### 1. Clonar o Repositório
```bash
git clone [https://github.com/LeoAboard/Student-Interest-Prediction.git](https://github.com/LeoAboard/Student-Interest-Prediction.git)
cd Student-Interest-Prediction
````

### 2\. Instalar Dependências

Instale as bibliotecas do Node.js listadas no `package.json`:

```bash
npm ci
```

### 3\. Configurar o Banco de Dados

1.  Crie um banco de dados no seu SGBD.
2.  Importe o arquivo `students.sql` para criar as tabelas e popular os dados iniciais.
3.  Verifique o arquivo `models/Database.js` e configure suas credenciais de conexão (host, user, password, database).

### 4\. Executar a Aplicação

Inicie o servidor Node.js:

```bash
npm start
```

O servidor deve iniciar (geralmente na porta 3000 ou 8080). Acesse no seu navegador:
`http://localhost:3000`

-----

## 📂 Estrutura de Diretórios Importantes

  * `app.js`: Ponto de entrada da aplicação.
  * `data/tratamento.py`: Script Python responsável pela inteligência de dados.
  * `Frontend/`: Contém todas as telas (Login, Home, Dashboard Adm).
  * `controllers/`: Lógica que controla o fluxo entre a interface e os dados.
  * `models/`: Representação das tabelas do banco (Aluno, Curso, Cidade, etc.).

-----

**Instituto Federal de Mato Grosso do Sul - Campus Três Lagoas**
