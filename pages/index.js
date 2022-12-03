import React, {Fragment} from 'react';
import AppBar from './../elements/AppBar';
import TodosList from './../features/todos/TodosList';

export default function HomePage() {
    return (
        <Fragment>
            <AppBar/>
            <TodosList/>
        </Fragment>
    );
};
