jQuery(document).ready(function($){
	 
	var verticalNavigation = $('.cd-vertical-nav'),
         navigationItems = verticalNavigation.find('a'),
         navTrigger = $('.cd-nav-trigger');
		

	
	verticalNavigation.on('click', 'a', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
        verticalNavigation.removeClass('open');
    });

    


    navTrigger.on('click', function(event){
    	event.preventDefault();
    	verticalNavigation.toggleClass('open');
    });

	

	
});