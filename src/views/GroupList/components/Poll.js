import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, IconButton } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function MediaCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card className={classes.root} onClick={handleExpandClick}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h5">
              Lizard
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
            </Typography>
          </CardContent>
        </CardActionArea>

        <Collapse in={expanded} timeout="auto">
          <Button size="small" color="primary">
            Result
          </Button>
          <Button size="small" color="primary">
            Edit
          </Button>
          <Button size="small" color="primary">
            Hide
          </Button>
          <Button size="small" color="primary">
            Export
          </Button>
          <Button size="small" color="primary">
            Delete
          </Button>
        </Collapse>
      </Card>
    </>
  );
}
