import type { DropElement } from "./DropElement";

export class Container {
  private elements: DropElement[];
  private _id: string;

  constructor(elements: DropElement[]) {
    this.elements = elements;
    this._id = "Container-" + crypto.randomUUID();
  }

  get id() {
    return this._id;
  }

  addElement(element: DropElement, addPosition: number) {
    if (addPosition < 0 || addPosition > this.elements.length) {
      throw Error("Invalid position");
    }
    this.elements.splice(addPosition, 0, element);
  }

  removeElement(elementId: string): DropElement {
    const deleteElementIdx = this.elements.findIndex(
      (element) => element.id === elementId,
    );
    return this.elements.splice(deleteElementIdx, 1)[0];
  }

  updateElements(elements: DropElement[]) {
    this.elements = elements;
  }

  updateElementPosition(elementId: string, newPosition: number) {
    const elementIdx = this.elements.findIndex(
      (element) => element.id === elementId,
    );
    const element = this.elements[elementIdx];
    this.elements = this.elements.filter((element) => element.id === elementId);
    this.elements = this.elements.splice(newPosition, 0, element);
  }

  getElements(): DropElement[] {
    return this.elements;
  }
}
