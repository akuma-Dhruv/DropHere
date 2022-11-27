const sendArea=document.getElementById("sendBox")
const selectFiles=document.getElementById("selectFiles")
const addbutton= document.getElementById("addButton")
const fileList= document.getElementById("fileList");

sendArea.addEventListener("click",function(){
    selectFiles.click();
});

selectFiles.addEventListener("change",function(e){
    if(selectFiles.value)
    {
        addbutton.setAttribute("hidden","hidden")
    }
    if(fileList.lastElementChild)
    {
        var child = fileList.lastElementChild; 
        while (child) {
            fileList.removeChild(child);
            child = fileList.lastElementChild;
        }
    }
    var selectedFiles=e.target.files;
    for(let i=0;i<selectedFiles.length;i++)
    {
        let li=document.createElement("li");
        li.innerHTML=selectedFiles[i].name;    
        fileList.appendChild(li);
    }
});

