//selektoren
const tipForm = document.querySelector(".form");
const numberOfPeopleInp = document.querySelector(".numberPeople");
const billInp = document.querySelector(".bill");
const numberGroup = document.querySelector(".number-group");
const billGroup = document.querySelector(".bill-group");
const customTips = document.querySelector(".custom-tip");
const radios = document.getElementsByName("tipButton");
const displayTotal = document.querySelector(".display-total");
const displayTipAmount = document.querySelector(".display-amount");
const resetBtn = document.querySelector(".reset-button");

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
      // check if radio button checked
      if (customTips.value <= 0) {
        for (let i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
            state.datas.push({
              bill: billInp.value,
              tip: radios[i].value,
              customTip: customTips.value,
              numberPeople: numberOfPeopleInp.value,
            });
            console.log(state.datas);
          }
        }
      } else {
        state.datas.push({
          bill: billInp.value,
          tip: "",
          customTip: customTips.value,
          numberPeople: numberOfPeopleInp.value,
        });
        console.log(state.datas);
      }

      calculateData();
    }
});

//Calculate data
const calculateData = () => {
  state.datas.forEach(function (data) {
    //convert string in to number
    const convertBill = parseFloat(data.bill).toFixed(2);
    const convertNumberOfPeople = parseInt(data.numberPeople);
    const convertTip = parseFloat(data.tip).toFixed(2);
    const convertCostumTip = parseFloat(data.customTip).toFixed(2);

    //calculate Total pro Person

    const totalPerson = (convertBill / convertNumberOfPeople).toFixed(2);

    //calculate tip pro Person
    const tipAmount = (
      (convertBill * convertTip) /
      convertNumberOfPeople
    ).toFixed(2);

    //calculate custon tip pro Person
    const tipAmountCostum = (
      (convertBill * convertCostumTip) /
      100 /
      convertNumberOfPeople
    ).toFixed(2);

    //custom tip is preferred here
    if (customTips.value > "0") {
      //update display Tip Amount
      displayTipAmount.innerText = `$${tipAmountCostum}`;
    } else {
      //update display Tip Amount

      displayTipAmount.innerText = `$${tipAmount}`;
    }

    //update display Total Person
    displayTotal.innerText = `$${totalPerson}`;
  });
};

//reset all Values
const resetValue = () => {
  //selector
  tipForm.reset();
  displayTipAmount.innerHTML = "$0.00";
  displayTotal.innerHTML = "$0.00";
};

resetBtn.addEventListener("click", resetValue);
