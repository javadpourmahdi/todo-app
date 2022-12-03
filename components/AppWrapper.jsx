import React, {useState, useEffect} from 'react';

export default function AppWrapper({children}) {
    const [showChildren, setShowChildren] = useState(false);

    useEffect(() => {
        setShowChildren(true);
    }, []);

    return showChildren ? children : null;
};
