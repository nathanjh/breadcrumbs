'use babel';
import BreadCrumbs from './breadcrumbs';
import { CompositeDisposable } from 'atom';
import $ from 'jQuery'

export default class BottomBarView {

  constructor(serializedState, currentVal, newVal) {

    // console.log(BreadCrumbs.updateBar())

    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'bottomBar-View:createRecListener': (event) => this.createRecListener()
    }));
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'bottomBar-View:mouseDown': (event) => this.mouseDown()
    }));


  currentVal = null;
  newVal = null;
  maxVal = null;
  startVal = this.checkUndoBufferLength1()

  this.element = document.createElement('div');
  this.element.classList.add('bottom-slide');

  this.element.addEventListener("mousedown", (event) => {
    this.mouseDown(event);
    // this.createRecListener()
  });

  // Create event listener for seamless change in displayed value
  this.element.addEventListener("input", (event) => {
    // console.log("startVal: " + startVal)
    this.seamless(event)
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


// Record functions causing error at path from breadcrumbs.js. Commenting out callRecordOn() and callRecordOff() until issue is fixed.

// callRecordOn() {
//   BreadCrumbs.recordOn()
// }

// function was originally called CallRecordOn(). Changed to CallRecordOff. Content was correct already so only changed the function name.
// callRecordOff() {
//   BreadCrumbs.recordOff()
// }

createRecListener() {
  let recBtn = document.getElementById('recordToggleBtn')
  recBtn.addEventListener("click", (event) => {
    console.log("in the rec click")
    this.mouseDown(event);
  });
}

// begin functions for the slide bar

// add new function for seemless change in value.
seamless(event) {
  this.changeValue()
  // startVal = document.getElementById('slideVal2').innerHTML
  console.log("startVal: " + startVal)
  let firstNo = startVal
  console.log('firstNo: ' + firstNo)
  let nextNo = this.currentValue()
  console.log('nextNo: ' + nextNo)
  this.numberOfChanges(firstNo, nextNo)
}

// mousedown function is used for git functions.
mouseDown(event) {
  console.log('in the mouse down');

  this.changeValue()

  currentVal = this.currentValue();
  console.log('currentval :' + currentVal)
  // console.log('in the mouse down');
  this.element.max = this.checkUndoBufferLength1();
  startVal = this.currentValue();
  // console.log('currentval :' + currentVal)
  // this.callRecordOn()
  // BreadCrumbs.gitCheckback()
  BreadCrumbs.gitCheckout()
}

// assigned variable currentVal.
currentValue() {
  // console.log("currentValue Function")
  let currentVal = document.getElementById('bottomSlideBar').value
  // console.log('currentval: ' + currentVal)
  return currentVal
}

// changed display value to equal the location of the new point in the bar.
changeValue() {
  let self = this;
  let newVal = (document.getElementById('slideVal2').innerHTML = this.currentValue());
  // console.log("inner html: " + newVal)
  // this.numberOfChanges()
}

checkUndoBufferLength1() {
  // console.log("in the buffer length check")
  let editor = atom.workspace.getActiveTextEditor();
  // console.log("editor: " + editor.id)
  if (editor === undefined) {
    // console.log("in the esle of buffer check")
    maxVal = 0
    // console.log('max val in the undobuffer check: ' + maxVal)
    return 0
  } else {
    maxVal = editor.buffer.history.undoStack.length;
    // console.log('editor length: ' + maxVal)
    // console.log('max val in the undobuffer check: ' + maxVal)
    return maxVal;
    if (__guard__(__guard__(editor, edit => edit.buffer), buff => buff.history) != null) {
      // console.log(editor.buffer.history.undoStack.length);
      return editor.buffer.history.undoStack.length;
    }
  }
}

undoChanges(undoDiff) {
  console.log('diff ' + undoDiff)
  let editor = atom.workspace.getActiveTextEditor()
  for ( let i = 0; i < undoDiff; i++ ) {
    console.log("UNDO!")
    editor.undo(i)
  }
}

redoChanges(redoDiff) {
  console.log('diff ' + redoDiff)
  let editor = atom.workspace.getActiveTextEditor()
  for ( let i = 0; i < redoDiff; i++ ) {
    console.log("REDO!")
    editor.redo(i)
  }
}

numberOfChanges(firstNo, nextNo) {
  console.log("changessss")
  // console.log(parseInt(startVal))
  let initialVal = parseInt(firstNo)
    startVal = nextNo
    console.log('new startVal: ' + startVal)
  // console.log('changestart: ' + initialVal)
  let finalVal = parseInt(nextNo)
  // console.log('change end: ' + finalVal)
  if (initialVal > finalVal) {
    let undoDiff = (initialVal - finalVal)
    console.log('undoDiff: ' + undoDiff)
    this.undoChanges(undoDiff);
  } else if (initialVal < finalVal) {
    let redoDiff = (finalVal - initialVal)
    console.log('redoDiff: ' + redoDiff)
    this.redoChanges(redoDiff);
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
