'use babel';

export default class BreadcrumbsView {

// another test conflict
  constructor(serializedState, currentVal, newVal) {
    // Create root element
    currentVal = null;
    newVal = null;
    this.element = document.createElement('div');
    this.element.classList.add('breadcrumbs');
    this.element.addEventListener("mousedown", (event) => {
      this.mouseDown(event);
    });
    this.element.addEventListener("mouseup", (event) => {
      this.mouseUp(event);
    });

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The Breadcrumbs package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);

    // test the bar
    const test = document.createElement('input');
    test.classList.add('input-range');
    test.id = 'slideybar';
    test.type = 'range';
    test.min = 0;
    test.max = 100; // Needs to be the sessionLength() value
    test.step = 10;
    test.value = test.max;
    this.element.appendChild(test);

    const testLabel = document.createElement('div');
    testLabel.id = "slideVal"
    testLabel.textContent = test.value;
    this.element.appendChild(testLabel);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  changeValue() {
    let self = this;

    self.element.children[2].innerHTML = self.newValue();
    this.numberOfChanges()
  }

  mouseDown(event) {
    // console.log("MOUSE DOWN", this);
    // console.log("CURRENT VALUE: " + this.currentValue())
    currentVal = this.currentValue();
    // console.log(currentVal)
  }

  mouseUp(event) {
    // console.log("MOUSE UP", this);
    newVal = this.newValue();
    // console.log(newVal)
    return this.changeValue();
  }

  currentValue() {
    // console.log("currentValue Function")
    return document.getElementById('slideybar').value;
  }

  newValue() {
    // console.log("newValue Function")
    return document.getElementById('slideybar').value;
  }

  undoChanges() {
    let self = this
  }

  numberOfChanges() {
      if (currentVal > newVal) {
        console.log(Math.abs(currentVal - newVal) / 10 );
      } else {
        console.log(Math.abs(newVal - currentVal) / 10 );
      }
  }

}
