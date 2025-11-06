document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContribuicao");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Capturar os dados do formulário
    const formData = new FormData(form);
    const dados = {};

    // Converter para objeto simples
    formData.forEach((valor, chave) => {
      dados[chave] = valor;
    });

    // Capturar valores de checkboxes e radios adicionais
    dados.genero = form.querySelector('input[name="genero"]:checked')?.value || null;
    dados.turno = form.querySelector('input[name="turno"]:checked')?.value || null;
    dados.enem = form.querySelector('input[name="enem"]:checked')?.value || null;

    // Capturar checkboxes de eventos selecionados
    const eventosSelecionados = Array.from(
      form.querySelectorAll('.opcoes-multiplas input[type="checkbox"]:checked')
    ).map(el => el.parentElement.textContent.trim());
    dados.eventos = eventosSelecionados;

    // Enviar JSON para a API
    try {
      const resposta = await fetch("http://localhost:3000/api/alunos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
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

  // Função para mostrar mensagens temporárias
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
