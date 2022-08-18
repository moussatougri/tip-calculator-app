//selektoren
const tipForm = document.querySelector(".form");

//state
const state = {
  items: [],
};

//press enter
tipForm.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const array = Array.from(tipForm).reduce(
      (acc, input) => ({ ...acc, [input.name]: input.value }),
      {}
    );

    state.items.push(array);

    console.log(state);
  }
});
