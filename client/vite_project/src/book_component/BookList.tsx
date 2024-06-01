import { useEffect, useState } from 'react'
import axios from 'axios'
import DeleteButton from '@book_component/DeleteButton'
import '@book_component/BookList.css';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import config from '@config/config';
import { Button, createTheme } from '@mui/material';

interface Book{
  id: number,
  title: string,
  author: string
}

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

function BookList() {
  const [books, setBook] = useState<Book[]>([])
  const navigate = useNavigate(); 

  const fetchBook = async () => {
      const respone = await axios.get(`${config.apiBaseUrl}/books`)
      setBook(respone.data)
  }

  const handleDeleteButton = () => {
    // Khi cuốn sách đã được sửa đổi thành công, cập nhật lại danh sách cuốn sách
    fetchBook();
  };

  const handleUpdateButtonClick = (id: number) => {
    // Chuyển hướng đến trang cập nhật với ID của cuốn sách cần cập nhật
    navigate(`/update_book/${id}`);
  };

  useEffect( () => {
    fetchBook()
  }, [])

  if(books != null)
  {
    return(
    <div>
      <h1> List Book</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            books.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                    <Button variant='contained' color='primary' component={Link} to={`/update_book/${book.id}`}>Update</Button>
                    <DeleteButton id={book.id} onDeleteButton={handleDeleteButton}></DeleteButton>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
    )
  }
  else {
    return(
      <div>
        <h1>List Book</h1>
        <h2>No Books Found</h2>
        <Button component={Link} to="/add_user" color="inherit">Add User</Button>
      </div>
    );
  }
}

export default BookList
