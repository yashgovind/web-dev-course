document.addEventListener("DOMContentLoaded", () => {
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");
  const expenseForm = document.getElementById("expense-form");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    
  // render at start.
 
    renderExpenses(expenses);


  function renderExpenses(expenses) {
      // create li , add data-id to butotn, change html , push to the ul . clean out the expenseList at the start
      // render each expense.
      expenseList.innerHTML = "";
      expenses.forEach((expense) => {
          const li = document.createElement("li");
          li.innerHTML =
              `${expense.name} - $${expense.amount.toFixed(2)}
            <button data-id = ${expense.id}>Delete</button>
              `;
             expenseList.appendChild(li);
      });
       getTotal()
  }

  function addExpense() {
    // create new expense with id , push it into expenses. save to local storage and update the total value.
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
    const newExpense = {
      id: Date.now(),
      name,
      amount,
    };
      expenses.push(newExpense);
      saveToLocalStorage();
    getTotal();
  }

  // function to delete expense from local storage if found. and save the remaining.
  function deleteExpense(expenses, id) {
    // find which id  matches the expense , remove that expense from the array if found.
    const expenseId = expenses.findIndex((p) => p.id === id);

    if (expenseId !== -1) {
      expenses.splice(expenseId, 1);
    }
      saveToLocalStorage();
      renderExpenses(expenses);
  }

  //function to save to local storage.
  function saveToLocalStorage() {
    return localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  // function to get sum of expenses. and change html to it.
  function getTotal() {
    const total =  expenses.reduce((sum,expense) => sum + expense.amount, 0);
    totalAmountDisplay.textContent =(total.toFixed(2));
    }
  //function to update the total value and render it on the page.

// event listeners here .

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
         let amount = parseFloat(expenseAmountInput.value);
        if (name === "" || amount < 0 || isNaN(amount)) {
            alert("Please Enter a Valid Amount #-#");
        } else {
          addExpense();
          renderExpenses(expenses);
            
          expenseAmountInput.value = "";
          expenseNameInput.value = ""; // flush out the form values after adding of tasks.
        }
      });
        
     expenseList.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                const expenseId = parseInt(e.target.getAttribute('data-id'));
                deleteExpense(expenses, expenseId); //delete the item.
                saveToLocalStorage();
                renderExpenses(expenses); // render the expenses.
            }
        })
});
