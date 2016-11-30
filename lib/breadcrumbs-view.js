'use babel';

import BreadCrumbs from './breadcrumbs';

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
    let test = document.createElement('input');
    test.classList.add('input-range');
    test.id = 'slideybar';
    test.type = 'range';
    test.min = 0;
    test.max = BreadCrumbs.checkUndoBufferLength(); // Needs to be the sessionLength() value
    console.log("MAX: ")
    console.log(test.max)
    test.step = 1;
    test.value = test.max;
    this.element.appendChild(test);

    let testLabel = document.createElement('div');
    testLabel.id = "slideVal"
    testLabel.textContent = test.value;
    this.element.appendChild(testLabel);

    barMax = test.max
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
    console.log("MOUSE DOWN", this);
    // console.log("CURRENT VALUE: " + currentVal)
    console.log("MAX: ")
    console.log(barMax)
    // console.log(currentVal)
    currentVal = this.currentValue();
  }

  mouseUp(event) {
    console.log("MOUSE UP", this);

    newVal = this.newValue();
    console.log("NEW VALUE: " + newVal)
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

  undoChanges(difference) {
    let editor = atom.workspace.getActiveTextEditor()
    for ( let i = 0; i < difference; i++ ) {
      console.log("UNDO!")
      editor.undo(i)
    }
  }

  redoChanges(difference) {
    let editor = atom.workspace.getActiveTextEditor()
    for ( let i = 0; i < difference; i++ ) {
      console.log("REDO!")
      editor.redo(i)
    }
  }

  numberOfChanges() {
    currentVal = parseInt(currentVal)
    newVal = parseInt(newVal)
    if (currentVal > newVal) {
      let difference = ((currentVal - newVal) / 10 )
      console.log(this.undoChanges(difference));
    } else if (currentVal < newVal) {
      let difference = ((newVal - currentVal) / 10 )
      console.log(this.redoChanges(difference));
    } else {
      console.log("ELSE")
    }
  }
}
