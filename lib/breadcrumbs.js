'use babel';

import BreadcrumbsView from './breadcrumbs-view';
import { CompositeDisposable } from 'atom';

export default {

  breadcrumbsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    editor = atom.workspace.getActiveTextEditor()
    this.breadcrumbsView = new BreadcrumbsView(state.breadcrumbsViewState);
    this.slideBar = document.getElementById('slideybar');
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

  changeValue() {
    let slideBar = document.getElementById('slideybar')
    slideBar.addEventListener("click", this.breadcrumbsView.changeValue())
    // let slidyBarVal = (document.getElementById('slideybar').value);
    // document.getElementById('slideVal').innerHTML = slidyBarVal;
  },

  toggle() {
    console.log('Breadcrumbs was toggled!');
     if (this.modalPanel.isVisible()) {
       this.modalPanel.hide()
     } else {
       this.modalPanel.show()
     }
  }
};
