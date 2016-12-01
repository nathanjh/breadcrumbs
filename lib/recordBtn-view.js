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
    this.element.appendChild(recordingSpinner)

    this.element.addEventListener("click", (event) => {
      this.toggleRecord(event);
    });

  }; //object ends here

  // Record functions causing error at path from breadcrubms.js. Commenting out callRecordOn() and callRecordOff() until issue is fixed.

  toggleRecord() {
    if (this.element.children[0].hasAttrbute('recording-on')) {
      this.element.children[0].classList.remove('recording-on')
      console.log(this.element.children[0].classList)
      // this.callRecordOff();
    } else {
      this.element.children[0].classList.add('recording-on')
      console.log(this.element.children[0].classList)
      // this.callRecordOn();
    }
  }

  callRecordOn() {
    BreadCrumbs.recordOn()
  }

  // function was originally called CallRecordOn(). Changed to CallRecordOff. Content was correct already so only changed the function name.
  callRecordOff() {
    BreadCrumbs.recordOff()
  }
  // 'must have' functions that are scoped to this object start here:

  serialize() {};

  getElement() {
    return this.element;
  };

  destroy() {
    this.element.remove();
  }; // end of the recordBtn object


  // this.createRecListener()

}
