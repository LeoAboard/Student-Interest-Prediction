document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContribuicao");

  // --- LÓGICA DE ENVIO (SUBMIT) ---
  // Esta parte não muda e já está correta.
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const dados = {};

    formData.forEach((valor, chave) => {
      dados[chave] = valor;
    });

    dados.genero = form.querySelector('input[name="genero"]:checked')?.value || null;
    dados.turno = form.querySelector('input[name="turno"]:checked')?.value || null;
    dados.enem = form.querySelector('input[name="enem"]:checked')?.value || null;

    const eventosSelecionados = Array.from(
      form.querySelectorAll('.opcoes-multiplas input[type="checkbox"]:checked')
    ).map(el => el.parentElement.textContent.trim());
    dados.eventos = eventosSelecionados;

    try {
      const resposta = await fetch("http://localhost:3000/api/alunos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });
      const resultado = await resposta.json();
      if (resposta.ok) {
        exibirMensagem("Formulário enviado com sucesso!", "success");
        form.reset();
      } else {
        exibirMensagem(`Erro: ${resultado.erro || "Falha no envio."}`, "error");
      }
    } catch (erro) {
      console.error(erro);
      exibirMensagem("Erro de conexão com o servidor.", "error");
    }
  });


  // --- LÓGICA DE PREENCHIMENTO (DROPDOWNS) ---

  /**
   * Função auxiliar para popular um <select> com opções.
   * @param {HTMLSelectElement} selectElement - O elemento <select> do HTML.
   * @param {Array} itens - O array de dados vindo da API (ex: data.cidade).
   * @param {string} placeholder - O texto da primeira opção (ex: "Selecione a cidade").
   */
  function popularSelect(selectElement, itens, placeholder) {
    while (selectElement.options.length > 1) {
      selectElement.remove(1);
    }

    const p = selectElement.querySelector('option[disabled]');
    if (p) {
        p.textContent = placeholder || "Selecione uma opção";
    }

    if (itens && Array.isArray(itens)) {
      itens.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id; 
        option.textContent = item.nome;
        selectElement.appendChild(option);
      });
    }
  }

  // Função assíncrona para buscar os dados e popular os dropdowns
  async function popularFormulario() {
    try {
      const resp = await fetch("http://localhost:3000/form");
      if (!resp.ok) {
        throw new Error(`Falha ao buscar dados: ${resp.statusText}`);
      }
      const data = await resp.json();

      console.log("DADOS RECEBIDOS DA API:", data);
    
      // 3. Seleciona os elementos <select>
      const selectCidade = document.getElementById("cidade");
      const selectEscolaridade = document.getElementById("escolaridade");
      const selectUF = document.getElementById("uf");

      // 4. Popula cada <select> com os dados da API
      // (Estou assumindo que a API retorna data.cidade, data.escolaridade e data.uf)
      popularSelect(selectCidade, data.cidade, "Selecione a cidade");
      popularSelect(selectEscolaridade, data.escolaridade, "Selecione a escolaridade");
      popularSelect(selectUF, data.uf, "Selecione o UF"); // Verifique se sua API retorna 'data.uf'

    } catch (erro) {
        console.error("Falha ao buscar dados para o formulário:", erro);
        exibirMensagem("Erro ao carregar opções do formulário.", "error");
    }
  }

  popularFormulario()

    function exibirMensagem(texto, tipo) {
      let msg = document.getElementById("msg");
      if (!msg) {
        msg = document.createElement("p");
        msg.id = "msg";
        msg.style.textAlign = "center";
        msg.style.marginTop = "15px";
        form.after(msg);
      }
      msg.textContent = texto;
      msg.style.color = tipo === "success" ? "green" : "red";
  
      setTimeout(() => {
        msg.textContent = "";
      }, 3000);
    }
});