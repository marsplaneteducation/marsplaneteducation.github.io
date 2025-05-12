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
		"AppSec Specialist",
		"Red Team Operator",
		"Adversary Emulation",
		"Hands-on Exploitation",
		"SAST/DAST Validation"
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

	// Modal
	document.querySelectorAll('.open-modal-btn').forEach(button => {
		button.addEventListener('click', () => {
		  const modalId = button.getAttribute('data-modal');
		  const modal = document.getElementById(modalId);
		  if (modal) modal.style.display = 'block';
		});
	  });
	  
	  document.querySelectorAll('.close_multi').forEach(span => {
		span.addEventListener('click', () => {
		  span.closest('.modal').style.display = 'none';
		});
	  });
	  
	  window.addEventListener('click', (e) => {
		document.querySelectorAll('.modal').forEach(modal => {
		  if (e.target === modal) modal.style.display = 'none';
		});
	  });
	  

	let currentSlide = 0;
	const slides = document.querySelectorAll('.carousel-slide');
	const totalSlides = slides.length;
	const slideIndicator = document.getElementById('slideIndicator');

	function showSlide(index) {
		slides.forEach((slide, i) => {
			slide.classList.toggle('active', i === index);
		});
		slideIndicator.textContent = `${index + 1} / ${totalSlides}`;
	}

	document.getElementById('nextSlide').addEventListener('click', () => {
		currentSlide = (currentSlide + 1) % totalSlides;
		showSlide(currentSlide);
	});

	document.getElementById('prevSlide').addEventListener('click', () => {
		currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
		showSlide(currentSlide);
	});

	// Modal logic
	const modalTriggers = document.querySelectorAll('.myBtn_multi');
	const modals = document.querySelectorAll('.modal_multi');
	const closeBtns = document.querySelectorAll('.close_multi');

	modalTriggers.forEach(trigger => {
		trigger.addEventListener('click', () => {
			const modalId = trigger.getAttribute('data-modal');
			const modal = document.getElementById(modalId);
			if (modal) modal.style.display = 'block';
		});
	});

	closeBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			btn.closest('.modal').style.display = 'none';
		});
	});

	window.addEventListener('click', e => {
		modals.forEach(modal => {
			if (e.target === modal) modal.style.display = 'none';
		});
	});

	// Initialize first slide
	showSlide(currentSlide);



	var $window = $(window),
		$body = $('body'),
		$nav = $('#nav');
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
