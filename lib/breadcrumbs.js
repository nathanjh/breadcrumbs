'use babel';

import BreadcrumbsView from './breadcrumbs-view';
import CrumbComments from './crumbComments'
import BottomBarView from './bottomBar-view';
import { CompositeDisposable } from 'atom';
import fs from 'fs';
import path from 'path';
import git from 'simple-git';


export default BreadCrumbs = {

  breadcrumbsView: null,
  modalPanel: null,
  subscriptions: null,
  stateVar: this.state,



  activate(state) {

    // var $ = require('jQuery');


    this.breadcrumbsView = new BreadcrumbsView(state.breadcrumbsViewState);
    this.crumbComments = new CrumbComments
    // console.log(this.breadcrumbsView)
    // console.log(this.breadcrumbsView.getElement())
    this.bottomBarView = new BottomBarView();
    // console.log(this.bottomBarView.getElement())

    this.bottomPanel = atom.workspace.addBottomPanel({
      item: this.bottomBarView.getElement(),
      visible: true
    })

    this.modalPanel = atom.workspace.addModalPanel({
      item: this.breadcrumbsView.getElement(),
      visible: false
    });


    // let recordbtn = $('#recordToggleBtn')
    //
    // console.log(this.breadcrumbsView)
    //
    // recordbtn.on('click', function() {
    //   console.log('in the record toggle')
    //   this.recordOn()
    // })


    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'breadcrumbs:toggle': () => this.toggle()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'breadcrumbs:changeValue': () => this.changeValue()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'breadcrumbs:recordOn': () => this.recordOn()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'breadcrumbs:recordOff': () => this.recordOff()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'breadcrumbs:undoChanges': () => this.undoChanges()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'breadcrumbs:redoChanges': () => this.redoChanges()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'breadcrumbs:checkUndoBufferLength': () => this.checkUndoBufferLength()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'breadcrumbs:newComment': () => this.newComment()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'breadcrumbs:gitCheckout': () => this.gitCheckout()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'breadcrumbs:gitCheckback': () => this.gitCheckback()
    }));

    recordings = [];
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.breadcrumbsView.destroy();
  },

  serialize() {
    return {
      breadcrumbsViewState: this.breadcrumbsView.serialize()
    };
  },

  recordOn() {
    console.log("I'm recording");
    // recordings = [];
    this.updateBar();
    this.recWorkspaces = atom.workspace.observeTextEditors(function (editor) {
      let currentRecording = editor.buffer.onWillSave(function () {
        let exposedUndoFilePath = path.join(editor.buffer.file.path + '.crumb')
        let undoFilePath = exposedUndoFilePath.replace(/(\S+\/)([\w+\.]+)/, '$1.$2')
        let json = JSON.stringify(editor.buffer.history.serialize({}))
        fs.writeFile(undoFilePath, json, { flag: 'w' }, function (err) {
          if(err) throw err;
          console.log('it saved!');
        });
      });
      recordings.push(currentRecording);
      let exposedUndoFilePath = path.join(editor.buffer.file.path + '.crumb')
      let undoFilePath = exposedUndoFilePath.replace(/(\S+\/)([\w+\.]+)/, '$1.$2')
      if(fs.existsSync(undoFilePath)) {
        fs.readFile(undoFilePath, function(err, data) {
          if(err) throw err;
          let state = JSON.parse(data);
          if(state != null) {
            editor.buffer.history.deserialize(state)
          }
        })
      }
    });
  },

  recordOff() {
    console.log(recordings)
    for(var recording of recordings) {
      recording.dispose();
    }
    this.recWorkspaces.dispose();
    console.log('record off');
  },

  checkUndoBufferLength() {
    console.log("hiiiiii")
    let editor = atom.workspace.getActiveTextEditor()

    if (editor === undefined) {
      return 0
    } else {
      return editor.buffer.history.undoStack.length;
    if (__guard__(__guard__(editor, edit => edit.buffer), buff => buff.history) != null) {
      return editor.buffer.history.undoStack.length
      console.log(editor.buffer.history.undoStack.length)
      }
    }
  },

  updateBar() {
    this.bottomBarView.element.childNodes[2].innerHTML = this.checkUndoBufferLength()
  },

  changeValue() {
    let slidyBarVal = (document.getElementById('slideybar').value);
    document.getElementById('slideVal').innerHTML = slidyBarVal;
  },

  gitCheckout() {
    console.log("CHECKOUT")
    this.checkoutSandbox()
    console.log('sandbox!!!!!')
  },

  gitCheckback() {
    console.log("Welcome Home!!!")
    // this.updateBar()
    this.checkoutMain()
    // this.deleteSandbox()
  },

// some things
//   toggle() {
//   console.log('Breadcrumbs was toggled!');
//   if (this.modalPanel.isVisible()) {
//     this.modalPanel.hide()
//   } else {
//     this.modalPanel.show()
//     console.log(this.bottomBarView)
//     //  console.log(this.breadcrumbsView.element.childNodes[1].max = this.checkUndoBufferLength())
//   }
// },

  toggle() {
    // console.log('Breadcrumbs was toggled!');
    // console.log(this.bottomBarView.element.childNodes[2].innerHTML = this.checkUndoBufferLength())
    let comments = this.crumbComments.syncRead();
    console.log(comments);
    // this.crumbComments.commentMaker(comments);
  },

  // toggle() {
  //   console.log('Breadcrumbs was toggled!');
  //    if (this.modalPanel.isVisible()) {
  //      this.modalPanel.hide()
  //    } else {
  //      this.modalPanel.show()
  //      console.log(this.breadcrumbsView.element.childNodes[1].max = this.checkUndoBufferLength())
  //    }
  // },

  newComment() {
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
    // commentModal.id = 'comment-modal'
    // let editor
    //
    // if (editor = atom.workspace.getActiveTextEditor()) {
    //   console.log(comment)
    //   // let selectedText = document.getElementsByClassName('text')
    //   let commentLocation = editor.getSelectedText()
    //   console.log(commentLocation)
    //   // selectedText.innerHTML = comment
    // }
  },


  // toggleCommentModal() {
  //
  // }

  checkoutSandbox() {
    console.log('checking out sandbox')
    git().checkoutLocalBranch('sandbox')
  },

  checkoutMain() {
    git().checkout('development')
  },

  deleteSandbox() {
    git().deleteLocalBranch('sandbox')
  }
};

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
