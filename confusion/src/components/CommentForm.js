import React, { Component } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Form,
  FormGroup,
  Row,
  Label,
  Col,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class CommentForm extends Component {
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
    console.log("Current state is" + JSON.stringify(value));
    alert("Current state is" + JSON.stringify(value));
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
export default CommentForm;
