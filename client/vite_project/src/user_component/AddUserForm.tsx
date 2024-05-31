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

const AddUserForm = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const history = createBrowserHistory()
        
        const data = { username, email, password}

        const url = `${config.apiBaseUrl}/users/add_user`

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
            alert("User add successfully!")
            setUsername("")
            setEmail("")
            setPassword("")
            history.push("/view_book")
        }

    }

    return (
        <div>
        <ThemeProvider theme={themeForm}>
        <h1>Add User</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                variant="outlined"
              />
            </div>
            <Button variant='contained' color='primary' type='submit'>Save</Button>
          </form>
        </ThemeProvider>
      </div>
    );

}

export default AddUserForm