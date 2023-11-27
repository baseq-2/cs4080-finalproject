class Task
{
    //text: description of task
    //done: is task complete
    constructor(public text: string, public done: boolean = false)
    {
    }
}

//references to HTML
const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addTaskButton = document.getElementById("addTask") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

//store tasks
const tasks: Task[] = [];

//add task to list
function addTask() 
{
    const text = taskInput.value.trim();

    //if not empty add to task list
    if (text !== '') 
    {
        tasks.push(new Task(text));
        taskInput.value = '';
        toList();
    }
}

//remove task
function removeTask(index: number)
{
    tasks.splice(index,1);
    toList();
}

//listeners
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keyup", event => {
    if (event.key === "Enter")
    {
        addTask();
    }
});

//put takss into a list
function toList()
{
    //reset list before re entering tasks to ensure no dupes
    taskList.innerHTML = '';

    //iterate over each task
    tasks.forEach((task, index) => {
        //for each task create a new li element 
        const item = document.createElement("li");
            //gens HTML for each item in list
            item.innerHTML = `
            <!--creates check box checked if task complete-->
            <input type ="checkbox" ${task.done ? 'checked' : ''}>
            <!--displays text of task-->
            <span>${task.text}</span>
            <!--remove task when clicked-->
            <button onclick="removeTask(${index})">Remove</button>
        `;
        //adds event listener to every checkbox
        item.querySelector("input")?.addEventListener("change", () => {
            task.done = !task.done;
            toList();
        });
        taskList.appendChild(item);
    });
}


//display tasks that may already exist in array
toList();