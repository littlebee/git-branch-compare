'use babel';

import GitBranchCompareView from './git-branch-compare-view';
import { CompositeDisposable } from 'atom';

export default {

  gitBranchCompareView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.gitBranchCompareView = new GitBranchCompareView(state.gitBranchCompareViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.gitBranchCompareView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'git-branch-compare:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.gitBranchCompareView.destroy();
  },

  serialize() {
    return {
      gitBranchCompareViewState: this.gitBranchCompareView.serialize()
    };
  },

  toggle() {
    console.log('GitBranchCompare was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
