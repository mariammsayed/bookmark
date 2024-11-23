var BookName = document.getElementById('bookname');
var BookUrl = document.getElementById('booklink');

var AllBooks = []
if (localStorage.getItem("Books")) {
    AllBooks = JSON.parse(localStorage.getItem('Books'))
    Display();
}


function SubmitBook(){
    if (Validation(BookName) && Validation(BookUrl)) {
        var NewBook = {
            Name : BookName.value,
            link : BookUrl.value
        }
        AllBooks.push(NewBook);
        localStorage.setItem("Books" , JSON.stringify(AllBooks));
        Display();
        ClearForm();
    }else{
        alert("Please Enter Valid Data");
    }
}

function ClearForm() {
    BookName.value = "";
    BookUrl.value = "";
}

function Display(){
    var Cartona = ``
    for(var i = 0 ; i < AllBooks.length ; i++){
        Cartona+=`
            <tr>
                <td>${i+1}</td>
                <td>${AllBooks[i].Name}</td>
                <td><a href="${AllBooks[i].link}" target="_blank" class="btn btn-primary"><span class="me-1"><i class="fa-regular fa-eye"></i></span>Visit</a></td>
                <td><button onclick="DeleteBook()"  class="btn btn-danger"><span class="me-1"><i class="fa-solid fa-trash"></i></span>Delete</button></td>
            </tr>
        `
    }
    document.getElementById('data').innerHTML = Cartona;
}

function DeleteBook(Index){
    AllBooks.splice(Index,1);
    localStorage.setItem("Books" , JSON.stringify(AllBooks));
    Display();
}

function Validation(element) {
    var Regex = {
        bookname : /^\w{3,}(\s+\w+)*$/,
        booklink :  /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
    }

    if (!Regex[element.id].test(element.value)) {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        return false;
    } else {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        return true;
    }
}