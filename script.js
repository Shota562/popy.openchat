const btn = document.getElementById("my-btn");

btn.addEventListener("click", function () {

  // ★ここで取得する
  const announceEl = document.getElementById("announce");
  const announce = announceEl.value || announceEl.placeholder;

  const message = document.getElementById("message").value;
  const result  = document.getElementById("result");

  // 結果エリアを表示
  result.style.display = "block";

  // 未入力チェック
  if (message.trim() === "") {
    result.textContent = "照合したいアナウンスを入力してください ⚠️";
    result.style.color = "yellow";
    return;
  }

  // 前後の空白・改行を除去して比較（重要）
  if (announce.trim() === message.trim()) {
    result.textContent = "一致しています ✅";
    result.style.color = "lime";
  } else {
    result.textContent = "一致していません ❌";
    result.style.color = "red";
  }
});
