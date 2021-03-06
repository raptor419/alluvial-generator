import React from "react";
import { Container, Grid, Header, Icon, List } from "semantic-ui-react";
import compareSvg from "../../images/compare.svg";
import expandModuleMov from "../../images/expand.mov";
import regroupModuleMov from "../../images/regroup.mov";
import Changelog from "./Changelog";


const videoProps = { autoPlay: true, loop: true, className: "ui", width: 300, height: 225 };

const Documentation = () =>
  <Container style={{ padding: "40px 0 40px 0" }}>
    <Grid columns={1}>
      <Grid.Column>
        <center><p>
          Alluvial Diagram Powered by <a href='http://www.mapequation.org/code.html'>MapEquation</a> available under MIT License.
        </p></center>
      </Grid.Column>
      </Grid>
  </Container>;

export default Documentation;
