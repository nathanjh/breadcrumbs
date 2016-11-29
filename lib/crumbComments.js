'use babel';

// var fastCSVModule = require('fast-csv')
// import csvWriter from 'csv-write-stream'
import fs from 'fs'
import csv from 'csv'


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
    let modal = document.getElementsByClassName('modal')
    console.log(modal)
    // modal.hide()
    console.log("MOUSE UP!")
  }

  createWS(data) {
    csv.generate({seed: 1, columns: 2, length: 255}, function(err, data) {
      csv.parse(data, function(err, data) {
        csv.transform(data, function(data) {
          return data.map(function(value){
            return vaue.toUpperCase()
          });
        }, function(err, data) {
          csv.stringify(data, function(err, data) {
            process.stdout.write(data);
          });
        });
      });
    });
  }

}
