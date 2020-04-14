import { db } from './firebase';

const saveToFirebase = (path, data) => {
    let ref = db.ref(path);
    ref.push(data).then((res) => {
        ref.child(res.key).update({ id: res.key });
    });
};

export default saveToFirebase;
