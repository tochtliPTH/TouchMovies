var q = require("q");
var request = require("./requester");

/**
  options = {
      query: '', 
      title:'',
      page:2,
      year:1997,
      type:"Movie"
  } 
 */

var finder = {
    search : function(options){
            //s=popo&plot=short&r=json&page=6&type=movie
            //t=popo
         var self = this;
         var mapper = {
                query: 's', 
                title:'t',
                page:'page',
                year:'y',
                type:'type'                
            }


            if(typeof options != 'object'){
                throw new Error('Option type Error');
            }

            var queryString = "?"

           for(key in options){
               if(options.hasOwnProperty(key) && mapper.hasOwnProperty(key)){
                   if(key == 'type' && options[key] != self.TYPES.MOVIE
                   &&  options[key] != self.TYPES.SERIES
                   &&  options[key] != self.TYPES.EPISODE){
                       continue;
                   }
                   queryString += mapper[key] + '=' +options[key]+'&';
               }
           }           
          return request({url: queryString});
    },
    getDetail : function(id,plotSize){
        //i=tt0787524&tomatoes=true
        if(typeof id != 'string'){
            throw new Error('Invalid imdbID');
        }
       
        var queryString = '?tomatoes=true&i='+id+'&';
        if(plotSize == this.PLOTSIZE.SHORT || this.PLOTSIZE.FULL){
            queryString += 'plot='+plotSize;
        }

        return request({url: queryString});
    },
    getRandomSearch : function(type){
        type = type || null;
        var vocals="aeiou";
        var consonant="bcdfghjklmnpqrstuvw";
        var randomSearch = '';

        randomSearch += consonant[(Math.ceil(Math.random()*100))%consonant.length];
        randomSearch += vocals[(Math.ceil(Math.random()*100))%vocals.length];
                
        return this.search({"query" : randomSearch,"type":type});
        
    }
};

Object.defineProperties(finder,{
    TYPES:{
        writable: false, 
        value:{
            MOVIE:'movie',
            SERIES: 'series',
            EPISODE: 'episode'
        } 
    },
    PLOTSIZE:{
        writable:false,
        value:{
            SHORT:'short',
            FULL:'full'
        }
    }
 });



 module.exports = finder;