import React, {forwardRef} from 'react';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert variant="filled" ref={ref} elevation={6} {...props} />;
});

export default Alert;
