'use babel';

export default class BreadcrumbsView {

  constructor(serializedState) {
    // Create root element
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

    // currentVal = self.currentValue();
    // console.log("CURRENT:" + currentVal)
    this.element.children[2].innerHTML = this.newValue();
    this.numberOfChanges();
    // console.log("NEW: " + self.newValue())
  }

  mouseDown(event) {
    // console.log("MOUSE DOWN", this);
    // console.log("CURRENT VALUE: " + this.currentValue())
    return this.currentValue();
  }

  mouseUp(event) {
    // console.log("MOUSE UP", this);
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
    let self = this;

    console.log("...........................")
    console.log(self.mouseDown())
    console.log(this.newValue())
    // console.log("NEW CHANGES START: " + self.newValue())

    // if (self.mouseDown() > self.newValue()) {
      // console.log(self.mouseDown() - self.newValue());
    // } else {
      // console.log(self.newValue() - self.mouseDown());
    // }
    console.log("...........................")
  }



}
