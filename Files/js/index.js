var GLOBAL_PAGE = 1;
var GLOBAL_TREES = '';

//OverWolf
function openSubWindow(target, send){
	overwolf.windows.obtainDeclaredWindow(target, function(result){
		if (result.status == "success"){
			overwolf.windows.restore(result.window.id, function(result){
				if(send){
					window.localStorage.setItem( 'view_build', JSON.stringify( {url:send} ) );
				}
				console.log(result);
			});
		}
	});
};

function openIframe(url){
	window.open(url, "content");
}

//Class Check
function checkTrees(){
	var classList = {"Nocturne":[4,8,7],"Sorrowsong":[4,8,9],"Lorebreaker":[4,8,0],"Dark Aegis":[4,8,2],"Tombcaller":[4,8,1],"Requiem":[4,8,6],"Gravesinger":[4,8,5],"Phantasm":[4,8,3],"Templar":[2,3,9],"Tomb Warden":[2,3,8],"Skullknight":[2,3,4],"Nightblade":[2,3,7],"Abolisher":[2,3,0],"Dreambreaker":[2,3,1],"Thaumaturge":[2,3,6],"Bastion":[2,3,5],"Confessor":[7,8,9],"Blade Dancer":[7,8,0],"Nightbearer":[7,8,2],"Nightwitch":[7,8,1],"Spellsinger":[7,8,6],"Ebonsong":[7,8,5],"Exorcist":[7,8,3],"Scion":[2,6,9],"Bloodthrall":[8,9,0],"Caretaker":[8,9,2],"Athame":[8,9,1],"Gypsy":[8,9,6],"Soulsong":[8,9,5],"Exorcist":[7,8,3],"Dawncaller":[8,0,2],"Dirgeweaver":[8,0,1],"Spellsword":[8,0,6],"Bloodskald":[8,0,5],"Herald":[8,0,3],"Poxbane":[8,2,1],"Farslayer":[2,5,6],"Earthsinger":[8,2,6],"Honorguard":[8,2,5],"Lamentor":[8,1,6],"Hex Ranger":[8,1,5],"Enchantrix":[8,1,3],"Evoker":[8,6,5],"Spellsong":[8,6,3],"Howler":[8,5,3],"Doombringer":[4,7,9],"Executioner":[4,7,0],"Dreadnaught":[4,7,2],"Shroudmaster":[4,7,1],"Reaper":[4,7,6],"Shadehunter":[4,7,5],"Planeshifter":[4,7,3],"Blackguard":[4,9,0],"Justicar":[4,9,2],"Necromancer":[4,9,1],"Cultist":[4,9,6],"Blood Arrow":[4,9,5],"Edgewalker":[4,9,3],"Doomlord":[4,0,2],"Hordebreaker":[4,0,1],"Ravager":[4,0,6],"Dreadbow":[4,0,5],"Bloodreaver":[4,0,3],"Battlemage":[4,2,6],"Dreadstone":[4,2,5],"Demonologist":[4,1,6],"Shadestriker":[4,1,5],"Nightcloak":[4,1,3],"Spellbow":[4,6,5],"Revenant":[4,6,3],"Astral Ranger":[4,5,3],"Inquisitor":[7,9,0],"Death Warden":[7,9,2],"Assassin":[7,9,1],"Animist":[7,9,6],"Ranger":[7,9,5],"Soothsayer":[7,9,3],"Shadowblade":[7,0,1],"Hellweaver":[7,0,6],"Outrider":[7,0,5],"Darkrunner":[7,0,3],"Blighter":[7,2,0],"Shadowknight":[7,2,1],"Swiftstone":[7,2,6],"Stone Arrow":[7,2,5],"Eidolon":[7,1,3],"Trickster":[7,1,5],"Daggerspell":[7,1,6],"Enigmatist":[7,6,3],"Infiltrator":[7,6,5],"Primeval":[7,5,3],"Cleric":[9,3,8],"Argent":[9,3,0],"Hierophant":[9,3,1],"Boneweaver":[9,3,6],"Oracle":[9,3,5],"Druid":[9,5,2],"Soulbow":[9,5,1],"Naturalist":[9,5,6],"Hexblade":[0,1,2],"Hex Warden":[0,1,3],"Harbinger":[0,1,6],"Dreadhunter":[0,1,5],"Dervish":[0,1,9],"Liberator":[2,0,5],"Crusader":[0,2,6],"Paladin":[0,2,9],"Bonestalker":[0,3,5],"Enforcer":[0,3,6],"Destroyer":[0,5,6],"Warpriest":[0,5,9],"Fleshshaper":[6,9,0],"Defiler":[1,2,4],"Archon":[1,2,5],"Cabalist":[1,2,6],"Shadowbane":[1,2,9],"Arcane Hunter":[1,3,5],"Arcanist":[1,3,6],"Stormcaster":[1,5,6],"Shaman":[1,6,9],"Stormchaser":[3,5,6]};
	var value = new Array(), className = '';
	$(".list-icons i.active").each(function(){
			value.push(parseInt($(this).attr('data-value')));
	});
	if(value.length <= 3){
		$.each(classList, function(i,v){
			if( $.inArray(value[0]-1,v) != -1 && $.inArray(value[1]-1,v) != -1 && $.inArray(value[2]-1,v) != -1 ){
				className = i;
			}
		});
	}
	if(className){
		var type = $(".nav-pills>li.active>a").attr("data-original-title");
		if(!type) type = '';
		$("._class-name").empty().text(className+' '+type+' Guides');
	}
	else
		$("._class-name").empty();
}

//View in Iframe - data-link=""
$(document).on('click','._view',function(){
	var url = $(this).attr("data-link");
	if(url){
		$("#view>button").fadeIn('slow'); //Loading
		$("#view-iframe").show().attr("src",url);
		$('body').children().not('#view').hide();
		
		document.getElementById("view-iframe").onload = function(){
			$("#view").children().fadeIn('slow');
			$('html, body').animate({
				scrollTop: $('#view').last().offset().top
			}, 500);
			$("#view>button").hide(); //Loading
		};
	}
});
//View Back
$(document).on('click','._view-back',function(){
	$("#view-iframe").attr('src','');
	document.getElementById("view-iframe").onload = function(){
		$("#view-iframe, ._view-back").hide();
		$('body').children().not('iframe, #view-iframe').show();
	}
});

//Toggle Row
$(document).on('click','.feed-row',function(){
	event.stopPropagation();
	$(this).toggleClass("feed-highlight").find(".feed-more").slideToggle(200);
});

//Pagination
$(document).on('click','._feed-page',function(){
	$(this).button('loading');
	GLOBAL_PAGE++;
	archebaseFeed.init({
		element: $('#feed-content'),
		type: $(this).attr("data-type"),
		page: GLOBAL_PAGE,
		trees: GLOBAL_TREES
	});
});

//Filters - Tab
$(document).on('click','._filter',function(){
	$("#feed-content").empty();
	$("._feed-page").button('loading').attr('data-type', $(this).attr("data-type"));
	checkTrees();
	GLOBAL_PAGE = 1;
	archebaseFeed.init({
		element: $('#feed-content'),
		type: $(this).attr("data-type"),
		page: GLOBAL_PAGE,
		trees: GLOBAL_TREES
	});
});

//Filters - Trees
$(document).on('click','.list-icons i',function(){ //Filter Tree
	var trees = new Array();
	$("#feed-content").empty();
	$("._feed-page").button('loading').attr('data-type', $(this).attr("data-type"));
	
	if(!$(this).hasClass('active')){
		$(this).addClass('active');
	}
	else{
		$(this).removeClass('active');
	}
	
	$(".list-icons i.active").each(function(){
		trees.push($(this).attr("data-value"));
	});
	checkTrees();
	
	GLOBAL_TREES = trees.join(",");
	archebaseFeed.init({
		element: $('#feed-content'),
		type: $(this).attr("data-type"),
		trees: GLOBAL_TREES
	});
});