'use babel';
import BreadCrumbs from './breadcrumbs';

export default class BottomBarView {

  constructor(serializedState, currentVal, newVal) {

    currentVal = null;
    newVal = null;
    maxVal = null;

    this.element = document.createElement('div');
    this.element.classList.add('bottom-slide');
    this.element.addEventListener("mousedown", (event) => {
      this.mouseDown(event);
    });

    this.element.addEventListener("mouseup", (event) => {
      this.mouseUp(event);
    });

    // Create message element
    let bottomBarMsg = document.createElement('div');
    bottomBarMsg.textContent = 'Time Travel';
    bottomBarMsg.classList.add('message');
    this.element.appendChild(bottomBarMsg);

    // test the bar
    let bottomBarSlider = document.createElement('input');
    bottomBarSlider.classList.add('input-range');
    bottomBarSlider.id = 'bottomSlideBar';
    bottomBarSlider.type = 'range';
    bottomBarSlider.min = 0;
    bottomBarSlider.max = this.checkUndoBufferLength1();
    bottomBarSlider.step = 1;
    bottomBarSlider.value = bottomBarSlider.max;
    this.element.appendChild(bottomBarSlider);

    let bottomBarLabel = document.createElement('div');
    bottomBarLabel.id = "slideVal2"
    bottomBarLabel.textContent = bottomBarSlider.value;
    this.element.appendChild(bottomBarLabel);

    // let trackChange = atom.workspace.observeTextEditors(function (editor) {
    //   currentChange = editor.buffer.onDidChange(function () {
    //     this.
    //   })
    // })

  }

// begin functions for the slide bar


//
  mouseDown(event) {
    console.log('in the mouse down');
    maxVal = this.checkUndoBufferLength1();
    console.log('max val : ' + maxVal)
    currentVal = this.currentValue();
    console.log('currentval :' + currentVal)
  }

  mouseUp(event) {
    // console.log("MOUSE UP", this);
    newVal = this.currentValue();
    console.log("NEW VALUE: " + newVal) 
    console.log(newVal)
    return this.changeValue();
  }

  currentValue() {
    // console.log("currentValue Function")
    console.log('value: '+ document.getElementById('bottomSlideBar').value)
    return document.getElementById('bottomSlideBar').value;
  }

  changeValue() {
    let self = this;

    document.getElementById('slideVal2').innerHTML = newVal;
    // this.numberOfChanges()
  }

  checkUndoBufferLength1() {
    // console.log("in the buffer length check")
    let editor = atom.workspace.getActiveTextEditor();
    console.log("editor: " + editor.id)
    if (editor === undefined) {
      console.log("in the esle of buffer check")
      return 0
    } else {
      console.log('editor length: ' + editor.buffer.history.undoStack.length)
      return editor.buffer.history.undoStack.length;
      if (__guard__(__guard__(editor, edit => edit.buffer), buff => buff.history) != null) {
        console.log(editor.buffer.history.undoStack.length);
        return editor.buffer.history.undoStack.length;
      }
    }
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

  // these are required for all the functions to run
  serialize() {}

  getElement() {
    return this.element;
  }

  destroy() {
    this.element.remove();
  }

  __guard__(value, transform) {
    return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
  }
}
// things here to test
