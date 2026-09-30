// Botão "Copiar" dos blocos de código da página Tinkercad.
document.querySelectorAll('.copy').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var code = document.getElementById(btn.dataset.target);
    if (!code) return;
    var done = function (msg) {
      btn.textContent = msg;
      setTimeout(function () { btn.textContent = 'Copiar'; }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code.innerText).then(
        function () { done('Copiado'); },
        function () { done('Falhou'); }
      );
    } else {
      var range = document.createRange();
      range.selectNodeContents(code);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      done(document.execCommand('copy') ? 'Copiado' : 'Falhou');
      sel.removeAllRanges();
    }
  });
});
