import { useEffect, useState } from 'react'
import '@/App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import BookList from '@book_component/BookList'
import AddBookForm from '@book_component/AddBookForm';
import Home from '@/public/home';
import About from '@/public/about';
import { Container, AppBar, Toolbar, Button, Typography, createTheme, ThemeProvider } from '@mui/material';
import UpdateBookForm from '@book_component/UpdateBookForm';
import AddUserForm from '@/user_component/AddUserForm';

const themePage = createTheme({
  palette: {
    primary: {
      main: '#000000', // Màu nền đen
    },
    text: {
      primary: '#ffffff', // Màu văn bản trắng
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={themePage}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Book App
            </Typography>
            <Button component={Link} to="/" color='inherit'>Home</Button>
            <Button component={Link} to="/about" color="inherit">About</Button>
            <Button component={Link} to="/view_book" color="inherit">View Book</Button>
            <Button component={Link} to="/add_book" color="inherit">Add Book</Button>
            <Button component={Link} to="/add_user" color="inherit">Add User</Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/view_book" element={<BookList />} />
            <Route path="/add_book" element={<AddBookForm />} />
            <Route path="/update_book/:id" element={<UpdateBookForm />} />
            <Route path="/add_user" element={<AddUserForm />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App

