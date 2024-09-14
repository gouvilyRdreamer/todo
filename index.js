const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

form.addEventListener("submit", function(event) {
    event.preventDefault(); //デフォルトのイベントを発生しないように中断できる
    add();
});

function add() {
    let todoText = input.value.trim();
    if (todoText.length > 0 && !isDuplicate(todoText)) { // 重複チェックを追加
        const li = document.createElement("li");
        li.innerText = todoText;
        li.classList.add("list-group-item"); //HTMLのliにclassを追加
        ul.appendChild(li); //ulのこどもとしてliを追加
        todoText = "";
    }
}

function isDuplicate(todoText) {
    const items = ul.getElementsByTagName("li");
    for (let i = 0; i < items.length; i++) {
        if (items[i].innerText === todoText) {
            return true; // 重複している場合
        }
    }
    return false; // 重複していない場合
}
