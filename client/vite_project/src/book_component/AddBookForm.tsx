import {FormEvent, useState} from 'react'
import { createBrowserHistory } from 'history'
import config from '@config/config'
import {createTheme, ThemeProvider, TextField, Button} from '@mui/material';

const themeForm = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
    },
  });

const AddBookForm = () => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const history = createBrowserHistory()
        
        const data = { title, author}

        const url = `${config.apiBaseUrl}/books/add_book`

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        } 

        const respone = await fetch(url, options)

        if(respone.status != 200 && respone.status != 201){
            const data = await respone.json()
            alert(data.message)
        }
        else{
            //success
            alert("Book created successfully!")
            setAuthor("")
            setTitle("")
            history.push("/view_book")
        }

    }

    return (
        <div>
        <ThemeProvider theme={themeForm}>
        <h1>Add Book</h1>
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

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Add Book</h1>
                <label htmlFor='title'>Title:</label>
                <input 
                    type='text'
                    id='title'
                    value={title}
                    onChange={ (e) => setTitle(e.target.value)} 
                />
                <label htmlFor='author'>Author:</label>
                <input 
                    type='text'
                    id='author'
                    value={author}
                    onChange={ (e) => setAuthor(e.target.value)} 
                />
            </div>
            <button type='submit'>Create Book</button>
        </form>
    );
}

export default AddBookForm