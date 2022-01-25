// import React from "react";
import React,{Component} from 'react';
import {Card ,CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem,Modal,ModalBody,ModalHeader,Button,Row,Label,Col} from "reactstrap";
import {Link} from 'react-router-dom';
// import CommentForm from './CommentForm';
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseURL';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export class CommentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false,
      };
      this.toggleModal = this.toggleModal.bind(this);
    }
  
    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
      });
    }
    handleSubmit(value) {
      this.toggleModal()
      this.props.addComment(this.props.dishId,value.rating,value.author,value.comment)
    }
    render() {
      return (
        <>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil"></span> Send Comment
          </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              
                <LocalForm  onSubmit={(value) => this.handleSubmit(value)}>
                  <Row className="form-group">
                    <Label md={12} htmlFor="rating">Rating</Label>
  
                    <Col md={12}>
                    <Control.select 
                      model=".rating"
                      id="rating"
                      name="rating"
                      className="form-control"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                    </Col>
                  </Row>
                  <Row className="form-group">
                    <Label md={12} htmlFor="name">Your Name</Label>
                  <Col md={12}>
                  <Control.text
                      model=".author"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      validators={{
                          required,
                          minLength: minLength(3),
                          maxLength: maxLength(15),
                        }}
                    />
                    <Errors
                    className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "Required",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less",
                      }}
                    />
                  </Col>
                    
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="comment" md={12}>Comment</Label>
  
                    <Col md={12}>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      rows="6"
                      className="form-control"
                    />
                    </Col>
                  </Row>
                  <Button type="submit" color="primary">
                      Submit
                  </Button>
                </LocalForm>
              
            </ModalBody>
          </Modal>
        </>
      );
    }
  }
     
  function RenderDish({dish})
    {
        if(dish!=null)
        {
            return(
                <div  className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={baseUrl+dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            );
        }
        else{
            return(
                <div>
                    
                </div>
            )
        }
    }
    
   function RenderComments({comments,addComment,dishId})
    {
        if(comments!=null)
        {
            return(
                <div  className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {
                        comments.map((comment)=>{
                            return(
                                <ul key={comment.id} className='list-unstyled '>
                                <li>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            </ul>
                            )
                        })
                    }
                    <CommentForm dishId={dishId} addComment={addComment}/>
                </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
    // renderComment(arr)
    // {
    //    arr.forEach(element => {
    //        return(element.id);
    //    });
    // }
    
    const DishDetail=(props)=>{
        console.log('Dish Detail Component Menu components render is invoked')
        // console.log(this.props.selectedDish.comments[0]);
        if(props.isLoading){
          return(
            <div className='container'>
              <div className='row'>
                <Loading />

              </div>
            </div>
          )
        }
        else if(props.errMess){
          return(
            <div className='container'>
              <div className='row'>
                <h4>
                  {props.errMess}
                </h4>

              </div>
            </div>
          )
        }
        else if(props.dish!=null){
        return(
        <div className='container'>
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>
                    {props.dish.name}
                    </h3>
                    <hr/>
                </div>
            </div>
            <div className='row'>
                <RenderDish dish={props.dish}/>
                <RenderComments comments={props.comments}
                addComment={props.addComment}
                dishId={props.dish.id}/> 
                
            </div>
    </div>
       )};
    }

export default DishDetail;