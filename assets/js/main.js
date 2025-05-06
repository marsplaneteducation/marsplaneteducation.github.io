/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
	// Resetting the scroll position to the top of the page when the page is loaded
	document.getElementById("top-link").addEventListener("click", function (e) {
		// Smooth scroll still happens via .scrolly class
		setTimeout(() => {
			// Remove 'active' class from all nav links
			document.querySelectorAll('.nav-link.active, .scrolly.active').forEach(el => {
				el.classList.remove('active');
			});
		}, 800); // Wait until scroll completes
	});

	// Typewriter effect for the phrases
	// This function will create a typewriter effect for the phrases in the array
	const phrases = [
		"OSCP+ Certified",
		"Penetration Tester",
		"Application Security Tester",
		"Adversrary Emulation",
		"Red Teaming",
		"Vulnerability Management"
	];

	const element = document.getElementById("typewriter");
	const typingSpeed = 100;
	const erasingSpeed = 50;
	const delayBetween = 1500;
	let charIndex = 0;
	let isDeleting = false;
	let sentenceIndex = 0;
	let shuffledPhrases = [];
	let lastIndex = -1;

	function shuffleArray(array) {
		let a = [...array];
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	function getNextPhrase() {
		if (shuffledPhrases.length === 0 || sentenceIndex >= shuffledPhrases.length) {
			shuffledPhrases = shuffleArray(phrases);

			// Make sure the first item isn’t the same as the last
			if (shuffledPhrases[0] === phrases[lastIndex]) {
				// swap first and second if they match
				if (shuffledPhrases.length > 1) {
					[shuffledPhrases[0], shuffledPhrases[1]] = [shuffledPhrases[1], shuffledPhrases[0]];
				}
			}

			sentenceIndex = 0;
		}

		const current = shuffledPhrases[sentenceIndex];
		lastIndex = phrases.indexOf(current);
		return current;
	}

	function typeLoop() {
		const currentSentence = getNextPhrase();

		if (isDeleting) {
			charIndex--;
			element.textContent = currentSentence.substring(0, charIndex);
			if (charIndex === 0) {
				isDeleting = false;
				sentenceIndex++;
				setTimeout(typeLoop, typingSpeed);
			} else {
				setTimeout(typeLoop, erasingSpeed);
			}
		} else {
			charIndex++;
			element.textContent = currentSentence.substring(0, charIndex);
			if (charIndex === currentSentence.length) {
				isDeleting = true;
				setTimeout(typeLoop, delayBetween);
			} else {
				setTimeout(typeLoop, typingSpeed);
			}
		}
	}

	document.addEventListener("DOMContentLoaded", () => {
		shuffledPhrases = shuffleArray(phrases);
		if (shuffledPhrases.length > 1 && shuffledPhrases[0] === shuffledPhrases[1]) {
			[shuffledPhrases[0], shuffledPhrases[1]] = [shuffledPhrases[1], shuffledPhrases[0]];
		}
		lastIndex = phrases.indexOf(shuffledPhrases[0]);
		setTimeout(typeLoop, 1000);
	});

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
