const sendArea=document.getElementById("sendBox")
const selectFiles=document.getElementById("selectFiles")
const addbutton= document.getElementById("addButton")
const fileList= document.getElementById("fileList");

sendArea.addEventListener("click",function(){
    selectFiles.click();
});

selectFiles.addEventListener("change",function(){
    if(selectFiles.value)
    {
        addbutton.setAttribute("hidden","hidden")
        fileList.innerHTML+=selectFiles.value

    }
});

