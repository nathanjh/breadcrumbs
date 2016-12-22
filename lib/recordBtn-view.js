'use babel';
import BreadCrumbs from './breadcrumbs';
import { CompositeDisposable } from 'atom';
import $ from 'jQuery'

export default class RecordBtnView {

  constructor(serializedState) {

    this.element = document.createElement('div');
    this.element.classList.add('bottom-record-btn');

    let recordBtn = document.createElement('input')
    recordBtn.classList.add('input-toggle')
    recordBtn.id = 'recordToggleBtn'
    recordBtn.type = 'checkbox'
    this.element.appendChild(recordBtn)

    let recordingSpinner = document.createElement('span')
    recordingSpinner.classList.add('loading')
    recordingSpinner.classList.add('loading-spinner-tiny')
    recordingSpinner.classList.add('inline-block')
    recordingSpinner.setAttribute('style', 'display: none')
    this.element.appendChild(recordingSpinner)

    this.element.addEventListener("click", (event) => {
      this.toggleRecord(event);
    });

  }; //object ends here

  toggleRecord() {
    if (this.element.children[0].classList.contains('recording-on')) {
      this.element.children[0].classList.remove('recording-on')
      console.log(this.element.children[0].classList)
      this.element.children[1].setAttribute('style', 'display: none;')
      return this.callRecordOff();
    } else {
      this.element.children[0].classList.add('recording-on')
      console.log(this.element.children[0].classList)
      this.element.children[1].setAttribute('style', 'display: true;')
      return this.callRecordOn();
    }
  }

  callRecordOn() {
    BreadCrumbs.recordOn()
  }

  callRecordOff() {
    BreadCrumbs.recordOff()
  }

  serialize() {};

  getElement() {
    return this.element;
  };

  destroy() {
    this.element.remove();
  }; // end of the recordBtn object

}
