var archebaseFeed=new function(){
	var options = {
		element:$('#feed-content'),
		type: 'rising',
		page: 1,
		limit: 5,
		trees: ''
	};
	
	this.init=function(opts){
		options=$.extend(options,opts);
		if(!options.element){
			console.log('Element not provided');
			return false;
		}
		this.get();
	}
	
	this.get=function(){
		options.element.find("#page-"+options.page).hide();
		$.ajax({
			url: 'http://arche-base.com/api/builds?script=true&limit='+options.limit+'&page='+options.page+'&type='+options.type+'&trees='+options.trees,
			dataType: 'jsonp',
			crossDomain: true,
			jsonpCallback: 'archebaseFeed.load',
			cache:true
		});
	};
	
	this.load=function(r){
		window.data = $.extend({},r); //Global Data

		this.drawFeed();
	
		$("._feed-page").button('reset').fadeIn('slow');
		options.element.find("#page-"+options.page).fadeIn('slow');
		
		$(".tp").tooltip();
	}
	
	this.drawFeed=function(){
		options.element.append(
			$("<div>")
				.attr('data-page', options.page)
				.attr('id', 'page-'+options.page)
		);
		
		if(data.builds.length > 0){
			$.each(data.builds, function(key, build){
				options.element.find("#page-"+options.page).append(formatFeed(build));
				
				var dataTree = [build.Tree1, build.Tree2, build.Tree3];
				for(var tree in dataTree){
					if(dataTree[tree].Skills.length > 0){
						$(".feed-row:last").find('.feed-las-t'+(parseInt(tree)+1)).append(
							$('<i>')
								.addClass('icon min t'+dataTree[tree].id)
								.attr('title', dataTree[tree].name)
						);
						for(var i in dataTree[tree].Skills){
							$(".feed-row:last").find('.feed-las-t'+(parseInt(tree)+1)).append(
								$('<a>')
									.css('background-image', 'url('+dataTree[tree].Skills[i].icon+')')
									.attr('href', dataTree[tree].Skills[i].tooltip)
									.attr('data-tp', 'TODO')
									.addClass('tp-base spell-icon')
							);
						}
					}
				}
				
				var content = buildContentInfo(build.Build.content);
				$(".feed-row:last").find('.glyphicon-text-width').css('color', content.color).attr('title', content.name);
				
				if(build.Build.votes_rising > 0)
					$(".feed-row:last").find(".feed-rising").show(0);
			});
		}
		else{
			options.element.find("#page-"+options.page).append("No results.").css({color:'#777',margin:'10px'});
		}
	}
	
	function formatFeed(build){
		var feedTemplate = $($('#feed-template'));
		return feedTemplate.html()
			.replace(/\{(.+?)\}/g, function($0, $1) {
				return eval($1);
			});
	}
	
	function buildContentInfo(value){
		if(value > 15000)
			return {name:'Artifact', color:'#e167a8'};
		else if(value > 10000)
			return {name:'Epic', color:'#7133ff'};
		else if(value > 5000)
			return {name:'Excellent', color:'#67a8e1'};
		else if(value > 1500)
			return {name:'Good', color:'#a7e065'};
		else if(value > 0)
			return {name:'Average', color:'#FFF'};
		else if(value == 0) 
			return {name:'Inferior', color:'silver'};
		else
			return {name: 'Inferior', color: 'silver'};
	}
}