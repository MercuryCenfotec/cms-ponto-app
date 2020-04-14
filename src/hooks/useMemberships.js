import { db } from '../services/firebase';
import { useEffect, useState } from 'react';

const useMemberships = () => {
    const [memberships, setMemberships] = useState([]);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        if (reload) {
            try {
                db.ref('Memberships').on('value', (snapshot) => {
                    let array = [];
                    snapshot.forEach((snap) => {
                        array.push(snap.val());
                    });
                    setMemberships(array);
                    setReload(false);
                });
            } catch (err) {
                console.log(err);
            }
        }
    }, [reload]);

    return { memberships, setReload };
};

export default useMemberships;
