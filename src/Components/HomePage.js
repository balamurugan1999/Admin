import React, { useState, useEffect } from 'react'
import NavigationBar from './NavigationBar'
import axios from 'axios'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { Form, Modal } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import '../Style/Pagination.css'
import '../Style/Card.css'


function HomePage() {
    const [user, setuser] = useState([])
    const [show, setShow] = useState(false)
    const [userId, setUserId] = useState()
    const [userName, setUserName] = useState()
    const [userCity, setUserCity] = useState()
    const [userComments, setUserComments] = useState()
    const [showEdit, setShowEdit] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 5;


    useEffect(() => {
        fetchData();
    },)

    const handleAdd = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    const fetchData = async () => {
        await axios.get('http://localhost:5000/api/getUserDetails').then(res => {
            setuser(res.data)
            setTotalPages(Math.ceil(res.data.length / itemsPerPage));
        }).catch(error => {
            console.log(error)
        })
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const subset = user.slice(startIndex, endIndex);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleEdit = async (userId) => {
        try {

            setShowEdit(true)
            const res = await axios.post('http://localhost:5000/api/CurrentUserDetails', {
                userId
            })
            //console.log('Data saved sucessfully')
            let userData= res.data
            userData.map((items) => {
                setUserId(items.userid)
                setUserName(items.username)
                setUserCity(items.city)
                setUserComments(items.comments)
                return 0
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleCloseEdit = () => {
        setShowEdit(false)
    }

    const handleDeleteUser = async (userId) => {
        try {

            console.log(userId)
            await axios.post('http://localhost:5000/api/deleteUserDetail', {
                userId
            })
            //console.log('Data saved sucessfully')
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleAddUser = async (e) => {
        try {
            const res = await axios.post('http://localhost:5000/api/addUserDetail', {
                userId, userName, userCity, userComments
            })
            if (res.data !== 'sucess') {
                alert(res.data.sqlMessage)
            }
            else {
                //console.log('Data saved sucessfully')
                alert("Data saved successfully")
                setShow(false)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleEditUser = async (userId) => {
        try {

            //console.log(userId)
            await axios.post('http://localhost:5000/api/editUserDetail', {
                userId, userComments
            })
            //console.log('Data updated sucessfully')
            setShowEdit(false)
            alert("Data updated successfully")
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div>
                <NavigationBar></NavigationBar>
                <br />
                <Button variant="contained" color="success" style={{ float: 'right', marginRight: '5vh' }} onClick={handleAdd}>
                    Add
                </Button>
                <br /> <br />
                {subset.map((user, i) => (
                    <div key={i}>
                    <div style={{display:'block',marginLeft:'auto',marginRight:'auto',width:'70%'}}>
                        <Card sx={{ maxWidth:'150vh'}} style={{ backgroundColor: 'whitesmoke' }} id='card'>
                            <CardContent>
                                <div style={{}}>
                                    <Typography gutterBottom variant="h6" component="span">
                                        ID:{user.userid}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="span" style={{ paddingLeft: '55vh' }}>
                                        {user.username} ({user.city})
                                    </Typography>
                                </div>
                                <br />
                                <Typography variant="body1" color="text.secondary">
                                    {user.comments}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ float: 'right' }}>
                                <IconButton aria-label="edit" onClick={() => handleEdit(user.userid)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" color='error' onClick={() => { handleDeleteUser(user.userid) }}>
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                        <br />
                        </div>
                    </div>
                ))}
            </div>
            {/* Modal for adding user */}
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <Form.Group>
                                <Form.Label>Id</Form.Label>
                                <Form.Control type='number' name='userid'  onChange={(e) => setUserId(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' name='username' onChange={(e) => setUserName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control type='text' name='city' onChange={(e) => setUserCity(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Comments</Form.Label>
                                <Form.Control type='text' name='comments' onChange={(e) => setUserComments(e.target.value)}></Form.Control>
                            </Form.Group>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color='primary' variant='contained' onClick={handleAddUser}>Add</Button>
                        <span> </span>
                        <Button color='error' variant='contained' onClick={handleClose}>cancel</Button>
                    </Modal.Footer>
                </Modal>
                {/* Modal for editing user */}

                <Modal show={showEdit} onHide={handleCloseEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Comments</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <Form.Group>
                                <Form.Label>Id</Form.Label>
                                <Form.Control type='number' name='userid' value={userId} disabled></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' name='username' value={userName} disabled></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control type='text' name='city' value={userCity} disabled></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Comments</Form.Label>
                                <Form.Control type='text' name='comments' placeholder='Place your new comments' onChange={(e) => setUserComments(e.target.value)}></Form.Control>
                            </Form.Group>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color='primary' variant='contained' onClick={() => handleEditUser(userId)}>Edit</Button>
                        <span> </span>
                        <Button color='error' variant='contained' onClick={handleCloseEdit}>cancel</Button>
                    </Modal.Footer>
                </Modal>

            </div>
            <ReactPaginate
                previousLabel={""}
                nextLabel={""}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                subContainerClassName={"pagination2"}
                activeClassName={"active"} />
        </div>
    )
}

export default HomePage
