//selektoren
const tipForm = document.querySelector(".form");
const numberOfPeopleInp = document.querySelector(".numberPeople");
const billInp = document.querySelector(".bill");
const numberGroup = document.querySelector(".number-group");
const billGroup = document.querySelector(".bill-group");

//state
const state = {
  datas: [],
};

//press enter
tipForm.addEventListener("keyup", function (event) {
  //form validation
  if (event.key === "Enter")
    if (numberOfPeopleInp.value === "0" || billInp.value === "0") {
      //validaton on number of People section
      numberOfPeopleInp.style.border = "1px solid #ff0000";
      const label = document.createElement("label");
      label.for = "number-people";
      label.classList.add("valid-label");
      label.innerText = "Can`t be zero";
      numberGroup.insertBefore(label, numberGroup.children[1]);

      //validaton on bill section
      billInp.style.border = "1px solid #ff0000";
      const billLabel = document.createElement("label");
      billLabel.for = "bill";
      billLabel.classList.add("bill-label");
      billLabel.innerText = "Can`t be zero";
      billGroup.insertBefore(billLabel, billGroup.children[1]);
    } else {
      event.preventDefault();
      const array = Array.from(tipForm).reduce(
        (acc, input) => ({ ...acc, [input.name]: input.value }),
        {}
      );
      state.datas.push(array);
      calculateData();
    }
});

//Calculate data
const calculateData = () => {
  console.log(state.datas);
  state.datas.forEach(function (data) {
    //convert string in to number
    const convertBill = parseFloat(data.bill).toFixed(2);
    const convertNumberOfPeople = parseInt(data.numberPeople);
    const convertTip = parseFloat(data.tipButton).toFixed(2);
    const convertCostumTip = parseFloat(data.custom).toFixed(2);

    //calculate Total pro Person
    console.log(convertBill);
    console.log(convertNumberOfPeople);
    const totalPerson = (convertBill / convertNumberOfPeople).toFixed(2);
    console.log(totalPerson);

    //update display Total Person
    const displayTotal = document.querySelector(".display-total");
    displayTotal.innerText = `$${totalPerson}`;
  });
};
