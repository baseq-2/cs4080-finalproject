var Task = /** @class */ (function () {
    //text: description of task
    //done: is task complete
    function Task(text, done) {
        if (done === void 0) { done = false; }
        this.text = text;
        this.done = done;
    }
    return Task;
}());
//references to HTML
var taskInput = document.getElementById("taskInput");
var addTaskButton = document.getElementById("addTask");
var taskList = document.getElementById("taskList");
//store tasks
var tasks = [];
//add task to list
function addTask() {
    var text = taskInput.value.trim();
    if (text !== '') {
        tasks.push(new Task(text));
        taskInput.value = '';
        toList();
    }
}
//remove task
function removeTask(index) {
    tasks.splice(index, 1);
    toList();
}
//listeners
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
//put takss into a list
function toList() {
    //reset list before re entering tasks to ensure no dupes
    taskList.innerHTML = '';
    //iterate over each task
    tasks.forEach(function (task, index) {
        var _a;
        //for each task create a new li element 
        var item = document.createElement("li");
        //gens HTML for each item in list
        item.innerHTML = "\n            <!--creates check box checked if task complete-->\n            <input type =\"checkbox\" ".concat(task.done ? 'checked' : '', ">\n            <!--displays text of task-->\n            <span>").concat(task.text, "</span>\n            <!--remove task when clicked-->\n            <button onclick=\"removeTask(").concat(index, ")\">Remove</button>\n        ");
        //adds event listener to every checkbox
        (_a = item.querySelector("input")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", function () {
            task.done = !task.done;
            toList();
        });
        taskList.appendChild(item);
    });
}
//display tasks that may already exist in array
toList();
