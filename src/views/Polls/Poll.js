import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { Api } from '../../config/constants';
import axios from 'axios';
import { handleErrorToastr } from '../../utils/toastr';

const useStyles = makeStyles({
  root: {
    maxWidth: 'auto'
  }
});

export default function Poll(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = React.useState({});
  const [open, setOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const ModalHandleClickOpen = () => {
    setOpen(true);
  };
  const ModalHandleClickClose = () => {
    // we refrech  the moderators list table after adding new one
    //fetchModerators();
    setOpen(false);
  };

  const getPollData = async () => {
    let res;
    try {
      res = await axios.get(`${Api.baseURL}/getPoll/${props.poll._id}`);
      setData(res.data);
    } catch (error) {
      if (error.message == 'Network Error') {
        handleErrorToastr(error.message, () => props.CloseModal());
      }
      return Error();
    }
  };

  useEffect(() => {
    getPollData();
  }, []);

  return (
    <>
      <Card className={classes.root} onClick={handleExpandClick}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="subtitle2">
              {data.question}
            </Typography>

            <Typography variant="body2" color="textSecondary">
              {data.type + ' '} choice
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
