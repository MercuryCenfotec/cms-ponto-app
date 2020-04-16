import { db, storage } from './firebase'

const saveToFirebase = (path, data) => {
  let ref = db.ref(path)
  ref.push(data).then((res) => {
    ref.child(res.key).update({ id: res.key })
  })
}

export const saveImageToFirebase = (path, file, setImage) => {
  const name = +new Date() + '-' + file.name
  const metadata = { contentType: file.type }
  let imgRef = storage.ref().child(`${path}/${name}`).put(file, metadata)
  imgRef.then((snapshot) => {
    snapshot.ref.getDownloadURL().then((value) => {
      setImage(value)
    })
  })
}

export const deleteImageFromFirebase = (url) => {
  let imgRef = storage.refFromURL(url)
  imgRef
    .delete()
    .then(function () {
      // File deleted successfully
    })
    .catch(function (error) {
      // Uh-oh, an error occurred!
    })
}

export const updateToFirebase = (path, data) => {
  db.ref(path).child(data.id).update(data)
}

export default saveToFirebase
