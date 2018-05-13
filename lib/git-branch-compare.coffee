GitBranchCompareView = require './git-branch-compare-view'
{CompositeDisposable} = require 'atom'

module.exports = GitBranchCompare =
  gitBranchCompareView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @gitBranchCompareView = new GitBranchCompareView(state.gitBranchCompareViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @gitBranchCompareView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'git-branch-compare:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @gitBranchCompareView.destroy()

  serialize: ->
    gitBranchCompareViewState: @gitBranchCompareView.serialize()

  toggle: ->
    console.log 'GitBranchCompare was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
