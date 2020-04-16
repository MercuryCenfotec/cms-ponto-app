import { db } from '../services/firebase';
import { useEffect, useState } from 'react';

const useUserById = (userId) => {
    const [user, serUser] = useState({});
    const [reload, setUserReload] = useState(true);

    useEffect(() => {
        if (reload) {
            try {
                db.ref('Users')
                    .child(userId)
                    .on('value', (snapshot) => {
                        snapshot.forEach((snap) => {
                            console.log(snap);
                        });
                        // setMemberships(array);
                        setUserReload(false);
                    });
            } catch (err) {
                console.log(err);
            }
        }
    }, [reload]);

    return { user, setUserReload };
};

export default useUserById;
