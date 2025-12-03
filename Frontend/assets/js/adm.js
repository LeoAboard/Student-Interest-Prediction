document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar-menu a");
  const sections = document.querySelectorAll(".adm-section");
  const titulo = document.querySelector(".adm-header h1");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.dataset.target;

      // Remove ativo de todos os links e seções
      links.forEach(l => l.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active"));

      // Ativa o item clicado
      link.classList.add("active");
      document.getElementById(target).classList.add("active");

      // Atualiza o título
      titulo.textContent = link.textContent.trim();
    });
  });
});

// BTN de logout

document.getElementById("logoutBtn").addEventListener("click", async () => {
  const confirmar = confirm("Deseja realmente sair?");

  if (!confirmar) return;

  const resposta = await fetch("/logout", {
    method: "POST",
    credentials: "include"
  });

  const data = await resposta.json();

  if (resposta.status === 201) {
    alert(data.message);
    window.location.href = "/login";
  } else {
    alert("Erro ao deslogar."); //okay
  }
});
