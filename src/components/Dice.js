import classNames from "classnames";
import { createArray } from "../classes/Utils";


export default function DiceComponent({ showDice, rollDiceClicked }) {
  function rollDice() {
    const dice = [...document.querySelectorAll(".die-list")];
    const result = []

    dice.forEach((die) => {
      toggleClasses(die);
      const randomNumber = getRandomNumber(1, 6);
      result.push(randomNumber)
      console.log(randomNumber);
      die.dataset.roll = randomNumber;
    });

    console.log("rollDice")
    rollDiceClicked(result)
  }
  
  function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }
  
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  document.getElementById("roll-button").onclick = rollDice

  return (
  <div class="dice">
    {createArray(showDice).map((key) => (
      <ol class={classNames("die-list", { "even-roll": key % 2 === 0, "odd-roll": key % 2 !== 0   })} data-roll="1" id={`die-${key}`}>
       <li class="die-item" data-side="1">
         <span class="dot"></span>
       </li>
       <li class="die-item" data-side="2">
         <span class="dot"></span>
         <span class="dot"></span>
       </li>
       <li class="die-item" data-side="3">
         <span class="dot"></span>
         <span class="dot"></span>
         <span class="dot"></span>
       </li>
       <li class="die-item" data-side="4">
         <span class="dot"></span>
         <span class="dot"></span>
         <span class="dot"></span>
         <span class="dot"></span>
       </li>
       <li class="die-item" data-side="5">
         <span class="dot"></span>
         <span class="dot"></span>
         <span class="dot"></span>
         <span class="dot"></span>
         <span class="dot"></span>
       </li>
       <li class="die-item" data-side="6">
         <span class="dot"></span>
         <span class="dot"></span>
         <span class="dot"></span>
         <span class="dot"></span>
         <span class="dot"></span>
         <span class="dot"></span>
       </li>
     </ol>
    ))}
    {/* <ol class="die-list even-roll" data-roll="1" id="die-1">
      <li class="die-item" data-side="1">
        <span class="dot"></span>
      </li>
      <li class="die-item" data-side="2">
        <span class="dot"></span>
        <span class="dot"></span>
      </li>
      <li class="die-item" data-side="3">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </li>
      <li class="die-item" data-side="4">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </li>
      <li class="die-item" data-side="5">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </li>
      <li class="die-item" data-side="6">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </li>
    </ol>
    <ol class="die-list odd-roll" data-roll="1" id="die-2">
      <li class="die-item" data-side="1">
        <span class="dot"></span>
      </li>
      <li class="die-item" data-side="2">
        <span class="dot"></span>
        <span class="dot"></span>
      </li>
      <li class="die-item" data-side="3">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </li>
      <li class="die-item" data-side="4">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </li>
      <li class="die-item" data-side="5">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </li>
      <li class="die-item" data-side="6">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </li>
    </ol> */}
  </div>
  )
}