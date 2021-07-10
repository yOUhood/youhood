document.addEventListener("DOMContentLoaded", function (event) {
  const eskudoImages = document.querySelectorAll(".eskudo-image");
  const searchResultDiv = document.querySelector("#search-mate-results")
  const searchInput = document.querySelector("#mate-search");
  const recipientIdInput = document.querySelector("#recipient-id")

  eskudoImages.forEach((eskudo) => {
    const input = eskudo.previousElementSibling;
    eskudo.addEventListener("click", () => {
      eskudoImages.forEach((eskudoImg) => {
        if (eskudoImg !== eskudo) {
          eskudoImg.classList.remove("image-checked");
          let input = eskudoImg.previousElementSibling;
          input.checked = false;
        }
      });

      input.checked = !input.checked;
      if (input.checked) {
        eskudo.classList.add("image-checked");
      } else {
        eskudo.classList.remove("image-checked");
      }
    });
  });


  // searchInput.addEventListener("focusout", () => {
  //   searchResultDiv.innerHTML = ''
  // });
  if (searchInput) {
    searchInput.addEventListener("focus", (event) => {
      const inputValue = event.target.value.split(' ')

      if (event.target.value === "") {
        searchResultDiv.innerHTML = ''
      } else {
        axios
          .get(`http://localhost:3000/users/list?name=${inputValue[0]}&lastName=${inputValue.length > 1 ? inputValue[1] : ''}`, {
            method: "get",
            withCredentials: true,
          })
          .then((res) => {
            searchResultDiv.innerHTML = ''
            res.data.forEach(user => {
              searchResultDiv.appendChild(createMateBox(user))
            })
          })
          .catch((err) => console.log(err));
      }

    });
  }

  const createMateBox = (user) => {

    let divName = document.createElement('div')
    divName.classList.add("search-result-box")
    divName.appendChild(document.createTextNode(`${user.name} ${user.lastName}`))
    divName.addEventListener("click", () => {
      searchInput.value = `${user.name} ${user.lastName}`
      recipientIdInput.value = user._id
      searchResultDiv.innerHTML = ''
    })
    return divName
  }
  if (searchInput) {
    searchInput.addEventListener("keyup", (event) => {
      const inputValue = event.target.value.split(' ')

      if (event.target.value === "") {
        searchResultDiv.innerHTML = ''
      } else {
        axios
          .get(`https://youhood.herokuapp.com/users/list?name=${inputValue[0]}&lastName=${inputValue.length > 1 ? inputValue[1] : ''}`, {
            method: "get",
            withCredentials: true,
          })
          .then((res) => {
            searchResultDiv.innerHTML = ''
            res.data.forEach(user => {
              searchResultDiv.appendChild(createMateBox(user))
            })
          })
          .catch((err) => console.log(err));
      }

    });
  }

  // Get the modal
  const modal = document.querySelector(".myModal");
  const modalImg = document.querySelector(".imageUploaded");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  const images = document.querySelectorAll(".photoUploaded");
  images.forEach(img => {
    img.onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
    }
  })
  // Get the <span> element that closes the modal
  const spanClose = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  spanClose.onclick = function () {
    modal.style.display = "none";
  }

  const modal2 = document.querySelector(".myModal2");
  const modalcard = document.querySelector(".modalcard");
  const teamMateDivs = document.querySelectorAll(".teamMateDiv");

  const modal2photo = document.querySelector(".modalPhoto")
  const modal2Name = document.querySelector(".teamMateName")
  const modal2Email = document.querySelector(".teamMateEmail")
  const modal2Phone = document.querySelector(".teamMatePhone")
  const modal2Office = document.querySelector(".teamMateOffice")
  const modal2StartDate = document.querySelector(".teamMateStartDate")

  teamMateDivs.forEach(div => {
    console.log(div.dataset)
    div.onclick = function () {
      modal2.style.display = "block";
      modal2photo.src = div.dataset.photo;
      modal2Name.innerText = div.dataset.name;
      modal2Email.innerText = div.dataset.email.toLowerCase();
      modal2Phone.innerText = div.dataset.phone;
      modal2Office.innerText = div.dataset.office;
    }
  })
  const spanClose2 = document.getElementsByClassName("close")[1];

  spanClose2.onclick = function () {
    modal2.style.display = "none";
  }
});



