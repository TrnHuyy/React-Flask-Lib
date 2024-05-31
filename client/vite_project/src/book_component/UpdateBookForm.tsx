import { FormEvent, useState } from 'react';
import axios from 'axios';
import config from '@config/config';
import {createTheme, ThemeProvider, TextField, Button} from '@mui/material';
import { useParams } from 'react-router-dom';

const themeForm = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
    },
  });



const UpdateBookForm:React.FC = ({}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const {id} = useParams();
    //const dispatch = useDispatch()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        const data = { title, author}

        const url = `${config.apiBaseUrl}/books/update/${id}`;

        const options = {
            headers: {
                "Content-Type": "application/json"
            }
        } 

        const respone = await axios.post(url,data, options)

        if(respone.status != 200 && respone.status != 201){
            const data = await respone.data
            alert(data.message)
        }

        else{
            //success
            alert("Book updated successfully!")
            setAuthor("")
            setTitle("")
        }
    };

    return (
        <div>
        <ThemeProvider theme={themeForm}>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </div>
            <Button variant='contained' color='primary' type='submit'>Save</Button>
          </form>
        </ThemeProvider>
      </div>
    );
};

export default UpdateBookForm;
