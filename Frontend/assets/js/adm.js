document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar-menu a");
  const sections = document.querySelectorAll(".adm-section");
  const titulo = document.querySelector(".adm-header h1");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.dataset.target;

      links.forEach(l => l.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active"));

      link.classList.add("active");
      document.getElementById(target).classList.add("active");

      titulo.textContent = link.textContent.trim();
    });
  });

  // SERVICE TOKEN enviado pelo backend
  const SERVICE_TOKEN = "SEU_TOKEN_AQUI"; // Aqui que coloca aquele token amigo
  async function enviarRequisicao(payload) {
    try {
      const res = await fetch("/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": SERVICE_TOKEN
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Erro ao consultar backend.");
      }

      return res.json();
    } catch (error) {
      console.error("Erro:", error);
      alert("Falha ao consultar servidor.");
      return null;
    }
  }

  document.getElementById("btnContagem").addEventListener("click", async () => {
    const ano = document.getElementById("anoGeral").value;
    const resultDiv = document.getElementById("resultadoContagem");

    const payload = {
      ano_limite: ano,
      contagem: true
    };

    const data = await enviarRequisicao(payload);
    if (!data) return;

    // Data é um JSON: [{"count": 150}]
    try {
      const obj = data[0];
      resultDiv.innerHTML = `
        <table class="tabela-adm">
          <tr><th>Total de inscritos</th></tr>
          <tr><td>${obj.count}</td></tr>
        </table>
      `;
    } catch {
      resultDiv.innerHTML = "Erro ao processar resposta.";
    }
  });

  document.getElementById("btnEnem").addEventListener("click", async () => {
    const ano = document.getElementById("anoEnem").value;

    const payload = {
      ano_limite: ano,
      enem: true
    };

    const data = await enviarRequisicao(payload);
    if (!data) return;

    document.getElementById("imgEnem").src = `data:image/png;base64,${data.image}`;
  });

  document.getElementById("btnCidade").addEventListener("click", async () => {
    const ano = document.getElementById("anoCidade").value;

    const payload = {
      ano_limite: ano,
      localizacao: true
    };

    const data = await enviarRequisicao(payload);
    if (!data) return;

    document.getElementById("imgCidade").src = `data:image/png;base64,${data.image}`;
  });

  document.getElementById("btnRedes").addEventListener("click", async () => {
    const ano = document.getElementById("anoRedes").value;

    const payload = {
      ano_limite: ano,
      redes_sociais: true
    };

    const data = await enviarRequisicao(payload);
    if (!data) return;

    document.getElementById("imgRedes").src = `data:image/png;base64,${data.image}`;
  });

  document.getElementById("btnTurno").addEventListener("click", async () => {
    const ano = document.getElementById("anoTurno").value;

    const payload = {
      ano_limite: ano,
      turno: true
    };

    const data = await enviarRequisicao(payload);
    if (!data) return;

    document.getElementById("imgTurno").src = `data:image/png;base64,${data.image}`;
  });

});

// -----------logout---------------------------
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
    alert("Erro ao deslogar.");
  }
});
