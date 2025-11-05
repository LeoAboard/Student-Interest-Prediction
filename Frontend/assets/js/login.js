document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const user = document.getElementById("usuario").value.trim();
  const pass = document.getElementById("senha").value.trim();
  const msg = document.getElementById("login-msg");

  // Usuário e senha fixos
  // temos que conectar com o backend
  const credenciais = {
    usuario: "admin",
    senha: "1234"
  };

  if (user === credenciais.usuario && pass === credenciais.senha) {
    msg.style.color = "green";
    msg.textContent = "Login bem-sucedido!";
    setTimeout(() => {
        window.location.href = "adm.html";
    }, 1000);
  } else {
    msg.style.color = "#e63946";
    msg.textContent = "Usuário ou senha incorretos.";

    const ErroSom = new Audio("assets/sounds/error.mp3");
    ErroSom.play();
    
    setTimeout(() => {
        msg.textContent = "";
    }, 2000);
  }
});
