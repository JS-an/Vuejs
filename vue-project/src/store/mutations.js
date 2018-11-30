export default {
  isOpen (state) {
    state.open = !state.open
  },
  closeSidebar (state) {
    state.open = false
  },
  isAccount (state, res) {
    state.accountMsg = res
  }
}
