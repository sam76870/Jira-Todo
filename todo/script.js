//dom node
let input = document.querySelector(".input_box");
let ul = document.querySelector(".task-list");
let arr = [];
if (localStorage.getItem("allTask")) {

    let StringArr = localStorage.getItem("allTask");
    //parse
    arr = JSON.parse(StringArr);

    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement("li");
        li.innerText = arr[i];
        li.addEventListener("dblclick", function (e) {
            li.remove();
        })
        li.setAttribute("class", "task");
        ul.appendChild(li);
    }
}
input.addEventListener("keydown", function (e) {
    //e objext -> describe  -> event
    console.log("event object", e);
    if (e.key == "Enter") {
        //console.log("user want to enter a task");
        let task = input.value;
        // console.log(task);
        //create any html tag
        let li = document.createElement("li");
        li.innerText = task;
        if (localStorage.getItem("allTask")) {

            let StringArr = localStorage.getItem("allTask");
            //parse
            arr = JSON.parse(StringArr);
        }
        arr.push(task);
        //set
        let StringArr = JSON.stringify(arr);
        //String
        localStorage.setItem("allTask", StringArr);
        li.addEventListener("dblclick", function (e) {
            li.remove();
        })
        //add my attribute
        li.setAttribute("class", "task");
        ul.appendChild(li);
        input.value = "";
    }
});