import { Fragment } from "react";
import ItemCard from "./ItemCard";

export default function ActionModal({ modalClose, me, players, selectedCard, swapCardClicked, giveCardClicked, addCardToTrashClicked }) {
  const isCardOwner = (card) => {
    return me.equipItemIds.includes(card.id) || me.backpackItemIds.includes(card.id)
  }

  return (
    <div class="modal" id="confirmModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <button ref={modalClose} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="modal-body">
            {selectedCard && <ItemCard card={selectedCard} classes="item-card-lg" />}
          </div>
          <div class="modal-footer">
            <div>
              <h5 class="footer-text" id="exampleModalLabel">
                <div><strong>{selectedCard?.showName()}</strong> </div>
                <div dangerouslySetInnerHTML={{ __html: selectedCard?.showDesc() }}></div>
                {selectedCard?.hasSniperSkill() && (
                  <div class="green-text">Sniper</div>
                )}
                {selectedCard?.hasNightVisionSkill() && (
                  <div class="green-text">Night Vision</div>
                )}
                {selectedCard?.hasReloadSkill() && (
                  <div class="alert-text">Reload</div>
                )}
              </h5>
              <hr />
              <div class="d-grid gap-2 footer-button">
                {selectedCard && isCardOwner(selectedCard) && (
                  <Fragment>
                    <button type="button" class="btn btn-primary" onClick={() => swapCardClicked(selectedCard)}>
                      สลับช่อง
                    </button>

                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        มอบให้ผู้เล่นอื่น
                      </button>
                      <ul class="dropdown-menu">
                        {players.filter(_player => _player.sessionId !== me.sessionId).map(player => (
                          <li><div class="dropdown-item" onClick={() => giveCardClicked(selectedCard, player)}>{player.name}</div></li>
                        ))}
                      </ul>
                    </div>
                    
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        ทิ้งการ์ด
                      </button>
                      <ul class="dropdown-menu">
                        <li><div class="dropdown-item" onClick={() => addCardToTrashClicked(selectedCard)}>ยืนยัน</div></li>
                      </ul>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}