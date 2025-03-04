import classNames from "classnames";

export default function ItemCard({ card, classes = "", onClick = () => {}}) {
  return (
    <img 
      className={classNames("item-card " + classes)}
      src={`img/card_${card.name}.png`} alt={card.name} 
      onClick={(e) => {
        console.log("E: ", e)
        onClick(card)
      }} 
      onDoubleClick={() => console.log("DB CLICK")}
    />
  )
}