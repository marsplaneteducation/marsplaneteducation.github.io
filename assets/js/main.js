/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Get all modal elements (including full-screen modal)
	var modalParent = document.getElementsByClassName("modal_multi");

	// Get the buttons that open the modals
	var modalBtnMulti = document.getElementsByClassName("myBtn_multi");

	// Get the <span> elements that close the modals
	var spanCloseMulti = document.getElementsByClassName("close_multi");

	// Function to set data-index for all modals and buttons
	function setDataIndex() {
		for (var i = 0; i < modalBtnMulti.length; i++) {
			modalBtnMulti[i].setAttribute('data-index', i);
			modalParent[i].setAttribute('data-index', i);
			spanCloseMulti[i].setAttribute('data-index', i);
		}
	}

	// Function to open the modal
	function openModal(index) {
		modalParent[index].style.display = "block";
	}

	// Function to close the modal
	function closeModal(index) {
		modalParent[index].style.display = "none";
	}

	// Set data-index attributes on page load
	window.onload = function () {
		setDataIndex();
	};

	// Open modal on button click
	for (var i = 0; i < modalBtnMulti.length; i++) {
		modalBtnMulti[i].onclick = function () {
			var ElementIndex = this.getAttribute('data-index');
			openModal(ElementIndex);
		};
	}

	// Close modal on <span> click
	for (var i = 0; i < spanCloseMulti.length; i++) {
		spanCloseMulti[i].onclick = function () {
			var ElementIndex = this.getAttribute('data-index');
			closeModal(ElementIndex);
		};
	}

	// Close modal on clicking outside of the modal
	window.onclick = function (event) {
		for (var i = 0; i < modalParent.length; i++) {
			if (event.target === modalParent[i]) {
				closeModal(i);
			}
		}
	};


	// Breakpoints.
	breakpoints({
		wide: ['961px', '1880px'],
		normal: ['961px', '1620px'],
		narrow: ['961px', '1320px'],
		narrower: ['737px', '960px'],
		mobile: [null, '736px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Nav.
	var $nav_a = $nav.find('a');

	$nav_a
		.addClass('scrolly')
		.on('click', function (e) {
			var $this = $(this);

			// External link? Bail.
			if ($this.attr('href').charAt(0) !== '#')
				return;

			// Prevent default.
			e.preventDefault();

			// Deactivate all links.
			$nav_a.removeClass('active');

			// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
			$this
				.addClass('active')
				.addClass('active-locked');
		})
		.each(function () {
			var $this = $(this),
				id = $this.attr('href'),
				$section = $(id);

			// No section for this link? Bail.
			if ($section.length < 1)
				return;

			// Scrollex.
			$section.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function () {
					// Deactivate section.
					$section.addClass('inactive');
				},
				enter: function () {
					// Activate section.
					$section.removeClass('inactive');
				
					// Prevent premature highlight during scroll
					if ($nav_a.filter('.active-locked').length === 0) {
						$nav_a.removeClass('active');
						$this.addClass('active');
					}
					else if ($this.hasClass('active-locked')) {
						// Delay unlocking to avoid flash
						setTimeout(() => {
							$this.removeClass('active-locked');
						}, 400); // adjust time to match your scroll duration
					}
				}
				
			});
		});

	// Scrolly.
	$('.scrolly').scrolly();

	// Header (narrower + mobile).
	// Toggle.
	$('<div id="headerToggle">' +
		'<a href="#header" class="toggle"></a>' +
		'</div>')
		.appendTo($body);

	// Header.
	$('#header').panel({
		delay: 500,
		hideOnClick: true,
		hideOnSwipe: true,
		resetScroll: true,
		resetForms: true,
		side: 'left',
		target: $body,
		visibleClass: 'header-visible'
	});

})(jQuery);
