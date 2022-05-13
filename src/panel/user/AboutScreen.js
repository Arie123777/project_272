/*
 * CSCI2720 Course Project
 * Regional Weather in Hong Kong
 *
 * Lai Man Hin 1155136167
 * Lam Chun Sang 1155136170
 * Lee Ka Sin 1155144294
 * He Yauhi 1155143159
 * Fan Dezen 1155143810
 */
import React from "react";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  makeStyles,
  ExpansionPanelDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Link,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// import image1 from '../../assets/image1.png';
// import image2 from '../../assets/image2.png';
// import image3 from '../../assets/image3.png';
// import image4 from '../../assets/image4.png';
// import image5 from '../../assets/image5.png';
// import image6 from '../../assets/image6.png';
// import image7 from '../../assets/image7.png';
// import image8 from '../../assets/image8.png';
// import image9 from '../../assets/image9.png';
// import image10 from '../../assets/image10.png';
// import image11 from '../../assets/image11.png';
// import image12 from '../../assets/image12.png';
// import image13 from '../../assets/image13.png';
// import image14 from '../../assets/image14.png';
// import image15 from '../../assets/image15.png';
// import image16 from '../../assets/image16.png';
// import image17 from '../../assets/image17.png';
// import image18 from '../../assets/image18.png';
// import image19 from '../../assets/image19.png';
// import image20 from '../../assets/image20.png';
// import image21 from '../../assets/image21.png';
// import image22 from '../../assets/image22.png';
// import image23 from '../../assets/image23.png';
// import image24 from '../../assets/image24.png';
// import image25 from '../../assets/image25.png';
// import image26 from '../../assets/image26.png';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightBold,
    marginTop: 4,
    marginBottom: 4,
  },
  expansionContentContainer: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: 600,
    margin: theme.spacing(2),
    borderWidth: 1,
    borderColor: "#9e9e9e",
    borderStyle: "solid",
  },
}));

const AboutScreen = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Typography variant="h4">About this website</Typography>

      <div style={{ height: 30 }} />

      <Typography variant="h5">Weathering With Me</Typography>
      <div style={{ height: 14 }} />

      <Typography>
        CSCI2720 Course Project
        <br />
        This website helps users to find the weather information in Hong Kong.{" "}
        <br />
        Data in this website is retrieved from{" "}
        <Link href="https://data.gov.hk">data.gov.hk</Link>
      </Typography>

      <div style={{ height: 16 }} />
      <Typography>
        @authors
        <br />
        Lai Man Hin 1155136167
        <br />
        Lam Chun Sang 1155136170
        <br />
        Lee Ka Sin 1155144294
        <br />
        He Yahui 1155143159
        <br />
        Fan Dezen 1155143810
        <br />
      </Typography>

      <div style={{ height: 32 }} />

      <Typography variant="h5">User Menu</Typography>
      <div style={{ height: 16 }} />
      <Typography>For users</Typography>
      <div style={{ height: 16 }} />
      {/* <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            All locations are listed in the table below.
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            You can click menu and select Table View to see the list of
            locations.
          </Typography>
          <img src={image1} className={classes.image} />
          <Typography>
            In each location, you can perform actions such as marking it as
            favourite, or click &#62; to see its coordinates on the map.
          </Typography>
          <img src={image2} className={classes.image} />
          <Typography>
            On the map, you can click Open in Maps View to go to the map view
            and read detailed information of the location.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}

      {/* <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Show all locations on a map
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            Go to the menu → select “Map View” and you will see all locations
            shown on a map.
          </Typography>
          <img src={image3} className={classes.image} />
        </ExpansionPanelDetails>
      </ExpansionPanel> */}

      {/* <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Single location view with comment function
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            In Map View, clicking one of the locations will reveal more
            information about it. You can also mark as your favorite and comment
            on each location.
          </Typography>
          <img src={image4} className={classes.image} />
          <Typography>
            The location marker in red is your home location. See section “Set
            home location” below.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}

      {/* <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Search by keyword</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            On the top right corner of Table View, you can enter keywords to
            search. The search program will find matches on all columns.
          </Typography>
          <img src={image5} className={classes.image} />
          <Typography>
            The location marker in red is your home location. See section “Set
            home location” below.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}

      {/* <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Search locations within a distance
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            To search location within a distance from home location (see more in
            section “Home Location”), type “nearby ” (with a space after) in the
            search box. The indicator “km” will show up at the back of the
            search box. Type any number and the program will automatically
            calculate locations that fit in the provided range.
          </Typography>
          <img src={image6} className={classes.image} />
          <img src={image7} className={classes.image} />
        </ExpansionPanelDetails>
      </ExpansionPanel> */}

      {/* <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Set home location</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            Home location is for calculating the relative distance to each
            location. With home location set, you can sort locations by
            distance, and search location within specific distance.
          </Typography>
          <Typography>
            To set Home location, click on your profile icon on the top right
            corner, and select “set home location”
          </Typography>
          <img src={image8} className={classes.image} />
          <Typography>
            A popup will show up allowing you to edit your home location. Click
            anywhere on the map to update your home location. Click done if you
            are done.
          </Typography>
          <img src={image9} className={classes.image} />
        </ExpansionPanelDetails>
      </ExpansionPanel> */}

      {/* <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Site Statistics</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            Go to the menu → select “Statistics” and you will see two charts
            about the statistics of the site which are the most commented
            location and most favorite location.
          </Typography>
          <img src={image10} className={classes.image} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Logout</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            To logout, click on your profile icon on the top right corner, and
            select “logout”
          </Typography>
          <img src={image11} className={classes.image} />
        </ExpansionPanelDetails>
      </ExpansionPanel> */}

      <div style={{ height: 16 }} />
      <Typography>For admin</Typography>
      <div style={{ height: 16 }} />

      {/* <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Login</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            Click the “LOGIN ADMIN” button and you will be logged in to the
            admin panel.
          </Typography>
          <img src={image12} className={classes.image} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>CRUD user data</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            Select “User CRUD” and you will see a list of users.
          </Typography>
          <img src={image13} className={classes.image} />
          <Typography>
            You can add, edit or delete a user by clicking one of the buttons
            below respectively.
          </Typography>
          <img src={image14} className={classes.image} />
          <Typography>
            Add a new user (Create): <br />
          </Typography>
          <Typography>
            Click the “Add new” button, fill in the required fields, then click
            the tick button to confirm or cross button to cancel (same buttons
            for confirmation or cancelation of editing and deleting user)
          </Typography>
          <img src={image15} className={classes.image} />
          <Typography>
            Edit (Update): <br />
          </Typography>
          <Typography>
            Click the “Edit” button and do the same things as the above.
          </Typography>
          <img src={image16} className={classes.image} />
          <Typography>
            Delete: <br />
          </Typography>
          <Typography>
            Click the “Delete” button and do the same things as the above.
          </Typography>
          <img src={image17} className={classes.image} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            CRUD location data
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            Select “Location CRUD” and you will see a list of locations.
          </Typography>
          <img src={image18} className={classes.image} />
          <Typography>
            All the CRUD actions for location data are performed as the same as
            CRUD user data.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Update data</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            Select “Update Data” and you will see two buttons.
            <br />
          </Typography>
          <Typography>
            a. Reload from online dataset: Click “RELOAD DATA FROM DATA.GOV.HK”
            button
            <br />
          </Typography>
          <Typography>
            b. Obtain location data from CSV file upload: Click “UPLOAD CSV
            FILE” button
            <br />
          </Typography>
          <img src={image19} className={classes.image} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Log out</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            Select the last button on the menu bar then you will be logged out
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}

      <div style={{ height: 32 }} />

      <Typography variant="h5">Data Schemas and Database Models</Typography>
      <div style={{ height: 16 }} />

      {/* <Typography>
        There are 4 data schemas in total, namely CommentSchema,
        FavouriteSchema, WeatherSchema and UserSchema.
      </Typography>
      <div style={{ height: 16 }} /> */}

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>UserSchema</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            UserSchema is used to store comments from users. It contains
            information like user_id, user_name, user_pwd and user_rank.
          </Typography>
          <img src={image22} className={classes.image} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            UserLocationSchema{" "}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            UserLocationSchema is used to store the userlocations that have been
            marked as favourite by users. It contains information like
            user_location_id, user id and location_id.
          </Typography>
          <img src={image23} className={classes.image} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>LocationSchema </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            LocationSchema is used to store the details of locations. It
            contains location_id, location_name,latitude,longitude.
          </Typography>
          <img src={image24} className={classes.image} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            LocationTimeSchema{" "}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>
            LocationTimeSchema is used to store the details of locationtime. It
            contains information like user id, name, password, role (as a user
            or admin), longitude and latitude (which are used to locate the home
            location of the user).
          </Typography>
          <img src={image25} className={classes.image} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>ER Diagram</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionContentContainer}>
          <Typography>The ER Diagram is shown below.</Typography>
          <img src={image26} className={classes.image} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <div style={{ height: 32 }} />

      <Typography variant="h5">
        Pros and cons of the technologies we use
      </Typography>
      <div style={{ height: 16 }} />

      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Chosen Platform/technologies</TableCell>
              <TableCell>Advantages</TableCell>
              <TableCell>Disadvantages</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography>mongoDB with Mongoose</Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  1. High performance(deal with large volume of data)
                  <br />
                </Typography>
                <Typography>
                  2. Flexible data schema
                  <br />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  1. No relationships among data
                  <br />
                </Typography>
                <Typography>
                  2. No ACID, cannot ensure data consistency
                  <br />
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Typography>Node.js with Express</Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  1. Full stack Javascript( easy for groupmates to learn the
                  tool)
                  <br />
                </Typography>
                <Typography>
                  2. High performance (faster code execution time)
                  <br />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  1. Asynchronous Programming Model
                  <br />
                </Typography>
                <Typography>
                  2. Application Programming Interface is not stable
                  <br />
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Typography>React</Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  1. Good for single page app
                  <br />
                </Typography>
                <Typography>
                  2. Great community support
                  <br />
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  1. Has high learning curve
                  <br />
                </Typography>
                <Typography>
                  2. JSX can be confusing
                  <br />
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ height: 32 }} />

      <Typography variant="h5">Academic Honesty</Typography>
      <div style={{ height: 16 }} />

      <Typography>
        I have read this article carefully
        http://www.cuhk.edu.hk/policy/academichonesty
      </Typography>
      <div style={{ height: 16 }} />
    </Container>
  );
};

export default AboutScreen;
