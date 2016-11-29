'use babel';

// var fastCSVModule = require('fast-csv')
// import csvWriter from 'csv-write-stream'
// import csv from 'csv'
// import writeCSV from 'write-csv';
import fs from 'fs';

export default class CrumbComments {

  constructor(serializedState) {


    let commentForm = document.createElement('form');
      commentForm.classList.add('commentForm');
      commentForm.action = 'comments.csv';
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
    console.log(form)
    return form
  }

  mouseDown(event) {
    let commentBody = document.getElementById('comment-text').value
    console.log(commentBody)
    this.createWS(commentBody)
    console.log(commentBody)
  }

  mouseUp(event) {
    // let modal = document.getElementsByClassName('modal')
    // console.log(modal)
    console.log("MOUSE UP!")
    console.log(this.createLocationMarker())
    selectedText = this.createLocationMarker()
    console.log(selectedText.html)
  }

  createWS(data) {
    fs.writeFile('comments.txt', {flag: 'w'}, function(err) {
      if (err) throw err;
      console.log("WRITE FILE");
    });
  }

  createLocationMarker() {
    let editor = atom.workspace.getActiveTextEditor();
    let selectedText = editor.getSelectedText();
    console.log(selectedText);
    return selectedText;
  }

}
