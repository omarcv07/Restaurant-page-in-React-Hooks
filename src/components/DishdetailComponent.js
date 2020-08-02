import React, { useState } from 'react';
import { Card, CardText, CardTitle, CardBody, CardImg, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
    Label, Row, Col  } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => val && (val.length >= len)

const CommentForm = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen)

    const handleSubmit = (values) => {
        toggleModal();
        props.postComment(props.dishId, values.rating, values.author, values.comment)
        // console.log(`Current state is: ${JSON.stringify(values)}`);
        // alert(`Current state is: ${JSON.stringify(values)}`)
    }

    return(
        <div>
            <Button outline onClick={toggleModal}>
                <span className="fa fa-pencil fa-lg"></span> Submit Comment
            </Button>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}><strong>Submit Comment</strong></ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={2}><h5>Rating</h5></Label>
                            <Col md={12}>
                                <Control.select className="form-control" id="rating" model=".rating" name="rating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={4}><h5>Your Name</h5></Label>
                            <Col md={12}>
                                <Control.text id="author" model=".author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators= {{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors 
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={4}><h5>Comment</h5></Label>
                            <Col md={12}>
                                <Control.textarea id="comment" model=".comment" name="comment"
                                    rows={6}
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={4}>
                                <Button color="primary" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
    )
}

const RenderDish = ({ dish }) => {
        if (dish != null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    const RenderComments = ({ comments, postComment, dishId }) => {
        if (comments != null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4 className="font-weight-bold">Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment) => {
                            return (
                                <li key={comment.id}>
                                    <p>
                                        {comment.comment}
                                    </p>
                                    <p>
                                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    </p>
                                </li>
                            )
                        })}
                        <CommentForm dishId={dishId} postComment={postComment} />
                    </ul>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container d-flex justify-content-center">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                    <div className="row">
                            <RenderDish dish={props.dish} />
                            <RenderComments comments={props.comments} 
                                postComment={props.postComment}
                                dishId={props.dish.id}    />
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

export default DishDetail;