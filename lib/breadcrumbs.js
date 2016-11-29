'use babel';

import BreadcrumbsView from './breadcrumbs-view';
import BottomBarView from './bottomBar-View';

import { CompositeDisposable } from 'atom';
import fs from 'fs';
import path from 'path';
import git from 'simple-git';


export default BreadCrumbs = {

  breadcrumbsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.breadcrumbsView = new BreadcrumbsView(state.breadcrumbsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.breadcrumbsView.getElement(),
      visible: false
    });

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
      'breadcrumbs:gitCheckout': () => this.gitCheckout()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'breadcrumbs:gitCheckback': () => this.gitCheckback()
    }));
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

  recordOn(state) {
    console.log("I'm recording");
    recordings = [];
    this.recWorkspaces = atom.workspace.observeTextEditors(function (editor) {
      currentRecording = editor.buffer.onWillSave(function () {
        undoFilePath = path.join(editor.buffer.file.path + '.crumb')
        // TODO: regex to add dot before file--make it hidden
        json = JSON.stringify(editor.buffer.history.serialize({}))
        fs.writeFile(undoFilePath, json, { flag: 'w' }, function (err) {
          if(err) throw err;
          console.log('it saved!');
        });
      });
      recordings.push(currentRecording);
      undoFilePath = path.join(editor.buffer.file.path + '.crumb')
      if(fs.existsSync(undoFilePath)) {
        fs.readFile(undoFilePath, function(err, data) {
          if(err) throw err;
          state = JSON.parse(data);
          if(state != null) {
            editor.buffer.history.deserialize(state)
          }
        })
      }
    });
  },

  // TODO: double check recordings array/ what's actually going on with
  // the number of disposable objects: expected 2, got 4...
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
      if (__guard__(__guard__(editor, edit => edit.buffer), buff => buff.history) != null) {
        return editor.buffer.history.undoStack.length
        console.log(editor.buffer.history.undoStack.length)
      }
  },

  changeValue() {
    let slidyBarVal = (document.getElementById('slideybar').value);
    document.getElementById('slideVal').innerHTML = slidyBarVal;
  },

  gitCheckout() {
    this.checkoutSandbox()
  },

  gitCheckback() {
    // console.log("heeeeeeee")
    git().checkout('master')
    git().deleteLocalBranch('sandbox')
  },

  toggle() {
      console.log('Breadcrumbs was toggled!');
     if (this.modalPanel.isVisible()) {
       this.modalPanel.hide()
     } else {
       this.modalPanel.show()
       console.log(this.bottomBarView)
      //  console.log(this.breadcrumbsView.element.childNodes[1].max = this.checkUndoBufferLength())
     }
  },

  checkoutSandbox() {
    git().checkoutLocalBranch('sandbox')
  }
};

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
