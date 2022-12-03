import React, {useState, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Typography, Checkbox, IconButton, InputBase, Snackbar} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from './../../elements/Alert';
import {selectAllTodos, toggleTodo, editTodo, deleteTodo} from './todosSlice';

export default function TodosList() {
    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
    const [editing, setEditing] = useState(null);
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const todos = useSelector(selectAllTodos);
    const dispatch = useDispatch();

    const handleToggleTodo = (todo) => {
        dispatch(toggleTodo(todo));
    };

    const handleEditTodo = (todo) => {
        if (content) {
            dispatch(editTodo({
                ...todo,
                content
            }));
            setContent('');
            setError(null);
            setEditing(null);
        } else {
            setError('The content of the todo is essential');
            setIsOpenSnackbar(true);
        }
    };

    const handleDeleteTodo = (todo) => {
        dispatch(deleteTodo(todo));
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpenSnackbar(false);
    };

    return (
        <Fragment>
            <Box sx={{width: '100%', maxWidth: '576px', mx: 'auto'}}>
                <Box
                    sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'start',
                        p: '0.5rem 1rem', borderBottom: '1px solid #ced4da'
                    }}
                >
                    <Typography variant="h5" component="h5" sx={{fontSize: '1rem'}}>
                        Please add the new todo
                    </Typography>
                </Box>
                {(todos || []).map((todo, index) => {
                    const labelId = `checkbox-label-${index}`;

                    return (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                borderBottom: '1px solid #ced4da',
                                cursor: 'pointer', p: '0.5rem 1rem',
                                '&:hover': {backgroundColor: '#e9ecef'},
                                '&:active': {backgroundColor: '#ced4da'}
                            }}
                        >
                            {(editing === todo.id)
                                ? <InputBase
                                    type="text" value={content} onChange={(e) => setContent(e.target.value)}
                                    style={{width: '75%', border: 'none', fontSize: '1rem', p: 0}}
                                    autoFocus
                                />
                                : <Typography
                                    id={labelId} variant="h5" component="h5"
                                    sx={{
                                        width: '75%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        textDecorationLine: todo.completed ? 'line-through' : 'none',
                                        fontSize: '1rem',
                                        p: 0
                                    }}
                                    onClick={() => handleToggleTodo(todo)}
                                >
                                    <Checkbox
                                        checked={todo.completed}
                                        edge="start" disableRipple
                                        tabIndex={-1} inputProps={{'aria-labelledby': labelId}}
                                    />
                                    {todo.content}
                                </Typography>
                            }
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                {(editing === todo.id)
                                    ? <Fragment>
                                        <IconButton
                                            edge="end" disableRipple sx={{mr: '8px'}}
                                            onClick={() => setEditing(null)} aria-label="cancel"
                                        >
                                            <CloseIcon/>
                                        </IconButton>
                                        <IconButton
                                            edge="end" disableRipple sx={{mr: '8px'}}
                                            onClick={() => handleEditTodo(todo)} aria-label="edit"
                                        >
                                            <DoneIcon/>
                                        </IconButton>
                                    </Fragment>
                                    : <IconButton
                                        edge="end" disableRipple sx={{mr: '8px'}}
                                        onClick={() => {
                                            setEditing(todo.id)
                                            setContent(todo.content)
                                        }} aria-label="edit"
                                    >
                                        <EditIcon/>
                                    </IconButton>
                                }
                                <IconButton
                                    edge="end" disableRipple
                                    onClick={() => handleDeleteTodo(todo)} aria-label="delete"
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
            <Snackbar autoHideDuration={6000} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                      open={isOpenSnackbar} onClose={handleCloseSnackbar}>
                <Alert severity="error" sx={{width: '100%'}} onClose={handleCloseSnackbar}>
                    {error}
                </Alert>
            </Snackbar>
        </Fragment>
    );
};
