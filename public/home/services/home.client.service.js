angular.module('home').factory('Home', ['$location', '$http', '$timeout',
	function($location, $http, $timeout) {
        var bzrplnt                     =   window.bzrplnt;

		var categoryListObjArr          =   window.categoryListObjArr;
        var categoryListLft             =   [];
        var categoryListRgt             =   [];
              
        for(var i in categoryListObjArr){            
            if(i < 5){
                categoryListLft.push(categoryListObjArr[i]);
            }else{
                categoryListRgt.push(categoryListObjArr[i]);
            }
        }
        //console.log(categoryListLft);
        var catSubCatObj                =   {};
        function setCatSubCat(catSlug,subCatSlug) {
            catSubCatObj.catSlug        =   catSlug;
            catSubCatObj.subCatSlug     =   subCatSlug;
        }
        function getCatSubCat() {
            return catSubCatObj;
        }
        
        var adListFilterObj                 =   {};
        function setAdListFilterCatSubCat(catId,subCatId,catSlug,subCatSlug) {
            adListFilterObj.catId            =   catId;
            adListFilterObj.subCatId         =   subCatId;
            adListFilterObj.catSlug          =   catSlug;
            adListFilterObj.subCatSlug       =   subCatSlug;
        }
        function setAdFilterAdId(adId) {
            adListFilterObj.adId             =   adId;
        }
        function getAdListFilter() {
            return adListFilterObj;
        }

        var cityObj                     =   {};
        function setCityDtl(cId,cName){
            cityObj.cityId              =   cId;
            cityObj.cityName            =   cName;
        };
        function getCityDtl(){
            return cityObj;
        };

        function ucWords(str,rmGap){
            var resWord = null;
            if(str){
                resWord     =   str.trim().toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function(letter) {
                    if(rmGap){
                        return letter.toUpperCase().trim();
                    }else{
                        return letter.toUpperCase();
                    }                    
                });
            }
            return resWord;            
        }
        function lcWords(str){
            var resWord = null;
            if(str){
                resWord     =   str.trim().toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function(letter) {
                    return letter.toUpperCase();
                });
            }
            return resWord;            
        }
        function ucFirst(str) {
            var resWord = null;
            if(str){
                str         =   str.trim();
                resWord     =   str.charAt(0).toUpperCase() + str.slice(1);
            }
            return resWord;       
        }
        function lcFirst(str) {
            var resWord = null;
            if(str){
                str         =   str.trim();
                resWord     =   str.charAt(0).toLowerCase() + str.slice(1);
            }
            return resWord;       
        }
   
        function cleanString(stringToClean,strToReplace,strToUpper){
            cleanString    =   '';
            if(stringToClean != ''){
                if(strToUpper == 1){
                    cleanString    =   ucWords(stringToClean,1);//Remove all white space from both end and make it in lower case
                }else{
                    cleanString    =   stringToClean.trim().toLowerCase();//Remove all white space from both end and make it in lower case                    
                }                
                cleanString    =   cleanString.replace('/!\s+!/g','-'); // Replaces all spaces with hyphens.
                cleanString    =   cleanString.replace('/[^A-Za-z0-9\-]/g', ''); // Removes special chars.         
                cleanString    =   cleanString.replace('/-+/g', '-'); // Replaces multiple hyphens with single one.
                cleanString    =   cleanString.trim('-').replace('-', strToReplace);//Remocing - from both end of the string
            }
            return cleanString;
        }

        function camelCase(str){
            var resWord = null;
            if(str){
                resWord =   str
                .trim()  //might need polyfill if you need to support older browsers
                .replace(/[^\w\s]/gi, '') // replace special chracter
                .toLowerCase()  //lower case everything
                .replace(/([^A-Z0-9]+)(.)/ig, //match multiple non-letter/numbers followed by any character
                    function(match) { 
                        return arguments[2].toUpperCase();  //3rd index is the character we need to transform uppercase
                    }
                )
                .replace(/[0-9]/g, "");//remove all digits                
            }
            return resWord;
        }
        function cleanUrl(str){
            var resWord = null;
            if(str){
                resWord =   str
                .trim()  //might need polyfill if you need to support older browsers
                .replace(/[^\w\s]/gi, '') // replace special chracter
                .replace(/ /g,"-") // Replaces all spaces with hyphens.
                .toLowerCase() //lower case everything
                .replace(/[0-9]/g, "");//remove all digits                  
            }
            return resWord;
        }
        function shorterWod(str,len){
            var resWord = null;           
            if(str && len){
                if(str.length > len){
                    var charAtIdx = str.charAt(len);
                    if(charAtIdx == " "){
                        resWord = str.substr(0,len).trim();
                    }else{
                        var nextSpaceStrIdx = len + (str.substr(len).indexOf(" "));
                        resWord = str.substr(0,nextSpaceStrIdx).trim();
                    }
                }else{
                    resWord = str;
                }                
            }
            return resWord;
        }
        function addMonths(date, count) {
            if (date && count) {
                var m, d = (date = new Date(+date)).getDate();

                date.setMonth(date.getMonth() + count, 1);
                m = date.getMonth();
                date.setDate(d);
                if (date.getMonth() !== m) date.setDate(0);
            }
            return date
        }
        this.categoryListLft            = 	categoryListLft;
        this.categoryListRgt            = 	categoryListRgt;
        this.user                       =   window.user;
        
		return {
            bzrplnt:bzrplnt,
            categoryListLft: this.categoryListLft,
            categoryListRgt: this.categoryListRgt,
            catSubCatList:  categoryListObjArr,
            user: this.user,
            setCatSubCat: setCatSubCat,
            getCatSubCat: getCatSubCat,
            setCityDtl: setCityDtl,
            getCityDtl: getCityDtl,
            lcWords:lcWords,
            ucWords:ucWords,
            ucFirst:ucFirst,
            lcFirst:lcFirst,
            cleanString:cleanString,
            camelCase:camelCase,
            cleanUrl:cleanUrl,
            shorterWod:shorterWod,

            setAdListFilterCatSubCat:setAdListFilterCatSubCat,
            setAdFilterAdId:setAdFilterAdId,

            getAdListFilter:getAdListFilter
        };
	}
]);