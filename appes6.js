//Building the Book Constructor
class Book{
    constructor(title, author, isbn){

        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}

//Building the UI Constructor
class UI{

    addBookToList(book){

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
    showAlert(message, className){

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
    deleteBook(target){

        if(target.className === 'delete'){

            target.parentElement.parentElement.remove();
    
        }
    }

    //Creating a Method to Clear the Fields when the Submit Button is Hit
    clearFields(){

        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';

    }
}

    //Creating a Local Storage Class
    class Store{

        static getBooks(){

            let books;
            if(localStorage.getItem('books') === null){

                books = []

            }else{

                books = JSON.parse(localStorage.getItem('books'));

            }

            return books;
        }

        static displayBooks(){

            const books = Store.getBooks();
            books.forEach(function(book){

                const ui = new UI;

                //Adding a Book to UI
                ui.addBookToList(book);

            });
        }

        static addBook(book){

            const books = Store.getBooks();
            books.push(book);

            localStorage.setItem('books', JSON.stringify(books));
            
        }

        static removeBook(isbn){

            const books = Store.getBooks();

            books.forEach(function(book, index){

                if(book.isbn === isbn){

                    books.splice(index, 1);

                }
            });

            localStorage.setItem('books', JSON.stringify(books));

        }
    }

    //Creating a DOM Load Event Listener
    document.addEventListener('DOMContentLoaded', Store.displayBooks);


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

        //Adding to Local Storage
        Store.addBook(book);

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

        //Removing Book from Local Storage when it is Deleted by a User
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

        //Showing an Alert when a Book is Removes
        ui.showAlert('Booked Removed!', 'success');

        e.preventDefault();
    });