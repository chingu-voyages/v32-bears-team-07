import React from "react";
import "./multi-party-stripe.css";

const MultipartyStripe = () => {
  // let elmButton = document.querySelector("#submit");

  // if (elmButton) {
  //   elmButton.addEventListener(
  //     "click",
  //     (e) => {
  //       elmButton.setAttribute("disabled", "disabled");
  //       elmButton.textContent = "Opening...";

  //       // Change url when hosted
  //       fetch("localhost:5000/api/payment/onboard-user", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (data.url) {
  //             window.location = data.url;
  //           } else {
  //             elmButton.removeAttribute("disabled");
  //             elmButton.textContent = "<Something went wrong>";
  //             console.log("data", data);
  //           }
  //         });
  //     },
  //     false
  //   );
  // }

  const onBoardUser = () => {
    fetch("http://localhost:5000/api/payment/onboard-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          window.location = data.url;
        } else {
          // elmButton.removeAttribute("disabled");
          // elmButton.textContent = "<Something went wrong>";
          console.log("data", data);
        }
      });
  };
  return (
    <button
      id="submit"
      onClick={() => {
        onBoardUser();
      }}
    >
      Setup payouts on Stripe
    </button>
  );
};

export default MultipartyStripe;
