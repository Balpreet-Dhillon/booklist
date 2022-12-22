//Building the Book Constructor
function Book(title, author, isbn){

    this.title = title;
    this.author = author;
    this.isbn = isbn;

}


//Building the UI Constructor
function UI(){}


//Adding a New Book to the List
UI.prototype.addBookToList = function(book){

    //Targeting the Table Body
    const list = document.getElementById('book-list');

    //Creating a New tr Element when Adding a New Book
    const row = document.createElement('tr');

    //Inserting Values Typed in by the User into the Element
    row.innerHTML =`
    
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = "#" class = "delete">X</a></td>
    `;

    //Putting the Table Row Element Created into the Table Body
    list.appendChild(row);
}

//Creating a Method to Show the Alert when Non Valid Information is Submitted
UI.prototype.showAlert = function(message, className){

    //Creating a Div for the Alert Message
    const div = document.createElement('div');

    //Giving the Created Div a Class Name
    div.className = `alert ${className}`;

    //Adding Text to the Created Div
    div.appendChild(document.createTextNode(message));

    //Targeting the Projects Whole Container Div First
    const container = document.querySelector('.container');

    //Then in the Container, Targeting the Form Specifically Where I Want to Add My Alert Before
    const form = document.querySelector('#book-form');

    //Inserting the Created Div into the Container, before the Form Tag
    container.insertBefore(div, form);

    //Adding a Time Limit to the Alert
    setTimeout(function(){

        document.querySelector('.alert').remove();

    }, 3000);
}

//Adding a Method to Delete a Book
UI.prototype.deleteBook = function(target){

    if(target.className === 'delete'){

        target.parentElement.parentElement.remove();

}
}

//Creating a Method to Clear the Fields when the Submit Button is Hit
UI.prototype.clearFields = function(){

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}

//Assigning the Event Listeners for Adding New Book
document.getElementById('book-form').addEventListener('submit', function(e){

        //Getting the Answers that are Typed in by the User
        const title = document.getElementById('title').value,
              author = document.getElementById('author').value,
              isbn = document.getElementById('isbn').value

        //Creating the Book Information Getter
        const book = new Book(title, author, isbn);
        
        //Instantiating the UI
        const ui = new UI();

        //Validating the Typed In Book Information from the User
        if(title === '' || author === '' || isbn === ''){

            //Adding an Alert Message in the UI
            ui.showAlert('Please Fill In All Fields', 'error');


        } else {

        //Adding a New Book to the List
        ui.addBookToList(book);

        //Showing a Successful Alert whem the User Submits Valid Information
        ui.showAlert('Book Added!', 'success');

        //Clearing all of the Text Fields when the User Hits the Submit Button
        ui.clearFields();

        }

    e.preventDefault();
});

//Assigning the Event Listeners for Deleting a Book
document.getElementById('book-list').addEventListener('click', function(e){

    //Instantiating the UI
    const ui = new UI();

    ui.deleteBook(e.target);

    //Showing an Alert when a Book is Removes
    ui.showAlert('Booked Removed!', 'success');

    e.preventDefault();
});


