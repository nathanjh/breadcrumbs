'use babel';

export default class CrumbComments {

  constructor(serializedState) {

    // let commentModal = document.createElement('div');
    //   commentModal.classList.add('commentModal');
    //   commentModal.type = 'modal';

    let commentText = document.createElement('textarea');
      commentText.classList.add('input-textarea');
      commentText.placeholder = 'Comment';

    let submitButton = document.createElement('button');
      submitButton.classList.add('btn')
      submitButton.value = "Create Comment!"

    textBox = commentText;
    submit = submitButton;
  }

  getComment() {
    return this.commentModal;
  }

  createComment() {
    console.log("Create A New Comment")
    let commentBox = document.createElement('div');
      commentBox.classList.add('commentBox');
      commentBox.appendChild(textBox);
      commentBox.appendChild(submit);
    console.log(commentBox)
  }

}
