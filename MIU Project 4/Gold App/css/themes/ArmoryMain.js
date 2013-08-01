/*
 Ryan Cantone
 Project 4
 1308
 8-1-13
 */

window.addEventListener("DOMContentLoaded", function doItAll(){

    function grab(e){
        var elementID = document.getElementById(e);
        return elementID;
    }

    /*function makeSelect(){
        var formTag = document.getElementsByTagName("form"),
            selectLi = grab("select"),
            makeSelect = document.createElement("select");
        makeSelect.setAttribute("id", "weapons");
        for(var i = 0, j = weaponType.length; i < j; i++){
            var makeOption = document.createElement("option");
            var optText = weaponType[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }*/

    function getRadio(){
        var radios = document.forms[0].deadly;
        for(var i = 0; i < radios.length; i++){
            if (radios[i].checked){
                var deadlyValue = radios[i].value;
            }
        }
    }

    function getCheckbox(){
        if(grab('liked').checked){
            var likedValue = grab('liked').value;
        } else {
            likedValue = "No";
        }
    }

    function toggleControls(n){
        switch(n){
            case "on":
                grab("addItem").style.display = "none";
                grab('clearData').style.display = "inline";
                grab("displayData").style.display = "none";
                grab("addNew").style.display = "inline";
                break;
            case "off":
                grab("addItem").style.display = "block";
                grab('clearData').style.display = "inline";
                grab("displayData").style.display = "inline";
                grab("addNew").style.display = "none";
                grab("items").style.display = "none";
                break;
            default:
                return false;
        }
    }

    /*function validate(e){
        var getWeaponName = grab("wn");
        var getWeaponCategory = grab("weapons");

        errMsg.innerHTML = "";
        getWeaponName.style.border = "1px solid black";
        getWeaponCategory.style.border = "1px solid black";

        var messageArray = [];

        if(getWeaponName.value === ""){
            var weaponNameError = "Please enter the weapon's name.";
            getWeaponName.style.border = "2px solid red";
            messageArray.push(weaponNameError);
        }

        if(getWeaponCategory.value === "--Weapon Category--"){
            var weaponCategoryError = "Please choose a weapon category.";
            getWeaponCategory.style.border = "2px solid red";
            messageArray.push(weaponCategoryError);
        }

        if(messageArray.length >= 1){
            for(var i = 0, j = messageArray.length; i < j; i++){
                var text = document.createElement("li");
                text.innerHTML = messageArray[i];
                errMsg.appendChild(text);
            }
            e.preventDefault();
            return false;
        } else {
            storeData(this.key);
        }
    }*/

    function storeData(key){
        if(!key){
            var id = Math.floor(Math.random()*100000001);
        } else {
            id = key;
        }
        getRadio();
        getCheckbox();
        var item = {};
        item.weaponName = ["Weapon Name:", grab("weaponName").value];
        item.weaponCategory = ["Weapon Category:", grab("weaponCategory").value];
        item.deadly = ["Deadly:", deadlyValue];
        item.liked = ["Liked:", likedValue];
        item.difficulty = ["Difficulty:", grab("difficulty").value];
        item.otherDetails = ["Other Details:", grab("otherDetails").value];
        localStorage.setItem(id, JSON.stringify(item));
        alert("Weapon Registered!");
    }

    function autoFillData(){
        for(var n in json){
            var id = Math.floor(Math.random()*100000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }

    function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            var ask = confirm("There are no registered weapons. Would you like to auto-fill the Database?");
            if(ask){
                autoFillData();
            } else {
                window.location.reload();
            }
        }
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "items");
        makeDiv.setAttribute("data-role", "page");

        var makeList = document.createElement("ul");
        makeList.setAttribute("data-role","listview");
        makeList.setAttribute("data-theme", "a");
        makeList.setAttribute("data-inset","true");
        makeList.setAttribute("data-filter", "true");

        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        grab("items").style.display = "block";
        for(var i = 0, len=localStorage.length; i < len; i++){
            var makeli = document.createElement("li");
            makeli.setAttribute("id","listele");
            var linksLi = document.createElement("div");
            linksLi.setAttribute("id","divele");
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = document.createElement("p");
            makeli.appendChild(makeSubList);
            getImage(obj.weaponCategory[1], makeSubList);
            for(var n in obj){
                var makeSubli = document.createElement("div");
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0] + " " + obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi);
        }
    }

    function getImage(catName, makeSubList){
        var imageLi = document.createElement("li");
        makeSubList.appendChild(imageLi);
        var newImage = document.createElement("img");
        var setSrc = newImage.setAttribute("src", "images/" + catName + ".svg");
        imageLi.appendChild(newImage);

    }

    function makeItemLinks(key, linksLi){
        var editLink = document.createElement("a");
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Weapon";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);

        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);

        var deleteLink = document.createElement("a");
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Weapon";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }

    function editItem(){
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);

        toggleControls("off");

        grab("weaponName").value = item.weaponName[1];
        grab("weaponCategory").value = item.weaponCategory[1];
        var radios = document.forms[0].deadly;
        for(var i = 0; i < radios.length; i++){
            if(radios[i].value == "Almost Always" && item.deadly[1] == "Almost Always"){
                radios[i].setAttribute("checked", "checked");
            } else if(radios[i].value == "Sometimes" && item.deadly[1] == "Sometimes"){
                radios[i].setAttribute("checked", "checked");
            } else if(radios[i].value == "Rarely" && item.deadly[1] == "Rarely"){
                radios[i].setAttribute("checked", "checked");
            }
        }
        if(item.liked[1] == "Yes"){
            grab("liked").setAttribute("checked", "checked");
        }
        grab("difficulty").value = item.difficulty[1];
        grab("otherDetails").value = item.otherDetails[1];

        saveData.removeEventListener("click", storeData);

        grab("saveData").value = "Edit Weapon";
        var editSubmit = grab("saveData");

        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }

    function deleteItem(){
        var ask = confirm("Are you sure you want to delete this weapon?");
        if(ask){
            localStorage.removeItem(this.key);
            alert("Weapon removed from the Armory.");
            window.location.reload();
        } else {
            alert("Weapon was not removed from the Armory.");
        }
    }

    function eraseData(){
        if(localStorage.length === 0){
            alert("There are no registered weapons at the moment.");
        } else {
            var ask = confirm("Are you sure you want to delete the entire Armory Database?");
            if(ask){
                localStorage.clear();
                alert("The Armory Database has been erased.");
                window.location.reload();
                return false;
            } else {
                alert("The Armory Database was not deleted.");
                window.location.reload();
            }
        }
    }
    function validate(){
        var parseWeaponForm = function(data){
            storeData(data);
        };
        $(document).ready(function(){
            var wForm = $("#registerWeaponForm");
            wForm.validate({
                invalidHandler: function(form, validator){},
                submitHandler: function(){

                    var data = wForm.serializeArray();
                    parseWeaponForm(data);
                }
            });
        });
    }

    var /*weaponType = ["--Weapon Category--", "Handgun", "SMG", "Shotgun", "Rifle", "Bow", "Sword", "Axe", "Dagger", "Mace", "Explosive", "Other"]*/
        deadlyValue,
        likedValue = "No";
        //errMsg = grab("errors");

    //makeSelect();

    var saveData = grab("saveData");
    saveData.addEventListener("click", validate);
    var displayData = grab("displayData");
    displayData.addEventListener("click", getData);
    var clearData = grab("clearData");
    clearData.addEventListener("click", eraseData);
});