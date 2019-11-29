# module_ajax
# ver: 1.2.0
Унифицированный модуль AJAX-запросов на базе jQuery.





/** Ajax-запрос по url, с последующим обновлением заданного контейнера (ID) результатом запроса
 * @param string $id_container ID контейнера, который должен быть обновлён
 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
 */
module_ajax.url($id_container, $url)





/** Ajax-запрос с массивом данных, с последующим обновлением заданного контейнера (ID) результатом запроса
 * @param string $id_container ID контейнера, который должен быть обновлён
 * @param object $data Объект с данными
 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
 */
module_ajax.array($id_container, $data, $url)





/** Ajax-запрос с данными из формы, с последующим обновлением заданного контейнера (ID) результатом запроса
 * @param string $id_container ID контейнера, который должен быть обновлён
 * @param string $id_form ID формы из которой беруться данные
 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
 */
module_ajax.form($id_container, $id_form, $url)





/** Ajax-запрос по url, с последующей обработкой функцией-обработчиком
 * @param string $id_container ID контейнера, который должен быть обновлён
 * @param string $type Тип ответа html/json (по умолчанию - html)
 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
 */
module_ajax.url_func($func, $type, $url)





/** Ajax-запрос с массивом данных, с последующей обработкой функцией-обработчиком
 * @param string $id_container ID контейнера, который должен быть обновлён
 * @param string $id_form ID формы из которой беруться данные
 * @param string $type Тип ответа html/json (по умолчанию - html)
 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
 */
module_ajax.array_func($func, $data, $type, $url)





/** Ajax-запрос с данными из формы, с последующей обработкой функцией-обработчиком
 * @param string $id_container ID контейнера, который должен быть обновлён
 * @param string $id_form ID формы из которой беруться данные
 * @param string $type Тип ответа html/json (по умолчанию - html)
 * @param string $url Ссылка по которой происходит запрос (по умолчанию - эта же страница)
 */
module_ajax.form_func($func, $id_form, $type, $url)





/** Обновление заданного контейнера (ID) переданным содержимым
 * @param string id_container ID контейнера, который должен быть обновлён
 * @param string html_code HTML код, который надо добавить
 */
module_ajax.update($id_container, $html_code)





/** Очистка заданного контейнера (ID)
 * @param string $id_container ID контейнера, который должен быть обновлён
 */
module_ajax.clean($id_container)





/** Очистка контейнеров соответствующих маске
 * @param string $mask Маска поиска контейнеров
 */
module_ajax.clean_group($mask)





/** Возвращает объект с параетрами модуля */
module_ajax.info()





/** Выводит сообщение с информацией о модуле */
module_ajax.about()
