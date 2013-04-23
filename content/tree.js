﻿Function.prototype.extend = function(){
    var args = arguments,
        $selfP = this.prototype,
        obj = null;
    for(var i=0,len=args.length;i<len;i++){
        obj = args[i];
        for(var p in obj){
            if(obj.hasOwnProperty(p)){
                $selfP[p] = obj[p];
            }
        }
    };
    return this;
};

function FileFold(name,data){
    this.name = name;
    this.files = [];
    this.init(data);
    return this;
};
FileFold.prototype = {
    foldpng : '../skin/img/treefolder.png',
    init : function(data) {
        var d = null,
            f = null;
        for(var i=0,len=data.length;i<len;i++){
           d = data[i];

           switch(d.type || 0){
                case 0 :
                    f = new File(d.href,d.name);
                break;
                case 1:
                    f = new FileFold(d.name,d.files);
                break;
           }
           this.files.push(f);
        }
        return this;
    },
    eachFile : function(f) {
        var files = this.files,
            c_f = null;
        for(var i=0,len=files.length;i<len;i++){
            c_f = files[i];
            f(i,c_f,files);
        };
    },
    toPageXUL: function() {
        
    },
    toCollectXUL: function() {
       var $self = this,
           xul = '<treeitem container="true" open="false">' +
           '<treerow>' + 
              '<treecell src="' + $self.foldpng + '" label="' + $self.name + '"/>' + 
              '<treecell label="" />' + 
            '</treerow>',
            filesXUL = '';
            $self.eachFile(function(i,d) {
                filesXUL += d.toCollectXUL();
            });
        filesXUL = '<treechildren>' + filesXUL + '</treechildren>';
        xul += filesXUL + '</treeitem>';
        return xul;
    },
    rootToXUL : function() {
        var $self = this,
            filesXUL = '';
        $self.eachFile(function(i,d) {
            filesXUL += d.toCollectXUL();
        });
        return filesXUL;
    }
}
/*
Root.prototype = new FileFold;
Root.prototype.toCollectXUL = function() {
   var filesXUL = '';
   this.eachFile(function(i,d) {
       filesXUL += d.toCollectXUL();
   });
   return filesXUL;
};
*/
/* 文件 */
function File(href,name){
    this.href = href;
    this.name = name;
};
File.prototype = {
    filepng : '../skin/img/treenote.png',
    toCollectXUL : function() {
        var $self = this;
        return '<treeitem>' + 
            '<treerow tooltiptext="'+ ($self.name + '\n' + $self.href) +'">' + 
            '<treecell src="' + $self.filepng + '" label="' + $self.name + '"/>' + 
            '<treecell label="' + $self.href + '"/>' +
            '</treerow>' +
            '</treeitem>';
    },
    toPageXUL : function() {
        
    }
};
