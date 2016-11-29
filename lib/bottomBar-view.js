'use babel';
import BreadCrumbs from './breadcrumbs';

export default class BottomBarView {

  constructor(serializedState) {

    this.element = document.createElement('div');
    this.element.classList.add('bottom-slide');
    // this.element.addEventListener("mousedown", (event) => {
    //   this.mouseDown(event);
    // });
    // this.element.addEventListener("mouseup", (event) => {
    //   this.mouseUp(event);
    // });
    console.log('this: ' + this)
    // Create message element
    let message2 = document.createElement('div');
    console.log(message2)
    message2.textContent = 'The Breadcrumbs';
    console.log(message2.textContent)
    message2.classList.add('message');
    console.log("MESSAGE2: " + message2);
    this.element.appendChild(message2);

    // test the bar
    let test2 = document.createElement('input');
    test2.classList.add('input-range');
    test2.id = 'slideybar2';
    test2.type = 'range';
    test2.min = 0;
    test2.max = 0; // Needs to be the sessionLength() value
    console.log("MAX: ")
    console.log(test2.max)
    test2.step = 1;
    test2.value = test2.max;
    this.element.appendChild(test2);

    let testLabel2 = document.createElement('div');
    testLabel2.id = "slideVal2"
    testLabel2.textContent = test2.value;
    this.element.appendChild(testLabel2);

    barMax2 = test2.max
  }

  serialize() {}

  getElement() {
    return this.element;
  }

  destroy() {
    this.element.remove();
  }
}
