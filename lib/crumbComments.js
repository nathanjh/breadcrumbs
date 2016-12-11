'use babel';

import BreadCrumbs from './breadcrumbs';
import fs from 'fs';
import path from 'path';

export default class CrumbComments {

  constructor(serializedState) {

    let commentForm = document.createElement('form');
      commentForm.classList.add('commentForm');
      commentForm.id = 'comment-form'

    let commentText = document.createElement('textarea');
      commentText.id = 'comment-text'
      commentText.classList.add('input-textarea')
      commentText.placeholder = 'Comment';

    let submitButton = document.createElement('input');
      submitButton.id = 'submit-comment'
      submitButton.classList.add('btn')
      submitButton.type = 'button'
      submitButton.value = 'Create Comment!'

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

  createCommentForm() {
    console.log("Create A New Comment")
    form.appendChild(textBox)
    form.appendChild(submit)
    return form
  }

  mouseDown(event) {
    let self = this

    let barValue = document.getElementById("bottomSlideBar").value
    let commentBody = document.getElementById('comment-text').value
    let commentObject = {}
    commentObject[barValue] = commentBody

    if (typeof(self.syncRead()) === 'undefined') {
      allComments
    } else {
      allComments = self.syncRead()
    }
    allComments.push(commentObject)
    let stringComments = JSON.stringify(allComments)

    return this.createWS(stringComments)
  }

  mouseUp(event) {
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

  syncRead() {
    let filePath = this.getPath();
    if (fs.existsSync(filePath)) {
      data = fs.readFileSync(filePath);
      let comments = JSON.parse(data)
      return comments
    }
  }

  parseComments(barVal) {
    let self = this
    let comments = this.syncRead();
    let foundComments = comments.filter( (commentObject) => {
      return commentObject[barVal]
    })
    foundComments.forEach( (comment) => {
      self.createComment(comment[barVal])
    })
  }

  getPath() {
    let editor = atom.workspace.getActiveTextEditor()
    let thisPath = path.join(editor.buffer.file.path + ".crsv")

    return thisPath
  }

  createComment(comment) {
    atom.notifications.addInfo( "Comment", {
      // description: "note that the above text wraps!",
      detail: comment,
      dismissable: 'true',
      icon: 'zap'
    })
  }

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
    return selectedText;
  }

}
