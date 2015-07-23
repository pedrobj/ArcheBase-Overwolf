window.addEventListener('load', function() {
	var body = document.body,
		css = function(styles) {
			for(var i in styles) this.style[i] = styles[i];
		},
	fr = document.createElement('iframe');
	fr.scrolling = 'no';
	var url = 'archeage.earlygame.net/api/tooltip';
	
	css.call(fr, {
		border: 'none',
		display: 'none',
		width: '100%',
		height: '100%',
		position: 'fixed',
		left: 0,
		top: 0,
		zIndex: 100
	});
	
	fr.scrolling = 'no';
	
	body.appendChild(fr);
	
	body.onmouseover = function(e) {
		e = e || window.event;
		var self =  e.target || e.srcElement;
		if((self.tagName == 'A' && ~self.href.indexOf(url)) || (self.tagName == 'IMG' && self.parentNode.tagName == 'A' && ~self.parentNode.href.indexOf(url))) {
		
			fr.style.left = e.clientX + 20 + 'px';
			fr.style.top = e.clientY + 10 + 'px';
			
			fr.style.display = 'block';
			/*
			fr.onload = function() {
				this.style.display = 'block';				
			}
			*/
			
			fr.src = (self.href || self.parentNode.href) + '?tooltip=load';
			
			self.onmousemove = function(e) {
				e = e || window.event;
				fr.style.left = e.clientX + 20 + 'px';
				fr.style.top = e.clientY + 10 + 'px';
			}
					
			self.onmouseout = function() {
				this.onmouseover = null;
				this.onmousemove = null;
				fr.src = '';
				fr.onload = null;
				fr.style.display = 'none';
			}
		}
	}
}, false);