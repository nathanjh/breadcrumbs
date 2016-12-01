'use babel';

// var fastCSVModule = require('fast-csv')
import BreadCrumbs from './breadcrumbs';
import { CompositeDisposable } from 'atom';


// import csvWriter from 'csv-write-stream'
// import csv from 'csv'
// import writeCSV from 'write-csv';
import fs from 'fs';
import path from 'path';
import $ from 'jQuery';

export default class CrumbComments {

  constructor(serializedState) {


    let commentForm = document.createElement('form');
      commentForm.classList.add('commentForm');
      // commentForm.action = 'comments.csv';
      commentForm.id = 'comment-form'

    let commentText = document.createElement('textarea');
      commentText.id = 'comment-text'
      commentText.classList.add('input-textarea')
      commentText.placeholder = 'Comment';
      // commentText.classList.add('input-textarea');

    let submitButton = document.createElement('input');
      submitButton.id = 'submit-comment'
      submitButton.classList.add('btn')
      submitButton.type = 'button'
      submitButton.value = 'Create Comment!'
      // submitButton.onClick = 'click'

    // let comment = document.getElementById('comment-form')
    // console.log("COMMENT: " + comment)
    submitButton.addEventListener("mousedown", (event) => {
      this.mouseDown(event);
    });
    submitButton.addEventListener("mouseup", (event) => {
      this.mouseUp(event);
    });

    form = commentForm;
    textBox = commentText;
    submit = submitButton;
    allComments = new Array;
    subscriptions = new CompositeDisposable()
  }

  // getComment() {
  //   return this.commentModal;
  // }

  // myFunction() {
  //   document.getElementById('submit-comment').submit()
  // }

  createCommentForm() {
    console.log("Create A New Comment")
    form.appendChild(textBox)
    form.appendChild(submit)
    // console.log(form)
    return form
  }

  mouseDown(event) {
    let barValue = document.getElementById("bottomSlideBar").value
    let commentBody = document.getElementById('comment-text').value

    console.log("MOUSE DOWN!")
    let commentObject = {}
    commentObject[barValue] = commentBody

    allComments.push(commentObject)
    let stringComments = JSON.stringify(allComments)
    console.log(stringComments)
    return this.createWS(stringComments)
  }

  mouseUp(event) {
    // console.log("MOUSE UP!")
    document.getElementById('comment-text').value = ""

    let modal = atom.workspace.panelForItem(form)
    modal.destroy()
  }

  createWS(data) {
    let filePath = this.getPath();
    fs.writeFile(filePath, data, {flag: 'w'}, function(err) {
      if (err) throw err;
      console.log("WRITE FILE");
    });
  }

  // createRS(index) {
  //   let self = this;
  //   let filePath = this.getPath();
  //   return fs.readFile(filePath, function(err, data) {
  //     if (err) throw err;
  //     dataString = String(data);
  //     let stringComments = dataString.split("*+*,");
  //     console.log(stringComments[index])
  //     self.createComment(stringComments[index])
  //   })
  // }
  //
  // getComments(data) {
  //   dataString = String(data);
  //   let stringComments = dataString.split("*+*,");
  //   console.log("STRING COMMENTS: " + stringComments)
  //   return stringComments;
  // }
  syncRead() {
    let filePath = this.getPath();
    if(fs.existsSync(filePath)) {
      data = fs.readFileSync(filePath);
      // console.log(data)
    }
      return String(data).split('*+*,');
    } else {
      this.createWrongFilePathAlert(filePath)}
  }
  getPath() {
    let editor = atom.workspace.getActiveTextEditor()
    let thisPath = path.join(editor.buffer.file.path + ".crsv")
    // console.log(thisPath);
    return thisPath
  }
  // activates a comment notification with an input string
  createCommentForm(comment) {
    atom.notifications.addInfo( "Comment: ", {
      description: "note that the above text wraps! cooool",
      detail: comment,
      dismissable: 'true'
    })

    // let commentBox = document.createElement('div')
    //   commentBox.classList.add('comment-marker')
    //
    // subscriptions.add(atom.tooltips.add(commentBox, {
    //   title: comment,
    //   trigger: 'manual',
    // }))
    // // console.log(commentBox)
    // return commentBox
  }
  // alerts user if they aren't in a valid crumb-commented file
  createWrongFilePathAlert(filePath) {
    atom.notifications.addWarning("Sorry! This isn't the tuturial file you were looking for...", {
      description: 'File path: ' + filePath + ' is not an official crumb tutorial!',
      detail: 'Please check your current window.',
      dismissable: 'true'
    })
  }

  returnSelectText() {
    let editor = atom.workspace.getActiveTextEditor();
    let selectedText = editor.getSelectedText();
    // console.log("SELECTED TEXT: " + selectedText)
    return selectedText;
  }
  // commentMaker(commentData) {
  //   let comments = commentData;
  //   for(let i = 1; i < comments.length; i++) {
  //     this.createCommentForm(comments[i]);
  //     console.log(comments[i]);
  //   }
  // }

  // returnSelectText() {
  //   let editor = atom.workspace.getActiveTextEditor();
  //   let selectedText = editor.getSelectedText();
  //   console.log("SELECTED TEXT: " + selectedText)
  //   return selectedText;
  // }

  // createLocationMarker() {
  //   let editor = atom.workspace.getActiveTextEditor();
  //   let selectedText = editor.getSelectedText()
  //
  //
  //
  //
  //
  //   // let editor = atom.workspace.getActiveTextEditor();
  //   // // let selectedText = editor.getSelectedText()
  //   // let range = editor.getSelectedBufferRange()
  //   // let comment = this.createComment("TEST")
  //   // let middleRange = Math.floor((range.end.column + range.start.column) / 2)
  //   //
  //   // let marker = editor.markScreenPosition([50, 50])
  //   // editor.decorateMarker(marker, {type: 'inline-block', position: 'before', item: comment })
  //   // console.log("DONE")
  //   // editor.insertNewLineBelow()
  //   // if (range) {
  //   //   this.createComment("TEST")
  //   // }
  //
  //   // this.createComment(selectedText)
  //
  //   // console.log(comment)
  //   // console.log("RANGE: " + range)
  //   // console.log("MARKER: " + marker)
  //   // let markedWord = editor.decorateMarker(marker, {type: 'highlight', class: 'comment-marker'});
  //   // console.log(markedWord)
  //   // markedWord.setProperties(type: 'highlight', class: 'comment-marker');
  //   // let selectedBox = document.createElement('span');
  //     // selectedBox.classList.add('comment-marker');
  //   // selectedBox = $(selectedBox)
  //   // let selectedBox = $('.meta.paragraph.text').wrap("<span></span>")
  //   // selectedText.outerHTML()
  //   // console.log(selectedBox)
  //   // atom.workspace.getActivePaneItem().innerHTML = atom.workspace.getActivePaneItem().innerHTML.replace(selectedText, selectedBox)
  //   // selectedBox.innerHTML = selectedText
  //   // let range = editor.getSelectedBufferRange();
  //   // range.surroundContents(selectedBox)
  //   // range.insertNode(selectedBox);
  //   // console.log(selectedBox);
  // }

  // getAllMarkers() {
  //   let editor = atom.workspace.getActiveTextEditor();
  //   let allMarkers = editor.getMarkers()
  //   return allMarkers
  // }
  //
  // displayMarker() {
  //   let editor = atom.workspace.getActiveTextEditor();
  //   let allMarkers = this.getAllMarkers()
  //   console.log(editor.getMarker(702))
  // }

}
