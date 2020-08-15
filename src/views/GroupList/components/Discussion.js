import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
  Collapse,
  CircularProgress,
  Grid,
  Button,
  Chip
} from '@material-ui/core';
import { Api } from '../../../config/constants';
import axios from 'axios';
import { handleErrorToastr } from '../../../utils/toastr';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 'auto'
  },
  discInfoItem: {
    marginRight: theme.spacing(5)
  }
}));

export default function Discussion(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = React.useState({});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getDiscussionData = async () => {
    let res;
    try {
      res = await axios.get(`${Api.baseURL}/getDiscussion/${props.discID}`);
      setData(res.data);
    } catch (error) {
      if (error.message == 'Network Error') {
        handleErrorToastr(error.message, () => props.CloseModal());
      }
      return Error();
    }
  };
  const handleDelete = () => {
    //console.info('You clicked the delete icon.');
  };

  useEffect(() => {
    getDiscussionData();
  }, []);
  const renderDiscussions = () => {
    if (!data) {
      return <CircularProgress color="secondary" className={classes.content} />;
    } else
      return (
        <Card className={classes.root} onClick={handleExpandClick}>
          <CardActionArea>
            <CardContent>
              <Grid container>
                <Grid item className={classes.discInfoItem}>
                  <Typography variant="body2" color="textSecondary">
                    {data.desc + '   '}
                  </Typography>
                </Grid>
                <Grid item className={classes.discInfoItem}>
                  <Chip
                    variant="outlined"
                    onDelete={handleDelete}
                    color={data.visible_to_group ? 'primary' : 'secondary'}
                    size="small"
                    label="Users can see replies"
                    deleteIcon={
                      data.visible_to_group ? <DoneIcon /> : <CancelIcon />
                    }
                  />
                </Grid>

                <Grid item>
                  <Chip
                    variant="outlined"
                    onDelete={handleDelete}
                    color={data.users_see_replies ? 'primary' : 'secondary'}
                    size="small"
                    label="Discussion visible to group"
                    deleteIcon={
                      data.users_see_replies ? <DoneIcon /> : <CancelIcon />
                    }
                  />
                </Grid>
              </Grid>
              <Typography variant="body2" color="textSecondary">
                {data.desc + '   '}
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
      );
  };
  return <>{renderDiscussions()}</>;
}
