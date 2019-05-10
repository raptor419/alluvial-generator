// @flow
import AlluvialNodeBase from "./AlluvialNodeBase";
import type { Side } from "./Side";
import { LEFT } from "./Side";
import Branch from "./Branch";
import { MODULE, STREAMLINE_NODE } from "./Depth";
import StreamlineId from "./StreamlineId";
import StreamlineLink from "./StreamlineLink";
import LeafNode from "./LeafNode";


export default class StreamlineNode extends AlluvialNodeBase {
  parent: ?Branch;
  children: LeafNode[] = [];
  link: ?StreamlineLink = null;
  side: Side;
  streamlineId: StreamlineId;
  depth = STREAMLINE_NODE;

  constructor(parent: Branch, id: string) {
    super(parent, parent.networkId, id);
    parent.addChild(this);
    this.side = parent.side;
    this.streamlineId = StreamlineId.fromString(id);
  }

  makeDangling() {
    this.streamlineId = this.streamlineId.getDangling();
    this.id = this.streamlineId.toString();
  }

  get targetId() {
    return this.streamlineId.target;
  }

  get hasTarget(): boolean {
    return !!this.targetId;
  }

  getOppositeStreamlineNode(): ?StreamlineNode {
    if (this.link) {
      return this.link.left === this ? this.link.right : this.link.left;
    }
    return null;
  }

  byOppositeStreamlinePosition(moduleFlowThreshold: number) {
    const atBottom = -Infinity;
    const opposite = this.getOppositeStreamlineNode();
    if (!opposite) return atBottom;
    const module = opposite.getAncestor(MODULE);
    if (!module || module.flow < moduleFlowThreshold) return atBottom;
    return -module.y;
  }

  linkTo(opposite: StreamlineNode) {
    let reverse = this.side === LEFT;
    StreamlineLink.linkNodes(this, opposite, reverse);
  }

  removeLink() {
    if (this.link) {
      this.link.remove();
    }
  }
}
