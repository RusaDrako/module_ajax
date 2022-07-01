/** Тестировалось на библиотеки jQuery v3.2.1 */

// Включаем строгий режим
"use strict";



/** */
(function($) {
	/** Имя модуля */
	var MODULE_NAME = 'module_ajax';
	/** Версия модуля */
	var MODULE_VERSION = '1.2.1';
	/* Автор модуля */
	var MODULE_AUTHOR = 'Петухов Леонид';
	/* Дата релиза модуля */
	var MODULE_DATE = '2020-01-17';
	/* Описание модуля */
	var MODULE_DESCRIPTION = 'Унифицированный модуль AJAX-запросов на базе jQuery.';
	/* Объект */
	var object_module = {};





	/** Функция ajax-запроса html-кода и возврата результата
	 * @param function $function Функция обработчик
	 * @param object $data Массив данных
	 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
	 * @param string $type Тип ответа html/json (по умолчанию - html)
	 */
	function _ajax_do($function, $data, $url, $type) {
		if ($type === undefined) { $type = 'html';}
		if ($type != 'html' && $type != 'json') {$type = 'html';}
		if ($url === undefined) { $url = '';}
		if (typeof($function) != 'function') {
			$function = function() {};
			console.log(MODULE_NAME + '->_ajax_do: Функция обработчик не задана.');
		}
		// Маркер использования Ajax
		$data.append('isAjax','true');
		// ajax-запрос (http://jquery.page2page.ru/index.php5/Ajax-%D0%B7%D0%B0%D0%BF%D1%80%D0%BE%D1%81)*/
		jQuery.ajax({
			// Адрес ajax-запрос
			url: $url,
			// Тип запроса
			type: 'POST',
			// Тип данных, в котором ожидается получить ответ от сервера
			dataType: $type,
			// по-умолчанию, все запросы без перезагрузки страницы происходят асинхронно
			// (то есть после отправки запроса на сервер, страница не останавливает свою работу в ожидании ответа)
			async: true,
			// по-умолчанию, все передаваемые на сервер данные, предварительно преобразуются в строку
			// (url-формата: fName1=value1&fName2=value2&...) соответствующую "application/x-www-form-urlencoded"
			// Отключено
			processData: false,
			// При отправлении запроса на сервер, данные передаются в формате, указанном в contentType
			// по-умолчанию используется 'application/x-www-form-urlencoded', который подходит в большинстве случаев
			contentType: false,
			// Данные, которые будут отправлены на сервер
			data: $data,
			// Функция, которая будет вызвана в случае удачного завершения запроса к серверу
			success: function($result_data) {
				$function($result_data);
			},
			error: function($jqXHR, exception) {
				// Получаем текст ошибки
				var msg = _func_error($jqXHR, exception);
				// Выводим лог
				console.log(MODULE_NAME + '->_ajax_do: error: Ошибка выполнения запроса => ' + $msg);
				// Выводим текст ошибки
				_func_error_view(msg);
			}
		});
	}






	/** Обработчик ошибки */
	function _func_error($jqXHR, exception) {
		var msg = '';
		if (jqXHR.status === 0) {
			msg = 'Not connect.\n Verify Network.';
		} else if (jqXHR.status == 404) {
			msg = 'Requested page not found. [404]';
		} else if (jqXHR.status == 500) {
			msg = 'Internal Server Error [500].';
		} else if (exception === 'parsererror') {
			msg = 'Requested JSON parse failed.';
		} else if (exception === 'timeout') {
			msg = 'Time out error.';
		} else if (exception === 'abort') {
			msg = 'Ajax request aborted.';
		} else {
			msg = 'Uncaught Error.\n' + jqXHR.responseText;
		}
		return msg;
	}





	/** Вывод ошибки
	 * @param string $msg Объект-массив
	 */
	function _func_error_view($msg) {
		// Вывод сообщения
		alert('Ошибка выполнения запроса! ' + $msg);
	}





	/** Преобразуем объект (массив) с данными в объект-FormData
	 * @param object $data_object Объект-массив
	 */
	function _data_rework($data_object) {
		// Получаем объект данных
		var $data = new FormData();
		// Проходим по переданным даннымы
		for (var $key in $data_object) {
			// Добавляем параметр в объект
			$data.append($key, $data_object[$key]);
		}
		return $data;
	}





	/** Функция-обработчик: замена html-кода
	 * @param string $container Объект или маркер контейнера, который должен быть обновлён
	 * @param string $html HTML-код обновления
	 */
	function _update_container($container, $html) {
		var $element = $($container);
		// Анимация оптическое угасание до 0 за 0,5 сек
		$element.animate({'opacity': 0}, 500, function() {
			// Обновление информации в элементе
			$element.html($html);
			// Анимация оптическое проявление до 1 за 0,5 сек
			$element.animate({'opacity': 1}, 500);
		});
	}




















	/** Ajax-запрос с данными из формы, с последующей обработкой функцией-обработчиком
	 * @param string $func Функция обработки ответа сервера function($data)
	 * @param string $id_form ID формы из которой беруться данные
	 * @param string $type Тип ответа html/json (по умолчанию - html)
	 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
	 */
	object_module.form_func = function($func, $form, $type, $url) {
		// Получаем массив данных из заданной формы (по id)
		var $_data = new FormData($($form)[0]);
		// Выводим лог
		console.log(MODULE_NAME + '->form_func: ', $url, ' => ', '; data: ', $_data);
		// Выполняем запрос
		_ajax_do($func, $_data, $url, $type);
	};





	/** Ajax-запрос с данными из формы, с последующим обновлением заданного контейнера (ID) результатом запроса
	 * @param string $container Объект или маркер контейнера, который должен быть обновлён
	 * @param string $id_form ID формы из которой беруться данные
	 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
	 */
	object_module.form = function($container, $form, $url) {
		// Выводим лог
		console.log(MODULE_NAME + '->form: ', $form, ' => ', '; container: ', $container);
		// Формируем функцию-обработчик
		var $func = function($html) {
			// Обновление контейнера
			_update_container($container, $html);
		}
		// Вызов общей функции
		object_module.form_func($func, $form, 'html', $url);
	};





	/** Ajax-запрос с массивом данных, с последующей обработкой функцией-обработчиком
	 * @param string $func Функция обработки ответа сервера function($data)
	 * @param object $data Объект с данными
	 * @param string $type Тип ответа html/json (по умолчанию - html)
	 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
	 */
	object_module.array_func = function($func, $data, $type, $url) {
		// Получаем массив данных из объекта
		var $_data = _data_rework($data);
		// Выводим лог
		console.log(MODULE_NAME + '->array_func: ', $url, ' => ', '; data: ', $_data);
		// Выполняем запрос
		_ajax_do($func, $_data, $url, $type);
	};





	/** Ajax-запрос с массивом данных, с последующим обновлением заданного контейнера (ID) результатом запроса
	 * @param string $container Объект или маркер контейнера, который должен быть обновлён
	 * @param object $data Объект с данными
	 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
	 */
	object_module.array = function($container, $data, $url) {
		// Выводим лог
		console.log(MODULE_NAME + '->array: ', $url, ' => ', '; container: ', $container);
		// Формируем функцию-обработчик
		var $func = function($html) {
			// Обновление контейнера
			_update_container($container, $html);
		}
		// Вызов общей функции
		object_module.array_func($func, $data, 'html', $url);
	};





	/** Ajax-запрос по url, с последующей обработкой функцией-обработчиком
	 * @param string $func Функция обработки ответа сервера function($data)
	 * @param string $type Тип ответа html/json (по умолчанию - html)
	 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
	 */
	object_module.url_func = function($func, $type, $url) {
		// Получаем массив данных из объекта
		var $_data = _data_rework({});
		// Выводим лог
		console.log(MODULE_NAME + '->url_func: ', $url, ' => ', '; data: ', $_data);
		// Выполняем запрос
		_ajax_do($func, $_data, $url, $type);
	};





	/** Ajax-запрос по url, с последующим обновлением заданного контейнера (ID) результатом запроса
	 * @param string $container Объект или маркер контейнера, который должен быть обновлён
	 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
	 */
	object_module.url = function($container, $url) {
		// Выводим лог
		console.log(MODULE_NAME + '->url: ', $url, ' => ', '; container: ', $container);
		// Формируем функцию-обработчик
		var $func = function($html) {
			// Обновление контейнера
			_update_container($container, $html);
		}
		// Вызов общей функции
		object_module.url_func($func, 'html', $url);
	};





	/** Обновление заданного контейнера (ID) переданным содержимым
	 * @param string $container Объект или маркер контейнера, который должен быть обновлён
	 * @param string $html_code HTML код, который надо добавить
	 */
	object_module.update = function($container, $html_code) {
		if ($html_code === undefined) { $html_code = '';}
		// Выводим лог
		console.log(MODULE_NAME + '->update: Содержимое контейнера ' + $container + ' заменено на \'' + $html_code + '\'');
		// Обновление контейнера
		_update_container($container, $html_code);
	};





	/** Очистка заданного контейнера (ID)
	 * @param string $container Объект или маркер контейнера, который должен быть обновлён
	 */
	object_module.clean = function($container) {
		// Выводим лог
		console.log(MODULE_NAME + '->clean: Содержимое контейнера ' + $container + ' удалено');
		// Обновление контейнера
		_update_container($container, '');
	};





	/** Очистка контейнеров соответствующих маске
	 * @param string $mask Маска поиска контейнеров
	 */
	object_module.clean_group = function($mask) {
		// Выводим лог
		console.log(MODULE_NAME + '->clean_group -> ' + $mask);
		// Выполняем поиск элементов и их обработку
		$($mask).each(function($index, $element) {
			var $obj_elem = $($element);
			// Анимация оптическое угасание до 0 за 0,5 сек
			$obj_elem.animate({'height': 0}, 500, function() {
				// Обновление информации в элементе
				$obj_elem.html('');
				// Анимация оптическое проявление до 1 за 0,5 сек
				$($element).css('height', 'auto');
			});
		});
	};





	/** Возвращает объект с информацией о модуле */
	object_module.info = function() {
		return {
			module: MODULE_NAME,
			version: MODULE_VERSION,
			date: MODULE_DATE,
			author: MODULE_AUTHOR,
			description: MODULE_DESCRIPTION
		};
	};





	/** Выводит сообщение с информацией о модуле */
	object_module.about = function() {
		alert(MODULE_NAME + '\nВерсия: ' + MODULE_VERSION + '\nДата: ' + MODULE_DATE + '\nРазработчик: ' + MODULE_AUTHOR + '\n\n' + MODULE_DESCRIPTION);
	};




	window[MODULE_NAME] = object_module;

/**/
}(jQuery));
