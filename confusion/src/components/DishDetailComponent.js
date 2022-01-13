// import React from "react";
import React from 'react';
import {Card ,CardImg,CardText,CardBody,CardTitle} from "reactstrap";


     
  function RenderDish({dish})
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
    
   function RenderComments({dish})
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
                                    <p>-- {comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                                </li>
                            </ul>
                            )
                        })
                    }
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
       return(
        <div className='container'>
            <div className='row'>
                <RenderDish dish={props.dish}/>
                <RenderComments dish={props.dish}/> 
                
            </div>
    </div>
       );
    }

export default DishDetail;