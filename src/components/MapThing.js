import classNames from "classnames";
import { Fragment } from "react";

export default function MapThing({ mission, onClickThings }) {
  if (!mission)
    return null
  
  return mission.things.map(thing => 
    <Fragment>
      {thing.name ==="door" && 
        <img src={thing.isOpen ? "img/opened_door.png"  : "img/closed_door.png" }
          className={classNames("door hoverable", { ["rotate-" + thing.rotate]: true })} 
          style={thing.position} 
          alt='door' 
          onDoubleClick={() => onClickThings(thing)}
        />
      }
      {thing.name ==="openedDoor" && 
        <img src={"img/opened_door.png" }
          className={classNames("door hoverable", { ["rotate-" + thing.rotate]: true })} 
          style={thing.position} 
          alt='door' 
          onDoubleClick={() => onClickThings(thing)}
        />
      }
      {thing.name ==="exit" && 
        <img src="img/exit.png" 
          className={classNames("spawn-point hoverable", { ["rotate-" + thing.rotate]: true })} 
          style={thing.position} 
          alt='spawn-point' 
          onDoubleClick={() => onClickThings(thing)}
        />
      }
      {thing.name ==="spawnPoint" && 
        <img 
          id={thing.id}
          src="img/spawn_point.png" 
          className={classNames("spawn-point hoverable", { ["rotate-" + thing.rotate]: true })} 
          style={thing.position} 
          alt='spawn-point' 
          onDoubleClick={() => onClickThings(thing)}
        />
      }
    </Fragment>
  )
}