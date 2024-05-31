import React from 'react';
import axios from 'axios';
import config from '@config/config';
import { Button } from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material';
import { useParams } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

interface Props {
  id: number
}

function DeleteButton({id}: Props) {
  const handleDelete = async () => {
    try {
      await axios.post(`${config.apiBaseUrl}/books/delete/${id}`);
      alert("Book deleted successfully!")
    } 
    catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <Button variant='contained' color='secondary' onClick={handleDelete}>Delete</Button>
    </div>
  );
}

export default DeleteButton;
