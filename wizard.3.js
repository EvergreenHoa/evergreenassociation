  var  bttnArry  = new Array( "" );
  var  bttnLvls  = new Array( -1,-1,-1 );
  var  lastBttn = "";
  var  lastLvl = -1;
  var  contBttn = 0;


  var	debug = true;


function txt10( iInput ){
  iInput = "0000000000"+ iInput.toString();
  return( iInput.slice(-10) );
}

function wizBttn( wLvl, wBttn, wDesc, wClass ){
  if( lastBttn != "" ){
    if( lastLvl == wLvl ){
      wizEnd( 1 );
    }
    if( lastLvl > wLvl ){
      wizEnd( lastLvl - wLvl +1 );
    }
  }

  if( wClass === undefined ){
    wClass = "";
  } else {
    wClass = " "+ wClass;
  }

  contBttn++;
  if( wBttn == "" ){ wBttn = contBttn; }
  wBttn = txt10( wBttn );

  document.write( '<p><button class="faqBttn'+ wLvl + wClass +'" onclick="setDiv('+"'"+ wBttn +"'"+')">' );
  document.write( '<b>'+ wDesc+'</b></button></p><div id="'+ wBttn +'" class="faqTxt"><blockquote>' );

  if( lastLvl > wLvl ){
    for( i = lastLvl; i > wLvl; i-- ){
      bttnLvls[i] = -1;
    }
  }

  if( bttnLvls[wLvl] < 0){
    bttnLvls[wLvl] = bttnArry.length;
    bttnArry[bttnLvls[wLvl]] = wLvl.toString();
  }
  bttnArry[bttnLvls[wLvl]] = bttnArry[bttnLvls[wLvl]] +";"+ wBttn;

  lastBttn = wBttn;
  lastLvl = wLvl;
}

function wizEnd( iLvl ){
  if( iLvl === undefined ){ iLvl = lastLvl +1 }
  for( i = 0; i < iLvl; i++ ){
    document.write( '</blockquote></div>' );
  }
}


function setDiv( iDevOn, iDevOff ){
  iDevOn = txt10( iDevOn );
  var x = document.getElementById(iDevOn);
  if( x.style.display == "block" ){
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }

  if( iDevOff === undefined ){
    if( bttnArry.length > 1 ){
      for( i = 1; i < bttnArry.length; i++){
	if( bttnArry[i].search( iDevOn ) > 0 ){
	  iDevOff = bttnArry[i];
	  for( j = 1; j < iDevOff.split(';').length; j++){
	    if( iDevOn != iDevOff.split(';')[j] ){
	      x = document.getElementById(iDevOff.split(';')[j]);
	      x.style.display = "none";
	    }
	  }
        }
      }
    }
  }else{
    for( i = 0; i < iDevOff.split(",").length; i++ ){
      x = document.getElementById(iDevOff.split(",")[i]);
      x.style.display = "none";
    }  
  }
}

function hrefDiv( selfHREF, topHREF ){
  var jumpDiv = "";
  var jumpArray = new Array();
  var selfArray = selfHREF.split("?");
  var topArray = topHREF.split("?");
  var i = 0;
	// document.write( "<p>debug="+ debug +"</p>" );

  if( selfArray[selfArray.length-1].indexOf('/') == -1 ){
	jumpDiv = selfArray[selfArray.length-1];
  } else {
    if( topArray[topArray.length-1].indexOf('/') == -1 ){
	jumpDiv = topArray[topArray.length-1];
    }
  }

  if( debug ){
	document.write( "<p>selfArray="+ selfArray +"</p>" );
	document.write( "<p>selfArray.indexOf="+ selfArray[selfArray.length-1].indexOf('/') +"</p>" );
	document.write( "<p>topArray="+ topArray +"</p>" );
	document.write( "<p>jumpDiv="+ jumpDiv +"</p>" );
	document.write( "<p>bttnArry="+ bttnArry +"</p>" );
	document.write( "<p>bttnLvls="+ bttnLvls +"</p>" );
  } 


  if( jumpDiv != "" ){
    jumpArray = jumpDiv.split(';');

    if( jumpArray === undefined ){
	jumpArray[0] = jumpDiv;
    }

    if( debug ){
	document.write( "<p>jumpArray="+ jumpArray +"</p>" );
	document.write( "<p>jumpArray length="+ jumpArray.length +"</p>" );
    }

    while( i < jumpArray.length ){
      if( debug ){
	document.write( "<p>"+ i +" setDiv( '"+ jumpArray[i] +"' )</p>" );
      }
      setDiv( txt10(jumpArray[i]) );
      i++;
    }
  }
}