document.addEventListener("DOMContentLoaded", () => {
    //selectors
    const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-task-btn");
    const list = document.getElementById("todo-list");
  
    // state variables
    let tasks = JSON.parse(localStorage.getItem("task")) || []; // state variable to store the tasks.
    // if tasks array is not empty array we can store each task in local storage.
  
    // Render each task on load
    tasks.forEach((task) => renderTask(task)); 
  
    function addTask() {
      // get input, create new task with id, text, and status, push it into the array, render a single task
      const inputVal = input.value.trim();
      if (inputVal === "") return;
  
      const newtask = {
        id: Date.now(),
        completed: false,
        text: inputVal,
      };
  
      tasks.push(newtask);
      //possibly here i can add sort.
      // sorterMaharaj(tasks); // to be debugged.  idk why it gives me error.
      saveTask(); // save to local storage
      renderTask(newtask); // render the new task
      input.value = ""; // clear the input field
    }
  
    function deleteTask(task,id) {
      // Filter out the task and save it to local storage
      tasks = tasks.filter(t => t.id !== id);
      saveTask(); // save to local storage
    }
  
    function renderTask(task) {
      // create li, set its id attribute, change textContent, add to the list
      const li = document.createElement("li");
      li.dataset.id = task.id; // set id of li
  
      // if task is completed, add its CSS to strike effect
      if (task.completed) {
        li.classList.add("completed");
      }
  
      li.innerHTML = `
          <span>${task.text}</span>
          <button class = "delete-btn">Delete</button>
      `;
      list.appendChild(li);
  
      // Handle delete button click
      li.querySelector(".delete-btn").addEventListener("click", (e) => {
        deleteTask(task, task.id); // remove task from array
        li.remove(); // remove task from DOM
        // list.innerHTML = ""; // clear the list.
      });
      // Toggle between completed and not completed when not clicked on button.
      li.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") return; // Ignore click on button
        toggleTask(task);
        li.classList.toggle("completed"); // Add/remove completed class
        saveTask(); // Save updated tasks to local storage
      });
      
    }
  
  
    function toggleTask(task) {
      return (task.completed = !task.completed); // Toggle completion status
    }
  
    function saveTask() {
      // Save tasks in local storage
      localStorage.setItem("task", JSON.stringify(tasks));
    }
  
  // function to sort the date by their date... plan to add this functionality../
  // function sorterMaharaj(tasks) {
  //  return tasks.sort((a, b) => a.id > b.id);
  // } idk why it doesnt work but it doesnt.

  
    addBtn.addEventListener("click", addTask); // Event listener for adding tasks
});
  
// i wrote pretty newb code here , i currently do not posses the skills to add features in this , but if in the future i do i will add more features in it.
  