'use babel';
import BreadCrumbs from './breadcrumbs';
import { CompositeDisposable } from 'atom';
import CrumbComments from './crumbComments'


export default class CommentBtnView {

  constructor(serializedState) {

    this.element = document.createElement('div');
    this.element.classList.add('bottom-comment-btn');

    // Create message element
    let commentBtnDiv = document.createElement('div');
    commentBtnDiv.id = 'playBtnDiv'
    this.element.appendChild(commentBtnDiv)

    let commentBtn = document.createElement('span');
    commentBtn.id = 'commentBtn'
    commentBtn.classList.add('icon')
    commentBtn.classList.add('icon-pencil')
    commentBtnDiv.appendChild(commentBtn)

    commentBtn.onclick = function() {
      console.log("clicked the new comment button")
    }

    commentBtn.addEventListener("click", (event) => {
      this.createComment(event);
    })

    this.crumbComments = new CrumbComments
}; //object ends here

  // must have serialize as an empty function
  serialize() {}

  getElement() {
    return this.element;
  }

  createComment() {
    let comment = this.crumbComments.createCommentForm()
    console.log(comment)
    let commentModal = atom.workspace.addModalPanel({
      item: comment,
      visible: false
    });

    if (commentModal.isVisible()) {
      commentModal.hide()
    } else {
      commentModal.show()
    }
  }

  destroy() {
    this.element.remove();
  }
};
