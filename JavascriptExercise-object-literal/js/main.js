/**
 * Created by Amanda on 25/04/2015.
 */

var menu = {
    loadElements: function(){
        var result = "";
        $.ajax({
            dataType: "json",
            url:'./data.json',
            async: false,
            success: function(data){
                console.log('Foi!');
                result = data;
            },
            error: function(data){
                console.log('Deu ruim!');
            }
        });
        return result;
    },
    loadMenu: function(data, olderItems){
        if (typeof olderItems != "undefined") {
            items = olderItems;
        }
        else if(typeof olderItems == "undefined") {
            items = "<ul>";
        }


        $.each(data["menu"], function(index, element){
            if(element["status"] == 'dropdown'){
                objeto = "";
                objeto += "<li id='"+ element["text"] +"'>"+ element["text"] +"<ul>";
                objeto += menu.loadMenu(element, objeto);

                objeto += "</ul></li>";
                items += objeto;
            }
            else if (element["status"] == 'enabled'){
                items +="<li id='"+ element["text"] +"'>"+ element["text"] +"</li>";
            }
        });

        return items;
    },
    appendMenu : function(itens){
        document.write(itens);
        //itens.appendTo("#menu");
    }
   /* loadMenu: function(data){
        var items = [];
        $.each(data["menu"], function(index, element){
            if(element["status"] == 'dropdown'){
                objeto = "";
                objeto = objeto + "<li id='"+ element["text"] +"'>"+ element["text"] +"<ul>";
                $.each(element["menu"], function(index, subelement){
                    objeto = objeto + "<li id='"+ subelement["text"] +"'>"+ subelement["text"] +"</li>";
                });
                objeto = objeto + "</ul></li>";
                items.push(objeto)
            }
            else if (element["status"] == 'enabled'){
                items.push("<li id='"+ element["text"] +"'>"+ element["text"] +"</li>");
            }
        });

        $("<ul>", {
            html:items.join("")
        }).appendTo("#menu");
    }*/

}

//menu.loadElements();
//menu.loadMenu(menu.loadElements());
menu.appendMenu(menu.loadMenu(menu.loadElements()));