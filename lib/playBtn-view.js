'use babel';
import BreadCrumbs from './breadcrumbs';
import { CompositeDisposable } from 'atom';
// import $ from 'jQuery'

export default class PlayBtnView {

  constructor(serializedState) {

    this.element = document.createElement('div');
    this.element.classList.add('bottom-play-btn');
    // Create message element
    let playBtnDiv = document.createElement('div');
    playBtnDiv.id = 'playBtnDiv'
    this.element.appendChild(playBtnDiv)

    let playBtn = document.createElement('span');
    playBtn.id = 'playBtn'
    playBtn.classList.add('icon')
    playBtn.classList.add('icon-pencil')
    playBtnDiv.appendChild(playBtn)

    playBtn.onclick = function() {
      console.log("clicked the play button")
    }

}; //object ends here
  serialize() {}

  getElement() {
    return this.element;
  }

  destroy() {
    this.element.remove();
  }
}
