const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach(todo => {
        add(todo);
    })
}

form.addEventListener("submit", function(event) {
    event.preventDefault(); //デフォルトのイベントを発生しないように中断できる
    add(); //画面に追加
    clearInput(); //プレースホルダーを空に
});

function add(todo) {
    let todoText = input.value.trim();
    if (todo) {
        todoText = todo;
    }
    if (todoText.length > 0 && !isDuplicate(todoText)) { // 重複チェックを追加
        const li = document.createElement("li");
        li.innerText = todoText;
        li.classList.add("list-group-item"); //HTMLのliにclassを追加
        ul.appendChild(li); //ulのこどもとしてliを追加
        todoText = "";
        saveData(); //画面リロードしても消えないように保存
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

function saveData() {
    const lists = document.querySelectorAll("li");
    let todos = [];
    lists.forEach(list => {
        todos.push(list.innerText);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function clearInput() {
    input.value = "";
}