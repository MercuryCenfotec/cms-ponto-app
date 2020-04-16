import { db } from '../services/firebase';
import { useEffect, useState } from 'react';

const usePendingIDVerifications = () => {
    const [idVerifications, setIdVerifications] = useState([]);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        if (reload) {
            try {
                db.ref('IdVerifications').on('value', (snapshot) => {
                    let array = [];
                    snapshot.forEach((snap) => {
                        array.push(snap.val());
                    });
                    setIdVerifications(array);
                    setReload(false);
                });
            } catch (err) {
                console.log(err);
            }
        }
    }, [reload]);

    return { idVerifications, setReload };
};

export default usePendingIDVerifications;
