function showAllBook(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/books/list",
        success: function (book){
            let content = "";
            for (let i = 0; i < book.length; i++) {
                content+=`<tr>
        <th scope="row">${book[i].id}</th>
        <td><img src="${'http://localhost:8080/image/' + book[i].avatar}" width="100px"></td>
        <td>${book[i].name}</td>
        <td>${book[i].author}</td>
        <td>${book[i].price}</td>
        <td>${book[i].category.name}</td>
        <td><button class="btn btn-primary" onclick="showEditForm(${book[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Update</button></td>
        <td><button class="btn btn-primary" onclick="deleteBook(${book[i].id})">Delete</button></td>
    </tr>`
            }
            $("#list-book").html(content);
        }
    })
}
showAllBook();

function showCate(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/books/cate",
        success: function (cate){
            let content = "";
            for (let i = 0; i < cate.length; i++) {
                content +=`<option value="${cate[i].id}">${cate[i].name}</option>`
            }
            $("#category").html(content);
        }

    })
}
showCate();

// function showCate1(){
//     $.ajax({
//         type:"GET",
//         url:"http://localhost:8080/books/cate",
//         success: function (cate){
//             let content = "";
//             for (let i = 0; i < cate.length; i++) {
//                 content +=`<option value="${cate[i].id}">${cate[i].name}</option>`
//             }
//             $("#category1").html(content);
//         }
//
//     })
// }
// showCate1();

function addNewBook() {
    //lay du lieu
    let name = $('#name').val();
    let author = $('#author').val();
    let price = $('#price').val();
    let category = $('#category').val();
    let avatar = $('#avatar');
    let newBook = new FormData();
        newBook.append('name', name);
        newBook.append('author', author);
        newBook.append('price', price);
        newBook.append('category', category);
        newBook.append('avatar', avatar.prop('files')[0]);
    // goi ajax
    $.ajax({

        type: "POST",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        url: "http://localhost:8080/books/create",
        data: newBook,
        success: showAllBook
    });
    event.preventDefault();
}

function deleteBook(id){
    $.ajax({
        type:"DELETE",
        url:`http://localhost:8080/books/${id}`,
        success: showAllBook
    })
}
function updateBook(id){
    let name = $(`#name1`).val();
    let author = $(`#author1`).val();
    let price = $(`#price1`).val();
    let category = $(`#category1`).val();
    let avatar = $('#avatar1').val();
    let book = {
        "avatar": avatar,
        "name" : name,
        "price" : price,
        "author": author,
        "category" : {
            id : category
        }
    }
    $.ajax({
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        type:"PUT",
        data: JSON.stringify(book),
        url:`http://localhost:8080/books/${id}`,
        success:showAllBook
    })
}
function showEditForm(id){
    let content = `<div class="container">
                    <form>
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name1" >
                        </div>
                        <div class="mb-3">
                            <label for="author" class="form-label">Auhtor</label>
                            <input type="text" class="form-control" id="author1">
                        </div>
                        <div class="mb-3">
                            <label for="price" class="form-label">Price</label>
                            <input type="text" class="form-control" id="price1">
                        </div>
                        <tr>
                        <div>
                        <label>Category:</label>
                        <select name="category" id="category">
                        </select>
                        </div>
                        </tr>
                        <div class="mb-3">
                            <label for="avatar" class="form-label">Image</label>
                            <div id="showImg"></div>
                            <input type="file" class="form-control" id="avatar1">
                        </div>
                        <div class="modal-footer">
                             <button type="submit" class="btn btn-primary" onclick="updateBook(${id})">Edit</button>
                             <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>`
    $("#showModalEdit").html(content);
    $.ajax({
        type:"GET",
        url:`http://localhost:8080/books/${id}`,
        success:function (book){
            $('#name1').val(book.name)
            $('#price1').val(book.price)
            $('#author1').val(book.author)
            $('#category').val(book.description)
            let img = `<img src="http://localhost:8080/image/${book.avatar}" width="100">`
            $(`#showImg`).html(img)
        }
    })
}