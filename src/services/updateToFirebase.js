import { db } from './firebase';

const updateToFirebase = (path, data) => {
    console.log(path);
    console.log(data);
    db.ref(path).child(data.id).update(data);
};

export default updateToFirebase;
