`#drager { 
    position: fixed; 
    width: 48px; 
    height: 48px; 
    background-color: rgba(0, 0, 0, 0.2); 
    z-index: 10000; 
    cursor: pointer; 
    top: 0px; 
    left: 0px; 
    border-radius: 30%; 
    padding: 6px; 
  } 
   
  #drager>div { 
    border-radius: 50%; 
    width: 100%; 
    height: 100%; 
    background-color: rgba(0, 0, 0, 0.3); 
    transition: all 0.2s; 
   -webkit-transition: all 0.2s; 
   -moz-transition: all 0.2s; 
   -o-transition: all 0.2s; 
  } 
  #drager:hover>div{ 
    background-color: rgba(0, 0, 0, 0.6); 
  } ;`