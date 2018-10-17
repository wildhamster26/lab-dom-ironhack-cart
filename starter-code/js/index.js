function deleteItem(e){
  container = document.getElementById("container");
  container.removeChild(e.currentTarget.parentNode.parentNode);
}


function getPriceByProduct(itemNode){
}



function updatePriceByProduct(productPrice, index){
}

function getTotalPrice() {
  //get the HTML collections of items (get every item row element)
  var productLine = document.getElementsByClassName("product-line-wrapper");
  //create a totalSum variable to return at the end of the function
  var totalSum = 0;
  //loop through the collection
  for(var i = 0; i < productLine.length; i++) {
    //get each item's price, quantity and sum (per item)
    //get item price
    var itemPrice =  parseFloat(productLine[i].childNodes[3].textContent.slice(10, 15));
    //get item quantity
    var itemQuantity = Number(productLine[i].childNodes[5].childNodes[3].value);
    //calculate price * quantity
    var itemSum = itemPrice * itemQuantity;
    totalSum += itemSum;
    //change item sum accordingly
    productLine[i].childNodes[7].childNodes[1].textContent = "$" + itemSum.toString();
  }
  //return (add all item sums together)
  document.getElementById("total-sum").textContent = "$" + totalSum.toString();
  return totalSum;
}


function createQuantityInput(){
  var newInput = document.createElement("input");
  newInput.setAttribute("class", "quantity");
  newInput.setAttribute("type", "number");
  newInput.setAttribute("placeholder", "0");
  newInput.setAttribute("name", "quantity");
  return newInput;
}

function createDeleteButton(){
  var div = document.createElement("div");
  var button = document.createElement("button");
  var text = document.createTextNode("Delete");
  button.appendChild(text);
  button.setAttribute("class", "btn btn-delete");
  return div.appendChild(button);
}

function createQuantityNode(){
  var Input = createQuantityInput();
  var Div = document.createElement("div");
  var Label = document.createElement("label");
  Label.setAttribute("for", "quantity");
  var labelText = document.createTextNode("QTY");
  Label.appendChild(labelText);
  Div.appendChild(Label);
  Div.appendChild(Input);
  return Div;
}

function createItemNode(dataType, itemData){
  console.log(itemData);
  var Div = document.createElement("div");
  var Span = document.createElement("span");
  Span.setAttribute('class', "'" + dataType + "' ")
  var text = document.createTextNode(itemData);
  Span.appendChild(text);
  Div.appendChild(Span);
  return Div;
}

function createNewItemRow(itemName, itemUnitPrice){
  var newProductLine = document.createElement("div");
  var productName = createItemNode("product-name", itemName);
  var productPrice = createItemNode("product-price", "$" + itemUnitPrice + ".00");
  newProductLine.appendChild(productName);
  newProductLine.appendChild(productPrice);
  var newQuantityInput = createQuantityNode();
  newProductLine.appendChild(newQuantityInput);
  var itemSum = createItemNode("product-sum", "$0.00");
  newProductLine.appendChild(itemSum);  
  newProductLine.setAttribute("class", "product-line-wrapper");
  return newProductLine;
}

function createNewItem(){
  var userProductName = document.getElementById("new-item-name").value;
  var userProductPrice = document.getElementById("new-item-price").value;
  var row = createNewItemRow(userProductName, userProductPrice);
  var productListContainer = document.getElementById("product-list-items");
  var delButton = createDeleteButton();
  row.appendChild(delButton);
  console.log(productListContainer.appendChild(row));
}

window.onload = function(){
  var calculatePriceButton = document.getElementById('calc-prices-button');
  var createItemButton = document.getElementById('new-item-create');
  var deleteButtons = document.getElementsByClassName('btn-delete');

  calculatePriceButton.onclick = getTotalPrice;
  createItemButton.onclick = createNewItem;

  for(var i = 0; i<deleteButtons.length ; i++){
    deleteButtons[i].onclick = deleteItem;
  }
};
