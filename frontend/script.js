const treeContainer = document.getElementById("tree-container");
const rootData = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [
        { name: "child1-child1", data: "c1-c1 Hello" },
        { name: "child1-child2", data: "c1-c2 JS" },
      ],
    },
    { name: "child2", data: "c2 World" },
  ],
};

function toggleChildrenVisibility(nodeElement) {
  const childrenContainer = nodeElement.querySelector(".children-container");
  const toggleButton = nodeElement.querySelector(".toggle-button");

  if (childrenContainer.style.display === "none") {
    childrenContainer.style.display = "block";
    toggleButton.textContent = "v";
  } else {
    childrenContainer.style.display = "none";
    toggleButton.textContent = ">";
  }
}

function renderNode(node, level = 0) {
  const nodeElement = document.createElement("div");
  nodeElement.className = "tree";
  nodeElement.style.marginLeft = level * 8 + "px";

  const toggleButton = document.createElement("span");
  toggleButton.setAttribute("class", "toggle-button");
  toggleButton.textContent = node.children ? "v" : "";
  toggleButton.addEventListener("click", () =>
    toggleChildrenVisibility(nodeElement)
  );

  const nameElement = document.createElement("span");
  nameElement.textContent = node.name;
  nameElement.setAttribute("class", "node-name");
  nameElement.addEventListener("click", () => {
    const nameInput = document.createElement("input");
    nameInput.setAttribute("id", "name-input");
    nameInput.value = node.name;
    nameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        node.name = nameInput.value;
        nameElement.textContent = node.name;
        nameElement.removeChild(nameInput);
        updateTree();
      }
    });
    nameElement.appendChild(nameInput);
    nameInput.focus();
  });
  const addButton = document.createElement("button");
  addButton.textContent = "Add Child";
  addButton.setAttribute("class", "add-child-button");
  addButton.addEventListener("click", () => addChild(node));

  nodeElement.appendChild(toggleButton);
  nodeElement.appendChild(nameElement);
  nodeElement.appendChild(addButton);

  const inputContainer = document.createElement("div");
  inputContainer.className = "input-container";

  if (node.children) {
    const childrenContainer = document.createElement("div");
    childrenContainer.className = "children-container";
    node.children.forEach((child) => {
      childrenContainer.appendChild(renderNode(child, level + 1));
    });
    inputContainer.appendChild(childrenContainer);
  } else {
    const inputLabel = document.createElement("span");
    inputLabel.textContent = "Data ";
    inputLabel.className = "input-label";

    const dataInput = document.createElement("input");
    dataInput.className = "data-input";
    dataInput.type = "text";
    dataInput.value = node.data;
    dataInput.addEventListener("input", (event) => {
      node.data = event.target.value;
    });

    inputContainer.appendChild(inputLabel);
    inputContainer.appendChild(dataInput);
  }

  nodeElement.appendChild(inputContainer);

  return nodeElement;
}

function addChild(parentNode) {
  if (!parentNode.children) {
    parentNode.children = [];
  }
  parentNode.children.push({ name: "New Child", data: "Data" });
  updateTree();
}

function updateTree() {
  treeContainer.innerHTML = "";
  treeContainer.appendChild(renderNode(rootData));
}

updateTree();

// Export
const display = document.getElementById("display");
const exportButton = document.getElementById("export");
exportButton.addEventListener("click", exportTree);
function exportTree() {
  const exportedData = JSON.stringify(rootData, null, 2); // Remove the replacer function temporarily
  display.innerText = exportedData;
  console.log(exportedData);
}
