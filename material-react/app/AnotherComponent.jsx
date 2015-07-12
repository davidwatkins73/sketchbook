import React from 'react';
import { Card, CardHeader, CardMedia, CardTitle, CardActions, FlatButton, CardText, Avatar} from 'material-ui';

class AnotherComponent extends React.Component{
    render() {
        return (

            <Card>
                <CardHeader
                    title="Title"
                    subtitle="Subtitle"
                    avatar={<Avatar>dw</Avatar>}/>
                <CardHeader
                    title="Demo Url Based Avatar"
                    subtitle="Subtitle"
                    avatar="http://lorempixel.com/100/100/nature/"/>
                <CardMedia overlay={<CardTitle title="Title" subtitle="Subtitle"/>}>
                    <img src="http://lorempixel.com/600/337/nature/"/>
                </CardMedia>
                <CardTitle title="Title" subtitle="Subtitle"/>
                <CardActions>
                    <FlatButton label="Action1"/>
                    <FlatButton label="Action2"/>
                </CardActions>
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
            </Card>
        );
    }
}


export default AnotherComponent;