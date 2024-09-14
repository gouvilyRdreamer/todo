const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

form.addEventListener("submit", function(event) {
    event.preventDefault(); //デフォルトのイベントを発生しないように中断できる
    add();
});

function add() {
    let todoText = input.value;
    if (todoText.length > 0) {
        const li = document.createElement("li");
        li.innerText = todoText;
        li.classList.add("list-group-item"); //HTMLのliにclassを追加
        ul.appendChild(li); //ulのこどもとしてliを追加
        todoText = "";
    }
}