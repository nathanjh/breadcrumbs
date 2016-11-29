'use babel';
import BreadCrumbs from './breadcrumbs';

export default class BottomBarView {

  constructor(){

    let footerPanel = document.createElement('div')
    footerPanel.id = 'footer'
    this.element = atom.workspace.addBottomPanel({
      item: footerPanel,
      visible: true
    })

    console.log(this.element)

  }

}
