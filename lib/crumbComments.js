'use babel';

// var fastCSVModule = require('fast-csv')
import BreadCrumbs from './breadcrumbs';

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
  }

  // getComment() {
  //   return this.commentModal;
  // }

  // myFunction() {
  //   document.getElementById('submit-comment').submit()
  // }

  createComment() {
    console.log("Create A New Comment")
    form.appendChild(textBox)
    form.appendChild(submit)
    // console.log(form)
    return form
  }

  mouseDown(event) {
    // this.createLocationMarker()
    // console.log("MOUSE DOWN!")
    let commentBody = document.getElementById('comment-text').value
    allComments.push("*+*")
    allComments.push(commentBody)
    // console.log(this.getPath())
    this.createWS(allComments)
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

  createRS(index) {
    // let filePath = this.getPath();
    // let p = new Promise (
    //   fs.readFile(filePath, function(err, data) {
    //     if (err) throw err;
    //   }),
    // )
    // .resolve(function(data) {
    //   stringComments = String(data)
    //   console.log(stringComments)
    //   return stringComments
    // })
    let self = this;
    let filePath = this.getPath();
    return fs.readFile(filePath, function(err, data) {
      if (err) throw err;
      dataString = String(data);
      let stringComments = dataString.split("*+*,");
      console.log(stringComments[index])
      self.createCommentForm(stringComments[index])
    })
  }
  //
  // getComments(data) {
  //   dataString = String(data);
  //   let stringComments = dataString.split("*+*,");
  //   console.log("STRING COMMENTS: " + stringComments)
  //   return stringComments;
  // }

  getPath() {
    let editor = atom.workspace.getActiveTextEditor()
    let thisPath = path.join(editor.buffer.file.path + ".crsv")
    // console.log(thisPath);
    return thisPath
  }

  createCommentForm(comment) {

    atom.notifications.addInfo( "Comment: ", {
      description: comment,
      detail: 'Comment Detail',
      dismissable: 'true'
    })
  }

  // returnSelectText() {
  //   let editor = atom.workspace.getActiveTextEditor();
  //   let selectedText = editor.getSelectedText();
  //   console.log("SELECTED TEXT: " + selectedText)
  //   return selectedText;
  // }

  // createLocationMarker() {
  //   let editor = atom.workspace.getActiveTextEditor();
  //   let selectedText = this.returnSelectText();
  //   // let selectedBox = document.createElement('span');
  //     // selectedBox.classList.add('comment-marker');
  //   // selectedBox = $(selectedBox)
  //   // let selectedBox = $('.meta.paragraph.text').wrap("<span></span>")
  //   selectedText.outerHTML()
  //   console.log(selectedBox)
  //   // atom.workspace.getActivePaneItem().innerHTML = atom.workspace.getActivePaneItem().innerHTML.replace(selectedText, selectedBox)
  //   // selectedBox.innerHTML = selectedText
  //   // let range = editor.getSelectedBufferRange();
  //   console.log("LOCATED")
  //   // range.surroundContents(selectedBox)
  //   // range.insertNode(selectedBox);
  //   // console.log(selectedBox);
  // }

}
