'use babel';

import BreadcrumbsView from './breadcrumbs-view';
import { CompositeDisposable } from 'atom';

export default {

  breadcrumbsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.breadcrumbsView = new BreadcrumbsView(state.breadcrumbsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.breadcrumbsView.getElement(),
      visible: true
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
      'breadcrumbs:toggleRecord': () => this.toggleRecord()
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
  fsTest() {
    fs.writeFile('welcome.txt')
  }

  toggleRecord() {
    // let editors = atom.workspace.getTextEditors();
    // console.log(editors);
    // console.log(editors[0].buffer.file.path);
    // console.log(editor.buffer.file.path)
    console.log("I'm recording");
    atom.workspace.observeTextEditors(function (editor) {
      editor.buffer.onWillSave(function () {
        undoFilePath = path.join(editor.buffer.file.path + '.crumb')
        json = JSON.stringify(editor.buffer.history.serialize({}))
        fs.writeFile(undoFilePath, json)
        // console.log(Object.keys(json))

        // console.log(undoFilePath)
      });
    });
  },

  fileCheck(filePath) {
    fs.open(filePath, 'r', function(err, fd) {
      if(err) {
        return console.error(err)
      }
      console.log('file exists!')
    });
  },

  changeValue() {
    let slidyBarVal = (document.getElementById('slideybar').value);
    document.getElementById('slideVal').innerHTML = slidyBarVal;
  },

  toggle() {
    console.log('Breadcrumbs was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
