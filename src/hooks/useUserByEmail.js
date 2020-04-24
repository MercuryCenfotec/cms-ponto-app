import { db } from '../services/firebase';
import { useEffect, useState } from 'react';

const useUserByEmail = (email) => {
    const [user, serUser] = useState({});
    const [reload, setUserReload] = useState(true);

    useEffect(() => {
        if (reload) {
            try {
                db.ref('Users')
                    .orderByChild('email')
                    .equalTo(email)
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

export default useUserByEmail;
