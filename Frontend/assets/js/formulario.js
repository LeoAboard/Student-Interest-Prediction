document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContribuicao");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Formulário enviado com sucesso!");
    form.reset();
  });
});
