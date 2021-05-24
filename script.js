function getAndUpdate() {
    console.log("Inside getAndUpdate function");
    count = document.getElementById('joke').value;
    console.log(typeof(count))
    console.log(count);
    getData(count);
}

function getData(count){
    count = parseInt(count);
    console.log(typeof(count));
    console.log("Inside getData function");
    url = `http://api.icndb.com/jokes/random/${count}`;

    if(document.getElementById("Check1").checked == true)
    url = `http://api.icndb.com/jokes/random/${count}?limitTo=[explicit]`;
    fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(typeof(data));
        var deal ;
        for (i = 0; i < count; i++) {
            console.log(data['value'][i]['joke']);
            deal = data['value'][i]['joke'];
            if (localStorage.getItem('itemsJson')==null){
                itemJsonArray = [];
                itemJsonArray.push(deal);
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
            }
            else{
                itemJsonArrayStr = localStorage.getItem('itemsJson')
                itemJsonArray = JSON.parse(itemJsonArrayStr);
                itemJsonArray.push(deal);
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
            }
            
            
        }
        update();
        
    });

}

function update(){
    if (localStorage.getItem('itemsJson')==null){
        itemJsonArray = []; 
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    } 
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr); 
    }
    // Populate the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element}</td>
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Noob</button></td> 
        </tr>`; 
    });
    tableBody.innerHTML = str;
}

function deleted(itemIndex){
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();

}
function clearStorage(){
    if (confirm("Do you areally want to clear?")){
    console.log('Clearing the storage')
    localStorage.clear();
    update()
    }
}

meme = document.getElementById("meme")
meme.addEventListener("click",getAndUpdate);
