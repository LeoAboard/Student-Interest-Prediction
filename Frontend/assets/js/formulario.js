window.onload = function() {
  alert("Seja bem vindo ao formulário!\n Agradecemos seu apoio com a participação nesse pesquisa.")
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContribuicao");

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

    console.log("Dados coletados do formulário:", dados);

    try {
      const resposta = await fetch("http://localhost:3000/form", {
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
        exibirMensagem(`Erro: ${resultado.error || "Falha no envio."}`, "error");
      }

    } catch (error) {
      console.error(error);
      exibirMensagem("Erro de conexão com o servidor.", "error");
    }
  });

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
