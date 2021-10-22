# Модуль AJAX-запросов на базе jQuery. (module_ajax)
____

![license](https://img.shields.io/github/license/RusaDrako/module_dragndrop?style=plastic)
![release](https://img.shields.io/github/v/release/RusaDrako/module_dragndrop?style=plastic)



## Оглавление

- [Подключение](#Подключение)
- [Методы](#Методы)
	- [url](#url)
	- [array](#array)
	- [form](#form)
	- [url_func](#url_func)
	- [array_func](#array_func)
	- [form_func](#form_func)
	- [update](#update)
	- [clean](#clean)
	- [clean_group](#clean_group)



## Подключение

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script type="text/javascript" src="./module_ajax.js"></script>
```



## Методы

### url

```JavaScript
/** Ajax-запрос по url, с последующим обновлением заданного контейнера (ID) результатом запроса
 * @param string $container Объект или маркер контейнера, который должен быть обновлён
 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
 */
module_ajax.url($container, $url)
```

[:arrow_up: Оглавление](#Оглавление)



### array

```JavaScript
/** Ajax-запрос с массивом данных, с последующим обновлением заданного контейнера (ID) результатом запроса
 * @param string $container Объект или маркер контейнера, который должен быть обновлён
 * @param object $data Объект с данными
 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
 */
module_ajax.array($container, $data, $url)
```

[:arrow_up: Оглавление](#Оглавление)



### form

```JavaScript
/** Ajax-запрос с данными из формы, с последующим обновлением заданного контейнера (ID) результатом запроса
 * @param string $container Объект или маркер контейнера, который должен быть обновлён
 * @param string $id_form ID формы из которой беруться данные
 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
 */
module_ajax.form($container, $id_form, $url)
```

[:arrow_up: Оглавление](#Оглавление)



### url_func

```JavaScript
/** Ajax-запрос по url, с последующей обработкой функцией-обработчиком
 * @param string $func Функция обработки ответа сервера function($data)
 * @param string $type Тип ответа html/json (по умолчанию - html)
 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
 */
module_ajax.url_func($func, $type, $url)
```

[:arrow_up: Оглавление](#Оглавление)



### array_func

```JavaScript
/** Ajax-запрос с массивом данных, с последующей обработкой функцией-обработчиком
 * @param string $func Функция обработки ответа сервера function($data)
 * @param string $id_form ID формы из которой беруться данные
 * @param string $type Тип ответа html/json (по умолчанию - html)
 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
 */
module_ajax.array_func($func, $data, $type, $url)
```

[:arrow_up: Оглавление](#Оглавление)



### form_func

```JavaScript
/** Ajax-запрос с данными из формы, с последующей обработкой функцией-обработчиком
 * @param string $func Функция обработки ответа сервера function($data)
 * @param string $id_form ID формы из которой беруться данные
 * @param string $type Тип ответа html/json (по умолчанию - html)
 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
 */
module_ajax.form_func($func, $id_form, $type, $url)
```

[:arrow_up: Оглавление](#Оглавление)



### update

```JavaScript
/** Обновление заданного контейнера (ID) переданным содержимым
 * @param string $container Объект или маркер контейнера, который должен быть обновлён
 * @param string html_code HTML код, который надо добавить
 */
module_ajax.update($container, $html_code)
```

[:arrow_up: Оглавление](#Оглавление)



### clean

```JavaScript
/** Очистка заданного контейнера (ID)
 * @param string $container Объект или маркер контейнера, который должен быть обновлён
 */
module_ajax.clean($container)
```

[:arrow_up: Оглавление](#Оглавление)



### clean_group

```JavaScript
/** Очистка контейнеров соответствующих маске
 * @param string $mask Маска поиска контейнеров
 */
module_ajax.clean_group($mask)
```

[:arrow_up:Оглавление](#Оглавление)



[![Logo](https://avatars0.githubusercontent.com/u/32844979?s=50 "RusaDrako")](https://github.com/RusaDrako/)
