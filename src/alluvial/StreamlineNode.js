// @flow
import AlluvialNodeBase from "./AlluvialNodeBase";
import Branch from "./Branch";
import { HIGHLIGHT_GROUP, STREAMLINE_NODE } from "./Depth";
import LeafNode from "./LeafNode";
import type { Side } from "./Side";
import { LEFT, opposite, sideToString } from "./Side";
import StreamlineLink from "./StreamlineLink";


export default class StreamlineNode extends AlluvialNodeBase {
  parent: ?Branch;
  children: LeafNode[] = [];
  link: ?StreamlineLink = null;
  side: Side;
  sourceId: string;
  targetId: ?string;
  depth = STREAMLINE_NODE;

  constructor(parent: Branch, id: string) {
    super(parent, parent.networkId, id);
    parent.addChild(this);
    this.side = parent.side;
    const [source, target] = id.split("--");
    this.sourceId = source;
    this.targetId = target;
  }

  addChild(node: LeafNode): number {
    const length = super.addChild(node);
    node.setIndex(length - 1, this.side);
    return length;
  }

  removeChild(node: LeafNode) {
    const index = node.getIndex(this.side);
    const found = index > -1 && index < this.children.length;

    if (found) {
      this.children[index] = this.children[this.children.length - 1];
      this.children[index].setIndex(index, this.side);
      node.setIndex(-1, this.side);
      this.children.pop();
    }

    return found;
  }

  get numLeafNodes(): number {
    return this.children.length;
  }

  makeDangling() {
    this.targetId = null;
  }

  static createId(source: LeafNode, side: Side, target: ?LeafNode = null): string {
    if (!target) {
      return `${
        source.networkId}_module${source.moduleId}_group${
        source.insignificant ? "i" : ""}${source.highlightIndex}_${sideToString(side)
      }`;
    }
    return `${
      source.networkId}_module${source.moduleId}_group${
      source.insignificant ? "i" : ""}${source.highlightIndex}_${sideToString(side)}--${
      target.networkId}_module${target.moduleId}_group${
      target.insignificant ? "i" : ""}${target.highlightIndex}_${sideToString(opposite(side))
    }`;
  }

  get oppositeId(): string {
    return `${this.targetId || "NULL"}--${this.sourceId}`
  }

  getOpposite(): ?StreamlineNode {
    if (this.link) {
      return this.link.left === this ? this.link.right : this.link.left;
    }
  }

  oppositeStreamlinePosition(flowThreshold: number) {
    const oppositeStreamlineNode = this.getOpposite();
    if (oppositeStreamlineNode) {
      const group = oppositeStreamlineNode.getAncestor(HIGHLIGHT_GROUP);
      if (group) {
        const module = group.parent;
        if (module && module.flow >= flowThreshold) {
          return -group.y;
        }
      }
    }
    return -Infinity;
  }

  linkTo(opposite: StreamlineNode) {
    const reverse = this.side === LEFT;
    this.link = opposite.link = new StreamlineLink(this, opposite, reverse);
  }

  removeLink() {
    if (this.link) {
      this.link.remove();
    }
  }
}
