const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

form.addEventListener("submit", function(event) {
    event.preventDefault(); //デフォルトのイベントを発生しないように中断できる
    add();
});

function add() {
    const li = document.createElement("li");
    li.innerText = input.value;
    li.classList.add("list-group-item"); //HTMLのliにclassを追加
    ul.appendChild(li); //ulのこどもとしてliを追加
    input.value = "";
}