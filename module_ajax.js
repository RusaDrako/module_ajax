/** Тестировалось на библиотеки jQuery v3.2.1 */

// Включаем строгий режим
"use strict";



/** Унифицированный модуль AJAX-запросов на базе jQuery.
 *	@version 1.2.0
 *	@author Leonid Petukhov 
 */
/*var module_ajax = */(function($) {
	/** Имя модуля */
	var MODULE_NAME = 'module_ajax';
	/** Версия модуля */
	var MODULE_VERSION = '1.2.0';
	/* Автор модуля */
	var MODULE_AUTHOR = 'Петухов Леонид';
	/* Дата релиза модуля */
	var MODULE_DATE = '2019-10-15';
	/* Описание модуля */
	var MODULE_DESCRIPTION = 'Унифицированный модуль AJAX-запросов на базе jQuery.';
	/* Объект */
	var module_ajax = {};





	/** Функция ajax-запроса html-кода и возврата результата
	 * @param function $function Функция обработчик
	 * @param object $data Массив данных
	 * @param string $type Тип ответа html/json (по умолчанию - html)
	 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
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
			error: function($jqXHR, $textStatus, $errorThrown){
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
				// Выводим лог
				console.log(MODULE_NAME + '->_ajax_do: error: Ошибка выполнения запроса => ' + msg);
				// Вывод сообщения
				alert('Ошибка выполнения запроса! ' + msg);
			}
		});
	};






	/** Преобразуем объект (массив) с данными в объект-FormData
	 * @param object $data_object Объект-массив
	 */
	function _data_rework ($data_object) {
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
	 * @param string $container_id ID контейнера, который должен быть обновлён
	 * @param string $html HTML-код обновления
	 */
	function _update_container_id ($container_id, $html) {
		var $element = $($container_id);
		// Анимация оптическое угасание до 0 за 0,5 сек
		$element.animate({'opacity':0},500,function() {
			// Обновление информации в элементе
			$element.html($html);
			// Анимация оптическое проявление до 1 за 0,5 сек
			$element.animate({'opacity':1},500);
		});
	}




















	/** Ajax-запрос по url, с последующим обновлением заданного контейнера (ID) результатом запроса
	 * @param string $id_container ID контейнера, который должен быть обновлён
	 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
	 */
	module_ajax.url = function($id_container, $url) {
		// Формируем id контейнера
		var $container_id	= '#' + $id_container;
		// Получаем объект данных
		var $data = new FormData();
		// Выводим лог
		console.log(MODULE_NAME + '->url: ', $url, ' => ', '; container: ', $id_container);
		// Формируем функцию-обработчик
		var $func = function($html) {
			// Обновление контейнера
			_update_container_id($container_id, $html);
		}
		// Выполняем запрос
		_ajax_do($func, $data, $url, 'html');
	};





	/** Ajax-запрос с массивом данных, с последующим обновлением заданного контейнера (ID) результатом запроса
	 * @param string $id_container ID контейнера, который должен быть обновлён
	 * @param object $data Объект с данными
	 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
	 */
	module_ajax.array = function($id_container, $data, $url) {
		if (undefined === $url) { $url = '';}
		// Формируем id контейнера
		var $container_id	= '#' + $id_container;
		// Получаем массив данных из объекта
		var $_data = _data_rework($data);
		// Выводим лог
		console.log(MODULE_NAME + '->array: ', $url, ' => ', '; container: ', $id_container);
		// Формируем функцию-обработчик
		var $func = function($html) {
			// Обновление контейнера
			_update_container_id($container_id, $html);
		}
		// Выполняем запрос
		_ajax_do($func, $_data, $url, 'html');
	};





	/** Ajax-запрос с данными из формы, с последующим обновлением заданного контейнера (ID) результатом запроса
	 * @param string $id_container ID контейнера, который должен быть обновлён
	 * @param string $id_form ID формы из которой беруться данные
	 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
	 */
	module_ajax.form = function($id_container, $id_form, $url) {
		if (undefined === $url) { $url = '';}
		// Формируем id контейнера
		var $container_id	= '#' + $id_container;
		// Получаем массив данных из заданной формы (по id)
		var $data = new FormData($("#" + $id_form)[0]);
		// Выводим лог
		console.log(MODULE_NAME + '->form: ', $id_form, ' => ', '; container: ', $id_container);
		// Формируем функцию-обработчик
		var $func = function($html) {
			// Обновление контейнера
			_update_container_id($container_id, $html);
		}
		// Выполняем запрос
		_ajax_do($func, $data, $url, 'html');
	};





	/** Ajax-запрос по url, с последующей обработкой функцией-обработчиком
	 * @param string $id_container ID контейнера, который должен быть обновлён
	 * @param string $type Тип ответа html/json (по умолчанию - html)
	 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
	 */
	module_ajax.url_func = function($func, $type, $url) {
		// Получаем массив данных из объекта
		var $data = _data_rework({});
		// Выводим лог
		console.log(MODULE_NAME + '->url_func: ', $url, ' => ', '; data: ', $data);
		// Выполняем запрос
		_ajax_do($func, $data, $url, $type);
	};





	/** Ajax-запрос с массивом данных, с последующей обработкой функцией-обработчиком
	 * @param string $id_container ID контейнера, который должен быть обновлён
	 * @param object $data Объект с данными
	 * @param string $type Тип ответа html/json (по умолчанию - html)
	 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
	 */
	module_ajax.array_func = function($func, $data, $type, $url) {
		// Получаем массив данных из объекта
		var $_data = _data_rework($data);
		// Выводим лог
		console.log(MODULE_NAME + '->array_func: ', $url, ' => ', '; data: ', $data);
		// Выполняем запрос
		_ajax_do($func, $_data, $url, $type);
	};





	/** Ajax-запрос с данными из формы, с последующей обработкой функцией-обработчиком
	 * @param string $id_container ID контейнера, который должен быть обновлён
	 * @param string $id_form ID формы из которой беруться данные
	 * @param string $type Тип ответа html/json (по умолчанию - html)
	 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
	 */
	module_ajax.form_func = function($func, $id_form, $type, $url) {
		// Получаем массив данных из заданной формы (по id)
		var $data = new FormData($("#" + $id_form)[0]);
		// Выводим лог
		console.log(MODULE_NAME + '->form_func: ', $url, ' => ', '; data: ', $data);
		// Выполняем запрос
		_ajax_do($func, $data, $url, $type);
	};





	/** Обновление заданного контейнера (ID) переданным содержимым
	 * @param string id_container ID контейнера, который должен быть обновлён
	 * @param string html_code HTML код, который надо добавить
	 */
	module_ajax.update = function($id_container, $html_code) {
		if ($html_code === undefined) { $html_code = '';}
		// Формируем id контейнера
		var $container_id	= '#' + $id_container;
		// Выводим лог
		console.log(MODULE_NAME + '->update: Содержимое контейнера ' + $id_container + ' заменено на \'' + $html_code + '\'');
		// Обновление контейнера
		_update_container_id($container_id, $html_code);
	};





	/** Очистка заданного контейнера (ID)
	 * @param string $id_container ID контейнера, который должен быть обновлён
	 */
	module_ajax.clean = function($id_container) {
		// Формируем id контейнера
		var $container_id	= '#' + $id_container;
		// Выводим лог
		console.log(MODULE_NAME + '->clean: Содержимое контейнера ' + $id_container + ' удалено');
		// Обновление контейнера
		_update_container_id($container_id, '');
	};





	/** Очистка контейнеров соответствующих маске
	 * @param string $mask Маска поиска контейнеров
	 */
	module_ajax.clean_group = function($mask) {
		// Выводим лог
		console.log(MODULE_NAME + '->clean_group -> ' + $mask);
		// Выполняем поиск элементов и их обработку
		$($mask).each(function($indx, $element) {
			var $obj_elem = $($element);
			// Анимация оптическое угасание до 0 за 0,5 сек
			$obj_elem.animate({'height':0},500,function() {
				// Обновление информации в элементе
				$obj_elem.html('');
				// Анимация оптическое проявление до 1 за 0,5 сек
				$($element).css('height', 'auto');
			});
		});
	};





	/** Возвращает объект с информацией о модуле */
	module_ajax.info = function() {
		return {
			module: MODULE_NAME,
			version: MODULE_VERSION,
			date: MODULE_DATE,
			author: MODULE_AUTHOR,
			description: MODULE_DESCRIPTION
		};
	};





	/** Выводит сообщение с информацией о модуле */
	module_ajax.about = function() {
		alert(MODULE_NAME + '\nВерсия: ' + MODULE_VERSION + '\nДата: ' + MODULE_DATE + '\nРазработчик: ' + MODULE_AUTHOR + '\n\n' + MODULE_DESCRIPTION);
	};




	window.module_ajax = module_ajax;

//	return module_ajax;
/**/
}(jQuery))
