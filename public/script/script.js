const chooseFile=document.getElementById("chooseFiles")
const selectFiles=document.getElementById("selectFiles")
const fileList= document.getElementById("fileList");

chooseFile.addEventListener("click",function(){
    selectFiles.click();
});

selectFiles.addEventListener("change",function(e){
    if(selectFiles.value)
    {
        chooseFile.setAttribute("hidden","hidden")
        document.getElementById("uploadButton").removeAttribute("hidden");
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

