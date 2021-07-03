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
});
