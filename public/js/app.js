console.log("client javascript");

const form = document.querySelector("form");
const selectFrom = document.querySelector("#from");
const input = document.querySelector("#amount");
const selectTo = document.querySelector("#to");
const messageOne = document.querySelector("#message-1");

input.addEventListener("mouseout", () => {
  if (input.value == "") input.value = 1;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const FromCurrency = selectFrom.options[selectFrom.selectedIndex].value;
  const ToCurrency = selectTo.options[selectTo.selectedIndex].value;
  const amount = input.value;
  //
  messageOne.textContent = "";
  if (FromCurrency && ToCurrency) {
    fetch("/exchange?from=" + FromCurrency + "&to=" + ToCurrency).then(
      (response) => {
        response.json().then((data) => {
          if (typeof data == "number") {
            messageOne.textContent =
              amount +
              " " +
              FromCurrency +
              " = " +
              amount * data +
              " " +
              ToCurrency;
          } else {
            messageOne.textContent = data;
          }
        });
      }
    );
  }
});
