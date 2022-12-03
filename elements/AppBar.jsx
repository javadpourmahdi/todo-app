import React, {useState, Fragment} from 'react';
import {useDispatch} from 'react-redux';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {addTodo} from './../features/todos/todosSlice';

export default function AppBarEl() {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleOpenDialog = () => {
        setIsOpen(true);
    }

    const handleCloseDialog = () => {
        setContent('');
        setError(null);
        setIsOpen(false);
    };

    const handleChange = (event) => {
        const {value} = event.target;
        if (value) {
            setContent(value);
            setError(null);
        } else {
            setContent('');
            setError('This field is required!');
        }
    };

    const handleAddTodo = () => {
        if (content) {
            dispatch(addTodo({content}));
            handleCloseDialog();
        } else {
            setError('This field is required!');
        }
    };

    return (
        <Fragment>
            <AppBar position="static" sx={{mb: '3rem'}}>
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{flexGrow: 1, fontStyle: 'italic'}}>
                        TODO APP
                    </Typography>
                    <Button color="inherit" startIcon={<AddIcon/>} onClick={handleOpenDialog}>
                        new todo
                    </Button>
                </Toolbar>
            </AppBar>

            <Dialog open={isOpen} onClose={handleCloseDialog} fullWidth>
                <DialogTitle> Add new Todo</DialogTitle>
                <DialogContent>
                    <TextField
                        type="text" label="content" id="contentField"
                        value={content} onChange={(e) => handleChange(e)}
                        {...(error && {error: true, helperText: error})}
                        fullWidth margin="dense" autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}> Cancel </Button>
                    <Button variant="contained" color="primary" onClick={handleAddTodo}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

