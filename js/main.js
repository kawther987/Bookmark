var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var searchInput = document.getElementById("searchInput");
var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");
var nameMsg = document.getElementById("nameMsg");
var urlMsg = document.getElementById("urlMsg");
var bookList = [];
var indexUpdate = 0;

if (localStorage.getItem("books") != null) {
  bookList = JSON.parse(localStorage.getItem("books"));
  displayData();
}

function addBookmark() {
  if (validationName() && validationUrl()) {
    var book = {
      name: capitalize(siteName.value),
      url: siteURL.value,
    };
    bookList.push(book);
    localStorage.setItem("books", JSON.stringify(bookList));
    clearData();
    displayData();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
    sucess();
  }
}

function clearData() {
  siteName.value = "";
  siteURL.value = "";
}

function displayData() {
  var term = searchInput.value;
  var cartona = "";

  for (var i = 0; i < bookList.length; i++) {
    if (bookList[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += ` <tr>
              <td>${i + 1}</td>
              <td>${bookList[i].name}</td>
              <td> 
              <a href="${
                bookList[i].url
              }"  target="_blank" class="btn btn-visit btn-sm">
                 <i class="fas fa-eye "></i>
                 Visit
              </a></td>
              <td> 
              <button class="btn btn-delete btn-sm" onclick="deletItem(${i})">
                <i class="fas fa-trash-can "></i>
                Delete
              </button></td>
              <td>
              <button class="btn update-btn btn-sm" onclick="setData(${i})">
                <i class="fas fa-pen"></i>
                Update
              </button>
            </td>
            </tr>`;
    }
  }
  document.getElementById("tBody").innerHTML = cartona;
}

function deletItem(idx) {
  // console.log(productList);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          {
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          },
          bookList.splice(idx, 1),
          localStorage.setItem("books", JSON.stringify(bookList)),
          displayData()
        );
        // deleteItem(this.value);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}

function setData(idx) {
  indexUpdate = idx;
  var current = bookList[idx];
  siteName.value = current.name;
  siteURL.value = current.url;

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateItem() {
  var book = {
    name: capitalize(siteName.value),
    url: siteURL.value,
  };
  bookList.splice(indexUpdate, 1, book);
  localStorage.setItem("books", JSON.stringify(bookList));
  displayData();
  siteName.classList.remove("is-valid");
  siteURL.classList.remove("is-valid");

  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  clearData();
}

function validationName() {
  var text = siteName.value;
  var regrxName = /^\w{3,9}$/;
  if (regrxName.test(text)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    nameMsg.classList.add("d-none");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    nameMsg.classList.remove("d-none");
    return false;
  }
}

function validationUrl() {
  var regexUrl = /^https?:\/\/(www\.)?.{3,}(\.com)\/?$/gim;
  if (regexUrl.test(siteURL.value)) {
    siteURL.classList.add("is-valid");
    siteURL.classList.remove("is-invalid");
    urlMsg.classList.add("d-none");
    return true;
  } else {
    siteURL.classList.remove("is-valid");
    siteURL.classList.add("is-invalid");
    urlMsg.classList.remove("d-none");
    return false;
  }
}

function capitalize(str) {
  let strArr = str.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}

function sucess() {
  Swal.fire({
    title: "WellDone !",
    text: "Your site is added !",
    icon: "success",
  });
}
