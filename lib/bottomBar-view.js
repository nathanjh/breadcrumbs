'use babel';
import BreadCrumbs from './breadcrumbs';
import { CompositeDisposable } from 'atom';

export default class BottomBarView {

  constructor(serializedState, currentVal, newVal) {

    // console.log(BreadCrumbs.updateBar())

    // var $ = require('jquery');
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'bottomBar-View:createRecListener': (event) => this.createRecListener()
    }));


  currentVal = null;
  newVal = null;
  maxVal = null;

  this.element = document.createElement('div');
  this.element.classList.add('bottom-slide');

  this.element.addEventListener("mousedown", (event) => {
    this.mouseDown(event);
    this.createRecListener()
  });

  this.element.addEventListener("mouseup", (event) => {
    this.mouseUp(event);
  });



  // .addEventListener("click", 'recordToggleBtn', (event) => {
  //   console.log("in dobut");
  // });

  // Create message element
  let bottomBarCtrls = document.createElement('div');
  bottomBarCtrls.textContent = 'Time Travel  ';
  bottomBarCtrls.classList.add('bottom-bar-ctrls');
  bottomBarCtrls.id = 'msg'
  this.element.appendChild(bottomBarCtrls);

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

  let recordLabel = document.createElement('label')
  recordLabel.classList.add('input-label')
  recordLabel.id = 'recordToggleText'
  // recordLabel.textContent = 'OFF '

  let recordBtn = document.createElement('input')
  recordBtn.classList.add('input-toggle')
  recordBtn.id = 'recordToggleBtn'
  recordBtn.type = 'checkbox'
  recordLabel.appendChild(recordBtn)
  bottomBarCtrls.appendChild(recordLabel)

  let recordingSpinner = document.createElement('span')
  recordingSpinner.classList.add('loading')
  recordingSpinner.classList.add('loading-spinner-tiny')
  recordingSpinner.classList.add('inline-block')
  bottomBarCtrls.appendChild(recordingSpinner)
  //
  console.log("botCtrls" + bottomBarCtrls)

} // object stops here


callRecordOn() {
  BreadCrumbs.recordOn()
}

callRecordOn() {
  BreadCrumbs.recordOff()
}

createRecListener() {
  let recBtn = document.getElementById('recordToggleBtn')
  recBtn.addEventListener("click", (event) => {
    console.log("in the rec click")
    this.mouseDown(event);
  });
}

// begin functions for the slide bar

changeValue() {
  let slidyBarVal = (document.getElementById('slideybar').value);
  document.getElementById('slideVal').innerHTML = slidyBarVal;
}

mouseDown(event) {
  console.log('in the mouse down');

  this.changeValue()

  maxVal = this.checkUndoBufferLength1();
  this.element.max = maxVal;

  currentVal = this.currentValue();
  console.log('currentval :' + currentVal)
  this.callRecordOn()
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
  document.getElementById('slideVal2').innerHTML = maxVal;
  console.log("inner html: " + document.getElementById('slideVal2').innerHTML)
  // this.numberOfChanges()
}

checkUndoBufferLength1() {
  // console.log("in the buffer length check")
  let editor = atom.workspace.getActiveTextEditor();
  console.log("editor: " + editor.id)
  if (editor === undefined) {
    console.log("in the esle of buffer check")
    maxVal = 0
    console.log('max val in the undobuffer check: ' + maxVal)

    return 0
  } else {
    console.log('editor length: ' + editor.buffer.history.undoStack.length)

    maxVal = editor.buffer.history.undoStack.length;
    console.log('max val in the undobuffer check: ' + maxVal)

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
