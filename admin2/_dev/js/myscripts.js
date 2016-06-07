function responsive_filemanager_callback(field_id) {
	$(document.getElementById(field_id)).trigger("change");
}

$(function() {
	$('.i-popup').magnificPopup();

	var filemanager_options = {
		type: 'iframe', 
		iframe: {
			markup: '<div class="mfp-iframe-scaler a-filemanager">'+
			            '<div class="mfp-close"></div>'+
			            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
			          '</div>'
		}
	}
	$(".i-filemanager").magnificPopup(filemanager_options);

	var tinymce_options = {
		selector: ".a-wysiwyg:not(:disabled)", 
		menubar: false, 
		language: "ru", 
		force_br_newlines : true, 
		force_p_newlines : false, 
		forced_root_block : '', 
		plugins: ["autolink autosave code hr image imagetools link lists media paste table wordcount contextmenu paste responsivefilemanager"], 
		toolbar: "undo redo | formatselect | bold italic underline | table hr | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link media image responsivefilemanager | code", 
		external_filemanager_path:"/"+admin_path+"/filemanager/",
		filemanager_title: "Responsive Filemanager", 
		external_plugins: {"filemanager" : "/"+admin_path+"/filemanager/plugin.min.js"}
	};
	tinymce.init(tinymce_options);

	var datepicker_options = {
		lang:'ru',
		i18n:{
			ru:{
				months:[
					'Январь','Февраль','Март','Апрель',
					'Май','Июнь','Июль','Август',
					'Сентябрь','Октябрь','Ноябрь','Декабрь',
				],
				dayOfWeek:[
					"ВС", "Пн", "Вт", "Ср", 
					"Чт", "Пт", "Сб",
				]
			}
		},
		closeOnDateSelect: true, 
		timepicker: false,
		format: 'd.m.Y', 
		dayOfWeekStart: 1, 
		scrollInput: false, 
		onClose: function(current_time, $input) {
			$input.attr("value", $input.val());
		}
	};

	var timepicker_options = {
		datepicker:false,
		format:'H:i', 
		scrollInput: false, 
		onClose: function(current_time, $input) {
			$input.attr("value", $input.val());
		}
	}

	var datetimepicker_options = {
		lang:'ru',
		i18n:{
			ru:{
				months:[
					'Январь','Февраль','Март','Апрель',
					'Май','Июнь','Июль','Август',
					'Сентябрь','Октябрь','Ноябрь','Декабрь',
				],
				dayOfWeek:[
					"ВС", "Пн", "Вт", "Ср", 
					"Чт", "Пт", "Сб",
				]
			}
		},
		timepicker: true,
		format: 'd.m.Y H:i', 
		dayOfWeekStart: 1, 
		scrollInput: false, 
		onClose: function(current_time, $input) {
			$input.attr("value", $input.val());
		}
	};

	$("input[type='date']:not(:disabled)").each(function() {
		create_datepicker($(this));
	});

	$("input[type='time']:not(:disabled)").each(function() {
		create_timepicker($(this));
	});

	$("input[type='datetime-local']:not(:disabled)").each(function() {
		create_datetimepicker($(this));
	});

	var sortable_options = {
		items: "> .a-sortable__item",
		handle: ".a-sortable__handler", 
		placeholder: "a-sortable__placeholder", 
		start: function(event, ui) {
			var item = $(ui.item);
			var placeholder = $(ui.placeholder);
			var parent = item.closest(".a-paramtree");

			placeholder.width(item.width() - 2);
			placeholder.height(item.height() - 2);
			placeholder.css("margin-right", item.css("margin-right"));

			parent.find('.a-input:not(:disabled)').each(function() {
				var input = $(this);
				input.attr("value", input.val());
		    });

			parent.find('.a-textarea:not(:disabled, .a-wysiwyg)').each(function() {
				var textarea = $(this);
				textarea.html(textarea.val());
			});

			parent.find('.a-checkbox:not(:disabled)').each(function() {
				var checkbox = $(this);
				checkbox.attr("checked", checkbox.prop("checked"));
			});

		    parent.find('.a-select:not(:disabled)').each(function() {
				var select = $(this);
				var select_val = select.val();
				select.children("option").each(function(index, el) {
					var option = $(el);
					if (option.val() == select_val) {
						option.attr("selected", true);
					} else {
						option.attr("selected", false);
					}
				});
		    });

		    parent.find('.a-radio:not(:disabled)').each(function() {
				var radio = $(this);
				radio.attr("checked", radio.prop("checked"));
		    });

			parent.find('.a-wysiwyg:not(:disabled)').each(function() {
				var wysiwyg = $(this);
				var wysiwyg_id = wysiwyg.attr('id');
				wysiwyg.html(tinymce.get(wysiwyg_id).getContent());
				tinymce.execCommand('mceRemoveEditor', false, wysiwyg_id);
		    });
		}, 
		stop: function(event, ui) {
			var item = $(ui.item);
			var parent = item.closest(".a-paramtree");

			reorder_items(parent, item.data("id").split("|"));

			parent.find('.a-wysiwyg:not(:disabled)').each(function() {
				tinymce.execCommand('mceAddEditor', true, $(this).attr('id'));
			});
		}
	};

	$(".a-sortable").each(function(index, el) {
		$(el).sortable(sortable_options);
	});

	function create_datepicker(obj) {
		if (navigator.userAgent.match(/iPad|iPhone|Android|IEMobile|BlackBerry/i)) return false;
		obj.get(0).type='text';
		obj.attr("data-type", "date");

		obj.datetimepicker(datepicker_options);
	}

	function create_timepicker(obj) {
		if (navigator.userAgent.match(/iPad|iPhone|Android|IEMobile|BlackBerry/i)) return false;
		obj.get(0).type='text';
		obj.attr("data-type", "time");

		obj.datetimepicker(timepicker_options);
	}

	function create_datetimepicker(obj) {
		if (navigator.userAgent.match(/iPad|iPhone|Android|IEMobile|BlackBerry/i)) return false;
		obj.get(0).type='text';
		obj.attr("data-type", "datetime");

		obj.datetimepicker(datetimepicker_options);
	}

	$(".i-nav-open").on('click', function(event) {
		event.preventDefault();
		
		$(".a-side").toggleClass("a-side-active");
		$(".a-header-page").toggleClass("a-header-offset");
	});

	$(".i-param-type").on("change", function(event) {
		var target = $(this);

		var block = target.closest(".a-undefparam");
		var options_block = block.find(".a-undefparam__optionsblock");
		var children_block = block.find(".a-undefparam__children");

		var target_value = target.val();

		if (target_value == "select" || target_value == "radio") {
			options_block.removeClass("a-undefparam__optionsblock-hidden");
			options_block.find("input").attr("disabled", false);
		} else {
			options_block.addClass("a-undefparam__optionsblock-hidden");
			options_block.find("input").attr("disabled", true);
		}

		if (target_value == "array") {
			children_block.removeClass("a-undefparam__children-hidden");
			children_block.find("select").attr("disabled", false);
		} else {
			children_block.addClass("a-undefparam__children-hidden");
			children_block.find("select").attr("disabled", true);
		}
	});

	$(".a-undefparam__add-option").on("click", function(event) {
		event.preventDefault();
		var target = $(this);
		var id = target.data("id");
		var parent_block = target.closest(".a-undefparam__optionsblock");
		var option_block = parent_block.find(".a-undefparam__options");
		addOption(option_block, id);
	});

	$(document).on("click", ".a-undefparam__remove", function(event) {
		event.preventDefault();
		if (confirm("Вместе с этим элементом удалятся все дочерние, а так же их значения. Хотите продолжить?")) {
			var target = $(this);
			var target_parent = target.closest(".a-undefparam");
			var target_children = target_parent.data("children").split("|");
			var elements_to_remove = [];

			var undef_params = $(".a-undefparam");

			undef_params.each(function(index, el) {
				var el = $(el);
				
				if (el.data('children')) {
					var children = el.data('children').split("|");

					var approach = true;
					for (var i = 0; i < target_children.length; i++) {
						
						if (target_children[i] != children[i]) {
							approach = false;
						}
					}

					if (approach) {
						elements_to_remove.push(el);
					}
				}
			});

			$(".a-undefparam__removed").remove();

			target_parent.after("<div class='a-undefparam__removed'><a href='#' class='a-undefparam__restore a-dashed'>Отменить удаление</a></div>");

			for (var i = 0; i < elements_to_remove.length; i++) {
				elements_to_remove[i].remove();
			};

			$(".a-undefparam__restore").on("click", function(event) {
				event.preventDefault();
				var target = $(this);
				var block_remove = target.closest(".a-undefparam__removed");

				for (var i = (elements_to_remove.length-1); i >= 0; i--) {
					block_remove.after(elements_to_remove[i]);
				};

				block_remove.remove();
			});
		}
	});

	function addOption(block, id, count) {
		count = count || 1;

		var value_option = $("<input class='a-input a-undefparam__option' id='"+id+"[options]' name='"+id+"[options]' value=''>");
		var option_number = block.find(".a-undefparam__option").length;

		for (var i = 0; i < count; i++) {
			value_option.clone().attr({
				"id": value_option.attr("id")+"["+(option_number + i)+"]", 
				"name": value_option.attr("name")+"["+(option_number + i)+"]"
			}).appendTo(block);
		};
	}

	$(document).on("change", ".a-file__input", function(event) {
		var target = $(this);

		var item = target.closest(".a-paramtree__item");
		var value = target.val();
		var filename = value.split("/");
		filename = filename[(filename.length - 1)];
		var ext = filename.split(".");
		ext = ext[(ext.length - 1)];

		switch (ext) {
			case 'jpg':
			case 'jpeg':
			case 'gif':
			case 'png':
			case 'svg':
				ext = undefined;
				break
			default:
				
				break
		}

		if (item.hasClass("a-paramtree__item-toadd")) {
			item = copy_item(item.data("id"));
			target.val("");
		}

		if (ext === undefined) {
			item.find(".a-file__picture").addClass("a-file__picture-exist");
			item.find(".a-file__image").attr("src", value);
		} else {
			item.find(".a-file__picture").removeClass("a-file__picture-exist");
			item.find(".a-file__image").attr("src", '');
			item.find(".a-file__ext").html("."+ext);
		}
		
		item.find(".a-file__remove").addClass("a-file__remove-active");
		item.find(".a-file__name").html(filename);
		item.find(".a-file__name").attr("title", filename);

		$.magnificPopup.close();
	});

	function copy_item(data_id) {
		var item = $("[data-id='"+data_id+"']");
		var parent = item.closest(".a-paramtree");
		var children_count = parent.children(".a-paramtree__item:not(.a-paramtree__item-toadd)").length;
		var insert_before = parent.children(".a-paramtree__item-toadd");
		var old_index_array = data_id.split("|");
		var new_index_array = data_id.split("|");
		new_index_array[(new_index_array.length - 1)] = children_count.toString();
		var html = item.outerHTML();

		html = change_id(html, old_index_array, new_index_array);

		var element = $(html);
		element.removeClass("a-paramtree__item-toadd");
		element.addClass("a-sortable__item");

		element.find("input, select, textarea").each(function(index, el) {
			var target = $(el);
			if (target.attr("id").indexOf("-n-") < 0) {
				target.removeProp('disabled');
			}
		});

		element.insertBefore(insert_before);

		add_helpers(element);

		return element;
	}

	function change_id(str, old_index, new_index, lastdigit) {
		var lastdigit = lastdigit || false;

		var find = regexp_escape(old_index.join("|"));
		if (lastdigit) {
			find += regexp_escape("|") + "(\\d+)";
		}
		find = new RegExp(find, "g");
		var replace = new_index.join("|");
		
		str = str.replace(find, replace);

		find = regexp_escape(old_index.join("_"));
		if (lastdigit) {
			find += "_(\\d+)";
		}
		find = new RegExp(find, "g");
		replace = new_index.join("_");

		str = str.replace(find, replace);

		find = old_index[0];
		for (var i = 1; i < old_index.length; i++) {
			find += "["+old_index[i]+"]";
		}
		find = regexp_escape(find);
		if (lastdigit) {
			find += regexp_escape("[") + "(\\d+)" + regexp_escape("]");
		}
		find = new RegExp(find, "g");
		replace = new_index[0];
		for (var i = 1; i < new_index.length; i++) {
			replace += "["+new_index[i]+"]";
		}

		str = str.replace(find, replace);

		find = regexp_escape(old_index.join(" &gt; ").replace("-n-", "%n%"));
		if (lastdigit) {
			find += regexp_escape(" &gt; ") + "(\\d+)";
		}
		find = new RegExp(find, "g");
		replace = new_index.join(" > ");

		str = str.replace(find, replace);

		return str;
	}

	function add_helpers(item) {
		item.find('.a-wysiwyg:not(:disabled)').each(function() {
			tinymce.execCommand('mceAddEditor', true, $(this).attr('id'));
		});

		item.find(".i-filemanager").magnificPopup(filemanager_options);
		
		item.find("input[type='date']:not(:disabled), [data-type='date']:not(:disabled)").each(function() {
			create_datepicker($(this));
		});
		item.find("input[type='time']:not(:disabled), [data-type='time']:not(:disabled)").each(function() {
			create_timepicker($(this));
		});
		item.find("input[type='datetime-local']:not(:disabled), [data-type='datetime']:not(:disabled)").each(function() {
			create_datetimepicker($(this));
		});

		$(".a-sortable").each(function(index, el) {
			var target = $(el);
			target.sortable(sortable_options);
		});
	}
	// Заменить эту функцию на следующую везде
	$(document).on("click", ".a-paramtree__header", function(event) {
		event.preventDefault();
		var target = $(this);
		var content = target.next();
		content.toggleClass("a-paramtree-active");
		target.toggleClass("a-paramtree__header-active");
		if (target.hasClass("a-paramtree__header-active")) {
			Cookies.set(target.data("id"), true);
		} else {
			Cookies.remove(target.data("id"));
		}
	});

	$(document).on("click", ".i-accordeon-header", function(event) {
		event.preventDefault();
		var target = $(this);
		var content = target.next();
		content.toggleClass("i-accordeon-content-active");
		target.toggleClass("i-accordeon-header-active");
		if (target.hasClass("i-accordeon-header-active")) {
			Cookies.set(target.data("id"), true);
		} else {
			Cookies.remove(target.data("id"));
		}
	});

	$(document).on("click", ".a-paramtree__add", function(event) {
		event.preventDefault();

		var target = $(this);

		copy_item(target.data("target_id"));
	});

	$(document).on("click", ".i-paramtree__remove", function(event) {
		event.preventDefault();

		var target = $(this);

		var item = target.closest(".a-paramtree__item");
		var parent = target.closest(".a-paramtree");

		item.find(".a-wysiwyg").each(function(index, el) {
			var wysiwyg = $(el);
			wysiwyg.addClass("wysiwyg-remove");
			tinymce.remove(".wysiwyg-remove");
		});

		item.remove();

		reorder_items(parent, item.data("id").split("|"));
	});

	$(document).on("click", ".i-maillist__remove", function(event) {
		event.preventDefault();

		var target = $(this);

		var item = target.closest(".a-maillist__item");

		item.remove();
	});

	$(document).on("click", ".i-paramtree__clear", function(event) {
		event.preventDefault();

		var target = $(this);

		var item = target.closest(".a-paramtree__item");

		item.find(".a-file__name").html("");
		item.find(".a-file__image").attr("src", "");
		item.find(".a-file__ext").html("");
		item.find(".a-file__remove").removeClass("a-file__remove-active");
	});

	//change file
	$(".i-select-file").on('change', function(event) {
		var element = $(this);
		
		var id = element.attr("id");
		var value = element.find("option:selected").val()

		Cookies.set(id, value);

		var extension = value.split(".");
		extension = extension[extension.length - 1];

		var mode = "application/x-httpd-php";

		$.ajax({
			method: "POST",
			url: "/"+admin_path+"/get_file.php",
			data: { file: value }
		}).done(function(result) {
			CodeMirrorEditor.doc.setValue(result);
			switch (extension) {
				case "css":
					mode = "text/css";
					break;
				case "js":
					mode = "text/javascript";
					break;
				case "html":
					mode = "application/x-httpd-php";
					break;
				case "php":
					mode = "application/x-httpd-php";
					break;
				default:
					mode = "application/x-httpd-php";
					break;
			}
			CodeMirrorEditor.setOption("mode", mode);
		});
	});

	$(".i-select-file").trigger("change");

	//ajax send form
	$("form.i-ajax").submit(function(event) {
		event.stopPropagation();
		event.preventDefault();

		var form = $(this);
		var form_id = form.attr("id");

		var form_submit = form.find("input[type='submit']");
		form_submit.addClass("a-loading");

		if (form_id.length == 0) {
			form_id = "form";
		}

		method = "POST";
		if (form.attr("method")) {
			method = form.attr("method");
		}

		action = "";
		if (form.attr("action")) {
			action = form.attr("action");
		}


		var data_array = new Object();

		var fields = form.find("input:not(input[type='file']), select, textarea");

		fields.each(function(index, field) {
			var field = $(field);
			var field_name = field.attr('name');
			var field_value = field.val();

			data_array[field_name] = encodeURI(field_value);
		});

		$.ajax({
			type: method,
			url: action, 
			data: data_array
	    }).done(function(data) {
	    	//console.log(data);
			form_submit.removeClass("a-loading");
			var prev_value = form_submit.val();
			form_submit.val("Сохранено");
			setTimeout(function() {form_submit.val(prev_value);}, 5000);
	    }).fail(function(jqXHR, textStatus, errorThrown) {
	    	console.log(jqXHR, textStatus, errorThrown)
	    });
	});

	$("#add_params").on('click', function(event) {
		event.preventDefault();
		var form = $(this).closest("form");

		$.ajax({
			type: "POST",
			url: "/"+admin_path+"/forms.php", 
			data: {
				"check_alias": true, 
				"alias": $(document.getElementById("addfield[alias]")).val(), 
				"parent": $(document.getElementById("addfield[parent]")).val()
			}
		}).done(function(data) {
			if (data == "true") {
				form.submit();
			} else {
				$("#add_param_error").html("Такой алиас поля уже используется или недопустим");
			}
		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown)
		});
	});

	function reorder_items(parent, id_array) {
		var items = parent.children(".a-paramtree__item:not(.a-paramtree__item-toadd)");

		id_array.pop();

		var counter = 0;
		items.each(function(index, el) {
			var item = $(el);
			var html = item.html();
			var old_index_array = id_array.join("|").split("|");
			var new_index_array = id_array.join("|").split("|");

			new_index_array.push(counter);

			item.html(change_id(html, old_index_array, new_index_array, true));
			item.attr("data-id", new_index_array.join("|"));
		
			add_helpers(item);

			counter++;
		});
	}

	function regexp_escape(text) {
    	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}
});

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};