import React from "react";
import PropTypes from "prop-types";
import { Slider } from "react-semantic-ui-range";
import { Button, Checkbox, Icon, Input, Menu, Sidebar as SemanticSidebar } from "semantic-ui-react";

export default function Sidebar(props) {
  return (
    <SemanticSidebar.Pushable>
      <SemanticSidebar
        as={Menu}
        animation="overlay"
        width="wide"
        direction="right"
        visible={true}
        vertical
      >
        <Menu.Item>
          <Input
            type="text"
            label="Width"
            labelPosition="left"
            value={props.width}
            onChange={(e, { value }) => props.onWidthChange(value)}
          />
        </Menu.Item>
        <Menu.Item>
          <Input
            type="text"
            label="Height"
            labelPosition="left"
            value={props.height}
            onChange={(e, { value }) => props.onHeightChange(value)}
          />
        </Menu.Item>
        <Menu.Item>
          <Input
            type="text"
            label="Max module width"
            labelPosition="left"
            value={props.maxModuleWidth}
          />
          <Slider
            settings={{
              start: props.maxModuleWidth,
              min: 10,
              max: props.width,
              step: 10,
              onChange: props.onMaxModuleWidthChange
            }}
          />
        </Menu.Item>
        <Menu.Item>
          <Input
            type="text"
            label="Streamline fraction"
            labelPosition="left"
            value={props.streamlineFraction}
          />
          <Slider
            settings={{
              start: props.streamlineFraction,
              min: 0,
              max: 3,
              step: 0.1,
              onChange: props.onStreamlineFractionChange
            }}
          />
        </Menu.Item>
        <Menu.Item>
          <Input
            type="text"
            label="Streamline opacity"
            labelPosition="left"
            value={props.streamlineOpacity}
          />
          <Slider
            settings={{
              start: props.streamlineOpacity,
              min: 0,
              max: 1,
              step: 0.05,
              onChange: props.onStreamlineOpacityChange
            }}
          />
        </Menu.Item>
        <Menu.Item>
          <Input
            type="text"
            label="Animation duration"
            labelPosition="left"
            value={props.duration}
          />
          <Slider
            discrete
            settings={{
              start: props.duration,
              min: 100,
              max: 2000,
              step: 100,
              onChange: props.onDurationChange
            }}
          />
        </Menu.Item>
        <Menu.Item>
          <Input
            type="text"
            label="Module flow threshold"
            labelPosition="left"
            value={props.moduleFlowThreshold}
          />
          <Slider
            discrete
            settings={{
              start: props.moduleFlowThreshold,
              min: 0,
              max: 0.05,
              step: 0.001,
              onChange: props.onModuleFlowThresholdChange
            }}
          />
        </Menu.Item>
        <Menu.Item>
          <Input
            type="text"
            label="Streamline height threshold"
            labelPosition="left"
            value={props.streamlineThreshold}
          />
          <Slider
            discrete
            settings={{
              start: props.streamlineThreshold,
              min: 0,
              max: 2,
              step: 0.01,
              onChange: props.onStreamlineThresholdChange
            }}
          />
        </Menu.Item>
        <Menu.Item>
          <Button.Group>
            <Button icon active={props.verticalAlign === "bottom"} onClick={() => props.onVerticalAlignButtonClick("bottom")}>
              <Icon name='align left' rotated="clockwise" />
            </Button>
            <Button icon active={props.verticalAlign === "justify"} onClick={() => props.onVerticalAlignButtonClick("justify")}>
              <Icon name='align justify' rotated="clockwise" />
            </Button>
          </Button.Group>
        </Menu.Item>
        <Menu.Item>
          <Checkbox toggle onChange={(e, { checked }) => props.onShowModuleIdChange(checked)} checked={props.showModuleId} label="Show module id"/>
        </Menu.Item>
      </SemanticSidebar>
      <SemanticSidebar.Pusher style={{ overflow: "hidden", height: "100vh" }}>
        {props.children}
      </SemanticSidebar.Pusher>
    </SemanticSidebar.Pushable>
  );
}

Sidebar.propTypes = {
  width: PropTypes.number,
  onWidthChange: PropTypes.func,
  height: PropTypes.number,
  onHeightChange: PropTypes.func,
  maxModuleWidth: PropTypes.number,
  onMaxModuleWidthChange: PropTypes.func,
  streamlineFraction: PropTypes.number,
  onStreamlineFractionChange: PropTypes.func,
  streamlineOpacity: PropTypes.number,
  onStreamlineOpacityChange: PropTypes.func,
  duration: PropTypes.number,
  onDurationChange: PropTypes.func,
  moduleFlowThreshold: PropTypes.number,
  onModuleFlowThresholdChange: PropTypes.func,
  streamlineThreshold: PropTypes.number,
  onStreamlineThresholdChange: PropTypes.func,
  verticalAlign: PropTypes.string,
  onVerticalAlignButtonClick: PropTypes.func,
  showModuleId: PropTypes.bool,
  onShowModuleIdChange: PropTypes.func
};
