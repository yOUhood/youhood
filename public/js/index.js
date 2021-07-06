document.addEventListener("DOMContentLoaded", function (event) {
  const eskudoImages = document.querySelectorAll(".eskudo-image");

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

  const searchInput = document.querySelector("#mate-search");
  searchInput.addEventListener("focusout", () => {
    ///borrar todos esos divs con los nombres de usuario
  });
  searchInput.addEventListener("keyup", (event) => {
    axios
      .get(`http://localhost:3000/users/list?name=${event.target.value}`, {
        method: "get",
        withCredentials: true,
      })
      .then((response) => {
        const users = response.data
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  });
});
