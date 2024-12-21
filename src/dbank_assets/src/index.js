import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function () {
  update();
});

document.querySelector("form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const button = event.target.querySelector("#submit-btn");
  button.setAttribute("disabled", true);

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  if (inputAmount) {
    await dbank.topUp(inputAmount);
  }

  if (outputAmount) {
    await dbank.withdraw(outputAmount);
  }

  await dbank.compound();
  update();

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  button.removeAttribute("disabled");
});

async function update() {
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = currentAmount.toFixed(2);
}
