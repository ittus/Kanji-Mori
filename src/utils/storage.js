import ext from "./ext";

export default ext.storage ? (ext.storage.sync ? ext.storage.sync : ext.storage.local)
// mock
: {
  get (key, func){
    func()
  },
  set (key, func){
    func()
  }
}
