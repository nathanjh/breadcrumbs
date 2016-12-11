'use babel';
import BreadCrumbs from './breadcrumbs';
import { CompositeDisposable } from 'atom';
import CrumbComments from './crumbComments';

export default class BottomBarView {

  constructor(serializedState, currentVal, newVal) {

    currentVal = null;
    newVal = null;
    maxVal = null;

    startVal = this.checkUndoBufferLength1();

    // sets up the conditions for the elements to append to.
    this.element = document.createElement('div');
    this.element.classList.add('bottom-slide');


    // start event listeners
    this.element.addEventListener("mousedown", (event) => {
      this.mouseDown(event);
    });

    this.element.addEventListener("mouseup", (event) => {
      this.mouseUp(event);
    })

    // Create event listener for seamless change in displayed value
    this.element.addEventListener("input", (event) => {
      this.seamless(event)
    });

    let bottomBarSlider = document.createElement('input');
    bottomBarSlider.classList.add('input-range');
    bottomBarSlider.id = 'bottomSlideBar';
    bottomBarSlider.type = 'range';
    bottomBarSlider.min = 0;
    bottomBarSlider.max = this.checkUndoBufferLength1();
    bottomBarSlider.step = 1;
    bottomBarSlider.value = bottomBarSlider.max;
    this.element.appendChild(bottomBarSlider);

    bottomBarLabel = document.createElement('div');
    bottomBarLabel.id = "slideVal2"
    bottomBarLabel.textContent = bottomBarSlider.value;
    this.element.appendChild(bottomBarLabel);

    this.crumbComments = new CrumbComments
  } // bottom bar object stops here


  createRecListener() {
    let recBtn = document.getElementById('recordToggleBtn')
    recBtn.addEventListener("click", (event) => {
      this.mouseDown(event);
    });
  }

  // begin functions for the slide bar

  // add new function for seemless change in value.
  seamless(event) {
    this.changeValue()
    let firstNo = startVal
    let nextNo = this.currentValue()
    this.numberOfChanges(firstNo, nextNo)
  }

  // mousedown function is used for git functions.
  mouseDown(event) {
    startingPoint = parseInt(this.currentValue())

    this.element.max = this.checkUndoBufferLength1();
  }

  mouseUp(event) {
    endingPoint = parseInt(this.currentValue())
    if (this.crumbComments.syncRead() !== undefined) {
      let range = this.getCommentsForRange(startingPoint, endingPoint)
      range.forEach( (barVal) => {
        this.crumbComments.parseComments(barVal)
      })
    }
  }

  getCommentsForRange(start, end) {
    let rangeArray = new Array

    if (start > end) {
      for (start; start >= end; start--) {
        rangeArray.push(start)
      }
    } else {
      for (start; start <= end; start++) {
        rangeArray.push(start)
      }
    }
    return rangeArray
  }

  currentValue() {
    let currentVal = document.getElementById('bottomSlideBar').value
    return currentVal
  }

  // changed display value to equal the location of the new point in the bar.
  changeValue() {
    let self = this;
    let newVal = (document.getElementById('slideVal2').innerHTML = this.currentValue());
  }

  checkUndoBufferLength1() {
    let editor = atom.workspace.getActiveTextEditor();
    if (editor === undefined) {
      maxVal = 0
      return 0
    } else {
      maxVal = editor.buffer.history.undoStack.length;
      return maxVal;
      if (__guard__(__guard__(editor, edit => edit.buffer), buff => buff.history) != null) {
        return editor.buffer.history.undoStack.length;
      }
    }
  }
  updateBar() {
    this.element.childNodes[1].innerHTML = this.checkUndoBufferLength1()
  }

  undoChanges(undoDiff) {
    let editor = atom.workspace.getActiveTextEditor()
    for ( let i = 0; i < undoDiff; i++ ) {
      editor.undo(i)
    }
  }

  redoChanges(redoDiff) {
    let editor = atom.workspace.getActiveTextEditor()
    for ( let i = 0; i < redoDiff; i++ ) {
      editor.redo(i)
    }
  }

  numberOfChanges(firstNo, nextNo) {
    let initialVal = parseInt(firstNo)
    startVal = nextNo
    let finalVal = parseInt(nextNo)
    if (initialVal > finalVal) {
      let undoDiff = (initialVal - finalVal)
      this.undoChanges(undoDiff);
    } else if (initialVal < finalVal) {
      let redoDiff = (finalVal - initialVal)
      this.redoChanges(redoDiff);
    } else {
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
