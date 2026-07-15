// Filtro do catalogo: busca por texto + categoria.
// Roda tanto na pagina de sensores quanto na de robos.

(function () {
  var grid = document.querySelector("[data-catalogo]");
  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
  var busca = document.querySelector("#busca");
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip"));
  var contador = document.querySelector("#contador");
  var vazio = document.querySelector("#vazio");
  var categoriaAtiva = "todos";

  function aplicar() {
    var termo = (busca ? busca.value : "").trim().toLowerCase();
    var visiveis = 0;

    cards.forEach(function (card) {
      var texto = card.getAttribute("data-nome") + " " + card.getAttribute("data-cat");
      var casaTexto = texto.toLowerCase().indexOf(termo) !== -1;
      var casaCat = categoriaAtiva === "todos" || card.getAttribute("data-cat") === categoriaAtiva;
      var mostrar = casaTexto && casaCat;
      card.style.display = mostrar ? "" : "none";
      if (mostrar) visiveis++;
    });

    if (contador) contador.textContent = visiveis + " de " + cards.length;
    if (vazio) vazio.classList.toggle("show", visiveis === 0);
  }

  if (busca) busca.addEventListener("input", aplicar);

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      chip.setAttribute("aria-pressed", "true");
      categoriaAtiva = chip.getAttribute("data-cat");
      aplicar();
    });
  });

  aplicar();
})();
