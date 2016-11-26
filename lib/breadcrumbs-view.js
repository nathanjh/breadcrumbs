'use babel';

export default class BreadcrumbsView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('breadcrumbs');
    this.element.addEventListener("click", (event) => {
      this.onClick(event);
    });

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The Breadcrumbs package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);

    // test the bar
    const test = document.createElement('input');
    test.classList.add('input-range');
    test.id = 'slideybar';
    test.type = 'range';
    test.min = 0;
    test.max = 100; // Needs to be the sessionLength() value
    test.step = 10;
    test.value = test.max;
    this.element.appendChild(test);

    const testLabel = document.createElement('div');
    testLabel.id = "slideVal"
    testLabel.textContent = test.value;
    this.element.appendChild(testLabel);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  changeValue() {
    currentVal = document.getElementById('slideybar').value;
    console.log("CURRENT:" + currentVal)
    this.element.children[2].innerHTML = currentVal
    // document.getElementById('slideVal').innerHTML = slidyBarVal;
  }

  onClick(event) {
    console.log("In onClick", this);
    this.changeValue();
  }

}
