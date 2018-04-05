const input = document.getElementById('inputText')
const output = document.getElementById('output')
const search = document.getElementById('search')

var store = [] // Temporary array

// Function for add list into DOM
const showList = function() {
  output.innerHTML = ""; // Clear the output field
  store.forEach((data, index) => { // Display every single data in store array
    var e = document.createElement('div');
    e.id = index;
    e.innerHTML = `
      <span>${data}</span>
      <i onclick="deleteTodo(${index})" class="fa fa-trash"></i>
      <i onclick="editTodo(${index})" class="fa fa-edit"></i>
    `;
    output.appendChild(e)
  })
}

// Check if localStorage.data exist
if (localStorage.data) {
  store = JSON.parse(localStorage.data) // Add previous data to store array
  showList() // Show list
}

// Function for add todo
const addTodo = function() {
  if(input.value !== ''){
    store.push(input.value) // push data to store array
    localStorage.data = JSON.stringify(store) // Add list to localStorage
    showList() // Show list
    input.value = "";
  } else {
    alert('Todo cant be empty');
  }
}

// Function for delete todo
const deleteTodo = function(index) {
  store.splice(index, 1) // Delete data from store
  localStorage.data = JSON.stringify(store); // Add list to localStorage
  showList() // Show list
}

// Function for clear todo
const clearTodo = function() {
  store = [] // Clear the store array
  output.innerHTML = "" // Clear the list DOM
  localStorage.clear() // Clear the localStorage
}

// Function for edit todo
const editTodo = function(index) {
  var dom = document.getElementById(index);
  dom.innerHTML = `
    <input id="editTodo" type="text" value="${store[index]}">
    <i onclick="submitTodo(${index})" class="fa fa-edit"></i>
  `;
}

// Function for submit edited todo
const submitTodo = function(index, edit){
  var edit = document.getElementById('editTodo').value; // Get the value of the editTodo
  if(edit !== ''){
    store[index] = edit // Edit the store array
    localStorage.data = JSON.stringify(store); // Save to localStorage
    showList() // Show list
  } else {
    alert('Todo cant be empty');
  }
}

// Function for search todo
const searchTodo = function() {
  var text = search.value.toLowerCase() // Get the text and set to lowercase
  let find = store.filter(word => word.toLowerCase().includes(text)); // Filter todo based on textbox
  alert(find.join(', ')) // Alert the result
}
