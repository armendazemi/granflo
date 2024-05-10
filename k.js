(function () {
	$(document).ready(function () {
		var fetchVariantData;
		$('.variant-data').each(function () {
			if ($(this).data('stock') || $(this).data('backorderable')) {
				return $(this)
					.children()
					.each(function () {
						var html_option, option_type_id, option_value_id;
						option_type_id = $(this).data('option_type-id');
						option_value_id = $(this).data('option_value-id');
						$('select[data-option_type-id=' + option_type_id + ']')
							.find('[value=' + option_value_id + ']')
							.attr('disabled', false);
						html_option = $('select[data-option_type-id=' + option_type_id + ']')
							.find('[value=' + option_value_id + ']')
							.html();
						return $('select[data-option_type-id=' + option_type_id + ']')
							.find('[value=' + option_value_id + ']')
							.html(html_option.split(' (Ej i lager)')[0]);
					});
			}
		});
		$('.option-value-1').on('change', function (e) {
			var option_val_2_id, option_val_id;
			option_val_id = $(this).val();
			$('.option-value-2').find('.notChooseable').prop('selected', true);
			option_val_2_id = $('.option-value-2').val();
			disableNonPossibleVariantOptions(option_val_id);
			return fetchVariantData(option_val_id, option_val_2_id);
		});

		$('.option-value-2').on('change', function (e) {
			var option_val_2_id, option_val_id;
			option_val_2_id = $(this).val();
			option_val_id = $('.option-value-1').val();
			return fetchVariantData(option_val_id, option_val_2_id);
		});
		return (fetchVariantData = function (opt_val_id_1, opt_val_id_2) {
			return $('.products-single-wrapper .variant-data').each(function () {
				var $option_val, $option_val_2, backorderable, campaign, campaignPrice, image, price, sku, stock, variant_id;
				if (opt_val_id_1 && !opt_val_id_2) {
					$option_val = $(this).children('[data-option_value-id=' + opt_val_id_1 + ']');
					if ($option_val.length > 0) {
						$('.choosen').show();
						$('.not-choosen').hide();
						sku = $(this).data('sku');
						image = $(this).data('variant-image');

						// Variant image change
						option_type_text = document.querySelector('.option-value-1 option').innerText;

						if (option_type_text.toLowerCase().includes('färg')) {
							imageElement = document.querySelector(`.product-images--thumbnails a[href="${image}"]`);
							imageElement.parentElement.click();
							var slideIndex = Array.from(swiper.slides).indexOf(imageElement.closest('.swiper-slide'));
							swiper2.slideTo(slideIndex);
						}

						variant_id = $(this).data('id');
						price = $(this).data('price');
						campaign = $(this).data('campaign');
						campaignPrice = $(this).data('campaignprice');
						stock = $(this).data('stock');
						backorderable = $(this).data('backorderable');
						$('.variantSku').html(sku);
						$('#variant_id').val(variant_id);
						$('.variantPrice').text(price);
						$('.variantCampaignPrice').text(campaignPrice);
						if (campaign === true) {
							$('.campaign-prices').show();
							$('.standard-prices').hide();
						} else {
							$('.campaign-prices').hide();
							$('.standard-prices').show();
						}

						const stockStatusIndicator = document.querySelector('.product-buy .product-card__stock-indicator');
						const stockStatusText = document.querySelector('.product-buy p.choosen');
						if (stock === true) {
							stockStatusIndicator.classList.remove('backorderable', 'out-of-stock');
							stockStatusIndicator.classList.add('in-stock');
							stockStatusText.innerHTML = 'I lager';
						} else {
							$('.in-stock-wrapper').hide();
							if (backorderable === true) {
								stockStatusIndicator.classList.remove('in-stock', 'out-of-stock');
								stockStatusIndicator.classList.add('backorderable');
								stockStatusText.innerHTML = 'Går att beställa';
							} else {
								stockStatusIndicator.classList.remove('in-stock', 'backorderable');
								stockStatusIndicator.classList.add('out-of-stock');
								stockStatusText.innerHTML = 'Ej i lager';
							}
						}

						if (document.querySelector('.option-value-2')) {
							$('#add-to-cart-button').prop('disabled', true);
						} else {
							$('#add-to-cart-button').prop('disabled', false);
						}
						return false;
					}
				} else if (opt_val_id_1 && opt_val_id_2) {
					$option_val = $(this).children('[data-option_value-id=' + opt_val_id_1 + ']');
					$option_val_2 = $(this).children('[data-option_value-id=' + opt_val_id_2 + ']');
					if ($option_val.length > 0 && $option_val_2.length > 0) {
						$('.choosen').show();
						$('.not-choosen').hide();
						sku = $(this).data('sku');
						variant_id = $(this).data('id');
						price = $(this).data('price');
						image = $(this).data('variant-image');

						// Variant image change
						option_type_text = document.querySelector('.option-value-2 option').innerText;

						if (option_type_text.toLowerCase().includes('färg')) {
							imageElement = document.querySelector(`.product-images--thumbnails a[href="${image}"]`);
							imageElement.parentElement.click();
							var slideIndex = Array.from(swiper.slides).indexOf(imageElement.closest('.swiper-slide'));
							swiper2.slideTo(slideIndex);
						}

						campaign = $(this).data('campaign');
						campaignPrice = $(this).data('campaignprice');
						stock = $(this).data('stock');
						backorderable = $(this).data('backorderable');
						$('.variantSku').html(sku);
						$('#variant_id').val(variant_id);
						$('.variantPrice').text(price);
						$('.variantCampaignPrice').text(campaignPrice);
						if (campaign === true) {
							$('.campaign-prices').show();
							$('.standard-prices').hide();
						} else {
							$('.campaign-prices').hide();
							$('.standard-prices').show();
						}
						if (stock === true) {
							$('.product-card__stock-indicator').removeClass('backorderable out-of-stock');
							$('.product-card__stock-indicator').addClass('product-card__stock-indicator in-stock');
							$('p.choosen').html('I lager');
							if ($('#add-to-cart-button').prop('disabled')) {
								$('#add-to-cart-button').prop('disabled', false);
							}
						} else {
							if (backorderable === true) {
								$('.product-card__stock-indicator').removeClass('in-stock out-of-stock');
								$('.product-card__stock-indicator').addClass('product-card__stock-indicator backorderable');
								$('p.choosen').html('Beställningsvara');
								$('#add-to-cart-button').prop('disabled', false);
							} else {
								$('.product-card__stock-indicator').removeClass('in-stock backorderable');
								$('.product-card__stock-indicator').addClass('out-of-stock choosen');
								$('p.choosen').html('Slut i lager');
								$('#add-to-cart-button').prop('disabled', true);
							}
						}
						return false;
					} else if (!opt_val_id_1 && !opt_val_id_2) {
						$('.choosen').hide();
						$('.not-choosen').show();
						$('.aside-slider').show();
						$('.head-slider').show();
						return $('.product-one-image').show();
					} else {
						$('.in-stock-wrapper').hide();
						$('.backorderable-wrapper').hide();
						$('.out-of-stock-wrapper').show();
						$('.variantSku').html('');
						$('.campaign-prices').hide();
						$('.standard-prices').show();
						$('.product-images').show();
						return $('.variant-image').hide();
					}
				}
			});
		});
	});

	let variantDataElements = null;

	function disableNonPossibleVariantOptions(selectedId) {
		if (variantDataElements == null) {
			variantDataElements = document.querySelectorAll('.variant-data');
		}

		const secondSelectElement = document.querySelector('.option-value-2');
		if (secondSelectElement) {
			// Disable all options
			secondSelectElement.querySelectorAll('option').forEach((option) => {
				option.disabled = true;
			});

			variantDataElements.forEach((element) => {
				// Find nested div with variant data that has data-option_value-id attribute equal to selectedId
				if (element.querySelector(`[data-option_value-id="${selectedId}"]`) == null) {
					return;
				}

				// Find the sibling variant data, which is the other option value. Thus, we know the combination of the two option values is a possible variant
				let siblingVariantData = element.querySelector(`:not([data-option_value-id="${selectedId}"])`);

				const stock = siblingVariantData.parentElement.dataset.stock;
				const backorderable = siblingVariantData.parentElement.dataset.backorderable;

				if (stock === 'true' || backorderable === 'true') {
					// Find the option that has the same value as the siblingVariantData and enable it
					secondSelectElement.querySelector(`option[value="${siblingVariantData.dataset.option_valueId}"]`).disabled = false;
					// Remove the text (Ej i lager)
					let currentContent = secondSelectElement.querySelector(`option[value="${siblingVariantData.dataset.option_valueId}"]`).textContent;
					currentContent = currentContent.replace(' (Ej i lager)', '');
					secondSelectElement.querySelector(`option[value="${siblingVariantData.dataset.option_valueId}"]`).innerText = currentContent;
				} else {
					// Add the text (Ej i lager)
					let currentContent = secondSelectElement.querySelector(`option[value="${siblingVariantData.dataset.option_valueId}"]`).textContent;
					if (currentContent.includes('(Ej i lager)')) {
						return;
					}
					currentContent += ' (Ej i lager)';
					secondSelectElement.querySelector(`option[value="${siblingVariantData.dataset.option_valueId}"]`).innerText = currentContent;
				}
			});
		}
	}
}).call(this);
