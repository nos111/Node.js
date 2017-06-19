// require filesystem library because we are going to write and read files
var fs = require('fs');

//this object will contain the todo's info and will be written to the todosFile 
// I have chosen this to be a JSON because we can use the JSON proberities on it
let todosFile = JSON.parse(fs.readFileSync('todo.json','UTF-8'))
console.log(todosFile)

//shorten the arguments array to the arguments we need
//take out the first two arguments which are the node path and the file path
let options = process.argv.slice(2);

//check which command we have got from the user, which is the first argument in our new arguments array
let command = options[0];

//evaluate which action to take based on the command the user entered.
switch (command) {
    //if the user enter the word help as command
    //we will display an introduction to all the commands available
    //We will do it,through calling the functions showHelp
    case 'help':
        showHelp();
        break;
    //when the user enters the add command a new todo is added to his todoList
    //this is done via the addTodoItem function
    case 'add':
        addTodoItem(todosFile,options);
        break;
    //if the user enter the command remove, followed by the item number, the item will be removed.
    //the functions removeTodoItem will remove the item with the number the user entered
    case 'remove':
        removeTodoItem(todosFile,options);
        break;
    //when the user asks for list, he should get the list of todos he has
    //the list should be numbered with human numbers
    //the function listTodos is invoked in this case which will log the proper response
    case 'list':
        listTodos(todosFile);
        break;
    //the reset command will remove all the items in the todoList
    //when this command is received the function resetTdosList is invoked, which will remove all the items in the todos
    case 'reset':
        //resetTodosList();
        break;
    //if the user doesn't enter a valid command, he will be prombted and
    //he will get the help file to learn how to use the commands proberly
    default :
        console.log('Please enter a valid command')
        showHelp();
}

//this function will read the help file and display it to the user.
//it doesn't take any parameters but depends on the file help.txt
function showHelp() {	
 const helpText =  fs.readFileSync('./help.txt',{encoding:'UTF-8'});
    console.log(helpText)
}

//add an item to the todo list
//this functions takes the todoFile json and the commands array as parameters. 
//It adds the new items to it and at the end it will write it the new object to the Todo file
//this way we can save our new todos and keep our old ones
function addTodoItem(jsonObject,commands) {
    //assign the task text to a variable.
    let itemToAdd = commands[1];
    //check if the user has entered text or not
    if(itemToAdd === undefined || itemToAdd.length < 1){
        console.log('Please enter a name for your task')
    }else{
        //push the text the user entered to our data file
        jsonObject.tasks.push(itemToAdd);
        //write the modified object to the todo File
        console.log(jsonObject.tasks);
        jsonObject = JSON.stringify(jsonObject);
        return fs.writeFile('todo.json',jsonObject);
    }
}

//removes an item from the todo list
//takes the todosFile json and the commands array as parameters.
//updates the todofile at the end when it's done removing the tasks
function removeTodoItem (jsonObject,commands) {
    //assign the task number to a variable
    let itemToRemove = commands[1];
    //checkc if the task number exists and makes sense
    if(itemToRemove > jsonObject.tasks.length + 1) {
        console.log('This item does not exist');
    }else{
        //remove the task from the jsonObject
        jsonObject.tasks.splice(itemToRemove - 1,1)
        console.log(jsonObject)
        //write the changed object to our Todofile to save the changes
        jsonObject = JSON.stringify(jsonObject);
        return fs.writeFile('todo.json',jsonObject);
    }
}

//this function will show the user the todolist
//it takes the todos json and returns a string that will be console loged to the user
//it will be invoked when the user enters the command 'list'
function listTodos(jsonObject) {
    //first of all check if we have tasks to do
    if(jsonObject.tasks.length > 0){
        //take the tasks array from the json object
        let itemsToDisplay = jsonObject.tasks;
        //build first line of the string to display
        let textToDisplay = 'You have ' + itemsToDisplay.length + ' things to do';
        itemsToDisplay.forEach(function(item,index){
            //add on a new line the index of the task and the name of it
           textToDisplay = textToDisplay + '\n' + (index + 1) + ' ' + item;
        });
        console.log(textToDisplay)
    }else{
        console.log('No tasks to display');
    }
}

function splitStringByNewline(string) {
  return string.split('\n').filter(function(element) {
    element = element.trim();
    return element.length > 0;
  });
}



//function listTodos() {
//  openFile('todo.txt', function(error, data) {
//    if (error) {
//      if (error.code === 'ENOENT') {
//        return console.log('Nothing to do! (or your dog ate your todo list)');
//      } else {
//        return console.log('Error: Something went wrong', error);
//      }
//    }
//
//    var todos = splitStringByNewline(data);
//
//    if (todos.length === 0) {
//      return console.log('Nothing to do!')
//    }
//
//    console.log('Your todo list looks like this');
//    todos.forEach(function(element, index) {
//      index = (index + 1).toString();
//      console.log(index, element);
//    });
//
//    if (todos.length > 5) {
//      console.log('You have too much to do!');
//    }
//  })
//  
//}

function openFile(fileName, callback) {
  fs.readFile(__dirname + '/' + fileName, 'utf8', function(error, data) {
    callback(error, data);
  });
}
