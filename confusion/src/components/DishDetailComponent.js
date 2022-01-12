// import React from "react";
import react,{Component} from 'react';
import {Card ,CardImg,CardImgOverlay,CardText,CardBody,CardTitle} from "reactstrap";

class DishDetailComponent extends Component{
    constructor(props){
        super(props);
    }
    renderDish(dish)
    {
        if(dish!=null)
        {
            return(
                <div  className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
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
    
    renderComments(dish)
    {
        if(dish!=null)
        {
            return(
                <div  className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {
                        dish.comments.map(comments=>{
                            return(
                                <ul key={comments.id} className='list-unstyled '>
                                <li>
                                    <p>{comments.comment}</p>
                                    <p>-- {comments.author}, {comments.date}</p>
                                </li>
                            </ul>
                            )
                        })
                    }
                </div>
            )
        }
    }
    // renderComment(arr)
    // {
    //    arr.forEach(element => {
    //        return(element.id);
    //    });
    // }
    
    render(){
        // console.log(this.props.selectedDish.comments[0]);
       return(
        <div className='container'>
        <div className='row'>
            {this.renderDish(this.props.selectedDish)}
          {this.renderComments(this.props.selectedDish)} 
            
        </div>
    </div>
       );
    }
}
export default DishDetailComponent;