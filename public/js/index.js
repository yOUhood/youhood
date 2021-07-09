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

  const createMateBox = (user) =>  {
    
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

  // Get the modal
const modal = document.querySelector(".myModal");
// Get the image and insert it inside the modal - use its "alt" text as a caption
const img = document.querySelector(".photoUploaded");
const modalImg = document.querySelector(".imageUploaded");
img.onclick = function(){
  modal.style.display = "block";
  // modalImg.src = this.src;
}

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
});
