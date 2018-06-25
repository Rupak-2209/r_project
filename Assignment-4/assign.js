    var i = 0;
    var block, image, desc, title, button;
    block = document.createElement("div");
    block.setAttribute("class","block");

    function addBlock1(images,titles,descr){

      block1 = document.createElement("div");
        block1.setAttribute("class","block-1");
        block.appendChild(block1);
      icon = document.createElement("div");
        icon.setAttribute("class","cancel");
        icon.innerHTML = "<img alt='image' src='images/cancel.png' class='cancel-img' onclick='removeDiv("+i+")'/>";
        block1.appendChild(icon);
      image = document.createElement("div");
        image.setAttribute("class","image");
        image.innerHTML = "<center><img alt='image' src="+ images +" class='calcImg'/></center>";
        block1.appendChild(image);
      title = document.createElement("div");
        title.setAttribute("class","title");
        title.innerHTML = titles;
        block1.appendChild(title);
      desc = document.createElement("div");
        desc.setAttribute("class","discription");
        desc.innerHTML = descr;
        block1.appendChild(desc);
      button = document.createElement("div");
        button.setAttribute("class","button");
        button.innerHTML="<center><button onclick='addBlock()' id=butt-"+i+">Click Me</button></center>";
        block1.appendChild(button);
      var parentEle = document.getElementById("test");
      parentEle.append(block);
      return block1;
    }

    function addBlock() {
      var images = ["images/calc.png", "images/code.png", "images/str.png", "images/calc.png", "images/code.png", "images/str.png"];
      var titles = ["title1", "title2", "title3", "title4", "title5", "title6"];
      var descriptions = [];
      descriptions[0] = "the subjects or topics covered in a book or document.the chapters or other formal divisions of a book or document:something that is to be expressed through some medium, as speech";
      descriptions[1] = "something that is to be expressed through some medium, as speech, writing, or any of various arts:a poetic form adequate to a poetic content.significance or profundity; meaning:";
      descriptions[2] = "a clever play that lacks content.the subjects or topics covered in a book or document.something that is to be expressed significance or profundity something that is to be expressed through";
      descriptions[3] = "the subjects or topics covered in a book or document.the chapters or other formal divisions of a book or document:something that is to be expressed through some medium, as speech";
      descriptions[4] = "something that is to be expressed through some medium, as speech, writing, or any of various arts:a poetic form adequate to a poetic content.significance or profundity; meaning:";
      descriptions[5] = "a clever play that lacks content.the subjects or topics covered in a book or document.something that is to be expressed";
      if(i == 0){
        addBlock1(images[i], titles[i], descriptions[i]);
        i++;
      }
      else{
        block.appendChild(addBlock1(images[i], titles[i], descriptions[i]));
        document.getElementById("butt-"+(i-1)).disabled = true;
        i++;
    }
    }

    function removeDiv(divNo) {
      var block = document.getElementsByClassName("block");
      var block2 = document.getElementsByClassName("block-1");
      block[0].removeChild(block2[divNo]);
      if(divNo == (i-1)){
        document.getElementById("butt-"+(i-2)).disabled = false;
        i=i-1;
      }
    }
    addBlock();
